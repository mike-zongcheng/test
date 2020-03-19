<template name="component-name">
  <div class="mian-content">
    <div class="item-font">
      利用人工智能和大数据进行全网人脸搜索，帮您及时检测您的肖像是否被盗用或偷拍并非法公布于互联网。
      <span>人脸侦探为您提供最精准的搜索结果。我们不会保存您的搜索图像，</span>因为网络隐私对我们来说非常重要。
    </div>
    <div class="img-side">
      <div class="item">
        <img src="@/assets/images/pc/2.png" alt />
        <div class="intro">
          <p class="t">1.上传图片</p>
          <p class="d">上传多张清晰正脸无美颜的照片将提高搜素质量</p>
        </div>
      </div>
      <div class="item">
        <img src="@/assets/images/pc/3.png" alt />
        <div class="intro">
          <p class="t">2.选择人脸</p>
          <p class="d">上传搜索的人脸必须属于同一个人，尽量保证照片中的人脸清晰可见</p>
        </div>
      </div>
      <div class="item">
        <img src="@/assets/images/pc/4.png" alt />
        <div class="intro">
          <p class="t">3.全网比对搜索</p>
          <p class="d">我们的深度学习算法高效执行，将在几秒内为您呈现搜索结果</p>
        </div>
      </div>
      <div class="item">
        <img src="@/assets/images/pc/5.png" alt />
        <div class="intro">
          <p class="t">4.离线搜索提醒</p>
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
    <div class="server-box">
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
    <div class="bg-box-10">
      <div class="content">人脸侦探积极打击网络犯罪，法务人员可以利用我们的网站进行
        <span>在线调查</span>
        </div>
    </div>
    <div class="bg-box">
      <div class="content">最好的人脸搜索服务仅提供给高级会员。高级会员可解锁全部功能，您的隐私安全将得到最大的保障。</div>
      <div class="py-btn" @click="$router.push('/vip/introduction')">获取特权</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.mian-content {
  font-size: 15px;
  text-align: center;
  .item-font {
    padding: 0 25px;
    font-size: 15px;
    color: #666666;
    margin: 20px 0px;
    text-align: left;
    .point {
      font-weight: 600;
      font-size: 22px;
      text-align: center;
    }
    span {
      font-weight: 600;
      color: #333333;
    }
  }
  .item-show {
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
  }
  .img-side {
    display: flex;
    flex-flow: column;
    .item {
      display: flex;
      flex-flow: column;
      align-items: center;
      text-align: center;
      font-size: 16px;
      padding: 40px 0;
      .intro {
        color: #333333;
        .t {
          margin: 15px 0;
          font-size: 17px;
        }
        .d {
          font-size: 14px;
          padding: 0 15px;
        }
      }
      img {
        width: 25%;
      }
    }
    .item:nth-child(2n) {
      background: #f8f8f8;
    }
  }
  .server-box {
    background: linear-gradient(
      0deg,
      rgba(52, 64, 85, 1) 0%,
      rgba(37, 44, 58, 1) 100%
    );
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    padding: 25px;
    margin: 0 20px 20px;
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
  }
  .bg-box {
    padding: 25px;
    margin: 20px;
    text-align: left;
    color: #ffffff;
    background-image: url("../assets/images/pc/7.png");
    .content {
      font-size: 14px;
    }
  }
  .bg-box-10 {
    padding: 25px;
    margin: 20px;
    text-align: left;
    color: #ffffff;
    background-image: url("../assets/images/pc/10.png");
    .content {
      font-size: 14px;
      span {
        font-size: 18px;
      }
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
</style>
