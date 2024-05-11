import { isNumber } from 'class-validator'

/**
 * 是否为可选项验证器
 */
export const isOptional = (value: any, nullable?: boolean) => {
	return value === null ? !nullable : value !== undefined
}

/**
 * 自然数(正整数)验证器
 */
export const isNaturalNumber = (value: unknown) => {
	return typeof value === 'number' && Number.isInteger(value) && value > 0
}

/**
 * 自然数(正整数)序列验证器
 */
export const isNaturalSequence = (value: string) => {
	const numbers = value.split(',').map(Number)
	return numbers.every((n: any, i: number) => isNumber(n))
}
