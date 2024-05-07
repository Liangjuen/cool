import { Module } from '@nestjs/common'
import { AuthController, AuthModule, AuthService } from './auth'
import { BaseModule } from './base'
import { DataModule } from './data'

/**
 *  API 模块
 */
@Module({
	imports: [AuthModule, BaseModule, DataModule],
	providers: [AuthService],
	controllers: [AuthController]
})
export class ApiModule {}
