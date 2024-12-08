import { Request } from 'express'
/**
 * @method 获取客户端IP地址
 * @param {string} req 传入请求HttpRequest
 * 客户请求的IP地址存在于request对象当中
 * express框架可以直接通过 req.ip 获取
 */
export function getClientIp(req: Request) {
	return (
		req.headers['x-forwarded-for'] ||
		req.ip ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		''
	)
}
