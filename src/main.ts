import { join } from 'node:path'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { configuration } from '@/config'

const {
	app: { port }
} = configuration

const logger = new Logger()

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ['warn', 'error', 'verbose']
	})

	/**
	 * 启用CORS
	 */
	app.enableCors({ origin: '*', credentials: true })

	/**
	 * swagger 生成
	 */
	const config = new DocumentBuilder()
		.setTitle('cool')
		.setDescription('cool API 文档')
		.setVersion('1.0')
		.addTag('cool')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('doc', app, document)

	/**
	 * 校验错误管道
	 */
	app.useGlobalPipes(new ValidationPipe())

	/**
	 * 静态资源托管
	 */
	app.useStaticAssets(join(process.cwd(), 'public'))

	/**
	 * 启动服务监听
	 */
	await app.listen(port)

	logger.verbose(`Application is running on: http://localhost:${port}`, 'Bootstrap')
}
bootstrap()
