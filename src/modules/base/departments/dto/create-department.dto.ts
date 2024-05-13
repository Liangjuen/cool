import { IsString, IsInt, Length, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateDepartmentDto {
	@Length(2, 12, { message: '部门名称长度在 2 - 12之间' })
	@IsString()
	name: string

	@IsOptional()
	@IsInt()
	pId: number

	@IsOptional()
	@IsInt()
	orderNum: number
}
