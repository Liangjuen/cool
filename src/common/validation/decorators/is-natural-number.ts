import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { isNaturalNumber } from '../validators'

/**
 * 自定义验证器装饰器，用于验证是否为自然数
 */
export function IsNaturalNumber(validationOptions?: ValidationOptions) {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isNaturalNumber',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return isNaturalNumber(value)
				}
			}
		})
	}
}
