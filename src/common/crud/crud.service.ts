import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { SelectQueryBuilder, Like, Repository, Brackets, DeepPartial } from 'typeorm'
import {
	Pagination,
	BasePaginateOptions,
	UniqueCheckOptions,
	CreateEntityOptions,
	UpdateEntityOptions,
	PaginationOptions,
	BaseLikeQueryOptions
} from './crud.interface'
import { BaseEntity } from '@/common/entity'

import { paginateBuilderHelper } from '@/common/helper'

@Injectable()
export abstract class CoolCRUDService<T> {
	constructor(readonly repository: Repository<T>) {}

	/**
	 * 默认查询条件
	 */
	readonly withDefaultPagination: Pagination = {
		page: 1,
		size: 10,
		sort: 'createdAt',
		order: 'DESC'
	}

	/**
	 * 在创建或更新前验证字段值的唯一性，可以在子类中重写实现，在创建/更新时自动执行，如果未通过则会抛出 BadRequestException 错误，也可以直接在实现中抛出错误，定义错误信息
	 * @param dto
	 * @param options 校验配置
	 */
	async uniqueCheck(dto: any, options?: UniqueCheckOptions<T>) {
		if (!options || !options.uniques) return true

		const builder = this.repository.createQueryBuilder().where(
			new Brackets(qb => {
				options.uniques.forEach(field => {
					qb.orWhere({ [field]: dto[field] })
				})
			})
		)

		if (dto.id) builder.andWhere('id !=:id', { id: dto.id })

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
	 * 构建模糊查询语句
	 * @param options
	 * @param queryBuilder
	 * @returns
	 */
	protected baseLikeBuilder(
		options?: BaseLikeQueryOptions<T>,
		queryBuilder?: SelectQueryBuilder<T>
	): SelectQueryBuilder<T> {
		const builder = queryBuilder ? queryBuilder : this.repository.createQueryBuilder()

		const { keyword, likes } = options || {}

		// 构建模糊查询语句
		if (keyword && likes && likes.length) {
			const [first, ...rest] = likes

			builder.where({ [first]: Like(`%${keyword}%`) })

			rest.forEach(field => {
				builder.orWhere({ [field]: Like(`%${keyword}%`) })
			})
		}

		return builder
	}

	/**
	 * 分页查询 返回结果
	 * @param queryBuilder
	 * @param options
	 * @returns
	 */
	protected async paginateBuilder(
		queryBuilder?: SelectQueryBuilder<T>,
		options?: PaginationOptions
	): Promise<API.PaginateResponse<T>> {
		const query = queryBuilder ? queryBuilder : this.repository.createQueryBuilder()

		const { size, page } = { ...this.withDefaultPagination, ...options }

		return await paginateBuilderHelper<T>(query, { size, page })
	}

	/**
	 * 执行分页查询获取结果
	 * @param pagination 查询条件
	 * @param options 查询配置项
	 * @returns
	 */
	async paginate(pagination?: Pagination, options?: BasePaginateOptions<T>) {
		const { likes } = options || {}

		const { size, page, keyword, order, sort } = { ...this.withDefaultPagination, ...pagination }

		const queryBuilder = this.baseLikeBuilder({ keyword, likes }).orderBy(sort, order)

		return await this.paginateBuilder(queryBuilder, { page, size })
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
	async create(createDto: DeepPartial<T>, options?: CreateEntityOptions<T>) {
		const { uniques, alias } = options || {}
		// 字段唯一性监测
		if (uniques && uniques.length) {
			const flog = await this.uniqueCheck(createDto, { uniques, alias })

			if (!flog) throw new BadRequestException('实体字段冲突')
		}

		const entity = this.repository.create(createDto)

		return await this.repository.save(entity)
	}

	/**
	 * 更新
	 * @param id
	 * @param updateDto
	 * @param options
	 * @returns
	 */
	async update(id: BaseEntity['id'], updateDto: DeepPartial<T>, options?: UpdateEntityOptions<T>) {
		const { uniques, alias } = options
		// 字段唯一性监测
		if (uniques && uniques.length) {
			const flog = await this.uniqueCheck({ id, ...updateDto }, { uniques, alias })

			if (!flog) throw new BadRequestException('实体字段冲突')
		}

		const entity = await this.repository.createQueryBuilder().where({ id }).getOne()

		if (!entity) throw new BadRequestException('更新失败, 未查询到该实体')

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
