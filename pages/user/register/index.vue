<template>
  <view class="page">
    <view class="status_bar"><!-- 这里是状态栏 --></view>
    <view class="header">注册</view>
    <image class="logo" src="@/static/register/top-logo.png"></image>
    <form class="login-form" @submit="formSubmit">
      <view class="login-form-item">
        <input v-model="params.account" type="number" name="account" placeholder="请输入手机号码" />
        <uni-icons v-show="isShowClear" type="closeempty clear-btn" color="#999" size="20" @tap="handleClickClearIcon"></uni-icons>
      </view>
      <view class="login-form-item">
        <input v-model="params.captcha" type="number" name="captcha" placeholder="请输入验证码" />
        <view v-show="!isShowTime" class="code-btn" @tap="handleClickCodeBtn">获取验证码</view>
        <view v-show="isShowTime" class="time-btn">{{ time }}s</view>
      </view>
      <view class="login-form-item">
        <input v-show="!isShowPassword" v-model="params.password" type="password" name="password" placeholder="请填写您的登录密码" />
        <input v-show="isShowPassword" v-model="params.password" type="text" name="password" placeholder="请填写您的登录密码" />
        <image class="password-icon" :src="passwordIcon" @tap="handleClickPasswordIcon" />
      </view>
      <view class="login-form-item" style="margin-bottom: 80rpx;"><input v-model="params.inviteCode" type="number" name="inviteCode" placeholder="请输入邀请码" /></view>
      <view class="login-form-btn-v"><button class="submit-btn" form-type="submit">注册</button></view>
    </form>
    <view class="tip">
      <text>已有账号？</text>
      <text class="red" @tap="linkTo('/pages/user/login/index')">立即登录</text>
    </view>
  </view>
</template>

<script>
import { validate } from '@/utils/validate.js';
import { registerVerify, register } from '@/api/user.js';
import VerifyCode from '@/mixins/VerifyCode.js'
export default {
  name: 'Register',
  mixins: [VerifyCode],
  data() {
    return {
      params: {
        account: '',
        captcha: '',
        password: '',
        inviteCode: ''
      },
      isShowPassword: false,
    };
  },
  computed: {
    isShowClear: function() {
      return this.params.account.length ? true : false;
    },
    passwordIcon: function() {
      return this.isShowPassword? '/static/register/password-close.png' : '/static/register/password-open.png'
    }
  },
  methods: {
    // 清除手机号输入框的值
    handleClickClearIcon() {
      this.params.account = '';
    },
    // 显示、隐藏密码
    handleClickPasswordIcon() {
      this.isShowPassword = !this.isShowPassword;
    },
    // 校验表单
    validate({ account, password, captcha, inviteCode }) {
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
          value: captcha,
          rules: [
            {
              rule: 'isNoEmpty',
              errMsg: '验证码不能为空！'
            },
            {
              rule: 'minLength: 6',
              errMsg: '验证码长度不能少于6位数！'
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
          value: inviteCode,
          rules: [
            {
              rule: 'isPhone',
              errMsg: '请输入正确的手机号！'
            }
          ]
        }
      ];
      return validate(validateRules);
    },
    // 提交表单
    async formSubmit(e) {
      try {
        var formdata = e.detail.value;
        let errMsg = this.validate(formdata)
        if (errMsg) {
          uni.showToast({
            title: errMsg,
            icon: "none"
          })
        }
      } catch (e) {
        //TODO handle the exception
        console.log(e);
      }
    },
    // 调转页面
    linkTo(url) {
      uni.navigateTo({
          url
      });
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
    font-size: 32rpx;
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
    background: #e60012;
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

.tip {
  width: 100%;
  display: flex;
  justify-content: center;
  color: $uni-text-color-grey;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 40rpx;
  .red {
    color: $uni-text-color-primary;
  }
}
</style>
