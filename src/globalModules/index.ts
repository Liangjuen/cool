import CM from './config.module'
import TOM from './typeorm.module'
import JWTM from './jwt.module'
export { RedisCacheModule } from './redis-cache/redis-cache.module'
export { RedisCacheService } from './redis-cache/redis-cache.service'

export const ConfigModule = CM
export const TypeOrmModule = TOM
export const JwtModule = JWTM
