declare namespace API {
	/**
	 * 分页查询条件
	 */
	interface PagingQuery {
		/**
		 * 当前页面
		 */
		page: number

		/**
		 * 每次查询条数
		 */
		size: number

		/**
		 * 搜索关键词
		 */
		keyword?: string | null

		/**
		 * 排序方法 DESC 降序 ASC 升序
		 */
		order?: 'DESC' | 'ASC'

		/**
		 * 排序的 key
		 */
		sort?: string
	}

	/**
	 * 分页查询结果
	 */
	interface PagingQueryResult<T> {
		/**
		 * 当前页面
		 */
		page: number

		/**
		 * 查询条数
		 */
		size: number

		/**
		 * 总条数
		 */
		total: number

		/**
		 * 数据
		 */
		data: Array<T> | null
	}
}
