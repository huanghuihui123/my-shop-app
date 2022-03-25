// 获取当前环境的服务商
export const getProvider = (service = 'oauth') => {
  return new Promise((resolve, reject) => {
    uni.getProvider({
      service,
      success: function(res) {
        // 此处可以排除h5
        if (res.provider) {
          resolve(res.provider[0])
        }
      },
      fail() {
        reject('获取环境服务商失败')
      },
    })
  })
}

// 第三方登录，默认微信登录
export const wxLogin = (provider = 'weixin') => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider,
      success: function(res) {
        console.log(res)
        // res: {
        //   "authResult": {
        //     "access_token": "54_wcr7A4j2i9EUmucEEC0nz9_R4H9_VR8oBSmJa0Qom9qBWD4RsJVa1lCx5dYsJan-p67XNjHpP8My59MdE2xAA7tA1WhZPQR310HqyzZVb7M",
        //     "expires_in": 7200,
        //     "refresh_token": "54_mJclMjLmRLYazpMBmp9oYNvkvlYhaoVPgWbhCQh0JR7fQ_XfXwbHkBSJnek-2i3th5J6YT2Xvi0S-695VldXD1m11kvQ0Gmb-hm5g40pzBs",
        //     "openid": "oRrdQt1J9H_OYs9MdrOiknKHvu_g",
        //     "scope": "snsapi_userinfo",
        //     "unionid": "oU5Yyt8bgT6LCSYzy2tKBy7QvG5I"
        //   },
        //   "errMsg": "login:ok"
        // }
        resolve(res)
      },
      fail: function(err) {
        console.log(err)
        reject(err)
      }
    })
  })
}

// 获取第三方用户信息，默认获取微信用户微信
export const getWxUserInfo = (provider = 'weixin') => {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      provider,
      success: function(res) {
        // res: {
        //   "errMsg": "getUserInfo:ok",
        //   "userInfo": {
        //     "openId": "oRrdQt1J9H_OYs9MdrOiknKHvu_g",
        //     "nickName": "丶",
        //     "gender": 0,
        //     "city": "",
        //     "province": "",
        //     "country": "",
        //     "avatarUrl": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKiaPmJHpp5GQCKk5uAGEm72JXUYFiajjV7N4wUhdnM9opGtyrHQYQSHzNEWHqyu32gNUVlHt2OmDCg/132",
        //     "unionId": "oU5Yyt8bgT6LCSYzy2tKBy7QvG5I"
        //   }
        // }
        resolve(res.userInfo)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}
