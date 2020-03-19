<template>
  <div class="login">
    <template v-if="isMobile">
      <Header title="登录" :leftAllow="true" />
      <img class="top-banner" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/user/login-header.png" />
      <div class="show-logo">
        <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/logo.png" alt />
      </div>
    </template>
    <template v-if="!isMobile">
      <PcHeader background="#24282E" />
    </template>
    <div class="form">
      <div class="item">
        <van-field v-model="form.phone" clearable placeholder="请输入手机号">
          <i slot="left-icon" class="iconfont iconshouji"></i>
        </van-field>
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
      <div class="tips">未注册过的手机将自动创建为人脸侦探账号</div>
        <div class="item" v-if="showVer">
          <slide-verify :status="verifyStatus" @click.native="onSuccess"/>
        </div>
      <div class="login-btn" @click="onLogin">
        <span v-if="!loginLoading">登录</span>
         <van-loading v-if="loginLoading" type="spinner" size="14" />
      </div>
      <template  v-if="isWxchat">
        <van-divider>快捷登录</van-divider>
        <div class="other-login">
          <i class="iconfont iconweixin_" @click="onWxAuth"></i>
        </div>
      </template>
        <div class="footer">
      登陆/注册代表您已同意
      <div>
      <a href="javascript:;" @click="$router.push('/agreement')">《人脸侦探用户协议》</a>
      </div>
    </div>
    </div>
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
  </div>
</template>
<script>
import Header from '@/components/mobile-header'
import PcHeader from '@/components/pc-header'
import SlideVerify from '@/components/SlideVerify'
import * as AuthAction from '@/api/auth'
import * as Helper from '@/helper'
import { mapState } from 'vuex'

export default {
  components: {
    Header,
    SlideVerify,
    PcHeader
  },
  computed: {
    ...mapState(['me']),
    ...mapState(['isMobile'])
  },
  data () {
    return {
      form: {},
      verifyStr: '',
      showVer: false,
      verifyStatus: false,
      isWxchat: false,
      canShowFocus: false,
      loginLoading: false,
      send_code_btn_text: '发送验证码',
      send_code_btn_disabled: false,
      timer: 0
    }
  },
  created () {
    this.fetchVerify()
    if (Helper.isWechat()) {
      this.isWxchat = true
      if (this.$route.query.code && !(localStorage.switchWeibo * 1)) {
        this.wxLogin(this.$route.query)
      }
    }
  },
  methods: {
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
    fetchVerify () {
      AuthAction.fetchVerify()
        .then(data => {
          this.verifyStr = data.data
        })
        .catch(err => this.$toast(err.error))
    },
    onWxAuth () {
      localStorage.switchWeibo = 0
      let url = this.$route.fullPath
      if (localStorage.P_method) {
        url = url + '?method=' + localStorage.P_method
      }
      Helper.wechatAuth(url)
    },
    wxLogin (query) {
      let params = {}
      if (query.method) params.method = query.method.replace(/ /g, '')
      if (localStorage.Old_version) params.old_version = localStorage.Old_version
      params.code = query.code
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登录中...'
      })
      AuthAction.wxLogin(params)
        .then(data => {
          localStorage.token = data.data.token
          this.$store.commit('set_me', data.data.user_info)
          this.$toast.clear()
          if (this.me.phone * 1) {
            this.$router.push('/')
          } else {
            this.$router.push('/bind-phone')
          }
        }).catch(err => {
          if (err.code === 500) {
            this.canShowFocus = true
          } else {
            this.$toast(err.error)
          }
        })
    },
    sendVerificationCode () {
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
    onLogin () {
      if (this.loginLoading) return
      if (!this.form.phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!Helper.isPhone(this.form.phone)) {
        this.$toast('请输入有效的手机号')
        return
      }
      if (!this.form.verify_code) {
        this.$toast('请输入验证码')
        return
      }
      let params = {}
      if (localStorage.P_method) params.method = localStorage.P_method
      if (localStorage.Old_version) params.old_version = localStorage.Old_version
      params.verify_code = this.form.verify_code
      params.phone = this.form.phone
      this.loginLoading = true
      AuthAction.login(params)
        .then(data => {
          localStorage.token = data.data.token
          this.loginLoading = false
          this.$store.commit('set_me', data.data.user_info)
          this.$router.push('/')
        })
        .catch(err => {
          this.loginLoading = false
          if (err.code === 500) {
            this.canShowFocus = true
          } else {
            this.$toast(err.error)
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: relative;
  .top-banner {
    position: absolute;
    top: 41px;
    left: 0;
    right: 0;
    object-fit: cover;
    width: 100%;
    z-index: 1;
  }
  .show-logo {
    position: absolute;
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    top: 148px;
    left: 9rem;
    padding: 0;
    border-radius: 50%;
    box-shadow: 0px 5px 35px 0px rgba(221, 221, 221, 0.61);
    img {
      width: 65px;
    }
  }
  .form {
    padding: 5% 10% 10%;
    font-size: 16px;
    margin-top: 9rem;
    background: #ffffff;
    .iconfont {
      color: #666666;
    }
    .tips {
      color: #d6d6d6;
      font-size: 12px;
      margin-top: -10px;
      margin-left: 7px;
    }
  }
  .footer {
    font-size: 12px;
    text-align: center;
    color: #e0e0e0;
    margin-top: 18vh;
    a {
      color: #5cadfa;
    }
  }
  @media screen and (min-width: 1000px) {
    .form {
      margin-top: 0rem;
      padding: 2rem 30% 10%;
    }
  }
  .login-btn {
    cursor: pointer;
    color: #ffffff;
    background: linear-gradient(#83cafb, #58a9fa);
    text-align: center;
    padding: 5px 10px;
    margin: 15px 0;
    box-sizing: border-box;
    border-radius: 20px;
    font-size: 18px;
  }
  .other-login {
    cursor: pointer;
    margin: 5px 0;
    font-size: 13px;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
      margin: 0 5px;
      font-size: 30px;
    }
    .iconweixin_ {
      color: #73cc58;
    }
    .iconweibo1 {
      color: #fb8426;
    }
  }
}
</style>
