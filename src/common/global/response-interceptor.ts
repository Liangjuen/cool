import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * 定义接口返回的数据格式
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, API.Response<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<API.Response<T>> {
		const request = context.switchToHttp().getRequest<Request>()
		const response = context.switchToHttp().getResponse<Request>()

		return next.handle().pipe(
			map(data => {
				return {
					data,
					code: 1,
					message: 'ok'
				}
			})
		)
	}
}
