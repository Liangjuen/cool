import {
	Controller,
	Get,
	Put,
	Post,
	Body,
	Query,
	Param,
	Delete,
	ParseIntPipe,
	UseGuards,
	HttpCode,
	HttpStatus
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { PERM } from '@/common/permissions'
import { ParseIntArrayPipe } from '@/common/pipe'
import { PermissionGuard } from '@/guard'
import { Permission } from '@/common/decorator'
import { DictsService } from '../services'
import { CreateDictDto, UpdateDictDto, PaginateDto } from '../dto'

@ApiTags('字典')
@UseGuards(PermissionGuard)
@Controller('dicts')
export class DictsController {
	constructor(private readonly service: DictsService) {}

	@Post()
	@ApiOperation({ summary: '创建字典' })
	@Permission(PERM.Dict.List)
	create(@Body() createDictDto: CreateDictDto) {
		return this.service.create(createDictDto, {
			uniques: ['name'],
			alias: { name: '字典名称' }
		})
	}

	@Get()
	@ApiOperation({ summary: '查询字典列表' })
	@Permission(PERM.Dict.List)
	findAll(@Query() pagination: PaginateDto) {
		return this.service.findAll(pagination)
	}

	@Get(':id')
	@ApiOperation({ summary: '查询字典' })
	@Permission(PERM.Dict.Get)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.service.findOne(id)
	}

	@Put(':id')
	@ApiOperation({ summary: '更新字典' })
	@Permission(PERM.Dict.Update)
	update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDictDto) {
		return this.service.update(id, updateDto, {
			uniques: ['name'],
			alias: { name: '字典名称' }
		})
	}

	@Delete(':ids')
	@ApiOperation({ summary: '删除字典' })
	@Permission(PERM.Dict.Remove)
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param('ids', ParseIntArrayPipe) ids: number[]) {
		this.service.delete(ids)
	}
}
