import { Controller, Get, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { PaginateDto } from '@/common/dto'
import { PERM } from '@/common/permissions'
import { ParseIntArrayPipe } from '@/common/pipe'
import { PermissionGuard } from '@/guard'
import { Permission } from '@/common/decorator'
import { LoginLogsService } from '../services/login-logs.service'

/**
 * 登录日志
 */
@ApiTags('登录日志')
@UseGuards(PermissionGuard)
@Controller('/base/log/login-logs')
export class SysLoginLogsController {
	constructor(private readonly service: LoginLogsService) {}

	@Get()
	@ApiOperation({ summary: '查询登录日志列表' })
	@Permission(PERM.Base.LoginLogList)
	findAll(@Param() pagination: PaginateDto) {
		return this.service.findAll(pagination)
	}

	@Delete(':ids')
	@ApiOperation({ summary: '删除登录日志' })
	@Permission(PERM.Base.LoginLogRemove)
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param('ids', ParseIntArrayPipe) ids: number[]) {
		this.service.delete(ids)
	}
}
