import { Module } from '@nestjs/common'
import { RoleService } from './roles.service'
import { RoleController } from './roles.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Role])],
	controllers: [RoleController],
	providers: [RoleService],
	exports: [TypeOrmModule.forFeature([Role])]
})
export class RoleModule {}
