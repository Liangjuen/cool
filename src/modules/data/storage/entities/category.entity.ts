import { Entity, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@/common/entity'

@Entity({ name: 'storage_categories' })
export class StorageCategory extends BaseEntity {
	@Column({ comment: '分类名' })
	@ApiProperty({ description: '分类名' })
	name: string

	@Column({ comment: '父分类ID', type: 'tinyint', nullable: true })
	@ApiProperty({ description: '父分类ID' })
	pId: number
}
