import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { MigrationInterface, QueryRunner } from 'typeorm'

const sql = readFileSync(join(process.cwd(), 'prod.init.sql'), 'utf8')

export class Init1715275594462 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(sql)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
