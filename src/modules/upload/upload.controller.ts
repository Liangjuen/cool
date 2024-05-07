import {
	Controller,
	Post,
	Get,
	UseInterceptors,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	Body,
	Req
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { Express, Request } from 'express'
import { Permission } from '@/common/decorator'
import { UploadService } from './upload.service'
import { uploadStorage } from './upload.storage'
import { LocalUploadGuard } from './upload.guard'
import { PermissionGuard } from '@/guard'
import { UploadDto } from './upload.dto'
import { USERPAYLOAD } from '@/common/constants'
import { PERM } from '@/common/permissions'

@UseGuards(PermissionGuard)
@Controller()
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Permission(PERM.Upload.Mode)
	@Get('upload/mode')
	getUploadMode() {
		return this.uploadService.getUploadMode()
	}

	@Permission(PERM.Upload.QiniuAuth)
	@Get('upload/qiniu/authorization')
	uploadQiniuAuthorization() {
		return this.uploadService.uploadQiniuAuthorization()
	}

	@Post('upload')
	@Permission(PERM.Upload.Local)
	@UseGuards(LocalUploadGuard)
	@UseInterceptors(FileInterceptor('file', { storage: uploadStorage() }))
	localUploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Body() dto: UploadDto,
		@Req() req: Request
	) {
		return this.uploadService.saveFile(file, { user: req[USERPAYLOAD], ...dto })
	}

	@Post('uploads')
	@Permission(PERM.Upload.Local)
	@UseInterceptors(FilesInterceptor('file', undefined, { storage: uploadStorage() }))
	@UseGuards(LocalUploadGuard)
	localUploadFiles(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body() dto: UploadDto,
		@Req() req: Request
	) {
		return this.uploadService.saveFiles(files, { user: req[USERPAYLOAD], ...dto })
	}
}
