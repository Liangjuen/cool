import { ConfigService } from '@nestjs/config'
import { ConfigModule } from './config.module'
import { QiniuOSSModule as Qiniu, Region } from 'nest-qiniu-oss'
import { Configuration } from '@/config'

/**
 * 七牛云 OSS 模块
 */
export const QiniuOSSModule = Qiniu.registerAsync({
	imports: [ConfigModule],
	useFactory: (configService: ConfigService<Configuration>) => {
		const config = configService.get('qiniu', { infer: true })
		const { accessKey, secretKey, bucket, domain } = config

		return {
			accessKey,
			secretKey,
			bucket,
			domain,
			region: config.region as Region
		}
	},
	inject: [ConfigService]
})
