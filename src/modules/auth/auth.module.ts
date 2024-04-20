import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserService } from '../user/user.service'

@Module({
	providers: [AuthService],
	controllers: [AuthController]
})
export class AuthModule {
	// constructor(private userService: UserService) {}
}
