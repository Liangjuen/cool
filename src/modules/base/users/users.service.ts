import { Injectable, BadRequestException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Brackets } from 'typeorm'
import { Users } from './entities/users.entity'
import { defaultConfig } from './users.config'

@Injectable()
export class UsersService {
	constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>) {}

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

	findAll() {}

	async findOne(id: number) {
		return await this.userRepository.findOneBy({ id })
	}

	update(id: number, updateUserDto: UpdateUserDto) {}

	remove(id: number) {}

	async findOneByUsername(username: string) {
		const query = this.userRepository
			.createQueryBuilder('user')
			.andWhere('user.username = :username', { username })
			.addSelect('user.password')
		return await query.getOne()
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
