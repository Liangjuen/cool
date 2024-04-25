import { Test, TestingModule } from '@nestjs/testing'
import { RoleController } from './roles.controller'
import { RoleService } from './roles.service'

describe('RoleController', () => {
	let controller: RoleController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RoleController],
			providers: [RoleService]
		}).compile()

		controller = module.get<RoleController>(RoleController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
