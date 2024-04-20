import { SetMetadata } from '@nestjs/common'
import { PERMISSION_GUARD_METADATA_KEY } from '@/common/constants'

/**
 * 设置接口权限元信息
 * @param args
 * @returns
 */
export const Permission = (args: string[] | string) => {
	const param = typeof args == 'string' ? [args] : args
	return SetMetadata(PERMISSION_GUARD_METADATA_KEY, param)
}
