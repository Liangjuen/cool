import {
	Body,
	Controller,
	Get,
	Delete,
	Put,
	UseGuards,
	Post,
	Query,
	Param,
	ParseIntPipe,
	HttpStatus,
	HttpCode
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { Permission } from '@/common/decorator'
import { PERM } from '@/common/permissions'
import { ParseIntArrayPipe } from '@/common/pipe'
import { PermissionGuard } from '@/guard'
import { StorageCateService } from '../services'
import { CreateStorageCateDto, UpdateStorageCateDto } from '../dto'
import { PaginateDto } from '@/common/dto'

@ApiTags('文件存储分类')
@UseGuards(PermissionGuard)
@Controller('storage-cates')
export class StorageCateController {
	constructor(private readonly service: StorageCateService) {}

	@Post()
	@ApiOperation({ summary: '创建分类' })
	@Permission(PERM.Storage.CateCreate)
	create(@Body() createDto: CreateStorageCateDto) {
		return this.service.create(createDto, {
			uniques: ['name'],
			alias: { name: '分类名称' }
		})
	}

	@Get(':id')
	@ApiOperation({ summary: '查询分类' })
	@Permission(PERM.Storage.CateGet)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.service.findOne(id)
	}

	@Get()
	@ApiOperation({ summary: '查询分类列表' })
	@Permission(PERM.Storage.CateList)
	findAll(@Query() pagination: PaginateDto) {
		return this.service.findAll(pagination)
	}

	@Put(':id')
	@ApiOperation({ summary: '更新分类' })
	@Permission(PERM.Storage.CateUpdate)
	update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateStorageCateDto) {
		return this.service.update(id, updateDto, {
			uniques: ['name'],
			alias: { name: '分类名称' }
		})
	}

	@Delete(':ids')
	@ApiOperation({ summary: '删除分类' })
	@Permission(PERM.Storage.CateRemove)
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param('ids', ParseIntArrayPipe) ids: number[]) {
		this.service.delete(ids)
	}
}
