<template name="component-name">
  <div class="pay">
    <div class="header">
      <img src="https://img-fe.ggwan.com/images/c566b8010efd9f-210x210.gif" />
      <div class="tips">
        <p>安全</p>
        <p>微信支付检测安全，请放心支付</p>
      </div>
    </div>
  </div>
</template>
<script>
import * as Helper from '@/helper'
import * as OrderAction from '@/api/order'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      scene: 1,
      businessItem: null,
      openid: '',
      payType: '2'
    }
  },
  computed: {
    ...mapState(['order'])
  },
  created () {
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      message: '支付检测中...',
      forbidClick: true
    })
    if (this.$route.query.level) {
      this.level = this.$route.query.level * 1
      localStorage.currentLevel = this.$route.query.level * 1
    }
    if (this.$route.query.openid) {
      localStorage.WX_OPENID = this.$route.query.openid
    }
    if (localStorage.currentBusiness) {
      this.businessItem = JSON.parse(localStorage.currentBusiness)
      this.payOrder()
    } else {
      this.fetchPayItem()
    }
  },
  methods: {
    fetchPayItem () {
      OrderAction.getPayItem({ type: 2 })
        .then(data => {
          this.businessItem = data.data
          console.table(this.businessItem)
          this.payOrder()
        }).catch(err => this.$toast(err.error))
    },
    payOrder () {
      let params = {}
      if (localStorage.currentLevel) {
        params.level = localStorage.currentLevel * 1
      } else {
        params.level = this.level
      }
      params.mch_id = this.businessItem.mch_id
      params.scene = this.scene
      params.openid = localStorage.WX_OPENID
      OrderAction.payWxOrder(params)
        .then(data => {
          let result = data.data
          this.$store.commit('set_order', result.order_info)
          this.$toast.clear()
          console.log(result)
          Helper.wxPayTarget(this.order.order_no, window.location.href)
        })
        .catch(err => this.$toast(err.error))
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 18rem;
  background-color: #20ca65;
  text-align: center;
  img {
    display: block;
    height: 8rem;
    margin: 0 auto;
    padding-top: 5rem;
  }
  .tips {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #ffffff;
    p {
      margin: 0;
      padding: 0;
    }
  }
  .tips p:nth-child(1) {
    font-size: 1.2rem;
    padding: 0.2rem 0;
  }
}
.header::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -3rem;
    content: " ";
    width: 100%;
    height: 3rem;
    background: url(https://img-fe.ggwan.com/images/68453f3e13721d-750x76.png) no-repeat;
    background-size: 100% auto;
}
.cicle-bottom {
  width: 100%;
  height: 280px;
  background-color: #277c4a;
  border-radius: 50%;
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  position: absolute;
  top: 10px;
}
</style>
