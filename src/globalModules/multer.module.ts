import { extname } from 'node:path'
import { ConfigService } from '@nestjs/config'
import { MulterModule as MM } from '@nestjs/platform-express'
import { ConfigModule } from './config.module'
import { UPLOAD_FILE_SIZE, UPLOAD_LIMIT } from '@/common/constants'

/**
 * MulterModule 基础配置 存储交给后续中间件，可以做更多控制如上传模式(本地存储、云存储)等
 */
export const MulterModule = MM.registerAsync({
	imports: [ConfigModule],
	useFactory: (configService: ConfigService) => {
		const config = configService.get<ENV.Upload>('upload')
		return {
			// 限制
			limits: {
				files: config.limit || UPLOAD_LIMIT,
				fileSize: config.maxSize || UPLOAD_FILE_SIZE
			},
			// 文件过滤
			fileFilter(req, file, callback) {
				const suffix = extname(file.originalname).slice(1) // 拿到文件后缀

				// 判断文件后缀名是否在列举的文件类型中
				// 没有指定则允许上传所有类型的文件(不推荐)
				// 再判断是否接受该类文件
				const accept = config.accept ? config.accept.includes(suffix) : true

				callback(null, accept)
			}
		}
	},
	inject: [ConfigService]
})
