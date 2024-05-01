import { extname, join } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import { diskStorage } from 'multer'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import * as moment from 'moment'
import { UPLOAD_DIRNAME } from '@/common/constants'
import { configuration } from '@/config'

/**
 *  本地上传的存储引擎
 * @see https://github.com/expressjs/multer
 * @returns  MulterOptions.storage
 */
export const uploadStorage = (): MulterOptions['storage'] => {
	// 获取文件目录名
	const dirname = configuration.upload.dirname || UPLOAD_DIRNAME
	// 存储目的地
	const destination = join(process.cwd(), 'public', dirname)

	// 返回 multer 存储引擎
	return diskStorage({
		destination,
		filename: (_, file, callback) => {
			// 创建上传文件夹名
			const date = moment().format('YYYYMMDD')
			const filename = `${Date.now() + extname(file.originalname)}`

			// 创建工作空间文件夹
			!existsSync(join(destination, date)) &&
				mkdirSync(join(destination, date), { recursive: true })

			callback(null, `${date}/${filename}`)
		}
	})
}
