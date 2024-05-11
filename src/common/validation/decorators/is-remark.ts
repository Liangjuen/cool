import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

/**
 * 自定义备注验证装饰器
 */
export function IsRemark(validationOptions?: ValidationOptions) {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isRemark',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					// 判断长度是否超过限制
					return value.length <= 200
				}
			}
		})
	}
}
