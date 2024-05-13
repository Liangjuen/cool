import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResponseModel } from '@/common/classes'
import { ResponseCode } from '@/common/enums'

/**
 * 定义接口返回的数据格式
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, API.Response<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<API.Response<T>> {
		return next.handle().pipe(
			map(data => {
				// 判断是否为响应模型实例，是则直接返回
				if (data instanceof ResponseModel) return data

				return new ResponseModel(ResponseCode.SUCCESS, data)
			})
		)
	}
}
