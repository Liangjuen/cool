import { Module } from '@nestjs/common'
import { JwtModule } from '@/globalModules'
import { UsersService } from './users.service'
import { UserController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './entities/users.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Users])],
	controllers: [UserController],
	providers: [UsersService],
	exports: [TypeOrmModule.forFeature([Users])]
})
export class UsersModule {}
