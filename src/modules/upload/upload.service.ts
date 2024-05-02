import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { QiniuOSSService } from 'nest-qiniu-oss'
import { UPLOAD_DIRNAME } from '@/common/constants'

@Injectable()
export class UploadService {
	constructor(
		private readonly configService: ConfigService,
		private readonly qiniu: QiniuOSSService
	) {}

	getUploadMode() {
		const { mode } = this.configService.get<ENV.FileUpload>('file')

		return { mode }
	}

	/**
	 * 获取上传七牛云授权
	 * @returns
	 */
	uploadQiniuAuthorization() {
		const mac = this.qiniu.mac()

		// 创建上传策略
		const putPolicy = this.qiniu.createPutPolicy({
			scope: this.qiniu.options.bucket
		})

		const { domain, region } = this.qiniu.options

		// 创建上传凭证
		return {
			token: putPolicy.uploadToken(mac),
			publicDomain: domain,
			uploadUrl: `https://upload-${region || ''}.qiniup.com/`
		}
	}

	/**
	 * 上传成功后返回的信息
	 * @param file 文件
	 * @returns
	 */
	getUploadFileInfo(file: Express.Multer.File) {
		const { mode, domain } = this.configService.get<ENV.FileUpload>('file')
		const { dirname } = this.configService.get<ENV.Upload>('upload')

		const { fieldname, filename, size, mimetype } = file
		const data = {
			fieldname,
			size,
			mimetype,
			mode,
			url: `${domain}/${dirname || UPLOAD_DIRNAME}/${filename}`
		}
		return data
	}

	/**
	 * 返回多文件上传信息
	 * @param files
	 * @returns
	 */
	getUploadFilesInfo(files: Express.Multer.File[]) {
		return files.map(file => {
			return this.getUploadFileInfo(file)
		})
	}
}
