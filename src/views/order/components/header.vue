<template>
  <div>
    <van-nav-bar :title="title" :border="false" :left-arrow="true" @click-left="goBack"> </van-nav-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['title'],
  computed: {
    ...mapState(['me'])
  },
  methods: {
    goBack () {
      if (this.me) {
        if (this.$route.path === '/order/list') {
          this.$router.push('/user')
        } else {
          this.$router.push('/order/list')
        }
      } else {
        this.$router.push('/login')
      }
    }
  }

}
</script>

<style lang="less" scoped>
#app .van-nav-bar {
  background-color: #ffffff;
  color: #363f50;
  .van-icon {
    color: #333333;
  }
  .van-nav-bar__title {
    color: #333333;
  }
}

</style>
