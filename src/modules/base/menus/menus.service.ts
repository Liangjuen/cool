import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Brackets, In } from 'typeorm'
import { Menu } from './entities/menu.entity'
import { CreateMenuDto, UpdateMenuDto, QueryMenusDto } from './dto'
import { MenuCache, MenuHidden, MenuType } from './menus.type'
import { ROLE } from '@/common/enums'
import { RoleService } from '../roles'

@Injectable()
export class MenusService {
	constructor(
		@InjectRepository(Menu) private menuRepository: Repository<Menu>,
		private readonly roleService: RoleService
	) {}

	async create(createMenuDto: CreateMenuDto) {
		await this.checkIfFieldsExist({ name: createMenuDto.name })

		const data = await this.useValid(createMenuDto.type, createMenuDto)

		const menu = this.menuRepository.create(data)

		return await this.menuRepository.save(menu)
	}

	async findAll({
		page = 1,
		size = 15,
		sort = 'createdAt',
		order = 'DESC',
		keyword,
		status,
		type
	}: QueryMenusDto): Promise<API.PagingQueryResult<Menu>> {
		const skip = (page - 1) * size
		const query = this.menuRepository.createQueryBuilder('menu')

		if (keyword) {
			query.andWhere('name LIKE :name', { name: '%' + keyword + '%' })
		}

		if (status == 0 || status) query.andWhere('status = :status', { status })

		if (type) query.andWhere('type = :type', { type })

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
		return await this.menuRepository.findOneBy({ id })
	}

	async update(id: number, updateMenuDto: UpdateMenuDto) {
		await this.checkIfFieldsExist({ id, name: updateMenuDto.name })

		const data = await this.useValid(updateMenuDto.type, updateMenuDto)

		const menu = await this.menuRepository.findOneBy({ id })

		const newMenu = this.menuRepository.merge(menu, data)

		return await this.menuRepository.save(newMenu)
	}

	async remove(ids: number[]) {
		try {
			await this.menuRepository.delete(ids)
		} catch (error) {
			return new BadRequestException('删除失败')
		}
	}

	/**
	 * @description 检查字段是否存在冲突(更新/创建)
	 * @param param
	 */
	private async checkIfFieldsExist({ id, name }: { id?: number; name: string }) {
		const entityQuery = this.menuRepository.createQueryBuilder('entity').where(
			new Brackets(qb => {
				qb.where('entity.name = :name', { name })
			})
		)

		if (id) entityQuery.andWhere('entity.id != :id', { id })

		const findEntity = await entityQuery.getOne()

		if (findEntity) {
			if (findEntity.name == name && findEntity.type !== MenuType.permission) {
				throw new BadRequestException(`节点名 ${name} 已被占用`)
			}
		}
	}

	/**
	 * 参数有效化
	 * @param type
	 * @param params
	 * @returns
	 */
	private async useValid(type: MenuType, params: CreateMenuDto | UpdateMenuDto) {
		let data: CreateMenuDto | UpdateMenuDto
		if (type == MenuType.directory) {
			data = {
				...params,
				perms: null,
				path: null,
				component: null,
				cache: MenuCache.on,
				hidden: MenuHidden.on
			}
		} else if (type == MenuType.view) {
			data = {
				...params,
				perms: null
			}
		} else {
			data = {
				...params,
				path: null,
				component: null,
				cache: MenuCache.on,
				hidden: MenuHidden.on
			}
		}
		return data
	}

	/**
	 * 通过角色获取菜单列表
	 */
	async getMenusByRoles(roleCodes: string[]) {
		let menus: Menu[] = []
		// 判断是否为超管
		if (roleCodes.includes(ROLE.Admin)) {
			menus = await this.menuRepository.find({
				order: { sort: 'ASC' }
			})
		} else {
			const menuIds = await this.roleService.getRolesMenusByCodes(roleCodes)
			menus = await this.menuRepository.find({ where: { id: In(menuIds) } })
		}

		const perms = []

		menus.filter(m => m.type == MenuType.permission).forEach(i => perms.push(...i.perms))

		return {
			menus,
			perms
		}
	}
}
