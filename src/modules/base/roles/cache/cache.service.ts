import { Injectable, LoggerService, Inject, Logger } from '@nestjs/common'
import { RedisCacheService } from '@/globalModules'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '../entities/role.entity'
import { Status } from '@/common/enums'

@Injectable()
export class RoleCacheService {
	constructor(
		@InjectRepository(Role) private readonly roleRepository: Repository<Role>,
		private readonly redisCacheService: RedisCacheService,
		@Inject(Logger) private readonly loggerService: LoggerService
	) {}

	public readonly key = 'admin:perms'

	/**
	 * 设置角色缓存
	 */
	async setCache() {
		try {
			const roles = await this.roleRepository.find({
				select: ['code', 'perms', 'status']
			})

			const rolePerms = {}

			for (const role of roles) {
				if (role.status == Status.normal) rolePerms[role.code] = role.perms
			}

			return await this.redisCacheService.set(this.key, rolePerms, -1)
		} catch (error) {
			this.loggerService.error('role 缓存错误', 'Role:Cache:Service')
		}
	}

	/**
	 *删除角色缓存
	 */
	async delCache() {
		try {
			return await this.redisCacheService.del(this.key)
		} catch (error) {
			this.loggerService.error('清除 role 缓存错误', 'Role:Cache:Service')
		}
	}

	/**
	 * 获取角色缓存信息
	 * @returns
	 */
	async getCache() {
		return await this.redisCacheService.get<any>(this.key)
	}
}
