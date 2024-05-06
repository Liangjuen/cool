declare interface Payload {
	username: string
	roles: string[]
	id: number
	[key: string]: any
}

declare const USERPAYLOAD = 'user'
