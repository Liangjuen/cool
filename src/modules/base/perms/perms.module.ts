import { Module } from '@nestjs/common'
import { PermsController } from './perms.controller'
import { PermsService } from './perms.service'

@Module({
	controllers: [PermsController],
	providers: [PermsService]
})
export class PermsModule {}
