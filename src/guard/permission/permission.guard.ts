import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { PERMISSION_GUARD_METADATA_KEY, IS_PUBLIC_KEY } from '@/common/constants'
import { RoleCacheService } from '@/modules/base/roles/cache'
import { ROLE } from '@/common/enums'

/**
 * 接口权限守卫
 */
@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private roleCacheService: RoleCacheService
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		// 获取(是否为开放接口)元信息
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])

		// 是公开接口标识 放行 使用 Public 装饰器优先级最高
		if (isPublic) return true

		const permission = this.reflector.get<string[]>(
			PERMISSION_GUARD_METADATA_KEY,
			context.getHandler()
		)

		const payload: Payload = context.switchToHttp().getRequest<Request>()['user']

		// 超管放行
		if (payload.roles.includes(ROLE.Admin)) return true

		// 获取角色权限列表
		const rolePerms = await this.roleCacheService.getCache()

		// 查看当前权限控制点是否在角色权限列表中

		return !!payload.roles.find(r => rolePerms[r] && rolePerms[r].includes(permission))
	}
}
