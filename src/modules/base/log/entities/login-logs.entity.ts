import { Entity, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@/common/entity'

export enum LoginState {
	/** 失败 */
	failed = 0,
	/**成功 */
	success
}

@Entity({
	name: 'login_logs',
	schema: '登录日志'
})
export class LoginLogs extends BaseEntity {
	@ApiProperty({ description: 'IP' })
	@Column({ length: 32 })
	ip: string

	@ApiProperty({ description: '用户ID' })
	@Column({ nullable: true })
	userId: number

	@ApiProperty({ description: '用户名' })
	@Column({ nullable: true })
	username: string

	@ApiProperty({ description: '是否为移动端' })
	@Column({ type: 'boolean', default: false })
	isMobile: boolean

	@ApiProperty({ description: '操作信息' })
	@Column({ default: '', nullable: true })
	message: string

	@ApiProperty({ description: '浏览器' })
	@Column({ default: '', nullable: true })
	browser: string

	@ApiProperty({ description: '操作系统' })
	@Column({ default: '', nullable: true })
	os: string

	@ApiProperty({ description: '状态' })
	@Column({
		type: 'enum',
		enum: LoginState,
		default: LoginState.success
	})
	loginState: LoginState

	@ApiProperty({ description: '登录地点' })
	@Column({ default: '', nullable: true })
	ipAddr: string
}
