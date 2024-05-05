import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { SelectQueryBuilder, Like, Repository, Brackets } from 'typeorm'
import {
	Pagination,
	BasePaginateOptions,
	UniqueCheckOptions,
	CreateEntityOptions,
	UpdateEntityOptions
} from './crud.interface'
import { BaseEntity } from '@/common/entity'

@Injectable()
export abstract class CoolCRUDService<T extends BaseEntity> {
	protected repositroy: Repository<T>

	constructor(readonly repository: Repository<T>) {}

	/**
	 * 默认查询条件
	 */
	withDefaultPagination: Pagination = {
		page: 1,
		size: 10,
		sort: 'createdAt',
		order: 'DESC'
	}

	uniqueCheck(dto: any, options?: UniqueCheckOptions<T>): Promise<boolean>

	async uniqueCheck(dto: any, options?: UniqueCheckOptions<T>) {
		if (!options || !options.uniques) return true
		const [first, ...rest] = options.uniques

		const builder = this.repository.createQueryBuilder().where(
			new Brackets(qb => {
				qb.where(`${String(first)} = :key`, { key: dto[first] })

				rest.forEach(field => {
					qb.orWhere({ [field]: dto[field] })
				})
			})
		)

		if (dto.id) builder.andWhere({ id: dto.id })

		const findOne = await builder.getOne()

		if (findOne) {
			const alias = options.alias
			options.uniques.forEach(field => {
				if (findOne[field] == dto[field]) {
					const keyName = alias ? alias[field] || String(field) : String(field)
					throw new BadRequestException(`${keyName}已被占用`)
				}
			})
			return false
		}

		return true
	}

	/**
	 * 构建分页查询
	 * @param pagination 查询条件
	 * @param options 查询配置项
	 * @returns 创建一个已构建基础SQL查询(分页、排序、模糊查询)的查询构建器
	 */
	createPaginateBuilder<P extends Pagination>(
		pagination?: P,
		options?: BasePaginateOptions<T>
	): SelectQueryBuilder<T> {
		const { sort, order, keyword, page, size } = { ...this.withDefaultPagination, ...pagination }

		const skip = (page - 1) * size

		// 创建查询器
		const builder = this.repository.createQueryBuilder()

		if (options) {
			const { likes, append } = options

			// 构建模糊查询
			if (keyword && likes && likes.length) {
				const [first, ...rest] = likes

				builder.where({ [first]: Like(`%${keyword}%`) })

				rest.forEach(field => {
					builder.orWhere({ [field]: Like(`%${keyword}%`) })
				})
			}

			// 追加自定义查询
			if (append) options.append(builder, pagination, options)
		}

		// 构建排序查询
		builder.addOrderBy(sort, order)

		// 分页
		builder.skip(skip).take(size)

		return builder
	}

	/**
	 * 执行分页查询获取结果
	 * @param pagination 查询条件
	 * @param options 查询配置项
	 * @returns
	 */
	async paginate(pagination?: Pagination, options?: BasePaginateOptions<T>) {
		const p = { ...this.withDefaultPagination, ...pagination }

		// 执行查询获取结果
		const [list, total] = await this.createPaginateBuilder(p, options).getManyAndCount()

		return {
			list,
			total,
			page: p.page,
			size: p.size
		}
	}

	/**
	 * 单例查询
	 * @param id 实体ID
	 * @returns 实体
	 */
	async findOne(id: BaseEntity['id']) {
		const data = await this.repository.createQueryBuilder().where({ id }).getOne()

		if (!data) throw new NotFoundException('未找到该条记录')

		return data
	}

	/**
	 * 查询列表(默认使用分页查询)
	 * @returns
	 */
	async findAll(p: Pagination) {
		return await this.paginate(p)
	}

	/**
	 * 创建
	 * @param createDto
	 * @param options
	 * @returns
	 */
	async create(createDto: any, options?: CreateEntityOptions<T>) {
		const { uniques, alias } = options
		// 字段唯一性监测
		const flog = await this.uniqueCheck(createDto, { uniques, alias })

		if (!flog) throw new BadRequestException('实体字段冲突')

		const entity = this.repository.create(createDto) as unknown as T

		return await this.repository.save(entity)
	}

	/**
	 * 更新
	 * @param id
	 * @param updateDto
	 * @param options
	 * @returns
	 */
	async update(id: BaseEntity['id'], updateDto: any, options?: UpdateEntityOptions<T>) {
		const { uniques, alias } = options
		// 字段唯一性监测
		const flog = await this.uniqueCheck({ id, ...updateDto }, { uniques, alias })

		if (!flog) throw new BadRequestException('实体字段冲突')

		const entity = await this.repository.createQueryBuilder().where({ id }).getOne()

		const newEntity = this.repository.merge(entity, updateDto)

		return await this.repository.save(newEntity)
	}

	/**
	 * 删除
	 * @param ids
	 */
	async delete(ids: Array<BaseEntity['id']>) {
		try {
			await this.repository.delete(ids)
		} catch (error) {
			throw new BadRequestException('删除失败，请稍后再试')
		}
	}
}
