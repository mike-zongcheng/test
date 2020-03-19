<template name="component-name">
  <div class="app-footer" :style="{ background: background }">
    &copy;
    <span>2019-2021</span>
    <p @click="$router.push('/')">首页</p>
    <p @click="$router.push('/help/secret')">隐私政策</p>
    <p @click="$router.push('/help/question')">常见问题</p>
    <p @click="$router.push('/help/contact')">联系我们</p>
    <p @click="$router.push('/reminder')">提醒</p>
    <p @click="$router.push('/vip/introduction')">高级会员</p>
    <p @click="$router.push('/order/detail?level=1')">
      <van-icon name="cart" color="#0000000" size="20px" />
    </p>
  </div>
</template>
<script>
export default {
  props: ['background']
}
</script>
<style lang="less" scoped>
.app-footer {
  font-size: 14px;
  background: #24282e;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  cursor: pointer;
}
</style>
