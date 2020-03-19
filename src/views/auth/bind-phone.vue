<template>
  <div class="login">
    <Header title="绑定手机号" :leftAllow="true" />
    <div class="form">
      <div class="item">
        <van-field v-model="form.phone" clearable placeholder="请输入手机号">
          <i slot="left-icon" class="iconfont iconshouji"></i>
        </van-field>
      </div>
          <div class="item"  v-if="showVer">
          <slide-verify :status="verifyStatus" @click.native="onSuccess"/>
      </div>
      <div class="item">
        <van-field v-model="form.verify_code" center clearable placeholder="请输入验证码">
          <i slot="left-icon" class="iconfont iconmessage"></i>
          <van-button
            slot="button"
            size="small"
            type="primary"
            :disabled="send_code_btn_disabled"
            @click="openVerify"
          >{{send_code_btn_text}}</van-button>
        </van-field>
      </div>
      <div class="item-line">因为不可抗力容易导致账号丢失，建议您绑定手机号（非强制)</div>
      <div class="btns">
        <button class="bind" v-if="!bindLoading" @click="onBind">绑定</button>
        <button class="bind" v-if="bindLoading">
          <van-loading type="spinner" size="14" />
        </button>
        <button class="ignore" @click="goHome">跳过</button>
      </div>
    </div>
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
  </div>
</template>
<script>
import Header from '@/components/mobile-header'
import SlideVerify from '@/components/SlideVerify'
import * as Helper from '@/helper'
import * as AuthAction from '@/api/auth'
import { mapState } from 'vuex'

export default {
  components: {
    Header,
    SlideVerify
  },
  computed: {
    ...mapState(['me'])
  },
  data () {
    return {
      form: {
        bind: 1
      },
      showVer: false,
      verifyStr: '',
      verifyStatus: false,
      showQrCode: false,
      bindLoading: false,
      send_code_btn_text: '发送验证码',
      send_code_btn_disabled: false,
      timer: 0
    }
  },
  created () {
    this.fetchVerify()
  },
  methods: {
    goHome () {
      if (!localStorage.P_closeQr) {
        this.showQrCode = true
      } else {
        this.$router.push('/')
      }
    },
    openVerify () {
      if (this.timer > 0) return
      if (!this.form.phone) {
        this.$toast('请输入手机')
        return
      }
      if (!Helper.isPhone(this.form.phone)) {
        this.$toast('请输入有效的手机')
        return
      }
      this.showVer = true
      if (this.verifyStatus) this.sendVerificationCode()
    },
    fetchVerify () {
      AuthAction.fetchVerify()
        .then(data => {
          this.verifyStr = data.data
        })
        .catch(err => this.$toast(err.error))
    },
    onSuccess () {
      if (!this.verifyStr) this.$toast('未收到校验码')
      AuthAction.postVerify({ unid_id: this.verifyStr })
        .then(data => {
          this.verifyStatus = true
          this.sendVerificationCode()
        })
        .catch(err => {
          this.fetchVerify()
          this.$toast(err.error)
        })
    },
    onCloseQr () {
      localStorage.P_closeQr = true
      this.showQrCode = false
      this.$router.push('/')
    },
    sendVerificationCode () {
      if (!this.verifyStr) {
        this.fetchVerify()
        return
      }
      this.timer = 150
      this.send_code_btn_text = this.timer + 's'
      this.send_code_btn_disabled = true
      var that = this
      var t = setInterval(function () {
        that.timer = that.timer - 1
        if (that.timer * 1 === 0) {
          clearInterval(t)
          that.send_code_btn_disabled = false
          that.send_code_btn_text = '发送验证码'
        } else {
          that.send_code_btn_text = that.timer + 's'
        }
      }, 1000)
      this.form.unid_id = this.verifyStr
      AuthAction.verifyCode(this.form)
        .then(data => {
          this.$toast('已发送到您的手机')
        })
        .catch(err => this.$toast(err.error))
    },
    onBind () {
      if (!this.form.phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!this.form.verify_code) {
        this.$toast('请输入验证码')
        return
      }
      let params = {}
      this.bindLoading = true
      params.verify_code = this.form.verify_code
      params.phone = this.form.phone
      AuthAction.bindPhone(params)
        .then(data => {
          this.bindLoading = false
          this.goHome()
        })
        .catch(err => {
          this.bindLoading = false
          this.$toast(err.error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: relative;
  .form {
    padding: 5% 10% 2%;
    font-size: 16px;
    background: #ffffff;
    .iconfont {
      color: #666666;
    }
    .item-line {
      font-size: 12px;
      margin: -5px 10px 20px;
      color: #333333;
      box-sizing: border-box;
    }
    .btns {
      display: flex;
      justify-content: space-between;
      button {
        color: #ffffff;
        text-align: center;
        padding: 5px 40px;
        box-sizing: border-box;
        border-radius: 20px;
        font-size: 14px;
        border: 0;
      }
      .bind {
        background: linear-gradient(#83cafb, #58a9fa);
      }
      .ignore {
        background: #a9a9a9;
      }
    }
  }
}
</style>
