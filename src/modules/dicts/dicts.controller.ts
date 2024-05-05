import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { DictsService } from './dicts.service'
import { CreateDictDto } from './dto/create-dict.dto'
import { UpdateDictDto } from './dto/update-dict.dto'

@Controller('dicts')
export class DictsController {
	constructor(private readonly dictsService: DictsService) {}

	@Post()
	create(@Body() createDictDto: CreateDictDto) {
		return this.dictsService.create(createDictDto)
	}

	@Get()
	findAll() {
		return this.dictsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.dictsService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateDictDto: UpdateDictDto) {
		return this.dictsService.update(+id, updateDictDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.dictsService.remove(+id)
	}
}
