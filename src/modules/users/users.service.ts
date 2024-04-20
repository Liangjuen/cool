import { Injectable, Inject } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from './entities/users.entity'

@Injectable()
export class UsersService {
	constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>) {}

	create(createUserDto: CreateUserDto) {
		return createUserDto
	}

	findAll() {}

	findOne(id: number) {}

	update(id: number, updateUserDto: UpdateUserDto) {}

	remove(id: number) {}
}
