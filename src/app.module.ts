import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, TypeOrmModule, JwtModule, EventEmitterModule } from '@/globalModules'
import { BaseModule } from '@/modules/base'
import { AuthModule } from '@/modules/auth/auth.module'
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
		AuthModule,
		UploadModule,
		MailerModule,
		BaseModule,
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
	constructor(private dataSource: DataSource) {}
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
	}
}
