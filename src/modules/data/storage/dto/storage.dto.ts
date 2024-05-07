import { IsInt, IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { PaginateDto } from '@/common/dto'

export class CreateStorageDto {
	@ApiProperty({ description: '文件名' })
	@IsNotEmpty()
	name: string

	@ApiProperty({ description: '地址' })
	@IsNotEmpty()
	url: string

	@ApiProperty({ description: '创建者ID' })
	@IsNotEmpty()
	@IsInt()
	userId: number

	@ApiProperty({ description: '文件路径' })
	@IsNotEmpty()
	@IsString()
	path: string

	@ApiProperty({ description: '分类ID', nullable: true })
	@IsOptional()
	@IsInt()
	cateId: number

	@ApiProperty({ description: '类型', nullable: true })
	@IsOptional()
	@IsString()
	type: string

	@ApiProperty({ description: '扩展名' })
	@IsOptional()
	@IsString()
	ext: string

	@ApiProperty({ description: '文件大小' })
	@IsOptional()
	@IsString()
	size: string
}

export class PaginateStorageDto extends PaginateDto {
	@ApiProperty({ description: '分类ID', nullable: true })
	@IsOptional()
	@IsInt()
	cateId: number

	@ApiProperty({ description: '上传时间' })
	@IsOptional()
	time: string[]

	@ApiProperty({ description: '上传者' })
	@IsString()
	@IsOptional()
	username: string
}

export class StorageMoveDto {
	@ApiProperty({ description: '要操作的 id 数组' })
	@IsNotEmpty()
	@IsArray({ message: '必须传入要操作的 id 数组' })
	@IsInt({ each: true })
	ids: number[]

	@ApiProperty({ description: '要移动到的分组ID' })
	@IsNotEmpty()
	@IsInt()
	cateId: number
}
