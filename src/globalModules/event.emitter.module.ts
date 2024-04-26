import { EventEmitterModule } from '@nestjs/event-emitter'

export default EventEmitterModule.forRoot({
	// 将此设置为“true”以使用通配符
	wildcard: false,
	// 用于分隔名称空间的分隔符
	delimiter: '.',
	// 如果你想要触发newListener事件，将这个设置为true
	newListener: false,
	// 如果你想要发出removeListener事件，将这个设置为true
	removeListener: false,
	// 可以分配给事件的侦听器的最大数量
	maxListeners: 10,
	// 当分配的侦听器超过最大数量时，在内存泄漏消息中显示事件名称
	verboseMemoryLeak: false,
	// 如果发出错误事件并且没有侦听器，则禁用抛出未捕获异常(uncaughtException)
	ignoreErrors: false
})
