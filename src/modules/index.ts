import { Module } from '@nestjs/common'
import { AuthController, AuthModule, AuthService } from './auth'
import { BaseModule } from './base'
import {
	DictTypeController,
	DictTypeModule,
	DictTypeService,
	DictsController,
	DictsModule,
	DictsService
} from './dicts'

/**
 *  API 模块
 */
@Module({
	imports: [AuthModule, BaseModule, DictTypeModule, DictsModule],
	providers: [AuthService, DictTypeService, DictsService],
	controllers: [AuthController, DictTypeController, DictsController]
})
export class ApiModule {}
