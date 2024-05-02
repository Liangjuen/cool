import {
	Controller,
	Post,
	Get,
	UseInterceptors,
	UploadedFile,
	UploadedFiles,
	UseGuards
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { Public } from '@/common/decorator'
import { UploadService } from './upload.service'
import { uploadStorage } from './upload.storage'
import { LocalUploadGuard } from './upload.guard'
import { UPLOAD_LIMIT } from '@/common/constants'

@Controller()
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Get('upload/mode')
	getUploadMode() {
		return this.uploadService.getUploadMode()
	}

	@Get('upload/qiniu/authorization')
	uploadQiniuAuthorization() {
		return this.uploadService.uploadQiniuAuthorization()
	}

	@Post('upload')
	@UseGuards(LocalUploadGuard)
	@UseInterceptors(FileInterceptor('file', { storage: uploadStorage() }))
	localUploadFile(@UploadedFile() file: Express.Multer.File) {
		return this.uploadService.getUploadFileInfo(file)
	}

	@Post('uploads')
	@UseInterceptors(FilesInterceptor('file', undefined, { storage: uploadStorage() }))
	@UseGuards(LocalUploadGuard)
	localUploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
		return this.uploadService.getUploadFilesInfo(files)
	}
}