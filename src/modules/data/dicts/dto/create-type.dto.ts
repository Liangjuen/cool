import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateDictTypeDto {
	@IsNotEmpty({ message: '字典类型 key 为必选项' })
	@IsString()
	@Length(2, 15, { message: '字典类型名称长度在 2 - 15 之间' })
	name: string

	@IsNotEmpty({ message: '字典类型 key 为必选项' })
	@IsString()
	@Length(1, 30, { message: '字典类型 key 长度在 1 - 30 之间' })
	key: string
}
