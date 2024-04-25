import { Injectable } from '@nestjs/common'
import { perms } from '@/common/permissions'

@Injectable()
export class PermsService {
	async findAll() {
		return perms
	}
}
