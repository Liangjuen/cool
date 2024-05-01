import { MaxFileSizeValidator, FileTypeValidator, FileTypeValidatorOptions } from '@nestjs/common'
import { configuration } from '@/config'
const { upload } = configuration

export const validators = [
	new MaxFileSizeValidator({ maxSize: upload.maxSize * 100 }),
	new FileTypeValidator({ fileType: 'jpeg/png' })
]
