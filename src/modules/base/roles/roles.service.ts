import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Repository, Brackets, In } from 'typeorm'
import { Role } from './entities/role.entity'
import { QueryRolesDto, CreateRoleDto, UpdateRoleDto } from './dto'
import { ROLE_CHANGED_EVENT } from '@/common/constants'

@Injectable()
export class RoleService {
	constructor(
		@InjectRepository(Role) private roleRepository: Repository<Role>,
		private eventEmitter: EventEmitter2
	) {}

	async create(createRoleDto: CreateRoleDto) {
		const { name, code } = createRoleDto
		await this.checkIfFieldsExist({ name, code })
		const role = this.roleRepository.create(createRoleDto)

		// 通知缓存更新
		await this.eventEmitter.emitAsync(ROLE_CHANGED_EVENT)

		return await this.roleRepository.save(role)
	}

	async findAll({
		page = 1,
		size = 15,
		sort = 'createdAt',
		order = 'DESC',
		keyword,
		status
	}: QueryRolesDto) {
		const skip = (page - 1) * size
		const query = this.roleRepository.createQueryBuilder('role')

		if (keyword) {
			query.andWhere('name LIKE :name OR code LIKE :code', {
				name: '%' + keyword + '%',
				code: '%' + keyword + '%'
			})
		}

		if (status == 0 || status) query.andWhere('status = :status', { status })

		query.addOrderBy(sort, order)

		const [result, total] = await query.skip(skip).take(size).getManyAndCount()

		return {
			list: result,
			total,
			page,
			size
		}
	}

	findOne(id: number) {
		return this.roleRepository.findOneBy({ id })
	}

	async update(id: number, updateRoleDto: UpdateRoleDto) {
		const { name, code } = updateRoleDto

		await this.checkIfFieldsExist({ name, code, id })

		const role = await this.roleRepository.findOneBy({ id })
		const newRole = this.roleRepository.merge(role, updateRoleDto)

		// 通知缓存更新
		await this.eventEmitter.emitAsync(ROLE_CHANGED_EVENT)

		return await this.roleRepository.save(newRole)
	}

	async remove(ids: number[]) {
		await this.roleRepository.delete(ids)
	}

	/**
	 * @description 检查字段是否存在冲突(更新/创建)
	 * @param param
	 */
	private async checkIfFieldsExist({
		id,
		name,
		code
	}: {
		id?: number
		name: string
		code: string
	}) {
		const entityQuery = this.roleRepository.createQueryBuilder('entity').where(
			new Brackets(qb => {
				qb.where('entity.name = :name', { name }).orWhere('entity.name = :name', {
					name
				})

				if (code) qb.orWhere('entity.code = :code', { code })
			})
		)

		if (id) entityQuery.andWhere('entity.id != :id', { id })

		const entity = await entityQuery.getOne()

		if (entity) {
			if (entity.name == name) throw new BadRequestException('角色名称已被占用')
			if (entity.code == code) throw new BadRequestException('编码已被占用')
		}
	}

	/**
	 * 根据角色 `code` 获取角色 `menuIdList`
	 * @param codes 角色编码
	 * @returns
	 */
	public async getRolesMenusByCodes(codes: string[]) {
		const roles = await this.roleRepository.find({
			select: ['menuIdList'],
			where: { code: In(codes) }
		})
		const menuIds: number[] = []
		roles.forEach(r => menuIds.push(...r.menuIdList))
		return menuIds
	}
}
