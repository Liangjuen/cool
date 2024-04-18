declare namespace ENV {
	enum Environment {
		Development = 'development',
		Production = 'production',
		Test = 'test'
	}

	enum Protocol {
		Http = 'http',
		Https = 'https'
	}

	type DatabaseType =
		| 'mysql'
		| 'mariadb'
		| 'postgres'
		| 'cockroachdb'
		| 'sqlite'
		| 'mssql'
		| 'sap'
		| 'oracle'
		| 'nativescript'
		| 'react-native'
		| 'sqljs'
		| 'mongodb'
		| 'aurora-data-api'
		| 'aurora-data-api-pg'
		| 'expo'
		| 'better-sqlite3'

	interface AccessToken {
		secret: string
		duration: number
	}

	interface Database {
		type: 'aurora-mysql'
		host: string
		port: number
		username: string
		password: string
		database: string
	}

	interface Redis {
		host: string
		port: number
		username: string
		password: string
		database: string
	}

	interface Mailer {
		host: string
		port: number
		user: string
		pass: string
	}

	interface Qiniu {
		accessKey: string
		secretKey: string
		domain: string
		region: string
		bucket: string
		uploadUrl: string
	}
}
