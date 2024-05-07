import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'

export class CreateStorageCateDto {
	@ApiProperty({ description: '分类名' })
	@IsNotEmpty({ message: '名称为必填项' })
	@Length(1, 50, { message: '分类名长度在 1 - 50' })
	@IsString()
	name: string

	@ApiProperty({ description: '分类父ID' })
	@IsOptional()
	@IsInt()
	pId?: number
}

export class UpdateStorageCateDto extends PartialType(CreateStorageCateDto) {}
