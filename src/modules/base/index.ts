import { Module } from '@nestjs/common'
import { UserController, UsersModule, UsersService } from './users'
import { DepartmentModule, DepartmentsController, DepartmentsService } from './departments'

/**
 *  base 模块
 */
@Module({
	imports: [DepartmentModule, UsersModule],
	providers: [DepartmentsService, UsersService],
	controllers: [DepartmentsController, UserController]
})
export class BaseModule {}
