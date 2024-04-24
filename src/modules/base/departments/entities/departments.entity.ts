import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@/common/entity'

@Entity()
export class Departments extends BaseEntity {
	@Column({ comment: '部门名称' })
	name: string

	@Column({ comment: '上级部门ID', nullable: true })
	pId: number

	@Column({ comment: '排序', default: 0 })
	orderNum: number
}
