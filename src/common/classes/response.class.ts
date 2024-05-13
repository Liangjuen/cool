import { ResponseCode, ResponseMsg } from '@/common/enums'

/**
 * 响应模型
 */
export class ResponseModel<T> implements API.Response<T> {
	data: T
	code: number
	message: string

	constructor(code: number, data?: T, message?: string) {
		this.code = code
		this.data = code == ResponseCode.SUCCESS ? (data ? data : null) : data
		this.message = message
			? message
			: code == ResponseCode.FAILED
				? ResponseMsg.FAILED
				: ResponseMsg.SUCCESS
	}
}
