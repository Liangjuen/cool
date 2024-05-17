import { HttpStatus } from '@nestjs/common'
export const RESPONSE_SUCCESS_CODE = 1

export const RESPONSE_FAILED_CODE = 0

export const RESPONSE_SUCCESS_MESSAGE = 'success'

export const RESPONSE_FAILED_MESSAGE = 'failed'

export const StatusMessage = {
	[HttpStatus.BAD_REQUEST]: '请求中有错误参数',
	[HttpStatus.UNAUTHORIZED]: '身份验证未通过',
	[HttpStatus.FORBIDDEN]: '无权访问',
	[HttpStatus.NOT_FOUND]: '找不到请求的资源',
	[HttpStatus.NOT_ACCEPTABLE]: '不能接受的请求',
	[HttpStatus.METHOD_NOT_ALLOWED]: '目标资源不支持该方法',
	[HttpStatus.TOO_MANY_REQUESTS]: '请求太过频繁',
	[HttpStatus.CONFLICT]: '和被请求的资源的当前状态之间存在冲突',
	[HttpStatus.EXPECTATION_FAILED]: '未满足期望值',
	[HttpStatus.UNPROCESSABLE_ENTITY]: '为经过加工的实体',
	[HttpStatus.INTERNAL_SERVER_ERROR]: '服务繁忙，请稍后再试',
	[HttpStatus.SERVICE_UNAVAILABLE]: '服务不可用',
	[HttpStatus.GATEWAY_TIMEOUT]: '网关超时',
	[HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: '不支持HTTP版本'
}
