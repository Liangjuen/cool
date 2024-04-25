import {
	Controller,
	Get,
	Post,
	Body,
	ParseIntPipe,
	Param,
	Delete,
	UseGuards,
	Put,
	HttpCode,
	HttpStatus
} from '@nestjs/common'
import { MenusService } from './menus.service'
import { CreateMenuDto, UpdateMenuDto, QueryMenusDto } from './dto'
import { ParseIntArrayPipe } from '@/common/pipe'
import { PermissionGuard } from '@/guard'
import { Permission } from '@/common/decorator'
import { PERM } from '@/common/permissions'
import { ApiTags } from '@nestjs/swagger'

@Controller({ path: '/base/menus' })
@UseGuards(PermissionGuard)
@ApiTags('菜单')
export class MenusController {
	constructor(private readonly menusService: MenusService) {}

	@Post()
	@Permission(PERM.Base.MenuCreate)
	create(@Body() createMenuDto: CreateMenuDto) {
		return this.menusService.create(createMenuDto)
	}

	@Get()
	@Permission(PERM.Base.MenuList)
	findAll(@Body() pagingQuery: QueryMenusDto) {
		return this.menusService.findAll(pagingQuery)
	}

	@Get(':id')
	@Permission(PERM.Base.MenuGet)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.menusService.findOne(id)
	}

	@Put(':id')
	@Permission(PERM.Base.MenuUpdate)
	update(@Param('id', ParseIntPipe) id: number, @Body() updateMenuDto: UpdateMenuDto) {
		return this.menusService.update(id, updateMenuDto)
	}

	@Delete(':ids')
	@HttpCode(HttpStatus.NO_CONTENT)
	@Permission(PERM.Base.MenuRemove)
	remove(@Param('ids', ParseIntArrayPipe) ids: number[]) {
		return this.menusService.remove(ids)
	}
}
