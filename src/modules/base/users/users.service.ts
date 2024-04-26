import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Brackets } from 'typeorm'
import { User } from './entities/user.entity'
import { defaultConfig } from './users.config'
import { QueryUsersDto, CreateUserDto, UpdateUserDto, ResetPasswordDto } from './dto'

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

	/**
	 * 创建
	 * @param createUserDto
	 * @returns
	 */
	async create(createUserDto: CreateUserDto) {
		const { username, nickname, phone, email } = createUserDto

		await this.checkIfFieldsExist({
			username,
			phone,
			email,
			nickname
		})

		let { password, roles } = createUserDto
		/**
		 * 如果没有传入密码则设置默认密码
		 */
		password = password ? password : defaultConfig.password
		roles = roles && roles.length ? roles : defaultConfig.roles

		// 创建用户
		const user = this.userRepository.create({
			...createUserDto,
			password,
			roles
		})

		// 密码加密
		await user.hashPassword()

		const data = await this.userRepository.save(user)

		delete data.password

		return { user: data }
	}

	async findAll({
		page = 1,
		size = 15,
		sort = 'createdAt',
		order = 'DESC',
		keyword,
		departmentIds,
		status,
		gender
	}: QueryUsersDto): Promise<API.PagingQueryResult<User>> {
		const skip = (page - 1) * size
		const query = this.userRepository.createQueryBuilder('user')

		if (departmentIds && departmentIds.length) {
			query.andWhere('departmentId IN (:...departmentIds)', { departmentIds })
		}

		if (keyword) {
			query.andWhere(
				'username LIKE :username OR name LIKE :name OR nickname LIKE :nickname OR phone LIKE :phone OR email LIKE :email',
				{
					username: '%' + keyword + '%',
					name: '%' + keyword + '%',
					nickname: '%' + keyword + '%',
					phone: '%' + keyword + '%',
					email: '%' + keyword + '%'
				}
			)
		}

		if (status == 0 || status) query.andWhere('status = :status', { status })

		if (gender == 0 || gender) query.andWhere('gender = :gender', { gender })

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
		return await this.userRepository.findOneBy({ id })
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const { username, nickname, phone, email } = updateUserDto
		let { roles } = updateUserDto

		/**
		 * 校验重复
		 */
		await this.checkIfFieldsExist({
			id,
			username,
			phone,
			email,
			nickname
		})

		roles = roles && roles.length ? roles : defaultConfig.roles
		const user = await this.userRepository.findOneBy({ id })
		const newUser = this.userRepository.merge(user, { ...updateUserDto, roles })
		if (updateUserDto.password) await newUser.hashPassword()
		const result = await this.userRepository.save(newUser)
		delete result.password
		return result
	}

	async remove(ids: number[]) {
		try {
			await this.userRepository.delete(ids)
		} catch (error) {
			return new BadRequestException('删除失败')
		}
	}

	async findOneByUsername(username: string) {
		const query = this.userRepository
			.createQueryBuilder('user')
			.andWhere('user.username = :username', { username })
			.addSelect('user.password')
		return await query.getOne()
	}

	async resetPass(id: number, rest: ResetPasswordDto) {
		const { password } = rest

		const user = await this.userRepository.findOneBy({ id })
		const mergUser = this.userRepository.merge(user, { password })
		await mergUser.hashPassword()

		this.userRepository.save(mergUser)
		delete mergUser.password
	}

	/**
	 * @description 检查字段是否存在冲突(更新/创建)
	 * @param param
	 */
	private async checkIfFieldsExist({
		id,
		username,
		nickname,
		email,
		phone
	}: {
		id?: number
		username: string
		nickname: string
		email?: string
		phone?: string
	}) {
		const personQuery = this.userRepository.createQueryBuilder('user').where(
			new Brackets(qb => {
				qb.where('user.username = :username', { username }).orWhere('user.nickname = :nickname', {
					nickname
				})

				if (phone) qb.orWhere('user.phone = :phone', { phone })
				if (email) qb.orWhere('user.email = :email', { email })
			})
		)

		if (id) personQuery.andWhere('user.id != :id', { id })

		const findPerson = await personQuery.getOne()

		if (findPerson) {
			if (findPerson.username == username) throw new BadRequestException('用户名已被占用')
			if (findPerson.nickname == nickname) throw new BadRequestException('昵称已被占用')
			if (findPerson.phone == phone) throw new BadRequestException('手机号名已被占用')
			if (findPerson.email == email) throw new BadRequestException('邮箱已被占用')
		}
	}
}
