import { JwtModule as JWTM } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Configuration } from '@/config'

/**
 * JWT模块
 */
export const JwtModule = JWTM.registerAsync({
	imports: [],
	inject: [ConfigService],
	useFactory: async (configService: ConfigService<Configuration>) => {
		const accessToken = configService.get('accessToken', { infer: true })
		const { secret, duration } = accessToken

		return {
			global: true,
			secret,
			signOptions: {
				expiresIn: duration
			}
		}
	},

	global: true
})
