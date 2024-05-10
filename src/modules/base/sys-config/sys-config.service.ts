import { Injectable } from '@nestjs/common'
import { CoolCRUDService } from '@/common/crud'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { SysConfig } from './sys-config.entity'

@Injectable()
export class SysConfigService extends CoolCRUDService<SysConfig> {
	constructor(@InjectRepository(SysConfig) private readonly sysConfigRepo: Repository<SysConfig>) {
		super(sysConfigRepo)
	}
}
