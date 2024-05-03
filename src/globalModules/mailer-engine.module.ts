import { MailerModule, MAILER_OPTIONS } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

export { MailerService as MailerEngineService } from '@nestjs-modules/mailer'

/**
 * 邮箱模块
 */
export const MailerEngineModule = MailerModule.forRootAsync({
	inject: [ConfigService],
	useFactory: (configService: ConfigService) => {
		const { host, user, pass, port } = configService.get<ENV.Mailer>('mailer')
		return {
			transport: {
				host,
				port,
				auth: {
					user,
					pass
				},
				secure: false
			},
			defaults: {
				from: user
			}
		}
	}
})
