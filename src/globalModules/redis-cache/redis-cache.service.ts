import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

/**
 * Redis 缓存服务
 */
@Injectable()
export class RedisCacheService {
	constructor(private readonly redis: Redis) {}

	/**
	 * Redis 客户端引擎
	 */
	get engine() {
		return this.redis
	}

	/**
	 * 获取缓存内容
	 * @param key 键
	 * @returns
	 */
	async get<T>(key: string) {
		const res = await this.redis.get(key)
		return JSON.parse(res) as T
	}

	/**
	 * 设置缓存
	 * @param key 键
	 * @param value 值
	 * @param ttl 存活时间(time to live)
	 */
	async set<T>(key: string, value: T, ttl: number) {
		const result = await this.redis.set(key, JSON.stringify(value))
		if (ttl > 0) await this.redis.expire(key, ttl)
		return result
	}

	/**
	 * 删除指定的缓存内容
	 * @param key 键
	 * @returns
	 */
	async del(key: string) {
		return this.redis.del(key)
	}

	/**
	 * 获取所有缓存的键
	 * @returns
	 */
	async getKeys(): Promise<string[]> {
		// 使用 * 通配符获取所有键
		return this.redis.keys('*')
	}

	/**
	 * 清空所有缓存
	 * @returns
	 */
	async flush() {
		return this.redis.reset()
	}
}
