import { TypeOrmModule as TOM } from '@nestjs/typeorm'
import { dataSourceOptions } from '@/config'

/**
 * typeorm 模块
 */
export const TypeOrmModule = TOM.forRootAsync({
	imports: [],
	inject: [],
	useFactory: () => ({
		...dataSourceOptions,
		// autoLoadEntities: true, // 自动加载实体
		retryDelay: 500, // 重连数据库时间间隔
		retryAttempts: 1 //重连数据库次数
	})
})
