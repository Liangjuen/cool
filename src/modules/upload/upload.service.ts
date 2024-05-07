import { extname } from 'node:path'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { QiniuOSSService } from 'nest-qiniu-oss'
import { UPLOAD_DIRNAME } from '@/common/constants'
import { Storage } from '@/modules/data/storage'
import { getFileType, formatBytes } from '@/common/utils'
import { UploadSaveOptions } from './upload.interface'

@Injectable()
export class UploadService {
	config: ENV.FileUpload
	uploadConfig: ENV.Upload
	constructor(
		private readonly configService: ConfigService,
		private readonly qiniu: QiniuOSSService,
		@InjectRepository(Storage) private readonly storageRepo: Repository<Storage>
	) {
		this.config = configService.get<ENV.FileUpload>('file')
		this.uploadConfig = this.configService.get<ENV.Upload>('upload')
	}

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
	async saveFile(file: Express.Multer.File, options: UploadSaveOptions) {
		const result = await this.saveFileMeta([file], options)
		return result[0]
	}

	/**
	 * 返回多文件上传信息
	 * @param files
	 * @returns
	 */
	async saveFiles(files: Express.Multer.File[], options: UploadSaveOptions) {
		return await this.saveFileMeta(files, options)
	}

	/**
	 * 保存上传信息
	 * @param files
	 */
	async saveFileMeta(files: Express.Multer.File[], options: { user: Payload; cateId?: number }) {
		const { domain } = this.config
		const { dirname } = this.uploadConfig
		const { user, cateId } = options

		const storages = files.map(file => {
			const { originalname, filename, size } = file
			const ext = extname(originalname).replace('.', '')
			return this.storageRepo.create({
				name: originalname,
				path: filename,
				url: `${domain}/${dirname || UPLOAD_DIRNAME}/${filename}`,
				size: formatBytes(size),
				ext,
				userId: user.id,
				type: getFileType(ext),
				cateId: cateId || null
			})
		})

		const result = await this.storageRepo.save(storages)
		return result.map(r => ({
			url: r.url,
			mode: this.config.mode
		}))
	}
}
