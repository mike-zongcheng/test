<template>
  <div>
    <div class="order-detail">
      <template v-if="isMobile">
        <Header :leftAllow="true" />
      </template>
      <template v-if="!isMobile">
        <PcHeader background="#24282E" />
      </template>
      <!-- 购物车组件 -->
      <Cart :level="level" v-show="active === 0" />
      <!-- 支付组件 -->
      <Pay v-show="active === 1" :type="payType" @pay="changePayType" />
      <!-- 操作进度条组 -->
      <div class="order-btns" v-if="active !== 2">
        <button class="changeGoods" @click="changeLevel">更改套餐</button>
        <button
          class="nextStep"
          :disabled="payLoading"
          :class="{ 'max-btn': active === 2 }"
          @click="nextOrder"
        >
          <span v-if="!payLoading">下一步</span>
          <van-loading v-if="payLoading" type="spinner" size="15" />
        </button>
      </div>
      <AppFooter />
      <!-- 支付二维码 -->
      <van-popup v-model="QrCodeShow" :close-on-click-overlay="false">
        <div class="wxQr-block">
          <div class="title">请截图后打开支付宝“扫一扫”完成付款</div>
          <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/zzc/20200311114821_background_alipay.png" alt="">
          <qrcode :value="payLink" :options="{ width: 200 }"></qrcode>
          <div class="QrCodeStatus">支付宝安全支付中{{QrCodeEllipsis}}</div>
        </div>
      </van-popup>
      <!-- 提示登录模态框 -->
      <van-popup v-model="showLogin">
        <div class="senior-member-reminder">
          <div class="t">人脸侦探</div>
          <div class="p">检测到您未登录，请先登录</div>
          <div class="btns">
            <button class="cancel" @click="showLogin = false">不，谢谢</button>
            <button class="confirm" @click="$router.push('/login')">
              前往登录
              <van-icon name="arrow" />
            </button>
          </div>
        </div>
      </van-popup>
      <!-- 请关注公众号 -->
      <van-popup round v-model="canShowFocus" :close-on-click-overlay="false">
        <div class="senior-member-reminder">
          <div class="t">温馨提示</div>
          <div class="p" style="margin-bottom:0;text-align: left;">
            今日付费用户已满，请关注公众号，明日再来！
          </div>
          <img style="width:150px;" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/fed-qrcode.jpeg" />
          <div class="b" style="font-size:12px;">
            截屏保存二维码，微信识别关注
          </div>
        </div>
      </van-popup>
      <van-popup v-model="payResult">
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
      <!-- 请到微信打开 -->
      <van-popup round v-model="canOnWx" :close-on-click-overlay="false">
        <div class="senior-member-reminder">
          <div class="t">温馨提示</div>
          <div class="p" style="margin-bottom:0;text-align: left;">
            暂不支持支付宝支付，请关注公众号，用微信支付，即可正常使用！
          </div>
          <img style="width:150px;" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/fed-qrcode.jpeg" />
          <div class="b" style="font-size:12px;">
            截屏保存二维码，微信识别关注
          </div>
        </div>
      </van-popup>
      <!-- 复制链接在浏览器打开 -->
      <van-popup round v-model="canShowBrower" :close-on-click-overlay="false">
        <div class="senior-member-reminder">
          <div class="t">温馨提示</div>
          <div class="p">当前微信暂停收款，请点击按钮复制链接在浏览器中使用支付宝支付</div>
          <div
            class="btns"
            style="flex-flow: column; align-items: center; font-size: 12px;"
          >
            <div
              v-clipboard:copy="openLink"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
              <button class="confirm">点我复制在浏览器中粘贴打开继续支付</button>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import Header from '@/components/mobile-header'
import AppFooter from '@/components/app-footer'
import Cart from './components/cart'
import Pay from './components/pay'
import * as OrderAction from '@/api/order'
import * as AuthAction from '@/api/auth'
import * as Helper from '@/helper'
import PcHeader from '@/components/pc-header'

