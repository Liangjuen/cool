import { Module } from '@nestjs/common'
import { DepartmentsService } from './departments.service'
import { DepartmentsController } from './departments.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Department } from './entities/department.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Department])],
	controllers: [DepartmentsController],
	providers: [DepartmentsService],
	exports: [TypeOrmModule.forFeature([Department])]
})
export class DepartmentModule {}
