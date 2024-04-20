import { Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'

@Controller('auth')
export class AuthController {
	constructor(
		// private readonly userService: UserService,
		private readonly authService: AuthService
	) {}
	@Post('/login')
	login() {}
}
