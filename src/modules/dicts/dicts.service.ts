import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CoolCRUDService } from '@/common/crud'
import { Dict } from './entities/dict.entity'

@Injectable()
export class DictsService extends CoolCRUDService<Dict> {
	constructor(@InjectRepository(Dict) private readonly repo: Repository<Dict>) {
		super(repo)
	}
}
