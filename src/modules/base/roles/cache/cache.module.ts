import { Module, Logger, Global } from '@nestjs/common'
import { RedisCacheModule, RedisCacheService } from '@/globalModules'
import { RoleCacheService } from './cache.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from '../entities/role.entity'

@Global()
@Module({
	imports: [RedisCacheModule, TypeOrmModule.forFeature([Role])],
	providers: [RedisCacheService, Logger, RoleCacheService],
	exports: [RedisCacheModule, Logger, TypeOrmModule.forFeature([Role]), RoleCacheService]
})
export class RoleCacheModule {}
