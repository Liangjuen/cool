import { Injectable, Inject } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { RoleCacheService } from '../cache'
import { ROLE_CHANGED_EVENT } from '@/common/constants'

@Injectable()
export class RoleChangedListener {
	constructor(private readonly roleCacheService: RoleCacheService) {}

	/**
	 * 角色更新监听
	 */
	@OnEvent(ROLE_CHANGED_EVENT)
	async handleRoleChangedEvent() {
		await this.roleCacheService.setCache()
	}
}
