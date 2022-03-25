<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
page {
  height: 100%;
  color: #333;
  font-family: PingFangSC-Regular, PingFang SC;
  background: $uni-bg-color-gray;
}
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
view {
  box-sizing: border-box;
}
button {
  color: $uni-text-color-inverse;
  background: $uni-bg-color-primary;
  margin: 0;
  &::after {
    border: none
  }
}
</style>
