import { Test, TestingModule } from '@nestjs/testing'
import { DictsController } from './dicts.controller'
import { DictsService } from './dicts.service'

describe('DictsController', () => {
	let controller: DictsController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DictsController],
			providers: [DictsService]
		}).compile()

		controller = module.get<DictsController>(DictsController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
