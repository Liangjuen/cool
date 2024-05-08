import { join } from 'path'
import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'

import { envFileName } from './env'
import { validate, ConfigDto } from './configDto'

export interface Configuration extends ConfigDto {}

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
