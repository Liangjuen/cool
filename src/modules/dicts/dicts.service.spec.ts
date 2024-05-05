import { Test, TestingModule } from '@nestjs/testing'
import { DictsService } from './dicts.service'

describe('DictsService', () => {
	let service: DictsService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DictsService]
		}).compile()

		service = module.get<DictsService>(DictsService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
