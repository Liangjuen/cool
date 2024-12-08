
/**
 * 登录成功 event
 */
export class LoginSuccessEvent  {
    username: string
    userId: number
    message: string
}

/**
 * 登录失败event
 */
export class LoginFailedEvent extends LoginSuccessEvent {
    
}