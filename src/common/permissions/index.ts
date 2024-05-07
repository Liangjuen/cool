import { list } from '@/common/utils/enum'
import { Base, Upload } from './base.permission'
import { Dict, Storage } from './data.permission'

export const PERM = {
	Base,
	Dict,
	Upload,
	Storage
}

const permToList = (enms: Record<string, unknown>[]) => {
	const perms: string[] = []
	enms.forEach(e => {
		perms.push(...list(e))
	})
	return perms
}
/**
 * 返回注册的权限列表
 * @returns
 */
export const perms = () => permToList([Base, Dict, Upload, Storage])
