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

	async create(createDictDto: CreateDictTypeDto) {
		await this.uniqueCheck(createDictDto, {
			uniques: ['name', 'key'],
			alias: { name: '字典类型名称', key: '字典类型 key' }
		})

		const type = this.repo.create(createDictDto)

		return await this.repo.save(type)
	}
}
