import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	ParseIntPipe,
	Param,
	Delete,
	UseGuards,
	HttpCode,
	HttpStatus
} from '@nestjs/common'
import { RoleService } from './roles.service'
import { QueryRolesDto, CreateRoleDto, UpdateRoleDto } from './dto'
import { ParseIntArrayPipe } from '@/common/pipe'
import { PermissionGuard } from '@/guard'
import { Permission } from '@/common/decorator'
import { PERM } from '@/common/permissions'
import { ApiTags } from '@nestjs/swagger'

@Controller({ path: '/base/roles' })
@UseGuards(PermissionGuard)
@ApiTags('用户')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	@Permission(PERM.Base.RoleCreate)
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.create(createRoleDto)
	}

	@Get()
	@Permission(PERM.Base.RoleGet)
	findAll(@Body() queryRoles: QueryRolesDto) {
		return this.roleService.findAll(queryRoles)
	}

	@Get(':id')
	@Permission(PERM.Base.RoleList)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.roleService.findOne(id)
	}

	@Put(':id')
	@Permission(PERM.Base.RoleUpdate)
	update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
		return this.roleService.update(id, updateRoleDto)
	}

	@Delete(':ids')
	@HttpCode(HttpStatus.NO_CONTENT)
	@Permission(PERM.Base.RoleRemove)
	remove(@Param('ids', ParseIntArrayPipe) ids: number[]) {
		return this.roleService.remove(ids)
	}
}
