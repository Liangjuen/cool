import { configuration } from './configuration'
import { isDev, isProd, isTest, envFileName } from './env'
import { guard } from './guard'

export default {
	configuration,
	guard,
	isDev,
	isProd,
	isTest,
	envFileName
}
