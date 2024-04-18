import { ConfigModule } from '@nestjs/config'
import config from '@/config'

const { configuration } = config

export default ConfigModule.forRoot(configuration)
