import { ConfigService } from '@nestjs/config'
import { JwtModule as JWTM } from '@nestjs/jwt'
import { ConfigModule } from './config.module'

/**
 * JWT模块
 */
export const JwtModule = JWTM.registerAsync({
	imports: [ConfigModule],
	useFactory: async (configService: ConfigService) => {
		const accessToken = configService.get<ENV.AccessToken>('accessToken')
		const { secret, duration } = accessToken

		return {
			global: true,
			secret,
			signOptions: {
				expiresIn: duration
			}
		}
	},
	inject: [ConfigService]
})
