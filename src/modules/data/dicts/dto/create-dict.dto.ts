import { IsNotEmpty, IsOptional, IsInt, IsDefined, MaxLength, IsString } from 'class-validator'

export class CreateDictDto {
	// @IsNotEmpty({ message: 'typeId 为必填项' })
	// @IsDefined()
	@IsString()
	@MaxLength(20, { message: '字典名长度不得超过 20 ' })
	name: string

	// @IsNotEmpty({ message: 'typeId 为必填项' })
	// @IsDefined({ message: 'typeId 不能为 null 或 undefined' })
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
