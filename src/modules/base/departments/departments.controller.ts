import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	UseGuards,
	HttpCode,
	HttpStatus
} from '@nestjs/common'
import { PermissionGuard } from '@/guard'
import { Permission } from '@/common/decorator'
import { DepartmentsService } from './departments.service'
import { PaginateDto } from '@/common/dto'
import { ParseIntArrayPipe } from '@/common/pipe'
import { CreateDepartmentDto } from './dto/create-department.dto'
import { UpdateDepartmentDto } from './dto/update-department.dto'
import { PERM } from '@/common/permissions'
import { ApiTags } from '@nestjs/swagger'

@Controller({ path: '/base/departments' })
@UseGuards(PermissionGuard)
@ApiTags('部门')
export class DepartmentsController {
	constructor(private readonly departmentService: DepartmentsService) {}

	@Post()
	create(@Body() createDepartmentDto: CreateDepartmentDto) {
		return this.departmentService.create(createDepartmentDto)
	}

	@Get()
	findAll(@Body() Paginate: PaginateDto) {
		return this.departmentService.findAll(Paginate)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.departmentService.findOne(+id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
		return this.departmentService.update(+id, updateDepartmentDto)
	}

	@Delete(':ids')
	@HttpCode(HttpStatus.NO_CONTENT)
	@Permission(PERM.Base.DepartmentRemove)
	remove(@Param('ids', ParseIntArrayPipe) ids: number[]) {
		return this.departmentService.remove(ids)
	}
}
