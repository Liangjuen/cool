import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Configuration } from '@/config'

@Injectable()
export class UploadConfigService {
	constructor(private readonly configService: ConfigService<Configuration>) {}

	get upload() {
		return this.configService.get('upload', { infer: true })
	}

	get file() {
		return this.configService.get('file', { infer: true })
	}
}
