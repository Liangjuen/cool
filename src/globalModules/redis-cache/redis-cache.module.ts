import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Transport, ClientProxyFactory } from '@nestjs/microservices'
import { Redis } from 'ioredis'
import { ConfigModule } from '../config.module'
import { RedisCacheService } from './redis-cache.service'
import { Configuration } from '@/config'

@Module({
	imports: [ConfigModule],
	providers: [
		RedisCacheService,
		{
			provide: 'MATH_SERVICE',
			useFactory: (configService: ConfigService<Configuration>) => {
				const { host, password, port, username, database } = configService.get('redis', {
					infer: true
				})
				return ClientProxyFactory.create({
					transport: Transport.REDIS,
					options: {
						host,
						port,
						db: database,
						password,
						username,
						retryAttempts: 3
					}
				})
			},
			inject: [ConfigService]
		},
		Redis
	],
	exports: [RedisCacheService, Redis]
})
export class RedisCacheModule {}
