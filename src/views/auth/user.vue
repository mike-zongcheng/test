<template>
  <div class="user" :style="height" v-if="me">
    <Header title="我的账户" :leftAllow="true" />
    <div class="my-card">
      <div class="header">
        <div class="item-avator" v-if="!me.wx_headimgurl&&!me.wb_profile_image_url">
          <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/user/default-avator.png" />
          <div class="title">匿名</div>
        </div>
        <div class="item-avator" v-if="me.wx_headimgurl">
          <img :src="me.wx_headimgurl" />
          <div class="title">{{me.wx_nickname}}</div>
        </div>
         <div class="item-avator" v-if="me.wb_idstr&&!me.wx_headimgurl">
          <img :src="me.wb_profile_image_url" />
          <div class="title">{{ me.wb_screen_name}}</div>
        </div>
      </div>
      <div class="main-content">
        <div class="item">
          <div class="top">
            我的特权
            <div class="top-right" @click="$router.push('/order/list')">
              我的订单
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="cards" v-if="me.level !== 3">
            <van-swipe :loop="true" :width="100" :height="100" :show-indicators="false">
              <van-swipe-item class="item-card">
                <div class="item card0">
                  <div class="time">{{me.free_times || 0}}次</div>
                  <div class="auth">大众游客</div>
                </div>
              </van-swipe-item>
              <van-swipe-item class="item-card">
                <div class="item card1">
                  <div class="time">{{me.general_times || 0}}次</div>
                  <div class="auth">单次普通查询</div>
                  <div class="card-btn" @click="addCart(1)">购买</div>
                </div>
              </van-swipe-item>
              <van-swipe-item class="item-card">
                <div class="item card2">
                  <div class="time">{{me.times || 0}}次</div>
                  <div class="auth">单次高级查询</div>
                  <div class="card-btn" @click="addCart(2)">购买</div>
                </div>
              </van-swipe-item>
              <van-swipe-item class="item-card">
                <div class="item card3">
                  <div class="time">0次</div>
                  <div class="auth">SVIP高级查询</div>
                  <div class="card-btn" @click="addCart(3)">购买</div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
          <div v-if="me.level=== 3" class="vip-card">
            <div class="card">
              永久高级查询
            </div>
          </div>
        </div>
        <div class="item">
          <div class="top">我的提醒</div>
          <div class="remind" @click="setRemind">
            <img
              v-for="(item, index) in me.remind"
              :key="index"
              class="avatar"
              :src="'data:image/jpeg;base64,'+ item.face_base64"
            />
            <img class="avatar" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/user/more.png" />
          </div>
        </div>
      </div>
    </div>
    <van-popup round v-model="showReminder">
      <div class="senior-member-reminder">
        <div class="t">离线提醒</div>
        <div class="p">人脸侦探不断更新数据库，探索新的人脸。当系统遇到您要找的人脸时会立即发送邮件通知您。</div>
        <div class="btns">
          <button class="cancel" @click="showReminder = false">取消</button>
          <button class="confirm" @click="$router.push('/reminder')">了解更多</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Header from '@/components/mobile-header'
import { mapState } from 'vuex'
import * as AuthAction from '@/api/auth'

export default {
  data () {
    return {
      showReminder: false,
      shareLink: '',
      height: ''
    }
  },
  components: {
    Header
  },
  computed: {
    ...mapState(['me'])
  },
  mounted () {
    this.fetchMe()
    this.height =
      document.documentElement.clientHeight ||
      document.body.clientHeight + 'px'
  },
  methods: {
    addCart (level) {
      this.$router.push('/order/detail?level=' + level)
    },
    fetchMe () {
      AuthAction.me()
        .then(data => {
          this.$store.commit('set_me', data.data.user_info)
        })
        .catch(err => {
          console.log(err)
          this.$router.push('/login')
        })
    },
    setRemind () {
      if (this.me.level === 3) this.$router.push('/message')
      else {
        this.showReminder = true
      }
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
.user {
  width: 100%;
  position: relative;
  background-image: url("https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/user/bg.png");
  background-color: #393d46;
  .my-card {
    margin: 80px 10px 0;
    background: #ffffff;
    border-radius: 10px 10px 0 0;
    padding-bottom: 13rem;
    .header {
      position: relative;
      top: -50px;
      width: 100%;
      display: flex;
      color: #ffffff;
      flex-flow: column;
      justify-items: center;
      box-sizing: border-box;
      .item-avator {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        img {
          width: 100px;
          border-radius: 50%;
        }
        .title {
          font-weight: 600;
          font-size: 20px;
          color: #242933;
          padding: 5px;
        }
      }
    }

    .main-content {
      width: 100%;
      background: #ffffff;
      font-size: 13px;
      margin-top: -45px;
      .item {
        .top {
          color: #333333;
          font-weight: 600;
          margin: 15px 15px 8px;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content:  space-between;
          .top-right {
            font-weight: 500;
            color: #666666;
            font-size: 12px;
            display: flex;
            align-items: center;
          }
        }
        .cards {
          padding: 0 10px;
          overflow: hidden;
          .item-card {
            width: 100%;
            height: 100px;
            box-sizing: border-box;
            padding: 5px;
            .item {
              width: 100%;
              height: 100%;
              background-size: contain;
              background-repeat: no-repeat;
              color: #ffffff;
              .time {
                text-align: right;
              }
              .auth {
                text-align: center;
                margin-top: 15px;
              }

            }
          }
          .card0 {
            background-image: url("https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/user/0.png");
          }
          .card1 {
            background-image: url("https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/user/1.png");
            .card-btn {
              background: #8a8d94;
              opacity: 0.8;
              border-radius: 22px;
              width: 40px;
              text-align: center;
              margin-top: 10px;
              margin-right: 10px;
              float: right;
            }
          }
          .card2 {
            background-image: url("https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/user/2.png");
            .card-btn {
             background:rgba(208,177,126,1);
              opacity: 0.8;
              border-radius: 22px;
              width: 40px;
              text-align: center;
              margin-top: 10px;
              margin-right: 10px;
              float: right;
            }
          }
          .card3 {
            background-image: url("https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/user/3.png");
            .card-btn {
              background: #7D8087;
              opacity: 0.8;
              border-radius: 22px;
              width: 40px;
              text-align: center;
              margin-top: 10px;
              margin-right: 10px;
              float: right;
            }
          }
        }
        .vip-card {
        display: flex;
        justify-content: center;
        color: #ffffff;
        padding: 0 10px;
          .card {
            width: 100%;
            height: 105px;
            border-radius: 10px;
            box-sizing: border-box;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url("https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/user/SVIP.png");
            background-color: #2E2E33;
            display: flex;
            padding: 20px;
            align-items: center;
          }
        }
        .remind {
          width: 94%;
          margin: 10px;
          height: 105px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 3px 21px 0px rgba(206, 207, 207, 0.22);
          display: flex;
          align-items: center;
          overflow: hidden;
          flex-flow: row wrap;
          border-radius: 10px;
          .avatar {
            width: 20%;
            border-radius: 50%;
            margin: 2%;
          }
        }
      }

      @media screen and (min-width: 1125px) {
        .item {
          .remind {
            overflow: auto;
            height: none;
            height: unset;
            .avatar {
              margin: 10px;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 1125px) {
    .header {
      height: 200px;
      .info {
        position: absolute;
        top: 1rem;
        left: 2rem;
      }
    }
    .t {
      font-size: 30px;
    }
    .content {
      padding: 0 5% 15%;
      font-size: 20px;
      img {
        width: 80%;
      }
    }
  }
}
</style>
