import { Entity, Column, Index } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@/common/entity'

@Entity({ name: 'storages' })
export class Storage extends BaseEntity {
	@Column({ type: 'varchar', length: 100, comment: '文件名' })
	@ApiProperty({ description: '文件名' })
	name: string

	@Column({ comment: '地址' })
	@ApiProperty({ description: '地址' })
	url: string

	@Column({ type: 'varchar', length: 100, nullable: true, comment: '文件路径' })
	@ApiProperty({ description: '文件路径', nullable: true })
	path: string

	@Column({ comment: '分类ID', nullable: true })
	@ApiProperty({ description: '分类ID', nullable: true })
	cateId?: number

	@Column({ comment: '类型', nullable: true })
	@ApiProperty({ description: '类型', nullable: true })
	type?: string

	@Column({ comment: '扩展名', nullable: true })
	@ApiProperty({ description: '扩展名', nullable: true })
	ext?: string

	@Column({ comment: '文件大小', nullable: true })
	@ApiProperty({ description: '文件大小', nullable: true })
	size?: string

	@Column({ comment: '上传用户ID', nullable: true })
	@ApiProperty({ description: '上传用户ID', nullable: true })
	userId?: number
}
