import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../base/users/users.service'
import { Users } from '@/modules/base/users/entities/users.entity'

/**
 * [身份认证](http://nestjs.inode.club/security/authentication)
 */
@Injectable()
export class AuthService {
	constructor(
		private configService: ConfigService,
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	public async login(username: string, password: string) {
		const user = await this.usersService.findOneByUsername(username)
		let message = '登录成功'
		if (user == null) {
			message = '未查询到用户'
			return new NotFoundException(message)
		}

		const result = await user.passwordMatches(password)

		if (!result) {
			message = '用户名或密码错误'
			throw new UnauthorizedException(message)
		}

		const { token, expiration } = await this.createToken(user)

		delete user.password

		return {
			access: {
				expiration,
				token
			},
			user
		}
	}

	/**
	 * 创建 token
	 * @param param
	 * @returns
	 */
	private async createToken({ username, id, roles, email }: Users) {
		const jwtPayload: Payload = {
			username,
			id,
			roles,
			email
		}

		const { duration } = this.configService.get<ENV.AccessToken>('accessToken')

		return {
			token: this.jwtService.sign(jwtPayload),
			expiration: duration
		}
	}
}
