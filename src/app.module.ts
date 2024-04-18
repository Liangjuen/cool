import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, TypeOrmModule } from '@/globalModules'

@Module({
	imports: [ConfigModule, TypeOrmModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
