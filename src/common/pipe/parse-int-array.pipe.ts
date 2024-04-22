import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { isNumber } from 'class-validator'

@Injectable()
export class ParseIntArrayPipe implements PipeTransform<any> {
	transform(value: any, metadata: ArgumentMetadata) {
		// 这里可以添加你的转换和验证逻辑
		if (typeof value !== 'string') {
			throw new BadRequestException('Value must be a string')
		}
		const numbers = value.split(',').map(s => parseInt(s, 10))
		if (!numbers.every((n: any, i: number) => isNumber(n))) {
			throw new BadRequestException('非ID序列格式')
		}

		// 假设我们要将输入转换为大写
		return numbers
	}
}
