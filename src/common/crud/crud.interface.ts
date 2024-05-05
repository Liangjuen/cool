import { SelectQueryBuilder } from 'typeorm'
import { PaginateDto } from '@/common/dto'

export type Columns<T> = (keyof T)[]

/**
 * 分页查询
 */
export interface Pagination extends PaginateDto {
	[key: string]: any
}

/**
 * 基础分页查询配置项
 */
export interface BasePaginateOptions<T> {
	/**
	 * 模糊查询字段
	 */
	likes?: Columns<T>
	/**
	 * 在获取查询结果前追加自定义查询
	 * @param builder 查询构建器
	 * @returns
	 */
	append?: (
		builder: SelectQueryBuilder<T>,
		pagination: Pagination,
		options: BasePaginateOptions<T>
	) => void
}

/**
 * 唯一性校验
 */
export interface UniqueCheckOptions<T> {
	// 唯一性字段列表
	uniques?: Columns<T>
	// 字段别名(业务名称)
	alias?: {
		[key in keyof T]?: string
	}
}

/**
 * 分页查询返回结果
 */
export interface BasePaginateResult<T> extends API.PaginateResponse<T> {
	[key: string]: any
}

/**
 * 创建实体配置项
 */
export interface CreateEntityOptions<T> extends UniqueCheckOptions<T> {}

/**
 * 更新实体配置项
 */
export interface UpdateEntityOptions<T> extends UniqueCheckOptions<T> {}
