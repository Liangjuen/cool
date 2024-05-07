import {
	Body,
	Controller,
	Get,
	Delete,
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
import { StorageService } from '../services'
import { PaginateStorageDto, StorageMoveDto } from '../dto'

@ApiTags('文件存储')
@UseGuards(PermissionGuard)
@Controller('storages')
export class StorageController {
	constructor(private readonly storageService: StorageService) {}

	@Get(':id')
	@ApiOperation({ summary: '查询存储信息' })
	@Permission(PERM.Storage.Get)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.storageService.findOne(id)
	}

	@Get()
	@ApiOperation({ summary: '查询存储列表' })
	@Permission(PERM.Storage.List)
	findAll(@Body() pagination: PaginateStorageDto) {
		return this.storageService.list(pagination)
	}

	@Delete(':ids')
	@ApiOperation({ summary: '删除文件' })
	@Permission(PERM.Storage.Remove)
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param('ids', ParseIntArrayPipe) ids: number[]) {
		this.storageService.delete(ids)
	}

	@Post('move')
	@Permission(PERM.Storage.Move)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: '移动文件' })
	move(@Body() dto: StorageMoveDto) {
		return this.storageService.move(dto.ids, dto.cateId)
	}
}
