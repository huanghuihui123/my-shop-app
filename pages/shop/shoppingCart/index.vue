<template>
  <view class="page">
    <!-- 头部 -->
    <view class="header">
      <view class="header-left">
        <text>购物车数量</text>
        <text class="count">({{ count }})</text>
      </view>
      <view class="header-right" @tap="tapManage">{{ isShowManage ? '管理' : '取消' }}</view>
    </view>
    <!-- 购物车列表 -->
    <view class="content">111111</view>
    <!-- 底部 -->
    <view v-if="isShowManage" class="footer" >
      <checkbox-group @change="checkboxChange">
        <label class="check-all">
          <checkbox style="transform:scale(0.7);" color="#E60012" value="checked" :checked="checkAll" />
          <text>全选</text>
        </label>
      </checkbox-group>
      <view class="footer-right">
        <view class="total-text">合计：￥{{ total }}</view>
        <button class="place-order">立即下单</button>
      </view>
    </view>
    <view v-else class="footer">
      <view class="header-left">
        <text>已选</text>
        <text class="count">({{ checkedNum }})</text>
      </view>
      <button class="delete" :disabled="checkedNum === 0">删除</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      count: 0, // 购物车商品数量
      isShowManage: true, // 是否显示管理按钮
      checkAll: false, // 全选购物车商品
      total: 0, //  总金额
      checkedNum: 0
    };
  },
  methods: {
    tapManage() {
      this.isShowManage = !this.isShowManage
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  height: 88rpx;
  padding: 0 30rpx;
  margin-bottom: 28rpx;
  background-color: $uni-bg-color;
  &-left {
    color: $uni-text-color;
    .count {
      color: $uni-text-color-primary;
      margin-left: 12rpx;
    }
  }
  &-right {
    color: $uni-text-color-primary;
  }
}

.content {
  flex: 1;
  overflow: auto;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $uni-text-color;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  height: 88rpx;
  padding: 0 30rpx;
  background-color: $uni-bg-color;
  .check-all {
    display: flex;
    align-items: center;
    height: 100%;
  }
  &-right {
    display: flex;
    align-items: center;
    .total-text {
      margin-right: 24rpx;
    }
    .place-order {
      font-size: 28rpx;
      font-weight: 400;
      width: 200rpx;
      height: 64rpx;
      line-height: 64rpx;
      border-radius: 32rpx;
    }
  }
  
  .delete {
    font-size: 28rpx;
    font-weight: 400;
    width: 200rpx;
    height: 64rpx;
    line-height: 64rpx;
    // background: $uni-bg-color-grey;
    border-radius: 32rpx;
    border: none;
    &::after {
      border: 2rpx solid #ddd;
    }
  }
}
</style>
