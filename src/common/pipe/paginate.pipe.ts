// pagination.pipe.ts

import { Injectable, ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { validate } from 'class-validator'
import { PaginateDto } from '@/common/dto'

@Injectable()
export class PaginatePipe implements PipeTransform<PaginateDto> {
	async transform(pagination: any, metadata: ArgumentMetadata) {
		const validationErrors = await validate(pagination)
		if (validationErrors.length > 0) {
			throw new BadRequestException('字段错误')
		}
		return pagination
	}
}
