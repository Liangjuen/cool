import { Injectable, Logger } from '@nestjs/common'
import { NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		// 其它操作...

		const logger = new Logger()
		logger.verbose(`${req.path}`, req.method)
		next()
	}
}
