<template>
  <div class="test-list">
    <template v-if="isMobile">
      <Header :leftAllow="true" />
    </template>
    <template v-if="!isMobile">
      <PcHeader background="#24282E" />
    </template>


    <div class="payError">
      <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/zzc/20200311104209_error.png" alt="" />
      <h5>支付失败</h5>
      <small>支付失败，请<router-link to="/vip/introduction">重新支付</router-link></small>
    </div>

  </div>
</template>

<script>
import Header from '@/components/mobile-header'
import AppFooter from '@/components/app-footer'
import PcHeader from '@/components/pc-header'
import * as OrderAction from '@/api/order'
import * as Helper from '@/helper'
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['me', 'step', 'order', 'isMobile'])
  },
  components: {
    Header,
    PcHeader
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.test-list{
  overflow: hidden;
}
.payError{
  text-align: center;
  margin-top: 20%;
  img{
    width: 134px;
    height: 117px;
  }
  h5{
    color: #333;
    font-size: 20px;
    margin: 0;
    line-height: 27px;;
  }
  small{
    font-size: 16px;
    color: #999;
    line-height: 56px;;
    a{
      color: #2F91F2;
    }
  }
}
</style>
