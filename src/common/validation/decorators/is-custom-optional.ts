/* eslint-disable @typescript-eslint/ban-types */
import { ValidationOptions, getMetadataStorage, ValidationTypes } from 'class-validator'
import { isOptional } from '../validators'

export interface CustomOptionalValidationOptions extends ValidationOptions {
	/**
	 * 当`nullable`为 `true` 时，传入值为 `null` 则进行其它校验，否则忽略其它校验器
	 */
	nullable?: boolean
}

/**
 * 自定义的允许为可选项的装饰器
 * @param CustomOptionalValidationOptions
 * @returns
 */
export function IsCustomOptional(
	validationOptions?: CustomOptionalValidationOptions
): PropertyDecorator {
	return function (object: Object, propertyName: string) {
		const { groups = [], each, message, context, always, nullable } = validationOptions || {}
		getMetadataStorage().addValidationMetadata({
			type: ValidationTypes.CONDITIONAL_VALIDATION,
			target: object.constructor,
			propertyName: propertyName,
			constraintCls: undefined,
			constraints: [(o: any) => isOptional(o[propertyName], nullable)],
			groups,
			each,
			message,
			context,
			always,
			validationTypeOptions: undefined
		})
	}
}
