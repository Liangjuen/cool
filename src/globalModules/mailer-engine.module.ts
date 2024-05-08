import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { Configuration } from '@/config'
export { MailerService as MailerEngineService } from '@nestjs-modules/mailer'

/**
 * 邮箱模块
 */
export const MailerEngineModule = MailerModule.forRootAsync({
	inject: [ConfigService],
	useFactory: (configService: ConfigService<Configuration>) => {
		const { host, user, pass, port } = configService.get('mailer', { infer: true })
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
