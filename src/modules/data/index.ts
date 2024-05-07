import { Module } from '@nestjs/common'
import { DictModule } from './dicts'
import { StorageModule } from './storage'

/**
 *数据管理模块
 */
@Module({
	imports: [DictModule, StorageModule],
	providers: [],
	controllers: [],
	exports: []
})
export class DataModule {}
