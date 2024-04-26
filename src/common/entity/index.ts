import {
	PrimaryGeneratedColumn,
	BeforeUpdate,
	BeforeInsert,
	Column,
	BaseEntity as TypeOrmBaseEntity
} from 'typeorm'
import * as moment from 'moment'

/**
 * @description 基础实体
 */
export abstract class BaseEntity extends TypeOrmBaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	createdAt: string

	@Column()
	updatedAt: string

	@BeforeInsert()
	initDate() {
		this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
		this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
	}

	@BeforeUpdate()
	updateDate() {
		this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
	}
}
