import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysConfig } from './sys-config.entity'
import { SysConfigService } from './sys-config.service'
import { SysConfigController } from './sys-config.controller'

@Module({
	imports: [TypeOrmModule.forFeature([SysConfig])],
	controllers: [SysConfigController],
	providers: [SysConfigService],
	exports: [TypeOrmModule.forFeature([SysConfig])]
})
export class SysConfigModule {}
