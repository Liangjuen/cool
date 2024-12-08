import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Put,
	Param,
	Delete,
	UseGuards,
	ParseIntPipe,
	HttpCode,
	HttpStatus
} from '@nestjs/common'
import { SysConfigService } from './sys-config.service'
import { Permission } from '@/common/decorator'
import { PERM } from '@/common/permissions'
import { PermissionGuard } from '@/guard'
import { ParseIntArrayPipe } from '@/common/pipe'
import { PaginateDto } from '@/common/dto'
import { CreateSysConfigDto, UpdateSysConfigDto } from './sys-config.dto'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('系统配置')
@UseGuards(PermissionGuard)
@Controller('/base/sys-config')
export class SysConfigController {
	constructor(private readonly sysConfigService: SysConfigService) {}

	@ApiOperation({ summary: '创建配置' })
	@Permission(PERM.Base.ConfigCreate)
	@Post()
	create(@Body() createSysConfigDto: CreateSysConfigDto) {
		return this.sysConfigService.create(createSysConfigDto, {
			uniques: ['key', 'name'],
			alias: { key: '配置键', name: '配置名' }
		})
	}

	@ApiOperation({ summary: '配置列表' })
	@Permission(PERM.Base.ConfigList)
	@Get()
	findAll(@Body() dto: PaginateDto) {
		return this.sysConfigService.paginate(dto)
	}

	@ApiOperation({ summary: '获取配置' })
	@Permission(PERM.Base.ConfigGet)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.sysConfigService.findOne(id)
	}

	@ApiOperation({ summary: '更新配置' })
	@Permission(PERM.Base.ConfigUpdate)
	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateSysConfigDto: UpdateSysConfigDto) {
		return this.sysConfigService.update(id, updateSysConfigDto, {
			uniques: ['key', 'name'],
			alias: { key: '配置键', name: '配置名' }
		})
	}

	@ApiOperation({ summary: '删除配置' })
	@Permission(PERM.Base.ConfigRemove)
	@Delete(':ids')
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param('ids', ParseIntArrayPipe) ids: number[]) {
		return this.sysConfigService.delete(ids)
	}
}
