import { Module } from '@nestjs/common'
import { UserController, UsersModule, UsersService } from './users'
import { DepartmentModule, DepartmentsController, DepartmentsService } from './departments'
import { MenusController, MenusModule, MenusService } from './menus'
import { PermsModule, PermsController, PermsService } from './perms'
import { RoleController, RoleModule, RoleService } from './roles'
import { SysConfigController, SysConfigModule, SysConfigService } from './sys-config'
import { SysLogModule, LoginLogsService } from './log'

/**
 *  base 模块
 */
@Module({
	imports: [
		DepartmentModule,
		RoleModule,
		UsersModule,
		MenusModule,
		PermsModule,
		SysConfigModule,
		SysLogModule
	],
	providers: [
		DepartmentsService,
		RoleService,
		UsersService,
		MenusService,
		PermsService,
		SysConfigService,
		LoginLogsService
	],
	controllers: [
		DepartmentsController,
		RoleController,
		UserController,
		MenusController,
		PermsController,
		SysConfigController
	],
	exports: [UsersService, MenusService, SysConfigService, LoginLogsService]
})
export class BaseModule {}
