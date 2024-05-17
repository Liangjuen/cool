import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Between, Like, In } from 'typeorm'

import { CoolCRUDService } from '@/common/crud'
import { Configuration } from '@/config'
import { User } from '@/modules/base/users/entities/user.entity'
import { Storage } from '../entities'
import { PaginateStorageDto } from '../dto'
import { deleteFile } from '@/common/utils'
import { UPLOAD_DIRNAME } from '@/common/constants'

@Injectable()
export class StorageService extends CoolCRUDService<Storage> {
	constructor(
		@InjectRepository(Storage) private readonly storageRepo: Repository<Storage>,
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly configService: ConfigService<Configuration>
	) {
		super(storageRepo)
	}

	/**
	 * 查询列表
	 * @param dto
	 * @returns
	 */
	async list(dto: PaginateStorageDto) {
		const {
			cateId,
			time,
			username,
			size = 15,
			page = 1,
			keyword,
			sort = 'createdAt',
			order = 'DESC'
		} = dto

		const queryBuilder = this.storageRepo
			.createQueryBuilder('storage')
			.leftJoinAndSelect('base_sys_users', 'user', 'storage.userId = user.id')
			.where({
				...(cateId && { cateId }),
				...(keyword && { name: Like(`%${keyword}%`) }),
				...(keyword && { alias: Like(`%${keyword}%`) }),
				...(keyword && { type: Like(`%${keyword}%`) }),
				...(keyword && { ext: Like(`%${keyword}%`) }),
				...(time?.length > 1 && { createdAt: Between(time[0], time[1]) }),
				...(username && { userId: (await this.userRepo.findOneBy({ username }))?.id || null })
			})
			.orderBy(`storage.${sort}`, order)

		return await this.paginateBuilder(queryBuilder, { page, size })
	}

	/**
	 * 删除指定的本地资源
	 * @param ids
	 */
	async delete(ids: number[]): Promise<void> {
		const files = await this.storageRepo.findBy({ id: In(ids) })
		const { dirname = UPLOAD_DIRNAME } = this.configService.get('upload', { infer: true })
		// 删除本地存储的文件
		files.forEach(async file => {
			if (!file.path) return
			deleteFile(`${dirname}/${file.path}`)
		})

		await this.storageRepo.delete(ids)
	}

	/**
	 * 移动到指定分类下
	 * @param ids
	 * @param cateId
	 */
	async move(ids: number[], cateId: number) {
		await this.storageRepo.update(ids, { cateId })
	}
}
