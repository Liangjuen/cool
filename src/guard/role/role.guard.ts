import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLE_GUARD_METADATA_KEY } from '@/common/constants'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private Reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const role = this.Reflector.get<string[]>(ROLE_GUARD_METADATA_KEY, context.getHandler())
		console.log('[RoleGuard]:', role)

		return true
	}
}
