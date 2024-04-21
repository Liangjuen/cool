import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { PERMISSION_GUARD_METADATA_KEY } from '@/common/constants'

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(private Reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const permission = this.Reflector.get<string[]>(
			PERMISSION_GUARD_METADATA_KEY,
			context.getHandler()
		)
		console.log('[PermissionGuard]:', permission)

		return true
	}
}
