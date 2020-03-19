<template>
  <div>
    <van-nav-bar
      :z-index="3000"
      @click-left="goBack"
      :title="title || ''"
      :left-arrow="leftAllow"
      @click-right="showService"
    >
      <van-icon name="apps-o" slot="right" size="20px" />
    </van-nav-bar>
    <van-popup
      position="top"
      :close-on-click-overlay="true"
      v-model="show"
      :style="{ top: '46px', background:'#424242' }"
    >
      <div class="menu">
        <div class="item" @click="handleRouter('home')">
          <div class="item-icon">
            <img src="@/assets/images/nav/home.png" />
          </div>
          <span>首页</span>
        </div>
        <div class="item" @click="handleRouter('secret')">
          <div class="item-icon">
            <img src="@/assets/images/nav/privacy.png" />
          </div>
          <span>隐私政策</span>
        </div>
        <div class="item" @click="handleRouter('question')">
          <div class="item-icon">
            <img src="@/assets/images/nav/faq.png" />
          </div>
          <span>常见问题</span>
        </div>
        <div class="item" @click="handleRouter('contact')">
          <div class="item-icon">
            <img src="@/assets/images/nav/contact.png" />
          </div>
          <span>联系我们</span>
        </div>
        <div class="item" @click="handleRouter('reminder')">
          <div class="item-icon">
            <img src="@/assets/images/nav/tixing.png" />
          </div>
          <span>提醒</span>
        </div>
        <div class="item" @click="handleRouter('account')">
          <div class="item-icon">
            <img src="@/assets/images/nav/account.png" />
          </div>
          <span>{{authText}}</span>
        </div>
        <div class="item" @click="handleRouter('vip')">
          <div class="item-icon">
            <img class="item-icon" src="@/assets/images/nav/vip.png" />
          </div>
          <span>成为会员</span>
        </div>
        <div class="item" v-if="me" @click="handleRouter('close')">
          <div class="item-icon">
            <img class="item-icon" src="@/assets/images/nav/close.png" />
          </div>
          <span>注销账户</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['title', 'leftAllow'],
  computed: {
    ...mapState(['me'])
  },
  data () {
    return {
      show: false,
      authText: '我的账户'
    }
  },
  methods: {
    goBack () {
      if (this.me) {
        this.$router.replace('/')
        this.$store.commit('set_step', 0);
      } else {
        this.authText = '登录'
        this.$router.go(-1)
      }
    },
    handleRouter (key) {
      switch (key) {
        case 'home':
          this.$router.push('/')
          break
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
        case 'focus':
          this.$router.push('/help/focus')
          break
        case 'vip':
          this.$router.push('/vip/introduction')
          break
        case 'close':
          this.$store.commit('set_me', null)
          localStorage.removeItem('token')
          this.$router.push('/login')
          break
        default:
          break
      }
      this.show = false
    },
    showService () {
      this.show = !this.show
    }
  }
}
</script>
<style lang="less" scoped>
.van-hairline--bottom::after {
  border: none;
}
.menu {
  position: relative;
  font-size: 16px;
  .item {
    padding: 15px 0;
    text-align: center;
    display: flex;
    width: 100%;
    color: #ffffff;
    border-bottom: 1px #474747 solid;
    .item-icon {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        width: 20px;
        height: 20px;
        margin-right: 15px;
      }
    }
    span {
      flex: 1;
      text-align: left;
      font-weight: 300;
      font-size: 14px;
    }
  }
  .item:hover {
    border-radius: 10px;
    background: #ffffff;
    cursor: pointer;
    color: #24282E;
  }
}
</style>
