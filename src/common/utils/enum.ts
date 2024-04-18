/**
 * @description 列表枚举值
 * @param enm 枚举到列表
 */
const list = (enm: Record<string, unknown>): string[] => {
	const values = [] as string[]
	for (const key in enm) {
		values.push(enm[key] as string)
	}
	return values
}

/**
 * @description 列表枚举 key
 * @param enm 枚举 key 到列表
 * @returns
 */
const keyList = (enm: Record<string, unknown>): string[] => {
	const values = [] as string[]
	for (const key in enm) {
		values.push(key)
	}
	return values
}

const toObj = <T>(enm: Record<string, unknown>): { [key: string]: T } => {
	const obj = {}
	for (const key in enm) {
		obj[key] = enm[key]
	}
	return obj
}

export { list, keyList, toObj }
