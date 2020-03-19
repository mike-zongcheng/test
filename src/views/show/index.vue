<template name="component-name">
  <div class="show">
    <div class="header">人脸侦探数据资源共享</div>
         <div class="user" v-if="showUser">
          <div class="item">
         注册用户: {{model.reg_user_count}}
       </div>
            <div class="item">
         付款用户: {{model.pay_user_count}}
       </div>
          <div class="item">
         付费金额: {{model.pay_count}}
       </div>
           <div class="item">
         总收益: {{model.getmoney_total}}
       </div>
             <div class="item">
         分成比例: {{model.getmoney_per}}
       </div>
    </div>
    <div class="content" v-if="showTotal">
       <van-row style="width:100%; margin-bottom:10px;">
          <van-col span="4">方式</van-col>
          <van-col span="4">注册用户</van-col>
          <van-col span="4">付费用户</van-col>
          <van-col span="4">金额</van-col>
          <van-col span="4">总收益</van-col>
          <van-col span="4">比例</van-col>
        </van-row>
      <div class="item" v-for="(item, index) in list" :key="index">
         <van-row style="width:100%;">
          <van-col span="4" v-if="item.method * 1 === 0">平台</van-col>
          <van-col span="4" v-if="item.method * 1  !== 0">{{item.method}}</van-col>
          <van-col span="4">{{item.reg_user_count}}</van-col>
          <van-col span="4">{{item.pay_user_count}}</van-col>
          <van-col span="4">{{item.pay_count}}</van-col>
          <van-col span="4">{{item.getmoney_total}}</van-col>
          <van-col span="4">{{item.getmoney_per}}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import * as ShowAction from '@/api/show'
export default {
  data () {
    return {
      list: [],
      showTotal: false,
      showUser: false,
      model: {}
    }
  },
  created () {
    if (this.$route.query.method) {
      localStorage.P_method = this.$route.query.method
      this.fetchModel()
    }
  },
  methods: {
    fetchModel () {
      let params = {}
      if (localStorage.P_method) params.method = localStorage.P_method
      ShowAction.fetchList(params).then(res => {
        if (localStorage.P_method === 'Yesido') {
          this.list = res.data
          this.showTotal = true
        } else {
          this.model = res.data
          this.showUser = true
        }
      }).catch(err => this.$toast(err.error))
    }
  }
}
</script>
<style lang="less" scoped>
.show {
  .header {
    width: 100%;
    font-size: 1.5rem;
    padding: 20px 0;
    height: 3rem;
    color: #ffffff;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user {
    width: 100%;
    padding: 20px 0;
    background-image: linear-gradient(to right, #434343 0%, black 100%);
    color: #ffffff;
        min-height: 667px;
    display: flex;
    flex-flow: column;
    .item {
      width: 100%;
      margin-bottom: 10px;
      text-align: center;
    }
  }
  .content {
    color: black;
    font-size: 12px;
    width: 100%;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #434343 0%, black 100%);
    color: #ffffff;
        min-height: 1000px;
    padding: 10px;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    text-align: center;
    .item {
      width: 100%;
    }
  }
}
</style>
