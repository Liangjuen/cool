import { IsInt, Min, Max, IsString, IsOptional, IsIn } from 'class-validator'
import { Transform } from 'class-transformer'
import { IsNaturalNumber } from '@/common/validation'

export class PaginateDto implements API.Pagination {
	@IsOptional()
	@Transform(({ value }) => parseInt(value, 10))
	@IsInt()
	@Min(1, { message: 'page 需为正整数' })
	page?: number

	@IsOptional()
	@Transform(({ value }) => parseInt(value, 10))
	@IsNaturalNumber({ message: 'size 需为自然数' })
	@Max(100, { message: 'size 不得超过最大限制 100' })
	size?: number

	@IsString()
	@IsOptional()
	keyword?: string

	@IsString()
	@IsOptional()
	@IsIn(['ASC', 'DESC'])
	order?: 'DESC' | 'ASC'

	@IsString()
	@IsOptional()
	sort?: string
}
