import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

/**
 * 自定义手机号验证装饰器
 */
export function IsPhoneNumber(validationOptions?: ValidationOptions) {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isPhoneNumber',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					// 简单的正则表达式来匹配手机号
					const regex = /^(?:(?:\+|00)86)?1\d{10}$/
					return typeof value === 'string' && regex.test(value)
				}
			}
		})
	}
}
