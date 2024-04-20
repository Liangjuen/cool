import { SetMetadata } from '@nestjs/common'
import { ROLE_GUARD_METADATA_KEY } from '@/common/constants'

/**
 * 设置角色权限元信息
 * @param args
 * @returns
 */
export const Role = (args: string[] | string) => {
	const param = typeof args == 'string' ? [args] : args
	return SetMetadata(ROLE_GUARD_METADATA_KEY, param)
}
