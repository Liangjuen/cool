import { Entity, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@/common/entity'

@Entity({
	name: ' sys_config',
	comment: '系统配置'
})
export class SysConfig extends BaseEntity {
	@ApiProperty({ description: '配置名' })
	@Column({ unique: true, type: 'varchar', length: 50, comment: '配置名' })
	name: string

	@ApiProperty({ description: '配置键' })
	@Column({ unique: true, type: 'varchar', length: 50, comment: '配置键' })
	key: string

	@ApiProperty({ description: '配置值' })
	@Column({ type: 'varchar', nullable: true, comment: '配置值' })
	value?: string

	@ApiProperty({ description: '备注' })
	@Column({ type: 'varchar', nullable: true, comment: '备注' })
	remark?: string
}
