import { Test, TestingModule } from '@nestjs/testing'
import { PermsController } from './perms.controller'

describe('PermsController', () => {
	let controller: PermsController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PermsController]
		}).compile()

		controller = module.get<PermsController>(PermsController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
