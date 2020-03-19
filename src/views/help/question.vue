<template>
  <div>
    <template v-if="isMobile">
      <Header title="常见问题" :leftAllow="true" />
    </template>
    <template v-if="!isMobile">
      <PcHeader background="#24282E" />
    </template>
    <div class="question">
      <div class="content">
        <van-collapse v-model="activeNames" accordion :border="false" title-class="main-title">
          <van-collapse-item name="1">
            <div class="t" slot="title">人脸侦探是什么？</div>人脸侦探是一个反向搜索引擎，利用人脸识别和人工智能，帮您检索在互联网上泄露的隐私。
          </van-collapse-item>
          <van-collapse-item name="2">
            <div class="t" slot="title">我上传的图片是最后怎么处理？</div>您上传的图片会在搜索完毕后自动删除，我方对用户上传的图片不下载、不浏览、不拷贝。
          </van-collapse-item>
          <van-collapse-item name="3">
            <div class="t" slot="title">如果搜索结果中搜到了我的隐私被侵犯的结果，我该怎么办</div>人脸侦探仅为搜索引擎，所有结果内容并不在我们这里，您可以根据来源提示，直接联系内容所在网站或APP要求删除内容。
          </van-collapse-item>
          <van-collapse-item name="4">
            <div class="t" slot="title">人脸侦探是免费的吗？</div>人脸侦探提供游客模式，您可以体验使用，但搜索结果不是完整的。完整内容仅对付费会员开放。
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
<script>
import Header from '@/components/mobile-header'
import AppFooter from '@/components/app-footer'
import PcHeader from '@/components/pc-header'
import { mapState } from 'vuex'

export default {
  components: {
    Header,
    AppFooter,
    PcHeader
  },
  computed: {
    ...mapState(['isMobile'])
  },
  data () {
    return {
      activeNames: ['1']
    }
  }
}
</script>
<style lang="less" scoped>
@primary-color: #242933;
.van-main-title {
  span {
    color: @primary-color;
  }
}
.question {
  position: relative;
  width: 100%;
  padding-top: 3rem;
  margin-top: -46px;
  .content {
    padding: 1rem 1rem 4rem;
    font-size: 13px;
    .t {
      color: #333333;
      font-size: 15px;
    }
  }
}
@media screen and (min-width: 1000px) {
  .question {
    margin: 0;
    padding-top: 1rem;
    .content {
      padding: 5%;
    }
  }
}
</style>
