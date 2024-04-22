import { Module } from '@nestjs/common'
import { JwtModule, ConfigModule } from '@/globalModules'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../base/users/users.module'
import { UsersService } from '../base/users/users.service'

/**
 * 身份认证模块
 *
 * [sample](https://github.com/nestjs/nest/blob/master/sample/19-auth-jwt)
 *
 * @see[认证](http://nestjs.inode.club/security/authentication)
 *
 */
@Module({
	imports: [ConfigModule, JwtModule, UsersModule],
	providers: [AuthService, UsersService],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {
	constructor(private usersService: UsersService) {}
}
