import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@/common/entity'
import { Status } from '@/common/enums'

@Entity({
	name: 'roles',
	comment: '角色表'
})
export class Role extends BaseEntity {
	@Column({ unique: true })
	name: string

	@Column({ unique: true })
	code: string

	@Column({ type: 'simple-array' })
	menuIdList: number[]

	@Column({ type: 'simple-array' })
	perms: string[]

	@Column({ default: '', nullable: true })
	remark: string

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.normal
	})
	status: Status
}
