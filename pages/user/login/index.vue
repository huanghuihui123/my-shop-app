<template>
  <view class="page">
    <view class="status_bar"><!-- 这里是状态栏 --></view>
    <view class="header">登录</view>
    <image class="logo" src="@/static/register/top-logo.png"></image>
    <form class="login-form" @submit="formSubmit">
      <view class="login-form-item">
        <input v-model="params.account" type="number" name="account" placeholder="请输入账号" />
        <view v-show="isShowClearIcon" class="clear-btn" @tap="handleClickClearIcon">×</view>
      </view>
      <view v-if="!isShowTimerInput" class="login-form-item">
        <input v-show="!isShowPassword" v-model="params.password" type="password" name="password" placeholder="请输入密码" />
        <input v-show="isShowPassword" v-model="params.password" type="text" name="password" placeholder="请输入密码" />
        <image class="password-icon" :src="passwordIcon" @tap="handleClickPasswordIcon" />
      </view>
      <view v-else class="login-form-item">
        <input v-model="params.captcha" type="number" name="captcha" placeholder="请输入验证码" />
        <view v-show="!isShowTime" class="code-btn" @tap="handleClickCodeBtn">获取验证码</view>
        <view v-show="isShowTime" class="time-btn">{{ time }}s</view>
      </view>
      <view class="login-form-checkbox">
        <checkbox-group @change="checkboxChange">
          <label class="login-form-checkbox-label">
            <checkbox style="transform:scale(0.7);" color="#E60012" value="checked" :checked="checked" />
            <text>登录即代表您已同意</text>
          </label>
        </checkbox-group>
        <text>《华亿隐私政策》</text>
        <text>《用户协议》</text>
      </view>
      <view class="login-form-btn-v"><button class="submit-btn" form-type="submit">登录</button></view>
    </form>
    <view class="other-ways">
      <text @tap="linkTo('/pages/user/register/index')">新用户注册</text>
      <text v-show="!isShowTimerInput" @tap="isShowTimerInput = true">短信验证登录</text>
      <text v-show="isShowTimerInput" @tap="isShowTimerInput = false">账号密码登录</text>
      <text v-show="!isShowTimerInput">忘记密码</text>
    </view>
    <view class="footer">
      <view class="footer-title">其它登录方式</view>
      <view class="footer-icon"><image src="/static/wx-icon.png" @tap="handleTapWxLogin"></image></view>
    </view>
  </view>
</template>

