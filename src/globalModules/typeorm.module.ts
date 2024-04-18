import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import ConfigModule from './config.module'
import config from '@/config'

const { isProd } = config

export default TypeOrmModule.forRootAsync({
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
