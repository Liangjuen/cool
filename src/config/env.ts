/**
 * 判断当前环境是否为 `development`
 */
export const isDev = () => process.env.NODE_ENV === 'development'

/**
 * 判断当前环境是否为 `production`
 */
export const isProd = () => process.env.NODE_ENV === 'production'

/**
 * 判断当前环境是否为 `test`
 */
export const isTest = () => process.env.NODE_ENV === 'test'

/**
 * 当前要加载的环境文件名
 */
export const envFileName = () => (isTest() ? 'test' : isProd() ? 'production' : 'development')
