import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { PERMISSION_GUARD_METADATA_KEY } from '@/common/constants'
import { RoleCacheService } from '@/modules/base/roles/cache'
import { ROLE } from '@/common/enums'

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private roleCacheService: RoleCacheService
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const permission = this.reflector.get<string[]>(
			PERMISSION_GUARD_METADATA_KEY,
			context.getHandler()
		)

		const payload: Payload = context.switchToHttp().getRequest<Request>()['user']

		// 超管放行
		if (payload.roles.includes(ROLE.Admin)) return true

		console.log(payload)

		// 获取角色权限列表
		const rolePerms = await this.roleCacheService.getCache()

		let isAuth = false

		// 查看当前权限控制点是否在角色权限列表中
		payload.roles.forEach(r => {
			if (rolePerms[r]) {
				if (isAuth) return
				isAuth = rolePerms[r].includes(permission)
			}
		})

		return isAuth
	}
}
