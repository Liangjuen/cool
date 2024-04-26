import { Module } from '@nestjs/common'
import { MenusService } from './menus.service'
import { MenusController } from './menus.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Menu } from './entities/menu.entity'
import { RoleModule, RoleService } from '../roles'

@Module({
	imports: [RoleModule, TypeOrmModule.forFeature([Menu])],
	providers: [RoleService, MenusService],
	controllers: [MenusController],
	exports: [TypeOrmModule.forFeature([Menu])]
})
export class MenusModule {}
