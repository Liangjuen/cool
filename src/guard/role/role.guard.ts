import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import config from '@/config'

const { guard } = config

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private Reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		// console.log(context)
		const role = this.Reflector.get<string[]>(guard.role.metadataKey, context.getHandler())
		console.log('[RoleGuard]:', role)

		return true
	}
}
