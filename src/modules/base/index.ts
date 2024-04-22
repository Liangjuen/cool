import { Module } from '@nestjs/common'
import { UserController, UsersModule, UsersService } from './users'

/**
 *  base 模块
 */
@Module({
	imports: [UsersModule],
	providers: [UsersService],
	controllers: [UserController]
})
export class BaseModule {}
