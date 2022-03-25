// #ifdef H5
// h5端
import Fly from 'flyio/dist/npm/fly'
// #endif

// #ifdef APP-PLUS || MP-WEIXIN
// app端
import Fly from 'flyio/dist/npm/wx'
// #endif   

import {
  DEVELOPMENT_API,
  PRODUCTION_API
} from '@/config/index.js'

import dayjs from 'dayjs';

let instance = new Fly()
let baseURL = '/api'

if (process.env.NODE_ENV === 'development') {
  baseURL = DEVELOPMENT_API + baseURL
  console.log('开发环境', baseURL)
} else {
  baseURL = PRODUCTION_API + baseURL
  console.log('生产环境', baseURL)
}

//设置超时
instance.config.timeout = 3000;
//设置请求基地址
instance.config.baseURL = baseURL

// 添加请求拦截器
instance.interceptors.request.use((request) => {
  // 在发送请求之前做些什么
  console.log("interceptors.request", request)
  const token = uni.getStorageSync('token')
  if (token) {
    const expires_time = uni.getStorageSync('expires_time')
    const now = dayjs().valueOf()
    if (now > expires_time) {
      uni.clearStorageSync();
      uni.navigateTo({
        url: '/pages/user/login/index'
      })
    }
    request.headers['token'] = token
  }
  return request
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  // 对响应数据做些事
  console.log("interceptors.response", response)
  const res = response.data
  console.log("interceptors.response.data", res)
  if (res.status !== 200) {
    uni.showToast({
      title: res.msg,
      icon: "none"
    })
  }
  return response
}, (error) => {
  console.log("interceptors.response.error", error)
  return Promise.reject(error)
})

export function get(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
