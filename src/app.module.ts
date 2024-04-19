import {
	Module,
	NestModule,
	MiddlewareConsumer,
	RequestMethod
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, TypeOrmModule } from '@/globalModules'
import { UserModule } from '@/modules/user/user.module'
import { LoggerMiddleware } from '@/middleware'

@Module({
	imports: [ConfigModule, TypeOrmModule, UserModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes({ path: '*', method: RequestMethod.ALL })
	}
}
