import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import config from '@/config'

const { guard } = config
@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(private Reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const permission = this.Reflector.get<string[]>(guard.permission.metadataKey, context.getHandler())
		console.log('[PermissionGuard]:', permission)

		return true
	}
}
