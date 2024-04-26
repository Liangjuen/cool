import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { RoleCacheService } from '@/modules/base/roles/cache/cache.service'

@Injectable()
export class AppService implements OnApplicationBootstrap {
	constructor(private readonly roleCacheService: RoleCacheService) {}

	/**
	 * 应用初始化完成执行
	 */
	onApplicationBootstrap() {
		this.roleCacheService.setCache()
	}

	getHello(): string {
		return 'Hello World!'
	}
}
