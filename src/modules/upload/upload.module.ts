import { Module } from '@nestjs/common'
import { MulterModule, QiniuOSSModule } from '@/globalModules'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'
import { QiniuOSSService } from 'nest-qiniu-oss'
import { StorageModule } from '../data/storage'
import { UploadConfigService } from './upload.config.service'

@Module({
	imports: [MulterModule, QiniuOSSModule, StorageModule],
	controllers: [UploadController],
	providers: [QiniuOSSService, UploadService, UploadConfigService],
	exports: [UploadService, UploadConfigService]
})
export class UploadModule {}
