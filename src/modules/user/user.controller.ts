import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { RoleGuard, PermissionGuard } from '@/guard'
import { Role, Permission } from '@/common/decorator'
import { PERM } from '@/common/permissions'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}

	@Get()
	findAll() {
		return this.userService.findAll()
	}

	@Get(':id')
	@Role('admin')
	@Permission(PERM.Base.UserGet)
	@UseGuards(RoleGuard, PermissionGuard)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.userService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto)
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.userService.remove(+id)
	}
}
