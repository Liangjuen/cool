import { IsInt } from 'class-validator'

/**
 * Throttler 限流
 */
export class Throttler {
	@IsInt()
	ttl: number

	@IsInt()
	limit: number
}
