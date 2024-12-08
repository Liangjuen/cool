import {
	Controller,
	Post,
	Body,
	Request,
	Ip
} from '@nestjs/common'
import { Request as Req } from 'express'
import * as UserAgent from 'express-useragent'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Public } from '@/common/decorator'
import { ApiTags } from '@nestjs/swagger'
import IP2Region from 'ip2region'

@Controller('auth')
@ApiTags('身份认证')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) {}

	@Post('/login')
	@Public()
	public async signIn(@Body() loginDto: LoginDto, @Request() req: Req, @Ip() ip: string) {

		const userAgent = UserAgent.parse(req.headers['user-agent'])

		// 创建查询器
		const query = new IP2Region()
		// 获取ip地区信息
		const ipAddr = query.search(ip).city

		return this.authService.login(loginDto, {...userAgent, ip, ipAddr})
	}
}
