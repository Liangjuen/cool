import { SetMetadata } from '@nestjs/common'
import config from '@/config'

const { guard } = config

/**
 * 设置角色权限元信息
 * @param args
 * @returns
 */
export const Role = (args: string[] | string) => {
	const param = typeof args == 'string' ? [args] : args
	return SetMetadata(guard.role.metadataKey, param)
}
