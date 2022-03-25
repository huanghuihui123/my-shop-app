import {
  get,
  post
} from './http.js'

/**
 * 微信小程序登录
 */
export const wxappAuth = (data) => post('/wxapp/auth', data)

/**
 * 用户账号密码登录
 */
export const login = data => post('/login', data)

/**
 * 用户手机号登录
 */
export const loginMobile = data => post('/login/mobile', data)

/**
 * 用户发送验证码
 */
export const registerVerify = (data) => post('/register/verify', data)

/**
 * 用户手机号注册
 */
export const register = (data) => post('/register', data)
