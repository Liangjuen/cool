import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * 返回结构
 */
export interface Response<T> {
	data: T
	code: number
	message: string
}

/**
 * 定义接口返回的数据格式
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<Response<T>> {
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
