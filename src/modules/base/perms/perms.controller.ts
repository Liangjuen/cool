import { Controller, Get, UseGuards } from '@nestjs/common'
import { PermissionGuard } from '@/guard'
import { Permission } from '@/common/decorator'
import { PERM } from '@/common/permissions'
import { ApiTags } from '@nestjs/swagger'
import { PermsService } from './perms.service'

@Controller({ path: '/base/perms' })
@UseGuards(PermissionGuard)
@ApiTags('权限')
export class PermsController {
	constructor(private readonly permsService: PermsService) {}

	@Get()
	@Permission(PERM.Base.PermsList)
	findAll() {
		return this.permsService.findAll()
	}
}
