import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dict, DictType } from './entities'
import { DictsService, DictTypeService } from './services'
import { DictsController, DictTypeController } from './controllers'

@Module({
	imports: [TypeOrmModule.forFeature([Dict, DictType])],
	controllers: [DictsController, DictTypeController],
	providers: [DictsService, DictTypeService],
	exports: [TypeOrmModule.forFeature([Dict, DictType])]
})
export class DictModule {}
