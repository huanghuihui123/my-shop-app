import { chs_phone } from '@/utils/validate.js';
import { registerVerify } from '@/api/user.js';
export default {
  data() {
    return {
      timer: null,
      time: 60,
      isShowTime: false,
    };
  },
  beforeDestory() {
    clearInterval(this.timer);                                                                                                                  
  },
  methods: {
    // 点击获取验证码按钮
    handleClickCodeBtn() {
      if (!this.params.account.length) {
        uni.showToast({
          title: '账号不能为空！',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (!chs_phone(this.params.account)) {
        uni.showToast({
          title: '请输入正确的手机号码！',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      this.isShowTime = true;
      this.getVerifyCode();
      this.timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          this.resetTimer()
        }
      }, 1000);
    },
    // 清除定时器、重置倒计时
    resetTimer() {
      if (this.timer) {
        this.isShowTime = false;
        this.time = 60;
        this.timer = null;
        clearInterval(this.timer);
      }
    },
    async getVerifyCode() {
      try {
        let res = await registerVerify({
          phone: this.params.account,
          type: 'register'
        });
        console.log('getVerifyCode', res);
        if (res.status !== 200) {
          this.resetTimer()
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
      } catch (err) {
        //TODO handle the exception
        uni.showToast({
          title: err.msg,
          icon: 'none',
          duration: 2000
        });
      }
    },
  }
};
