import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '../base/users/users.service'
import { LoginDto } from './dto/login.dto'
import { Public } from '@/common/decorator'
import { ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('身份认证')
export class AuthController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService
	) {}

	@Post('/login')
	@Public()
	public signIn(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto.username, loginDto.password)
	}
}
