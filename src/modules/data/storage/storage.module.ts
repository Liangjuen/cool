import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StorageController, StorageCateController } from './controllers'
import { StorageService, StorageCateService } from './services'
import { Storage, StorageCategory } from './entities'
import { User } from '@/modules/base/users/entities/user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([User, Storage, StorageCategory])],
	controllers: [StorageController, StorageCateController],
	providers: [StorageService, StorageCateService],
	exports: [
		TypeOrmModule.forFeature([User, Storage, StorageCategory]),
		StorageService,
		StorageCateService
	]
})
export class StorageModule {}
