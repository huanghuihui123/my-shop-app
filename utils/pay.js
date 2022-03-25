// App 支付宝支付
export const appAliPay = (jsConfig) => {
  return new Promise((resolve, reject) => {
    uni.requestPayment({
      provider: 'alipay',
      orderInfo: jsConfig.body, // App端，支付宝支付 orderInfo 为 String 类型。
      success: function(res) {
        console.log('success:' + JSON.stringify(res));
        resolve(res)
      },
      fail: function(err) {
        console.log('fail:' + JSON.stringify(err));
        reject(err)
      }
    })
  })
}

// App 微信支付
export const appWxPay = (jsConfig) => {
  return new Promise((resolve, reject) => {
    uni.requestPayment({
      provider: 'wxpay',
      orderInfo: jsConfig, // App端，微信支付 orderInfo 为 Object 类型。
      success: function(res) {
        console.log('success:' + JSON.stringify(res));
        resolve(res)
      },
      fail: function(err) {
        console.log('fail:' + JSON.stringify(err));
        reject(err)
      }
    })
  })
}

// 微信小程序支付
export const miniWxPay = (jsConfig) => {
  return new Promise((resolve, reject) => {
    uni.requestPayment({
      provider: 'wxpay',
      ...jsConfig,
      success: function(res) {
        console.log('success:' + JSON.stringify(res));
        resolve(res)
      },
      fail: function(err) {
        console.log('fail:' + JSON.stringify(err));
        reject(err)
      }
    })
  })
}
