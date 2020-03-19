<template name="component-name">
  <div class="empty">
    <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/404.png" alt />
    <van-button class="item" @click="$router.push('/')">
      <span>回到首页</span>
    </van-button>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.empty {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  img {
    box-sizing: border-box;
    margin-top: 15vh;
    width: 80vw;
  }
  @media screen and (min-width: 1125px) {
    img {
    width: 25vw;
    }
  }
}
</style>
