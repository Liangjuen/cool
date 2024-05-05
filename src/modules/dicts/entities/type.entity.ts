import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@/common/entity'

@Entity({
	name: 'dict_types',
	comment: '字典类型表'
})
export class DictType extends BaseEntity {
	@Column({ unique: true })
	name: string

	@Column({ unique: true })
	key: string

	@Column({
		type: 'boolean',
		default: false,
		select: false
	})
	isDel: boolean
}
