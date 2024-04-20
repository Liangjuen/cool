import { SetMetadata } from '@nestjs/common'
import config from '@/config'

const { guard } = config

/**
 * 设置接口权限元信息
 * @param args
 * @returns
 */
export const Permission = (args: string[] | string) => {
	const param = typeof args == 'string' ? [args] : args
	return SetMetadata(guard.permission.metadataKey, param)
}
