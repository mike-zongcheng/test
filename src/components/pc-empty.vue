<template name="component-name">
  <div class="show-content">
    <div class="item-font">
      利用人工智能和大数据进行全网人脸搜索，帮您及时检测您的肖像是否被盗用或偷拍并非法公布于互联网。
      <span>人脸侦探为您提供最精准的搜索结果。我们不会保存您的搜索图像，因为网络隐私对我们来说非常重要。</span>
    </div>
    <div class="side">
      <div class="item">
        <img src="@/assets/images/pc/2.png" alt />
        <div class="intro">
          <p class="t">1、上传图片</p>
          <p class="d">上传多张清晰正脸无美颜的照片将提高搜素质量</p>
        </div>
      </div>
      <div class="item">
        <img src="@/assets/images/pc/3.png" alt />
        <div class="intro">
          <p class="t">2、选择人脸</p>
          <p class="d">上传搜索的人脸必须属于同一个人，尽量保证照片中的人脸清晰可见</p>
        </div>
      </div>
      <div class="item">
        <img src="@/assets/images/pc/4.png" alt />
        <div class="intro">
          <p class="t">3、全网比对搜索</p>
          <p class="d">我们的深度学习算法高效执行，将在几秒内为您呈现搜索结果</p>
        </div>
      </div>
      <div class="item">
        <img src="@/assets/images/pc/5.png" alt />
        <div class="intro">
          <p class="t">4、离线搜索提醒</p>
          <p class="d">SVIP可添加人脸进行离线搜索。7x24小时自动检索匹配，命中目标将及时收到提醒</p>
        </div>
      </div>
    </div>
    <div class="item-font">
      <div class="point">人脸搜索实例</div>
    </div>
    <img class="item-show" src="@/assets/images/pc/9.png" />
    <div class="item-font">
      <div class="point">功能</div>
    </div>
    <div class="server-box-reminder">
       <div class="title">离线搜索提醒服务</div>
      <div class="content">当人脸侦探发现网络上出现您设置为离线搜索的人脸时，会及时对您发出提醒</div>
      <div class="server-item">互联网瞬息万变，任何一家平台都无法做到绝对全面的数据覆盖。</div>
      <div class="server-item">如果您此刻在人脸侦探未搜索到绝对命中目标，不代表下一秒不会出现。交给人脸侦探的机器人吧</div>
      <div class="server-item">它将24小时不间断工作，命中及时提醒。添加您想搜索的人脸进行离线搜索，是最有保障的。</div>
      <div class="py-btn" @click="$router.push('/reminder')">了解更多</div>
      <div class="server-show">
        <img src="@/assets/images/pc/6.png" />
      </div>
    </div>
    <img
      class="item-show"
      src="@/assets/images/pc/search-show.png"
      alt
      @click="$router.push('/reminder')"
    />

    <div class="server-box-2">
       <div class="content">人脸侦探积极打击网络犯罪，法务人员可以利用我们的网站加强您的
        <div>在线调查</div>
        </div>
    </div>
    <div class="item-font">
      <div class="point">最先进的</div>
      <div>人脸搜索器</div>
    </div>
    <!-- 展示图 -->
    <img class="item-show" src="@/assets/images/pc/8.png" alt />
  </div>
</template>
<style lang="less" scoped>
.show-content {
  display: flex;
  flex-flow: column;
  align-items: center;
  .item-font {
    width: 60%;
    font-size: 19px;
    margin: 50px 0;
    text-align: center;
    .point {
      font-weight: 600;
      font-size: 32px;
    }
    span {
      color: #00693c;
      font-weight: 600;
    }
  }
  .item-show {
    width: 60%;
    margin-bottom: 20px;
  }
  .server-box-reminder {
    background: linear-gradient(
      0deg,
      rgba(52, 64, 85, 1) 0%,
      rgba(37, 44, 58, 1) 100%
    );
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    padding: 25px;
    margin: 0 20px 20px;
    width: 60%;
    box-sizing: border-box;
    text-align: left;
    .title {
      font-size: 20px;
    }
    .content {
      margin: 20px 0;
    }
    .server-item {
      border-left: 2px solid #53d5d7;
      margin-bottom: 18px;
      padding: 0 18px;
    }
    .server-show {
      display: flex;
      justify-content: center;
      img {
        width: 140px;
        height: 128px;
      }
    }
     .py-btn {
    border: 0;
    text-align: center;
    font-size: 12px;
    color: #ffffff;
    padding: 6px 8px;
    border-radius: 20px;
    width: 80px;
    margin: 10px 0px 4px;
    background: linear-gradient(#83cafb, #58a9fa);
  }
  }
  .server-box-2 {
        box-sizing: border-box;
    padding: 30px 0;
    width: 60%;
    text-align: center;
    color: #ffffff;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(../assets/images/pc/secret.png);
    .content {
      font-size: 18px;
      div {
        font-size: 30px;
      }
    }
  }
  .side {
    width: 100%;
    background: #f5f5f5;
    box-sizing: border-box;
    padding: 0 6rem;
    display: flex;
    justify-content: center;
    .item {
      flex: 1;
      display: flex;
      flex-flow: column;
      align-items: center;
      text-align: center;
      font-size: 16px;
      padding: 80px 0 40px;
      .intro {
        color: #666666;
        .t {
          margin: 15px 0;
        }
        .d {
          font-size: 14px;
          padding: 0 15px;
        }
      }
      img {
        width: 50%;
      }
    }
  }
}
</style>
