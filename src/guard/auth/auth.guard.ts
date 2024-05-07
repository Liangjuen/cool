import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { IS_PUBLIC_KEY, USERPAYLOAD } from '@/common/constants'

/**
 * 身份认证守卫
 */
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private configService: ConfigService,
		private jwtService: JwtService,
		private reflector: Reflector
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		// 获取(是否为开放接口)元信息
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])

		// 是公开接口标识 放行
		if (isPublic) return true

		// 校验token
		const request = context.switchToHttp().getRequest<Request>()
		const token = this.extractTokenFromHeader(request)
		if (!token) {
			throw new UnauthorizedException()
		}

		try {
			const payload = await this.jwtService.verifyAsync<Payload>(token, {
				secret: this.configService.get<ENV.AccessToken>('accessToken').secret
			})
			// 💡 挂载 payload 以便后续访问
			request[USERPAYLOAD] = payload
		} catch {
			throw new UnauthorizedException('身份认证未通过')
		}

		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
