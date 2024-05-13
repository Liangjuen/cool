import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'
import { IsRemark } from '@/common/validation'

export class CreateSysConfigDto {
	@ApiProperty({ description: '配置名' })
	@IsNotEmpty({ message: '配置名不能为空' })
	@IsString()
	@MaxLength(50, { message: '配置名长度最大不得超过 50 ' })
	name: string

	@ApiProperty({ description: '配置键' })
	@IsNotEmpty({ message: '配置键不能为空' })
	@IsString()
	@MaxLength(50, { message: '配置键长度最大不得超过 50' })
	key: string

	@ApiProperty({ description: '配置值' })
	@IsString()
	value?: string

	@ApiProperty({ description: '备注' })
	@IsOptional()
	@IsString()
	@IsRemark({ message: '备注长度超过限制' })
	remark?: string
}

export class UpdateSysConfigDto extends PartialType(CreateSysConfigDto, {
	skipNullProperties: false
}) {}
