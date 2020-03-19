<template>
  <div class="order-detail">
    <Header :leftAllow="true"   />

    <van-steps :active="3" active-color="#038C7C" active-icon="checked">
      <van-step>购物车</van-step>
      <van-step>账户</van-step>
      <van-step>支付</van-step>
      <van-step>完成</van-step>
    </van-steps>
    <div class="pay">
      <img src="@/assets/images/pay/pay-fail.png" />
      <div class="title">支付失败</div>
      <div class="tips">
      <span>购买失败，现在</span>
      <span class="p" @click="$router.push('/vip/introduction')">回到套餐页</span>
    </div>
    </div>
    <AppFooter/>
  </div>
</template>
<script>
import Header from '@/components/mobile-header'
import AppFooter from '@/components/app-footer'

export default {
  components: {
    Header,
    AppFooter
  }
}
</script>
<style lang="less" scoped>
.order-detail {
    background: #242933;
}
.pay {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  background: #ffffff;
  padding-bottom: 60px;
margin:-1px;

  img {
        position: relative;
    left: -10px;
    width: 45%;
    margin-top: 10px;
  }
}
.title {
  color: #333333;
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 7px;
}
.tips {
  color: #999999;
      letter-spacing: 1px;
  .p {
    color: #03836a;
  }
}

</style>
