import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { isNaturalSequence } from '../validators'

/**
 * 自然数(正整数)序列装饰器
 */
export function IsNaturalSequence(validationOptions?: ValidationOptions) {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isNaturalSequence',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return isNaturalSequence(value)
				}
			}
		})
	}
}
