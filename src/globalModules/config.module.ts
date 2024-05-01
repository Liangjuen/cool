import { ConfigModule as CM } from '@nestjs/config'
import { load } from '@/config'

export const ConfigModule = CM.forRoot({
	isGlobal: true,
	load: [load],
	cache: true
})
