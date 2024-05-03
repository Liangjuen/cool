import { Injectable } from '@nestjs/common'
import { MailerEngineService } from '@/globalModules'

@Injectable()
export class MailerService {
	constructor(private readonly mailerEngine: MailerEngineService) {}
	async send() {
		await this.mailerEngine.sendMail({
			to: 'test@nestjs.com', // list of receivers
			subject: 'Testing Liangjuen MailerModule ✔', // Subject line
			text: 'welcome', // plaintext body
			html: '<b>welcome</b>' // HTML body content
		})
	}
}
