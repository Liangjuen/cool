import { Module } from '@nestjs/common'
import { MailerService } from './mailer.service'
import { MailerController } from './mailer.controller'
import { MailerEngineModule, MailerEngineService } from '@/globalModules'

@Module({
	imports: [MailerEngineModule],
	controllers: [MailerController],
	providers: [MailerEngineService, MailerService],
	exports: []
})
export class MailerModule {}
