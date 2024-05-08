import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, TypeOrmModule, JwtModule, EventEmitterModule } from '@/globalModules'
import { ApiModule } from '@/modules'
import { LoggerMiddleware } from '@/middleware'
import { AuthGuard } from '@/guard'
import { RoleCacheModule } from '@/modules/base/roles/cache'
import { UploadModule } from '@/modules/upload/upload.module'
import { MailerModule } from '@/modules/mailer/mailer.module'

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule,
		JwtModule,
		EventEmitterModule,
		UploadModule,
		MailerModule,
		ApiModule,
		RoleCacheModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	],
	exports: [RoleCacheModule]
})
export class AppModule implements NestModule {
	constructor() {}
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
	}
}
