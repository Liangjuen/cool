import { IsNotEmpty, IsOptional, IsString, IsInt, MaxLength } from 'class-validator'

export class CreateDictDto {
	@IsNotEmpty()
	name: string

	@IsNotEmpty()
	@IsInt()
	typeId: number

	@IsOptional()
	@IsInt()
	orderNum?: number

	@IsOptional()
	@IsInt()
	pId?: number

	@IsOptional()
	@MaxLength(200, { message: '备注不得超过 200 字符长度' })
	remark?: string

	@IsOptional()
	@MaxLength(500, { message: '值不得超过 500 字符' })
	value?: string
}
