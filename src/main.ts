import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter, ResponseInterceptor } from '@/common/global'
import { AppModule } from './app.module'
import { AuthGuard } from '@/guard'
async function bootstrap() {
	const app = await NestFactory.create(AppModule)

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
	 * 全局守卫
	 */
	app.useGlobalGuards(new AuthGuard())

	/**
	 * 校验错误管道
	 */
	app.useGlobalPipes(new ValidationPipe())

	/**
	 * 响应拦截(定义接口返回数据格式)
	 */
	app.useGlobalInterceptors(new ResponseInterceptor())

	/**
	 * 全局异常过滤器
	 */
	app.useGlobalFilters(new HttpExceptionFilter())

	/**
	 * 启动服务监听
	 */
	await app.listen(3000)
}
bootstrap()
