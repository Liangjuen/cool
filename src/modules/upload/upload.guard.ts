import { CanActivate, Injectable, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Configuration } from '@/config'

export interface FileUpload extends ENV.FileUpload {}
export enum Mode {
	Local = ENV.FileUploadMode.Local,
	Cloud = ENV.FileUploadMode.Cloud
}

/**
 * 本地上传守卫(当配置为本地上传时进行后续操作)
 */
@Injectable()
export class LocalUploadGuard implements CanActivate {
	constructor(private readonly configService: ConfigService<Configuration>) {}
	canActivate() {
		const { mode } = this.configService.get('file', { infer: true })
		const flog = (mode as unknown as Mode) == Mode.Local
		if (!flog) throw new BadRequestException('未开启本地上传配置，不能操作')
		return flog
	}
}
