import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { UsersService } from '../base/users/users.service'
import { LoginDto } from './dto/login.dto'
import { User } from '@/modules/base/users/entities/user.entity'
import { MenusService } from '../base/menus'
import { Configuration } from '@/config'
import { IUserAgent } from './auth.interface'
import { LOGIN_FAILED_EVENT, LOGIN_SUCCESS_EVENT } from '@/common/constants'

/**
 * [身份认证](http://nestjs.inode.club/security/authentication)
 */
@Injectable()
export class AuthService {
	constructor(
		private configService: ConfigService<Configuration>,
		private usersService: UsersService,
		private jwtService: JwtService,
		private menusService: MenusService,
		private eventEmitter: EventEmitter2
	) {}

	public async login({ username, password }: LoginDto, userAgent: IUserAgent) {
		const user = await this.usersService.findOneByUsername(username)
		let message = '登录成功'
		if (user == null) {
			message = '用户不存在'
			/**
			 * 登录失败记录日志
			 */
			await this.eventEmitter.emitAsync(LOGIN_FAILED_EVENT, { username, userId: null, message }, userAgent)
			throw new NotFoundException(message)
		}

		// 验证
		const result = await user.passwordMatches(password)

		if (!result) {
			message = '用户名或密码错误'
			/**
			 * 登录失败记录日志
			 */
			await this.eventEmitter.emitAsync(LOGIN_FAILED_EVENT, { username, userId: null, message }, userAgent)
			throw new UnauthorizedException(message)
		}

		delete user.password

		/**
		 * 创建认证 token
		 */
		const { token, expiration } = await this.createToken(user)

		/**
		 * 登录成功记录日志
		 */
		await this.eventEmitter.emitAsync(LOGIN_SUCCESS_EVENT, { username, userId: user.id, message }, userAgent)

		/**
		 * 匹配权限
		 */
		const { menus, perms } = await this.menusService.getMenusByRoles(user.roles)

		return {
			access: {
				expiration,
				token
			},
			perms,
			menus,
			user
		}
	}

	/**
	 * 创建 token
	 * @param param
	 * @returns
	 */
	private async createToken({ username, id, roles, email }: User) {
		const jwtPayload: Payload = {
			username,
			id,
			roles,
			email
		}

		const { duration } = this.configService.get('accessToken', { infer: true })

		return {
			token: this.jwtService.sign(jwtPayload),
			expiration: duration
		}
	}
}
