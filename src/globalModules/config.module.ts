import { ConfigModule } from '@nestjs/config'
import { configModuleOptions } from '@/config'

export default ConfigModule.forRoot(configModuleOptions)
