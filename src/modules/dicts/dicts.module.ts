import { Module } from '@nestjs/common'
import { DictsService } from './dicts.service'
import { DictsController } from './dicts.controller'

@Module({
	controllers: [DictsController],
	providers: [DictsService]
})
export class DictsModule {}