<script>
import dayjs from 'dayjs';
import VerifyCode from '@/mixins/VerifyCode.js';
import { login } from '@/api/user.js';
import { validate } from '@/utils/validate.js';
import { wxLogin, getWxUserInfo } from '@/utils/index.js';
export default {
  name: 'Login',
  mixins: [VerifyCode],
  data() {
    return {
      params: {
        account: '',
        password: ''
      },
      isShowPassword: false,
      isShowTimerInput: false,
      checked: false
    };
  },
  computed: {
    isShowClearIcon: function() {
      return this.params.account.length ? true : false;
    },
    passwordIcon: function() {
      return this.isShowPassword ? '/static/register/password-close.png' : '/static/register/password-open.png';
    }
  },
  methods: {
    handleClickClearIcon() {
      this.params.account = '';
    },
    handleClickPasswordIcon() {
      this.isShowPassword = !this.isShowPassword;
    },
    validate({ account, password, checked }) {
      const validateRules = [
        {
          value: account,
          rules: [
            {
              rule: 'isNoEmpty',
              errMsg: '账号不能为空！'
            },
            {
              rule: 'isPhone',
              errMsg: '请输入正确的手机号！'
            }
          ]
        },
        {
          value: password,
          rules: [
            {
              rule: 'isNoEmpty',
              errMsg: '密码不能为空！'
            },
            {
              rule: 'minLength: 6',
              errMsg: '密码长度不能少于6位数！'
            }
          ]
        },
        {
          value: checked,
          rules: [
            {
              rule: 'isNoChecked',
              errMsg: '请同意用户条款！'
            },
            {
              rule: 'minLength: 6',
              errMsg: '密码长度不能少于6位数！'
            }
          ]
        }
      ];
      return validate(validateRules);
    },
    checkboxChange(e) {
      this.checked = !this.checked;
    },
    async formSubmit(e) {
      try {
        console.log(e);
        var formdata = e.detail.value;
        console.log('checked', this.checked);
        let errMsg = this.validate({ ...formdata, checked: this.checked });
        console.log(errMsg);
        if (errMsg) {
          uni.showToast({
            title: errMsg,
            icon: 'none',
            duration: 2000
          });
          return;
        } else {
          const { account, password } = formdata;
          let res = await login({
            username: account,
            password
          });
          console.log('login', res);
          if (res.status === 200) {
            let { token, expires_time } = res.data;
            console.log('expires_time', dayjs(expires_time).valueOf());
            let timeStamp = dayjs(expires_time).valueOf();
            uni.setStorageSync('token', token);
            uni.setStorageSync('expires_time', timeStamp);
            uni.reLaunch({
              url: '/pages/home/index'
            });
          }
        }
      } catch (e) {
        //TODO handle the exception
        console.log(e);
      }
    },
    linkTo(url) {
      uni.navigateTo({
        url
      });
    },
    async handleTapWxLogin() {
      try {
        const loginRes = await wxLogin();
        const wxUserInfoRes = await getWxUserInfo();
      } catch (err) {
        //TODO handle the exception
        console.log('err', err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: url(../../../static/register/bg.png) no-repeat;
  background-size: 100% 100%;
  padding: 0 30rpx;
}
.header {
  font-size: 34rpx;
  font-weight: 400;
  color: $uni-text-color;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size: 34rpx;
  font-weight: 400;
}

.logo {
  width: 240rpx;
  height: 240rpx;
  margin-top: 100rpx;
  margin-bottom: 80rpx;
}

.login-form {
  width: 100%;
}

.login-form-item {
  position: relative;
  margin-bottom: 24rpx;
  > input {
    height: 88rpx;
    padding: 0 48rpx;
    background: $uni-bg-color;
    border-radius: 44rpx;
  }

  .clear-btn {
    font-size: 40rpx;
    color: $uni-text-color-grey;
    text-align: center;
    line-height: 40rpx;
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    top: 50%;
    right: 48rpx;
    transform: translateY(-50%);
    z-index: 1;
  }

  .code-btn {
    position: absolute;
    top: 12rpx;
    right: 12rpx;
    z-index: 1;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #fff;
    width: 200rpx;
    height: 64rpx;
    line-height: 64rpx;
    text-align: center;
    background: $uni-text-color-primary;
    border-radius: 32rpx;
  }

  .time-btn {
    position: absolute;
    top: 12rpx;
    right: 12rpx;
    z-index: 1;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333;
    width: 160rpx;
    height: 64rpx;
    line-height: 64rpx;
    text-align: center;
    background-color: #ddd;
    border-radius: 32rpx;
  }

  .password-icon {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    top: 50%;
    right: 48rpx;
    transform: translateY(-50%);
    z-index: 1;
  }
}

.login-form-checkbox {
  display: flex;
  align-items: center;
  height: 40rpx;
  font-size: 24rpx;
  font-weight: 400;
  margin-bottom: 80rpx;
  &-label {
    display: flex;
    align-items: center;
    height: 100%;
    color: $uni-text-color-grey;
  }
  > text {
    color: $uni-text-color-blue;
  }
}

.submit-btn {
  font-size: 28rpx;
  font-weight: 400;
  color: $uni-text-color-inverse;
  height: 88rpx;
  line-height: 88rpx;
  background: $uni-bg-color-primary;
  border-radius: 44rpx;
  margin-bottom: 48rpx;
}

.other-ways {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: $uni-text-color-grey;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 40rpx;
  padding: 0 50rpx;
}

.footer {
  margin-top: 100rpx;
  &-title {
    font-size: 14rpx;
    color: $uni-text-color-grey;
    margin-bottom: 24rpx;
  }

  &-icon {
    display: flex;
    justify-content: center;

    image {
      width: 40rpx;
      height: 40rpx;
    }
  }
}
</style>
