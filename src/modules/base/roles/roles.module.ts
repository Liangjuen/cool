import { Module } from '@nestjs/common'
import { RoleService } from './roles.service'
import { RoleCacheModule } from './cache'
import { RoleChangedListener } from './listeners/role-changed-listener'
import { RoleController } from './roles.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Role]), RoleCacheModule],
	controllers: [RoleController],
	providers: [RoleService, RoleChangedListener],
	exports: [TypeOrmModule.forFeature([Role])]
})
export class RoleModule {}
