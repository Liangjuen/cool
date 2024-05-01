import { Module } from '@nestjs/common'
import { MulterModule, QiniuOSSModule } from '@/globalModules'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'
import { QiniuOSSService } from 'nest-qiniu-oss'

@Module({
	imports: [MulterModule, QiniuOSSModule],
	controllers: [UploadController],
	providers: [QiniuOSSService, UploadService],
	exports: [UploadService]
})
export class UploadModule {}
