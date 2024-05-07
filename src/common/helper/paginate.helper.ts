import { SelectQueryBuilder } from 'typeorm'

/**
 * 分页查询 返回结果
 * @param queryBuilder
 * @param options
 * @returns
 */
export const paginateBuilderHelper = async <T>(
	queryBuilder: SelectQueryBuilder<T>,
	options: { page: number; size: number }
): Promise<API.PaginateResponse<T>> => {
	const { size, page } = options

	const skip = (page - 1) * size

	const [list, total] = await queryBuilder.skip(skip).take(size).getManyAndCount()

	return {
		list,
		total,
		page,
		size
	}
}
