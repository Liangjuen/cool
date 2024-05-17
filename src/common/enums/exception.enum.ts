export enum ExceptionMessage {
	OK = 'ok',
	Created = '已创建',
	NoContent = '无内容',
	BadRequest = '请求中有错误参数',
	Unauthorized = '身份验证未通过',
	Forbidden = '无权访问',
	NotFound = '找不到请求的资源',
	NotAcceptable = '不能接受的请求',
	MethodNotAllowed = '目标资源不支持该方法',
	TooManyRequests = '请求太过频繁',
	InternalServerError = '服务端错误',
	Conflict = '和被请求的资源的当前状态之间存在冲突',
	ExpectationFailed = '未满足期望值',
	UnprocessableEntity = '为经过加工的实体'
}
