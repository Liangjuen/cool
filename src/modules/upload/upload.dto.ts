import { IsOptional, IsInt } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class UploadDto {
	@ApiProperty({ description: '分类ID' })
	@IsOptional()
	@IsInt()
	cateId?: number
}
