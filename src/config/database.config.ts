import { DataSource, DataSourceOptions } from 'typeorm'
import { load } from './configuration'
import { isProd } from './env'

const { username, password, database, host, port, synchronize } = load().database

export const dataSourceOptions: DataSourceOptions = {
	type: 'mysql',
	host,
	port,
	username,
	password,
	database,
	synchronize: isProd() ? false : !!synchronize,
	entities: ['dist/modules/**/*.entity.{ts,js}'],
	migrations: ['dist/migrations/**/*.{ts,js}'],
	subscribers: ['dist/modules/**/*.subscriber.{ts,js}']
}

export default new DataSource(dataSourceOptions)
