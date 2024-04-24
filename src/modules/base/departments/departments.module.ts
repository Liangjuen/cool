import { Module } from '@nestjs/common'
import { DepartmentsService } from './departments.service'
import { DepartmentsController } from './departments.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Departments } from './entities/departments.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Departments])],
	controllers: [DepartmentsController],
	providers: [DepartmentsService],
	exports: [TypeOrmModule.forFeature([Departments])]
})
export class DepartmentModule {}
