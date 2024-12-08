import * as UA from 'express-useragent'

export interface IUserAgent extends UA.Details {
	ip: string
	ipAddr: string
}
