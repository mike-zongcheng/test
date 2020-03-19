<template >
  <div class="message" v-if="me">
    <Header :leftAllow="true" />
    <div class="list" v-if="me.remind&&me.remind.length > 0">
      <div class="top-msg">已设置提醒人脸</div>
      <div class="item" v-for="(item, index) in me.remind" :key="index">
        <img :src="'data:image/jpeg;base64,'+ item.face_base64" />
        <div class="info">
          <div class="t">暂未搜到人脸相关信息</div>
        </div>
        <button class="cancel-btn" @click="cancel(index, item)">删除</button>
      </div>
    </div>
    <div class="list" v-if="!me.remind || me.remind.length === 0">
      <div class="empty">
        <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/user/remind-empty.png" />
      </div>
    </div>
    <van-popup v-model="showCancel">
      <div class="senior-member-reminder">
        <div class="p">你确定删除此人脸提醒设置吗？</div>
        <div class="btns">
          <button class="confirm" style="padding: 5px 20px;" @click="showCancel = false">返回</button>
          <button class="cancel" style="padding: 5px 20px;" @click="cancelRecomind">确定</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Header from '@/components/mobile-header'
import * as UpLoadAction from '@/api/upload'
import * as AuthAction from '@/api/auth'
import { mapState } from 'vuex'
export default {
  components: {
    Header
  },
  data () {
    return {
      showCancel: false,
      currentItem: null
    }
  },
  computed: {
    ...mapState(['me'])
  },
  beforeMount () {
    if (localStorage.token) this.fetchMe()
  },
  methods: {
    fetchMe () {
      AuthAction.me()
        .then(data => {
          this.$store.commit('set_me', data.data.user_info)
        }).catch(err => this.$toast(err.error))
    },
    cancel (index, item) {
      this.showCancel = true
      this.currentItem = item
    },
    cancelRecomind () {
      this.showCancel = false
      let formData = new FormData()
      formData.append(`face_ids[0]`, this.currentItem.id)
      UpLoadAction.cancelRemind(formData)
        .then(res => {
          this.fetchMe()
          this.$toast('删除成功')
        }).catch(err => this.$toast(err.error))
    }
  }
}
</script>
<style lang="less" scoped>
.message {
  background: #242933;
}
.top-msg {
  font-size: 14px;
  color: #999999;
  margin-bottom: 15px;
}
.empty {
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 285px;
    height: 210px;
    margin: 50px 0;
  }
}
.list {
  width: 100%;
  padding: 4% 5%;
  background: #ffffff;
  box-sizing: border-box;
  .item {
    width: 100%;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 15px 10px;
    box-shadow: 0px 3px 21px 0px rgba(206, 207, 207, 0.22);
    margin: 10px 0px;
    border-radius: 10px;
    .info {
      flex: 1;
      text-align: center;
      .t {
        color: #666666;
        font-size: 15px;
      }
      .time {
        font-size: 11px;
        color: #cccccc;
      }
    }
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
}
.cancel-btn {
  border: 1px solid red;
  background: #ffffff;
  cursor: pointer;
}
.cancel-btn:hover,
.cancel-btn:active {
  background: red !important;
  color: #ffffff !important;
}
</style>
