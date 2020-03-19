<template name="Home">
  <div>
     <div v-if="isMobile">
      <MobileHeader title="人脸侦探" :leftAllow="false"  />
      <MobileSearchContent/>
    </div>
    <div v-else>
      <PcHeader background="transparent" />
      <PcSearchContent/>
    </div>
     <!-- 请关注公众号 -->
     <van-popup round v-model="showQrCode">
      <div class="senior-member-reminder">
        <div class="t">温馨提示</div>
        <div class="p" style="margin-bottom:0;text-align: left;">为保证您的所有权益，请务必关注官方公众号“人脸侦探”，获取最新消息。</div>
        <img style="width:150px;" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/fed-qrcode.jpeg" />
        <div class="b">长按二维码,关注公众号</div>
        <div class="btns">
          <button class="cancel" @click="onCloseQr">知道了</button>
        </div>
      </div>
    </van-popup>

    <!-- 并发处理 -->
    <van-popup round v-model="canShowFocus" :close-on-click-overlay="false">
      <div class="senior-member-reminder">
        <div class="t">温馨提示</div>
        <div class="p" style="margin-bottom:0;text-align: left;">
          今日注册用户已达上限，咱们打烊了！请关注微信公众号“人脸侦探”，明日再来！
        </div>
        <img style="width:150px;" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/fed-qrcode.jpeg" />
        <div class="b" style="font-size:12px;">
          截屏保存二维码，微信识别关注
        </div>
      </div>
    </van-popup>

    <AppFooter/>
  </div>
</template>
<script>
import MobileHeader from '@/components/mobile-header'
import MobileSearchContent from './components/mobile-search-content'
import PcHeader from '@/components/pc-header'
import PcSearchContent from './components/pc-search-content'
import AppFooter from '@/components/app-footer'
import { mapState } from 'vuex'
import '@vant/touch-emulator'
import * as Helper from '@/helper'
export default {
  data () {
    return {
      canShowFocus: false,
      showQrCode: false
    }
  },
  components: {
    MobileHeader,
    MobileSearchContent,
    PcHeader,
    PcSearchContent,
    AppFooter
  },
  computed: {
    ...mapState(['me']),
    ...mapState(['isMobile'])
  },
  created () {
    if (!localStorage.P_closeQr && this.me) this.showQrCode = true
    if (this.$route.query.method) localStorage.P_method = this.$route.query.method
    if (Helper.isWechat()) this.initWechatShare()
  },
  methods: {
    onCloseQr () {
      localStorage.P_closeQr = true
      this.showQrCode = false
    },
    initWechatShare () {
      var imageUrl = 'https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/logo-active.png'
      var title = '人脸侦探-查一查你有没有被偷拍？'
      var desc = '您的隐私安全，我们为您守护'
      var link = '/'
      Helper.wechatShare(title, desc, imageUrl, link)
    }
  }
}
</script>
<style lang="less" scoped>
  .main-content {
    .blur {
    -webkit-filter: blur(6px); /* Chrome, Opera */
       -moz-filter: blur(6px);
        -ms-filter: blur(6px);
            filter: blur(6px);
      }

    .item {
      border-radius: 10px;
      margin: 15px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 18px 0px rgba(202, 202, 202, 0.33);
      border-radius: 10px;
      display: flex;
      flex-flow: column;
      align-items: center;
       padding: 15px;
      .show {
        width: 100%;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        background: #EEEEEE;
      }
      .info {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #008467;
        .avator {
          margin-right: 5px;
        }
        span {
          color: #666666;
          font-size: 13px;
          margin-left: 10px;
        }
      }
      .desc {
          margin: 15px;
    font-size: 13px;
    width: 100%;
    text-align: center;
      }
    }
  }
</style>
