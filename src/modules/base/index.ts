import { Module } from '@nestjs/common'
import { UserController, UsersModule, UsersService } from './users'
import { DepartmentModule, DepartmentsController, DepartmentsService } from './departments'
import { MenusController, MenusModule, MenusService } from './menus'
import { PermsModule, PermsController, PermsService } from './perms'
import { RoleController, RoleModule, RoleService } from './roles'
import { SysConfigController, SysConfigModule, SysConfigService } from './sys-config'

/**
 *  base 模块
 */
@Module({
	imports: [DepartmentModule, RoleModule, UsersModule, MenusModule, PermsModule, SysConfigModule],
	providers: [
		DepartmentsService,
		RoleService,
		UsersService,
		MenusService,
		PermsService,
		SysConfigService
	],
	controllers: [
		DepartmentsController,
		RoleController,
		UserController,
		MenusController,
		PermsController,
		SysConfigController
	],
	exports: [UsersService, MenusService, SysConfigService]
})
export class BaseModule {}
