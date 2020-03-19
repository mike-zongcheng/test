<template>
  <div class="test-list">
    <div v-if="isWechat">
      <div class="title">
        中钢银通-微信支付
      <van-field v-model="form.scene" placeholder="输入场景值, 1-微信， 3-pc" />
      </div>
      <template v-for="(item, index) in wxList" >
        <van-row :key="index + item.mch_id">
        <van-col span="12">{{ item.mch_id }}</van-col>
        <van-col span="12">
          <van-button plain type="primary" size="mini" @click="onTestWx(item)"
            >测试</van-button
          >
        </van-col>
      </van-row>
      </template>
    </div>
    <div v-if="!isWechat">
      <div class="title">中钢银通-支付宝支付</div>
      <van-field v-model="form.scene" placeholder="输入场景值, 4-h5, 5-pc" />
      <template v-for="(item, index) in ApliyList">
        <van-row  :key="index + item.mch_id">
        <van-col span="12">{{ item.mch_id }}</van-col>
        <van-col span="12">
          <van-button plain type="primary" size="mini" @click="onTestApliy(item)"
            >测试</van-button
          >
        </van-col>
      </van-row>
      </template>
    </div>
       <van-row class="conent" v-if="model">
        <van-col span="24">测试请求: 正常</van-col>
        <van-col v-if="model.code_url" span="24">
          <a :href="model.code_url">二维码链接</a>
          {{ model.code_url }}</van-col>
        <van-col span="24">mch_id: {{form.mch_id}}</van-col>
        <van-col span="24">order_sn:{{model.order_sn}}</van-col>
        <van-col span="24">out_trade_no:{{model.out_trade_no}}</van-col>
        <van-col span="24">sign:{{model.sign}}</van-col>
      </van-row>
  </div>
</template>

<script>
import * as OrderAction from '@/api/order'
import * as Helper from '@/helper'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      ApliyList: [],
      wxList: [],
      model: null,
      isWechat: false,
      form: {}
    }
  },
  computed: {
    ...mapState(['me'])
  },
  created () {
    if (Helper.isWechat()) this.isWechat = true
    if (this.$route.query.openid) {
      this.form.openid = this.$route.query.openid
      this.form.mch_id = this.$route.query.mch_id
      this.wxJsSDK()
    }
    this.fetchList()
  },
  methods: {
    fetchList () {
      let params = {}
      params.sign = 'swjdjb'
      params.callback = window.location.protocol + '//' + window.location.host + '/pay/test'
      OrderAction.fetchTestList(params)
        .then(data => {
          if (Helper.isWechat()) {
            this.wxList = data.data.filter(item => item.status * 1 === 1 || item.status * 1 === 2)
          } else {
            this.ApliyList = data.data.filter(item => item.status * 1 === 1 || item.status * 1 === 3)
          }
        })
        .catch(err => this.$toast(err.error))
    },
    onTestWx (item) {
      if (!this.form.scene) {
        this.$toast('请输入场景值')
        return
      }
      if (this.form.scene * 1 === 1) {
        Helper.xiaoWeiAuth(item)
        console.log('微信内支付')
        return
      }
      console.log('pc-微信支付')
      this.form.mch_id = item.mch_id
      OrderAction.fetchTest(this.form)
        .then(data => {
          this.model = data.data.pay_info
        })
        .catch(err => this.$toast(err.error))
    },
    wxJsSDK () {
      this.form.scene = 1
      OrderAction.fetchTest(this.form)
        .then(data => {
          console.log(data.data, '微信支付测试')
          Helper.jsSDK(data.data.pay_info, '1234567')
        })
        .catch(err => this.$toast(err.error))
    },
    onTestApliy (item) {
      if (!this.form.scene) {
        this.$toast('请输入场景值')
        return
      }
      this.form.mch_id = item.mch_id
      OrderAction.fetchTest(this.form)
        .then(data => {
          this.model = data.data.pay_info
        })
        .catch(err => this.$toast(err.error))
    }
  }
}
</script>
<style lang="less" scoped>
.test-list {
  text-align: center;
  padding: 10px;
}
.conent {
  font-size: 13px;
}
</style>
