<template>
  <view class="page">
    <!-- #ifdef MP-WEIXIN -->
    <view class="login">
      <open-data class="user-avatar" type="userAvatarUrl"></open-data>
      <open-data class="user-name" type="userNickName"></open-data>
      <view class="login-notice">为了提供更优质的服务，请先登录</view>
      <button class="login-btn" open-type="getPhoneNumber" @getphonenumber="wxPhoneLogin">微信手机号一键登录</button>
    </view>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <view class="login">
      <view class="login-notice">为了提供更优质的服务，请先登录</view>
      <button class="login-btn" @tap="toLogin">去登录</button>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
import { getProvider, wxLogin } from '@/utils/index.js';
import { wxappAuth } from '@/api/user.js';
export default {
  data() {
    return {};
  },
  methods: {
    async wxPhoneLogin(e) {
      try {
        const { errMsg, encryptedData, iv } = e.mp.detail;
        if (errMsg == 'getPhoneNumber:ok') {
          const provider = await getProvider();
          const loginRes = await wxLogin(provider);
          const { code } = loginRes;
          const res = await wxappAuth({
            encryptedData, // 小程序完整用户信息的加密数据
            iv, // 小程序加密算法的初始向量
            code // 小程序登陆code
          });
          console.log('wxappAuth', res);
        } else {
          uni.showToast({
            title: '已拒绝授权',
            icon: 'none',
            duration: 2000
          });
        }
      } catch (err) {
        console.log('wxPhoneLogin', err);
        uni.showToast({
          title: err,
          icon: 'error',
          duration: 2000
        });
      }
    },
    toLogin() {
      uni.navigateTo({
        url: '/pages/user/login/index'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  display: flex;
  align-items: center;
}
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-notice {
    font-size: 14rpx;
    margin-bottom: 80rpx;
  }

  &-btn {
    color: $uni-text-color-inverse;
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 500;
    border-radius: 44rpx;
    background: $uni-bg-color-primary;
  }
}
</style>
