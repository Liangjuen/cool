import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException
} from '@nestjs/common'
import { Request, Response } from 'express'

/**
 * 全局异常过滤器
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const status = exception.getStatus()

		response.status(status).json({
			statusCode: status,
			timestamp: Date.now(),
			path: request.url,
			message: exception.message,
			method: request.method
		})
	}
}