import { mapState } from 'vuex'
export default {
  components: {
    Header,
    PcHeader,
    Cart,
    Pay,
    AppFooter
  },
  computed: {
    ...mapState(['me', 'step', 'order', 'isMobile'])
  },
  data () {
    return {
      active: 0,
      timer: 0,
      payType: '1', // 选择支付方式
      openLink: '',
      canShowFocus: false, // 关注公众号
      canShowBrower: false, // 可以在支付宝内打开
      canOnWx: false, // 可以在微信内打开
      level: null,
      scene: null,
      payLink: '',
      QrCodeEllipsis: ".",
      QrCodeEllipsisTime: 0,
      businessItem: null,
      aplipyPayItem: null,
      payResult: false,
      payisOK: false,
      payLoading: false, // 支付loading
      QrCodeShow: false, // 二维码支付
      showLogin: false, // 提示登录
      order_status: false // 订单状态
    }
  },
  created () {
    if (this.$route.query.level) {
      this.level = this.$route.query.level * 1
      localStorage.currentLevel = this.$route.query.level * 1
    }
    if (this.$route.query.token) {
      localStorage.token = decodeURIComponent(this.$route.query.token)
      this.fetchMe()
    } else {
      this.fetchToken()
    }
    // console.error("step值", this.$route.query.step, this.me, this.step, this.order, this.isMobile);
    if (this.$route.query.step) this.active = this.$route.query.step * 1
    if (this.me) this.active = this.step
    this.judgeScene()
    this.fetchPayItem()
  },
  methods: {
    fetchToken () {
      this.openLink =
        window.location.protocol +
        '//' +
        window.location.host +
        '/order/detail?level=' +
        this.level
      if (localStorage.token) {
        this.openLink =
          this.openLink +
          '&token=' +
          encodeURIComponent(window.localStorage.token)
      }
    },
    onCopy (e) {
      this.$toast({
        duration: 30000, // 持续展示 toast
        message: '链接复制成功!  请粘贴到浏览器打开继续支付'
      })
    },
    onError (e) { console.error('Failed to copy texts') },
    fetchPayItem () {
      let params = {}
      params.type = 3
      // if (Helper.isWechat()) {
      //   params.type = 2
      //   params.callback = window.location.protocol + '//' + window.location.host + '/pay/waiting?level=' + this.level
      // } else {
      //   params.type = 3
      // }
      console.log(params)
      OrderAction.getPayItem(params)
        .then(data => {
          console.log(`getPayItem=>`, data.data, `scene=${this.scene}`);
          if (!data.data) {
            this.canShowFocus = true
            return
          }
          if (params.type === 3) {
            this.aplipyPayItem = data.data
          }
          if (params.type === 2) {
            this.businessItem = data.data
            localStorage.currentBusiness = JSON.stringify(this.businessItem)
          }
        })
        .catch(err => {
          if (err.code * 1 === 403) {
            this.showLogin = true
            return
          }
          if (err.code * 1 === 40099) {
            this.canShowFocus = true
            return
          }
          if (err.code * 1 === 40066) {
            this.canShowBrower = true
            return
          }
          if (err.code * 1 === 40088) {
            this.canOnWx = true
            return
          }
          console.error(err)
          this.canShowFocus = true
        })
    },
    changeLevel () {
      this.$store.commit('set_step', 0);
      this.$router.push('/vip/introduction')
    },
    changePayType (val) {
      this.payType = val
      this.judgeScene()
    },
    judgeScene () {
      // console.error("3", Helper.isWechat(), Helper.isMobile(), this.payType);
      if (Helper.isWechat()) {
        // this.payType = '2';
        this.scene = 5; // 1;
      } else {
        if (Helper.isMobile()) {
          if (this.payType === '1') {
            console.log('h5支付宝')
            this.scene = 4
          }
        } else {
          if (this.payType === '1') {
            this.scene = 5
          }
          if (this.payType === '2') {
            this.scene = 3
          }
        }
      }
    },
    nextOrder () {
      if (!this.me) {
        this.showLogin = true;
        return false;
      }
      if (this.me.level === 3) {
        this.$toast('您已是SVIP，无需继续购买套餐');
        return;
      }
      if (this.active === 1) {
        this.checkPayType()
      } else {
        this.active = this.active + 1
        this.$store.commit('set_step', this.active)
      }
    },
    checkPayType () {
      if (!this.payType) return;
      console.log("参数值：", this.scene);
      this.payLoading = true
      switch (this.scene) {
        case 1:
          Helper.xiaoWeiAuth(this.businessItem)
          break
        case 2:
          this.payOrder()
          break
        case 3:
          this.payOrder()
          break
        case 4:
          this.payOrder()
          break
        case 5:
          this.payOrder()
          break
      }
    },
    handlePayRouter (result) {
      this.$store.commit('set_order', result.order_info)
      localStorage.order_no = result.order_info.order_no
      switch (this.scene) {
        case 3:
          this.switchQrCode(result)
          break
        case 4:
          this.$toast.loading({
            duration: 0, // 持续展示 toast
            message: '支付检测中...',
            forbidClick: true
          })
          this.toRouterAplipy(result.pay_info.code_url)
          break
        case 5:
          this.switchQrCode(result)
          break
      }
    },
    toRouterAplipy (url) {
      window.location.href =
        'alipays://platformapi/startapp?appId=20000067&url=' + url
      this.startOrderStatus()
    },
    startOrderStatus () {
      var that = this
      this.timer = 30
      var d = setInterval(function () {
        that.timer = that.timer - 1
        // 无法检测订单是否支付成功
        if (that.timer * 1 === 0) {
          clearInterval(d)
          that.$toast.clear()
          that.order_status = true;
        }
      }, 1000)
      // 检测到订单支付成功
      var t = setInterval(() => {
        setTimeout(this.checkOrderStatus(), 0)
        if (this.order_status === true) {
          clearInterval(this.QrCodeEllipsisTime);
          clearInterval(t);
          if(this.payisOK == false) that.$router.push('/pay/error');
          that.QrCodeShow = false;
          that.payResult = true;
        }
      }, 6000)
    },
    switchQrCode (result) {
      this.payLink = result.pay_info.code_url
      this.QrCodeShow = true
      
      this.QrCodeEllipsisTime = setInterval(()=>{
        if(this.QrCodeEllipsis.length >= 3) this.QrCodeEllipsis = "";
        this.QrCodeEllipsis += ".";
      }, 300)
      this.startOrderStatus();
    },
    payOrder () {
      let params = {}
      if (localStorage.currentLevel) {
        params.level = localStorage.currentLevel * 1
      } else {
        params.level = this.level
      }
      params.mch_id = this.aplipyPayItem.mch_id;
      // if (Helper.isWechat()) {
      //   params.mch_id = this.businessItem.mch_id
      // } else {
      //   params.mch_id = this.aplipyPayItem.mch_id;
      // }
      params.scene = this.scene
      OrderAction.payWxOrder(params)
        .then(data => {
          this.payLoading = true
          this.handlePayRouter(data.data)
        })
        .catch(err => {
          this.canShowFocus = true
          console.error(err)
        })
    },
    checkOrderStatus () {
      let params = { order_no: this.order.order_no };
      OrderAction.orderDetail(params)
        .then(data => {
          this.$toast.clear()
          this.order_status = true;
          this.payisOK = true;
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchMe () {
      AuthAction.me()
        .then(data => {
          this.$store.commit('set_me', data.data.user_info)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
<style lang="less" scoped>
.van-popup{background: none; min-width: 75%;}
.wxQr-block {
  background: #ffffff;
  border-radius: 10px;
  padding: 0 10px;
  text-align: center;
  .title {
    width: 100%;
    font-size: 14px;
    text-align: center;
    position: absolute;
    width: 100%;
    left: 0;
    top: 33px;
    color: #333;
  }
  img{
    width: 100%;
    margin-top: 14px;
  }
  canvas{
    position: relative;
    top: -22px;;
  }
  .QrCodeStatus{
    font-size: 10px;
    text-align: center;
    position: relative;
    top: -24px;
  }
}
.order-detail {
  position: relative;
  width: 100%;
  .order-btns {
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 25px 2rem;
    font-size: 14px;
    border-top: 1px solid #f9f9f9;
    button {
      border: 0;
      text-align: center;
      color: #ffffff;
      padding: 6px 15px;
      border-radius: 20px;
      width: 120px;
    }
    .changeGoods {
      background: #cccccc;
    }
    .nextStep {
      background: linear-gradient(#83cafb, #58a9fa);
    }
    .max-btn {
      width: 100%;
      max-width: 100%;
    }
  }
}
@media screen and (min-width: 1000px) {
  .account {
    padding-top: 2rem;
  }
  .van-popup{ width: 20%; min-width: 20%; }
  .wxQr-block {
    .title{
      font-size: 18px;
    }
  }
}
</style>
