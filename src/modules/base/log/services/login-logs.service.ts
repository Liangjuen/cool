import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { LoginLogs } from '../entities/login-logs.entity'
import { CoolCRUDService, CreateEntityOptions } from '@/common/crud'

/**
 * 登录日志服务
 */
@Injectable()
export class LoginLogsService extends CoolCRUDService<LoginLogs> {
	constructor(@InjectRepository(LoginLogs) private readonly repo: Repository<LoginLogs>) {
		super(repo)
	}
}
