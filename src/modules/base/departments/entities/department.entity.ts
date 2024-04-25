import { Entity, Column, Index } from 'typeorm'
import { BaseEntity } from '@/common/entity'

@Entity('departments')
export class Department extends BaseEntity {
	@Index({ unique: true })
	@Column({ comment: '部门名称' })
	name: string

	@Column({ comment: '上级部门ID', nullable: true })
	pId: number

	@Column({ comment: '排序', default: 0 })
	orderNum: number
}
