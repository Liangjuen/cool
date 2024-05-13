import { Entity, Column, Index } from 'typeorm'
import { BaseEntity } from '@/common/entity'
import { Status } from '@/common/enums'
import { MenuCache, MenuHidden, MenuType } from '../menus.type'

@Entity('menus')
export class Menu extends BaseEntity {
	@Index({ unique: true })
	@Column({ default: '' })
	name: string

	@Column({
		type: 'simple-array',
		comment: '权限标识仅在type为权限时指定',
		default: null,
		nullable: true
	})
	perms?: string[]

	@Column({ nullable: true, default: null })
	pid?: number

	@Column({
		type: 'enum',
		enum: MenuType,
		default: MenuType.directory
	})
	type: MenuType

	@Column({ default: null, nullable: true })
	path?: string

	@Column({ default: null, nullable: true })
	component?: string

	@Column({ default: null, nullable: true })
	icon?: string

	@Column({ default: 0 })
	sort: number

	@Column({
		type: 'enum',
		enum: MenuCache,
		default: MenuCache.on
	})
	cache: MenuCache

	@Column({
		type: 'enum',
		enum: MenuHidden,
		default: MenuHidden.on
	})
	hidden: MenuHidden

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.normal
	})
	status: Status
}
