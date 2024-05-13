import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Brackets } from 'typeorm'
import { Department } from './entities/department.entity'
import { PaginateDto } from '@/common/dto'
import { CreateDepartmentDto } from './dto/create-department.dto'
import { UpdateDepartmentDto } from './dto/update-department.dto'

@Injectable()
export class DepartmentsService {
	constructor(
		@InjectRepository(Department) private readonly departRepository: Repository<Department>
	) {}

	async create(createDepartmentDto: CreateDepartmentDto) {
		const { name, pId, orderNum } = createDepartmentDto

		await this.checkIfFieldsExist({ name })

		const depart = this.departRepository.create({
			name,
			pId,
			orderNum: orderNum == null ? 0 : orderNum
		})

		return await this.departRepository.save(depart)
	}

	async findAll({
		page = 1,
		size = 15,
		sort = 'createdAt',
		order = 'DESC',
		keyword
	}: PaginateDto): Promise<API.PaginateResponse<Department>> {
		const skip = (page - 1) * size
		const query = this.departRepository.createQueryBuilder('depart')

		if (keyword) {
			query.andWhere('name LIKE :name', { name: '%' + keyword + '%' })
		}

		query.addOrderBy(sort, order)
		const [result, total] = await query.skip(skip).take(size).getManyAndCount()

		return {
			list: result,
			total,
			page,
			size
		}
	}

	async findOne(id: number) {
		return await this.departRepository.findOneBy({ id })
	}

	async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
		const { name, orderNum } = updateDepartmentDto

		await this.checkIfFieldsExist({ id, name })

		const depart = await this.departRepository.findOneBy({ id })
		if (!depart) throw new BadRequestException('未查询到该部门')

		const newDepart = this.departRepository.merge(depart, {
			...updateDepartmentDto,
			orderNum: orderNum == null ? 0 : orderNum
		})

		return await this.departRepository.save(newDepart)
	}

	async remove(ids: number[]) {
		try {
			await this.departRepository.delete(ids)
		} catch (error) {
			return new BadRequestException('删除失败')
		}
	}

	/**
	 * @description 检查字段是否存在冲突(更新/创建)
	 * @param param
	 */
	private async checkIfFieldsExist({ id, name }: { id?: number; name: string }) {
		const departQuery = this.departRepository.createQueryBuilder('depart').where(
			new Brackets(qb => {
				qb.where('depart.name = :name', { name })
			})
		)

		if (id) departQuery.andWhere('depart.id != :id', { id })

		const findDepart = await departQuery.getOne()

		if (findDepart) {
			if (findDepart.name == name) throw new BadRequestException('部门名已被占用')
		}
	}
}
