<template>
  <div class="order-detail">
    <Header :leftAllow="true" />
    <van-steps :active="2" active-color="#038C7C" active-icon="checked">
      <van-step>购物车</van-step>
      <van-step>支付</van-step>
      <van-step>完成</van-step>
    </van-steps>
    <div class="pay">
      <img src="@/assets/images/pay/pay-success.png" />
      <div class="title">支付成功</div>
      <div class="tips">
        <span>感谢您的信任， 订单正在确认中...</span>
        <div class="p">
          <van-loading  color="#87CBFC" size="30" />
        </div>
      </div>
    </div>
    <AppFooter/>
       <van-popup v-model="order_status">
        <div class="senior-member-reminder">
          <div class="t">温馨提示</div>
          <div class="p">您已支付成功!</div>
          <div class="btns">
            <button class="confirm" @click="$router.push('/')">
              前往查询
              <van-icon name="arrow" />
            </button>
          </div>
        </div>
      </van-popup>
  </div>
</template>
<script>
import Header from '@/components/mobile-header'
import AppFooter from '@/components/app-footer'
import * as AuthAction from '@/api/auth'
import { mapState } from 'vuex'
import * as OrderAction from '@/api/order'

export default {
  components: {
    Header,
    AppFooter
  },
  computed: {
    ...mapState(['me'])
  },
  data () {
    return {
      timer: 0,
      order_status: false,
      order_no: ''
    }
  },
  beforeMount () {
    this.fetchMe()
    if (this.$route.query.no) {
      this.order_no = this.$route.query.no
    } else {
      this.order_no = localStorage.order_no
    }
    this.startOrderStatus()
  },
  methods: {
    startOrderStatus () {
      var that = this
      this.timer = 30
      var d = setInterval(function () {
        that.timer = that.timer - 1
        if (that.timer * 1 === 0) {
          clearInterval(d)
          that.$toast.clear()
          that.order_status = true
          that.$router.push('/')
        }
      }, 1000)

      var t = setInterval(() => {
        setTimeout(this.checkOrderStatus(), 0)
        if (this.order_status === true) {
          clearInterval(t)
        }
      }, 3000)
    },
    checkOrderStatus () {
      OrderAction.orderDetail({ order_no: this.order_no }).then(data => {
        this.$toast.clear()
        this.order_status = true
      }).catch(err => this.$toast(err.error))
    },
    fetchMe () {
      AuthAction.me().then(data => {
        this.$store.commit('set_me', data.data.user_info)
      }).catch(err => this.$toast(err.error))
    }
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
  padding-bottom: 60px;
  background: #ffffff;
  margin: -1px;
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
  margin-top: 10px;
  .p {
    width: 100%;
    display: flex;
    justify-content: center;
    color: #03836a;
  }
}
</style>
