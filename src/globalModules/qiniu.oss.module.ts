import { ConfigService } from '@nestjs/config'
import { QiniuOSSModule as Qiniu, Region } from 'nest-qiniu-oss'

/**
 * 七牛云 OSS 模块
 */
export const QiniuOSSModule = Qiniu.registerAsync({
	imports: [],
	inject: [ConfigService],
	useFactory: (configService: ConfigService) => {
		const config = configService.get<ENV.Qiniu>('qiniu')
		const { accessKey, secretKey, bucket, domain } = config

		return {
			accessKey,
			secretKey,
			bucket,
			domain,
			region: config.region as Region
		}
	}
})
