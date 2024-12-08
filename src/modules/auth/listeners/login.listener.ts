import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { LoginSuccessEvent, LoginFailedEvent } from '../events'
import { LoginLogsService, LoginState } from '@/modules/base/log'
import { LOGIN_SUCCESS_EVENT, LOGIN_FAILED_EVENT } from '@/common/constants'
import { IUserAgent } from '../auth.interface'

/**
 * 登录事件监听器
 */
@Injectable()
export class LoginListener {

    constructor(private readonly loginLogsService: LoginLogsService) {}

    /**
     * 登录成功
     */
    @OnEvent(LOGIN_SUCCESS_EVENT)
    async handleLoginSuccessEvent(payload: LoginSuccessEvent, userAgent: IUserAgent) {
        const { username, userId, message  } = payload
        const { isMobile, browser, os, ip, ipAddr } = userAgent
        await this.loginLogsService.create({
            isMobile,
            username,
            browser,
            message,
            userId,
            os,
            ip,
            ipAddr,
            loginState: LoginState.success
        })
    }

    /**
     * 登录失败
     */
    @OnEvent(LOGIN_FAILED_EVENT)
    async handleLoginFailedEvent(payload: LoginFailedEvent, userAgent: IUserAgent) {
        const { username, message  } = payload
        const { isMobile, browser, os, ip, ipAddr } = userAgent
        await this.loginLogsService.create({
            isMobile,
            username,
            browser,
            message,
            userId: null,
            os,
            ip,
            ipAddr,
            loginState: LoginState.failed
        })
    }

}