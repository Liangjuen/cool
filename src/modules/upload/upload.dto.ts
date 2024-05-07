import { IsOptional, IsInt } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class UploadDto {
	@ApiProperty({ description: '分类ID' })
	@IsOptional()
	@Transform(idStr => parseInt(idStr.value, 10))
	@IsInt()
	cateId?: number
}
