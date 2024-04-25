import { Test, TestingModule } from '@nestjs/testing'
import { PermsService } from './perms.service'

describe('PermsService', () => {
	let service: PermsService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PermsService]
		}).compile()

		service = module.get<PermsService>(PermsService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
