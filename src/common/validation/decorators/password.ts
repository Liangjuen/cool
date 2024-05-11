import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

/**
 * 自定义手机号验证装饰器
 */
export function Password(validationOptions?: ValidationOptions) {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'password',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					// 密码匹配规则
					const regex = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$/
					return typeof value === 'string' && regex.test(value)
				}
			}
		})
	}
}
