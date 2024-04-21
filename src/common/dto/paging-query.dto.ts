import { IsInt, Min, Max, IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator'
import { IsNaturalNumber } from '@/common/validation'

export class PagingQueryDto implements API.PagingQuery {
	@IsNotEmpty({ message: 'page 为必选项' })
	@IsInt()
	@Min(1, { message: 'page 需为正整数' })
	page: number

	@IsNotEmpty({ message: 'size 为必选项' })
	@IsNaturalNumber({ message: 'size 需为自然数' })
	@Max(500, { message: 'size 不得超过最大限制 500' })
	size: number

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
