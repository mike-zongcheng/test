<template name="Secret">
  <div>
    <template v-if="isMobile">
      <Header title="隐私政策" :leftAllow="true" />
    </template>
    <template v-if="!isMobile">
      <PcHeader background="#24282E" />
    </template>
    <div class="secret">
      <div class="content">
        <div class="header">
          <span>人脸侦探</span>
          希望确保您的隐私受到保护，本隐私政策涉及在您使用本网站时如何使用和保护提供给人脸侦探的任何信息。您提供的任何信息将仅根据本隐私声明使用。
        </div>
        <div class="item">
          <div class="t">个人识别信息</div>
          <div class="d">我们收集用户个人识别信息的方式包括不限于当用户访问我们的网站,在网站上注册填写表格回或其他活动。</div>
        </div>
        <div class="item">
          <div class="t">安全</div>
          <div class="d">为了阻止任何未经授权的访问披露您的信息，我们已采取适当的电子、物理和管理程序来保护您的信息并确保其安全性。</div>
          <div class="d">我们只会收集用户自愿提交的个人身份信息。用户可以随时拒绝提供个人身份信息。</div>
        </div>
        <div class="item">
          <div class="t">非个人识别信息</div>
          <div
            class="d"
          >当用户与我们的网站互动时，我们可能会收集用户的非个人身份信息。非个人识别信息可能包括浏览器名称、计算机类型和用户连接到我们网站的方式的技术信息，如所使用的操作系统和互联网服务提供商以及其他类似信息。</div>
        </div>
        <div class="item">
          <div class="t">Cookies</div>
          <div
            class="d"
          >我们的网站可能会使用“cookies”来增强用户体验。cookie将放置在您的硬盘上，以便记录。用户可以选择设置您的浏览器来拒绝cookie。但是如果您这样做，网站的部分可能无法正常工作。</div>
        </div>

        <div class="item">
          <div class="t">人脸侦探为什么要收集和使用您的信息:</div>
          <div class="d">1.个性化的用户体验。我们需要您的信息来了解我们的用户如何使用我们的网站和网站上提供的服务。</div>
          <div class="d">2.改善我们的网站。我们将根据您提供的信息和反馈，不断改进我们的网站。</div>
        </div>

        <div class="item">
          <div class="t">我们如何保护您的信息:</div>
          <div
            class="d"
          >我们采取适当的数据收集、存储和处理及安全措施，以防止未经授权的访问、更改、披露或销毁您的个人信息、用户名、密码、交易信息和存储在我们网站上的数据。站点及其用户之间的敏感和私有数据交换将通过SSL安全通信通道进行。</div>
        </div>

        <div class="item">
          <div class="t">分享你的个人信息:</div>
          <div class="d">我们不会向他人出售、交易或出租用户的个人身份信息。</div>
        </div>
        <div class="item">
          <div class="t">遵守儿童在线隐私保护法:</div>
          <div class="d">保护儿童的隐私尤其重要。因此，我们从不收集或维护我们网站上那些我们实际上知道是13岁以下的人的信息，我们网站的任何部分都不是为了吸引13岁以下的人。</div>
        </div>
        <div class="item">
          <div class="t">更改此隐私政策:</div>
          <div class="d">人脸侦探有权随时更新本隐私政策。当我们这样做的时候，</div>
        </div>
        <div class="item">如需使用本网站，即表示您接受本政策。如果您不同意这项政策，请不要使用我们的网站。</div>
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
  }
}
</script>
<style lang="less" scoped>
@primary-color: #242933;
.secret {
  position: relative;
  width: 100%;
  margin-top: -90px;
  .content {
    padding: 6rem 2.5rem 1rem;
    font-size: 12px;
    color: #6C6C6C;
    .header {
      padding: 15px 0;
      span {
        color: #4D586D;
        font-weight: 600;
        font-size: 15px;
      }
    }
    .item {
      margin: 15px 0;
      .t {
        color: #666666;
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
}
@media screen and (min-width: 1125px) {
  .secret {
    margin-top: 0;
    .content {
      padding: 1rem 30%;
    }
  }
}
</style>
