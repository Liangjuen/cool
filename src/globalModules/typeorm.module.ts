import { ConfigService } from '@nestjs/config'
import { TypeOrmModule as TOM } from '@nestjs/typeorm'
import { ConfigModule } from './config.module'
import { isProd } from '@/config'

/**
 * typeorm 模块
 */
export const TypeOrmModule = TOM.forRootAsync({
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: (configService: ConfigService) => ({
		...configService.get('database'),
		synchronize: !isProd(), // 自动实体类同步到数据库
		autoLoadEntities: true, // 自动加载实体
		retryDelay: 500, // 重连数据库时间间隔
		retryAttempts: 1 //重连数据库次数
	})
})
