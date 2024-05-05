import { Module } from '@nestjs/common'
import { JwtModule, ConfigModule } from '@/globalModules'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../base/users/users.module'
import { UsersService } from '../base/users/users.service'
import { MenusModule, MenusService } from '../base/menus'
import { RoleModule, RoleService } from '../base/roles'

/**
 * 身份认证模块
 *
 * [sample](https://github.com/nestjs/nest/blob/master/sample/19-auth-jwt)
 *
 * @see[认证](http://nestjs.inode.club/security/authentication)
 *
 */
@Module({
	imports: [UsersModule, MenusModule, RoleModule],
	providers: [AuthService, UsersService, MenusService, RoleService],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
