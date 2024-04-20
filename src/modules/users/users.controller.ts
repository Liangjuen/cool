import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { RoleGuard, PermissionGuard, AuthGuard } from '@/guard'
import { Role, Permission, Public } from '@/common/decorator'
import { PERM } from '@/common/permissions'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}

	@Get()
	findAll() {
		return this.userService.findAll()
	}

	@Get(':id')
	@Public()
	@Permission(PERM.Base.UserGet)
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
