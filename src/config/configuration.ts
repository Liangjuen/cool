import { join } from 'path'
import { ConfigModuleOptions } from '@nestjs/config'
import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'

import { envFileName } from './env'
import { validate, EnvironmentVariables } from './configDto'

interface Configuration extends EnvironmentVariables {}

/**
 * 加载 .yaml 文件配置
 * @returns
 */
export const load = () => {
	const config = yaml.load(
		readFileSync(join(process.cwd(), 'config/', envFileName() + '.yaml'), 'utf8')
	)

	validate(config)

	return config as Configuration
}

/**
 * `configuration`
 */
export const configuration: Configuration = load()

/**
 * `config` 模块配置项
 */
export const configModuleOptions: ConfigModuleOptions = {
	isGlobal: true,
	load: [load],
	cache: true
}
