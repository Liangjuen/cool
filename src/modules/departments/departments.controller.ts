import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { DepartmentsService } from './departments.service'
import { CreateDepartmentDto } from './dto/create-department.dto'
import { UpdateDepartmentDto } from './dto/update-department.dto'

@Controller('department')
export class DepartmentsController {
	constructor(private readonly departmentService: DepartmentsService) {}

	@Post()
	create(@Body() createDepartmentDto: CreateDepartmentDto) {
		return this.departmentService.create(createDepartmentDto)
	}

	@Get()
	findAll() {
		return this.departmentService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.departmentService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
		return this.departmentService.update(+id, updateDepartmentDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.departmentService.remove(+id)
	}
}
