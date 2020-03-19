<template>
  <div class="page">
    <div class="vip-info">
      <MHeader v-if="isMobile" title="成为会员" :leftAllow="true" />
      <PcHeader v-if="!isMobile" background="transparent" />
      <img class="top-bg" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/vip/bg.png" alt />
      <div class="img-list" v-if="isMobile">
        <img class="item-show" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/vip/199.png" @click="addCart(3)" />
        <img class="item-show" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/vip/59.png" @click="addCart(2)" />
        <img class="item-show" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/vip/29.png" @click="addCart(1)" />
      </div>
      <div v-if="!isMobile" class="pc-view-vip">
        <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/vip/29.png" @click="addCart(1)" />
        <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/vip/59.png" @click="addCart(2)" />
        <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/vip/199.png" @click="addCart(3)" />
      </div>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/mobile-header'
import PcHeader from '@/components/pc-header'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['isMobile'])
  },
  components: {
    MHeader,
    PcHeader
  },
  created(){
    this.$store.commit('set_step', 0);
  },
  methods: {
    addCart (level) {
      this.$router.push('/order/detail?level=' + level)
    }
  }
}
</script>
<style lang="less" scoped>

.page {
  .vip-info {
    background: #ffffff;
    position: relative;
    .top-bg {
      width: 100%;
      margin-top: -20px;
    }
    .img-list {
      width: 100%;
      padding: 0px 30px;
      box-sizing: border-box;
      position: absolute;
      top: 120px;
      cursor: pointer;
      .item-show {
        width: 100%;
        box-shadow: 0px 5px 35px 0px rgba(221, 221, 221, 0.21);
        margin-bottom: 10px;
        border-radius: 10px;
      }
    }
  }
}

@media screen and (min-width: 1125px) {
  .page {
    .top-bg {
      height: 360px;
      margin-top: -50px;
    }
    .vip-info {
      background: #ffffff;
      padding-bottom: 0;
      .pc-view-vip {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        top: -133px;
        padding: 0px 110px;
        background: transparent;
        display: flex;
        justify-content: space-evenly;
        img {
          width: 330px;
        }
      }
    }
  }
}
</style>
