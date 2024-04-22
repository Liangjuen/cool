import { IsInt, Min, Max, IsString, IsOptional, IsIn } from 'class-validator'
import { IsNaturalNumber } from '@/common/validation'

export class PagingQueryDto implements API.PagingQuery {
	@IsOptional()
	@IsInt()
	@Min(1, { message: 'page 需为正整数' })
	page?: number

	@IsOptional()
	@IsNaturalNumber({ message: 'size 需为自然数' })
	@Max(500, { message: 'size 不得超过最大限制 500' })
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
