import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CoolCRUDService } from '@/common/crud'
import { StorageCategory } from '../entities'

@Injectable()
export class StorageCateService extends CoolCRUDService<StorageCategory> {
	constructor(
		@InjectRepository(StorageCategory) private readonly repo: Repository<StorageCategory>
	) {
		super(repo)
	}
}
