import { Module } from '@nestjs/common'
import { JwtModule, ConfigModule } from '@/globalModules'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../base/users/users.module'
import { UsersService } from '../base/users/users.service'
import { MenusController, MenusModule, MenusService } from '../base/menus'
import { PermsModule, PermsController, PermsService } from '../base/perms'

/**
 * 身份认证模块
 *
 * [sample](https://github.com/nestjs/nest/blob/master/sample/19-auth-jwt)
 *
 * @see[认证](http://nestjs.inode.club/security/authentication)
 *
 */
@Module({
	imports: [ConfigModule, JwtModule, UsersModule, MenusModule, PermsModule],
	providers: [AuthService, UsersService, MenusService, PermsService],
	controllers: [AuthController, MenusController, PermsController],
	exports: [AuthService]
})
export class AuthModule {
	constructor(private usersService: UsersService) {}
}
