import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import ConfigModule from './config.module'

/**
 * JWT模块
 */
export default JwtModule.registerAsync({
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
