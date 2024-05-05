import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DictType } from './entities/type.entity'
import { CoolCRUDService } from '@/common/crud'
import { CreateDictTypeDto } from './dto'

@Injectable()
export class DictTypeService extends CoolCRUDService<DictType> {
	constructor(@InjectRepository(DictType) private readonly repo: Repository<DictType>) {
		super(repo)
	}
}
