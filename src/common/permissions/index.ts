import { list } from '@/common/utils/enum'
import { Base, Dict } from './base.permission'

export const PERM = {
	Base,
	Dict
}

const permToList = (enms: Record<string, unknown>[]) => {
	const perms: string[] = []
	enms.forEach(e => {
		perms.push(...list(e))
	})
	return perms
}

export const perms = () => permToList([Base])
