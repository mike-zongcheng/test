<template>
  <div class="contact">
        <template v-if="isMobile">
    <Header title="联系我们" :leftAllow="true" />
    </template>
    <template v-if="!isMobile">
      <PcHeader background="#24282E" />
    </template>
    <div class="content">
      <div class="item">
        <p class="t">有任何问题？</p>请发送邮件至
        <a href="mailto:rlzt2020@163.com">rlzt2020@163.com</a>或联系QQ:741168132
      </div>
      <div class="item">
        <p class="t">有合作意向？</p>请发送邮件至
        <a href="mailto:rlzt2020@163.com">rlzt2020@163.com</a>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
<script>
import Header from '@/components/mobile-header'
import AppFooter from '@/components/app-footer'
import PcHeader from '@/components/pc-header'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isMobile'])
  },
  components: {
    Header,
    AppFooter,
    PcHeader
  }
}
</script>
<style lang="less" scoped>
@primary-color: #242933;
.van-main-title {
  span {
    color: @primary-color;
  }
}
.contact {
  position: relative;
  width: 100%;
  .content {
    padding: 4rem 1rem 4.5rem 1rem;
    font-size: 13px;
    color: #666666;
    .t {
      color: #333333;
      font-size: 16px;
      font-weight: 500;
      margin: 15px 0 8px;
    }
  }
  @media screen and (min-width: 1125px) {
    .content {
      padding: 2rem 10% 5rem;
      font-size: 16px;
      .t {
        font-size: 20px;
      }
    }
  }
}
</style>
