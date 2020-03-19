<template >
  <div class="nav" :style="{background: background}">
    <div class="left-nav">
      <div class="nav-item nav-pic"></div>
      <div v-show="!me">
        <router-link to="/login">
          <span class="nav-item">登录</span>
        </router-link>
        <router-link to="/login">
          <span class="nav-item">注册</span>
        </router-link>
      </div>
      <div v-if="me">
        <span class="nav-item">{{me.email}}</span>
      </div>
    </div>
    <div class="right-nav">
      <span class="nav-item" @click="handleRouter('home')">首页</span>
      <span class="nav-item" @click="handleRouter('secret')">隐私政策</span>
      <span class="nav-item" @click="handleRouter('question')">常见问题</span>
      <span class="nav-item" @click="handleRouter('contact')">联系我们</span>
      <span class="nav-item" @click="handleRouter('reminder')">提醒</span>
      <span class="nav-item" @click="handleRouter('account')">我的账户</span>
      <span class="nav-item" @click="handleRouter('vip')">成为会员</span>
      <span class="nav-item" v-if="me" @click="handleRouter('close')">注销账户</span>
      <van-icon name="cart" color="#ffffff" size="20px" @click="handleRouter('order')" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['me'])
  },
  props: ['background'],
  data () {
    return {
      user: null
    }
  },
  watch: {
    me (val, old) {
      this.user = val
    }
  },
  methods: {
    handleRouter (key) {
      switch (key) {
        case 'account':
          if (this.me) {
            this.$router.push('/user')
          } else {
            this.$router.push('/login')
          }
          break
        case 'reminder':
          if (this.me) {
            this.$router.push('/reminder')
          } else {
            this.$router.push('/login')
          }
          this.$router.push('/reminder')
          break
        case 'contact':
          this.$router.push('/help/contact')
          break
        case 'question':
          this.$router.push('/help/question')
          break
        case 'secret':
          this.$router.push('/help/secret')
          break
        case 'vip':
          this.$router.push('/vip/introduction')
          break
        case 'home':
          this.$router.push('/')
          break
        case 'close':
          this.$store.commit('set_me', null)
          localStorage.removeItem('token')
          this.$router.push('/login')
          break
        case 'order':
          this.$router.push('/order/detail')
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.nav {
  padding: 10px 150px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 20;
  height: 50px;
  box-sizing: border-box;
  font-size: 16px;
  background: #007E56;
  z-index: 3000;
  .nav-item {
    color: #ffffff;
    margin-right: 10px;
    cursor: pointer;
  }
  .nav-pic {
    background-image: url("https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/logo.png");
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
  }
  .nav-pic:hover {
    background-image: url("https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/logo-active.png");
  }
  .left-nav {
    width: 45%;
    display: flex;
    align-items: center;
  }
  .right-nav {
    display: flex;
    align-items: center;
  }
}
</style>
