import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseIntPipe,
	UseGuards,
	Put,
	HttpCode,
	HttpStatus
} from '@nestjs/common'
import { UsersService } from './users.service'
import { QueryUsersDto, CreateUserDto, UpdateUserDto, ResetPasswordDto } from './dto'
import { ParseIntArrayPipe } from '@/common/pipe'
import { PermissionGuard } from '@/guard'
import { Permission } from '@/common/decorator'
import { PERM } from '@/common/permissions'

@Controller({ path: '/base/users' })
@UseGuards(PermissionGuard)
export class UserController {
	constructor(private readonly userService: UsersService) {}

	@Post()
	@Permission(PERM.Base.UserCreate)
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}

	@Get()
	@Permission(PERM.Base.UserList)
	findAll(@Body() pagingQuery: QueryUsersDto) {
		return this.userService.findAll(pagingQuery)
	}

	@Get(':id')
	@Permission(PERM.Base.UserGet)
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.userService.findOne(+id)
	}

	@Put(':id')
	@Permission(PERM.Base.UserUpdate)
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto)
	}

	@Delete(':ids')
	@HttpCode(HttpStatus.NO_CONTENT)
	@Permission(PERM.Base.UserRemove)
	remove(@Param('ids', ParseIntArrayPipe) ids: number[]) {
		return this.userService.remove(ids)
	}

	@Post('/reset/:id')
	@Permission(PERM.Base.UserResetPassword)
	resetPass(@Param('id', ParseIntPipe) id: number, @Body() reset: ResetPasswordDto) {
		return this.userService.resetPass(id, reset)
	}
}
