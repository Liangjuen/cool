import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@/common/entity'
import { Status } from '@/common/enums'

@Entity('roles')
export class Role extends BaseEntity {
	@Column({ unique: true })
	name: string

	@Column({ unique: true })
	code: string

	@Column({ type: 'simple-array', nullable: true, default: null })
	menuIdList: number[]

	@Column({ type: 'simple-array', nullable: true, default: null })
	perms: string[]

	@Column({ default: null, nullable: true })
	remark?: string

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.normal
	})
	status: Status
}
