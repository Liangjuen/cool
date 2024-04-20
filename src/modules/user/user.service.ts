import { Injectable, Inject } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

	create(createUserDto: CreateUserDto) {
		return createUserDto
	}

	findAll() {}

	findOne(id: number) {}

	update(id: number, updateUserDto: UpdateUserDto) {}

	remove(id: number) {}
}
