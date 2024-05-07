import { ApiProperty } from '@nestjs/swagger'
import { IsInt, Min, Max, IsString, IsOptional, IsIn } from 'class-validator'
import { Transform } from 'class-transformer'
import { IsNaturalNumber } from '@/common/validation'

export class PaginateDto implements API.Pagination {
	@ApiProperty({ description: '当前页', minimum: 1, default: 1 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value, 10))
	@IsInt()
	@Min(1, { message: 'page 需为正整数' })
	page?: number

	@ApiProperty({ description: '每页取值', minimum: 1, maximum: 100 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value, 10))
	@IsNaturalNumber({ message: 'size 需为自然数' })
	@Max(100, { message: 'size 不得超过最大限制 100' })
	size?: number

	@ApiProperty({ description: '搜索关键词', maximum: 20 })
	@IsString()
	@IsOptional()
	@Max(20, { message: 'keyword 不得超过最大限制 20' })
	keyword?: string

	@ApiProperty({ description: '排序', default: 'DESC' })
	@IsString()
	@IsOptional()
	@IsIn(['ASC', 'DESC'])
	order?: 'DESC' | 'ASC'

	@ApiProperty({ description: '排序的 key', default: 'createdAt' })
	@IsString()
	@IsOptional()
	sort?: string
}
