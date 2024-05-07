import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@/common/entity'

@Entity({
	name: 'dicts',
	comment: '字典表'
})
export class Dict extends BaseEntity {
	@Column({ unique: true, comment: '字典名' })
	name: string

	@Column({ default: 0, comment: '序号' })
	orderNum: number

	@Column({ nullable: true, default: null, comment: '父ID' })
	pId: number

	@Column({ nullable: true, default: null, comment: '备注', length: 200 })
	remark: string

	@Column({ comment: '类型ID' })
	typeId: number

	@Column({ comment: '值' })
	value: string
}
