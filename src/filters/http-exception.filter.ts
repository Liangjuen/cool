import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	Logger,
	HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'
import { StatusMessage } from '@/common/constants'
import { isProd } from '@/config'

/**
 * 全局异常过滤器
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	/**
	 * 异常捕获
	 * @param exception
	 * @param host
	 */
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		const apiException = this.factory(exception, host)

		if (!isProd()) this.log(apiException, host)

		response.status(apiException.statusCode).json(apiException)
	}

	/**
	 * 异常工厂
	 * @param exception
	 * @param host
	 * @returns
	 */
	factory(exception: HttpException, host: ArgumentsHost): API.Exception {
		const request = host.switchToHttp().getRequest<Request>()

		return {
			statusCode: exception.getStatus(),
			timestamp: Date.now(),
			path: request.url,
			message: this.message(exception),
			method: request.method,
			detail: exception.getResponse()
		}
	}

	/**
	 * 获取消息
	 * @param exception
	 * @returns
	 */
	message(exception: HttpException) {
		return StatusMessage[exception.getStatus()] || exception.message
	}

	/**
	 * 日志打印
	 * @param exception
	 * @param host
	 */
	log(exception: API.Exception, host: ArgumentsHost) {
		const request = host.switchToHttp().getRequest<Request>()
		const { statusCode, message, path, method, timestamp } = exception
		const content = `[${statusCode} ${method} ${path}] ${message} Body: ${request.body ? JSON.stringify(request.body) : {}}`
		const context = `Catch: ${timestamp}`
		if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
			Logger.error(content, context)
		} else {
			Logger.warn(content, context)
		}
	}
}
