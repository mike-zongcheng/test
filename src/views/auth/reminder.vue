<template>
  <div class="reminder">
    <template v-if="isMobile">
      <Header :leftAllow="true" />
    </template>
    <template v-if="!isMobile">
      <PcHeader background="#24282E" />
    </template>
    <div class="m-page" v-if="isMobile">
      <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/help/reminder.png" />
      <div class="btns">
        <div
          class="default-btn"
          style="padding: 6px 25px;font-size:15px;"
          @click="$router.push('/order/detail?level=3')"
        >立刻开通</div>
      </div>
    </div>
    <div class="pc-page" v-if="!isMobile">
      <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/help/pc-reminder.png" />
      <div class="btns">
        <div class="default-btn" @click="$router.push('/order/detail?level=3')">立刻开通</div>
        <p>或查看所有会员套餐</p>
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
    PcHeader,
    AppFooter
  }
}
</script>
<style lang="less" scoped>
.reminder {
  position: relative;
  background-color: #24282e;
  img {
    width: 100%;
    box-sizing: border-box;
  }
  .m-page {
    position: relative;
    background-color: #ffffff;
    .btns {
      color: #24282e;
      font-size: 16px;
      position: absolute;
      bottom: 3%;
      right: 9%;
    }
  }
  .pc-page {
    padding: 2rem 5rem;
    position: relative;
    background: #ffffff;
    .btns {
      color: #24282e;
      font-size: 16px;
      position: absolute;
      bottom: 13%;
      right: 34%;
      .default-btn {
        font-size: 15px;
      }
      p {
        margin: 0;
        padding: 0;
        text-decoration: underline;
        font-size: 14px;
      }
    }
  }
}
</style>
