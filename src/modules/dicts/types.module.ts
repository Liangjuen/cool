import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DictType } from './entities/type.entity'
import { DictTypeController } from './types.controller'
import { DictTypeService } from './types.service'

@Module({
	imports: [TypeOrmModule.forFeature([DictType])],
	controllers: [DictTypeController],
	providers: [DictTypeService],
	exports: [TypeOrmModule.forFeature([DictType]), DictTypeService]
})
export class DictTypeModule {}
