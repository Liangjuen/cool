import {
	Controller,
	UseGuards,
	Delete,
	Get,
	Query,
	Put,
	Param,
	ParseIntPipe,
	Post,
	Body,
	HttpCode,
	HttpStatus
} from '@nestjs/common'
import { DictTypeService } from './types.service'
import { CreateDictTypeDto, UpdateDictTypeDto, PaginateDto } from './dto'
import { ParseIntArrayPipe } from '@/common/pipe'
import { PERM } from '@/common/permissions'
import { Permission } from '@/common/decorator'
import { PermissionGuard } from '@/guard'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@UseGuards(PermissionGuard)
@ApiTags('字典类型')
@Controller('dictTypes')
export class DictTypeController {
	constructor(public service: DictTypeService) {}

	@Get(':id')
	@ApiOperation({ summary: '查询字典类型' })
	@Permission(PERM.Dict.TypeGet)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.service.findOne(+id)
	}

	@Get()
	@ApiOperation({ summary: '查询字典类型列表' })
	@Permission(PERM.Dict.TypeList)
	findAll(@Query() pagination: PaginateDto) {
		return this.service.findAll(pagination)
	}

	@Post()
	@ApiOperation({ summary: '创建字典类型' })
	@Permission(PERM.Dict.TypeCreate)
	create(@Body() createDictTypeDto: CreateDictTypeDto) {
		return this.service.create(createDictTypeDto, {
			uniques: ['name', 'key'],
			alias: { name: '字典类型名称', key: '字典类型 key' }
		})
	}

	@Put(':id')
	@ApiOperation({ summary: '更新字典类型' })
	@Permission(PERM.Dict.TypeUpdate)
	update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDictTypeDto) {
		return this.service.update(id, updateDto, {
			uniques: ['name', 'key'],
			alias: { name: '字典类型名称', key: '字典类型 key' }
		})
	}

	@Delete('ids')
	@ApiOperation({ summary: '删除字典类型' })
	@Permission(PERM.Dict.TypeRemove)
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param('ids', ParseIntArrayPipe) ids: number[]) {
		this.service.delete(ids)
	}
}
