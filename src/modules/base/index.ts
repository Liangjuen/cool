import { Module } from '@nestjs/common'
import { UserController, UsersModule, UsersService } from './users'
import { DepartmentModule, DepartmentsController, DepartmentsService } from './departments'
import { MenusController, MenusModule, MenusService } from './menus'
import { PermsModule, PermsController, PermsService } from './perms'
import { RoleController, RoleModule, RoleService } from './roles'

/**
 *  base 模块
 */
@Module({
	imports: [DepartmentModule, RoleModule, UsersModule, MenusModule, PermsModule],
	providers: [DepartmentsService, RoleService, UsersService, MenusService, PermsService],
	controllers: [
		DepartmentsController,
		RoleController,
		UserController,
		MenusController,
		PermsController
	]
})
export class BaseModule {}
