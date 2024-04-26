import CM from './config.module'
import TOM from './typeorm.module'
import JWTM from './jwt.module'
import EEM from './event.emitter.module'
export * from './redis-cache/redis-cache.module'
export * from './redis-cache/redis-cache.service'
export * from './logger.module'

export const ConfigModule = CM
export const TypeOrmModule = TOM
export const JwtModule = JWTM
export const EventEmitterModule = EEM
