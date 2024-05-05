import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dict } from './entities/dict.entity'
import { DictsService } from './dicts.service'
import { DictsController } from './dicts.controller'

@Module({
	imports: [TypeOrmModule.forFeature([Dict])],
	controllers: [DictsController],
	providers: [DictsService],
	exports: [TypeOrmModule.forFeature([Dict])]
})
export class DictsModule {}
