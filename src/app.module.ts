import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, TypeOrmModule, JwtModule } from '@/globalModules'
import { UsersModule } from '@/modules/users/users.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { LoggerMiddleware } from '@/middleware'
import { AuthGuard } from '@/guard'

@Module({
	imports: [ConfigModule, TypeOrmModule, JwtModule, AuthModule, UsersModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	]
})
export class AppModule implements NestModule {
	constructor(private dataSource: DataSource) {}
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
	}
}
