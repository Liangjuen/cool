import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	isNumber
} from 'class-validator'

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
					const numbers = value.split(',').map(Number)
					return numbers.every((n: any, i: number) => isNumber(n))
				}
			}
		})
	}
}
