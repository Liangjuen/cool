import { Controller, UseGuards, Get, Query, Param, ParseIntPipe, Post, Body } from '@nestjs/common'
import { DictTypeService } from './types.service'
import { CreateDictTypeDto, UpdateDictTypeDto, PaginateDto } from './dto'
import { ParseIntArrayPipe } from '@/common/pipe'
import { PERM } from '@/common/permissions'
import { Permission } from '@/common/decorator'
import { PermissionGuard } from '@/guard'

@UseGuards(PermissionGuard)
@Controller('dictTypes')
export class DictTypeController {
	constructor(public service: DictTypeService) {}

	@Get(':id')
	@Permission(PERM.Dict.TypeGet)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.service.findOne(+id)
	}

	@Get()
	@Permission(PERM.Dict.TypeList)
	findAll(@Query() pagination: PaginateDto) {
		return this.service.findAll(pagination)
	}

	@Post()
	@Permission(PERM.Dict.TypeCreate)
	create(@Body() createDictTypeDto: CreateDictTypeDto) {
		return this.service.create(createDictTypeDto)
	}
}
