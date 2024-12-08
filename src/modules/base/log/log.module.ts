import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoginLogs } from './entities'
import { SysLoginLogsController } from './controllers'
import { LoginLogsService } from './services'

/**
 * 系统日志模块
 */
@Module({
	imports: [TypeOrmModule.forFeature([LoginLogs])],
	controllers: [SysLoginLogsController],
	providers: [LoginLogsService],
	exports: [TypeOrmModule.forFeature([LoginLogs])]
})
export class SysLogModule {}
