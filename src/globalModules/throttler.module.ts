import { ThrottlerModule as TM, seconds } from '@nestjs/throttler'
import { ConfigService } from '@nestjs/config'
import { Configuration } from '@/config'

/**
 * 限流模块
 */
export const ThrottlerModule = TM.forRootAsync({
	imports: [],
	inject: [ConfigService],

	useFactory: (config: ConfigService<Configuration>) => {
		const { limit = 6, ttl = 10 } = config.get('throttler', { infer: true }) || {}

		return {
			errorMessage: '当前操作过于频繁，请稍后再试！',
			throttlers: [
				{
					// 在 TTL 限制内的最大请求次数。
					limit,
					// 每个请求在存储中的持续时间（以秒为单位）
					ttl: seconds(ttl)
				}
			]
		}
	}
})
