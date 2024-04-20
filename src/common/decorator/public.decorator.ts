import { SetMetadata } from '@nestjs/common'
import { IS_PUBLIC_KEY } from '@/common/constants'

/**
 * 设置接口为公开的
 * @param args
 * @returns
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
