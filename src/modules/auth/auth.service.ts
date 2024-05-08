import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../base/users/users.service'
import { User } from '@/modules/base/users/entities/user.entity'
import { MenusService } from '../base/menus'
import { Configuration } from '@/config'

/**
 * [身份认证](http://nestjs.inode.club/security/authentication)
 */
@Injectable()
export class AuthService {
	constructor(
		private configService: ConfigService<Configuration>,
		private usersService: UsersService,
		private jwtService: JwtService,
		private menusService: MenusService
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
