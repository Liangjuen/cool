import { ConfigDto } from './configDto'

export type ConfigRegToken = { [key in keyof ConfigDto]: key }

/**
 * 配置注册 token
 */
export const configRegToken: ConfigRegToken = {
	env: 'env',
	authorized: 'authorized',
	database: 'database',
	app: 'app',
	accessToken: 'accessToken',
	redis: 'redis',
	mailer: 'mailer',
	file: 'file',
	qiniu: 'qiniu',
	upload: 'upload'
}
