<template >
  <div class="order-pay">
    <div class="title">请选择支付方式</div>
    <div class="content">
      <van-radio-group v-model="radio" @change="changePay">
        <van-cell-group :border="false">
           <van-cell v-if="!isWeChat" :border="false" clickable @click="radio = '1'">
            <template slot="title">
              <div class="pay-box">
                <img class="pay-applay" src="@/assets/images/pay/applay.png" />
                <span>支付宝支付</span>
              </div>
            </template>
            <van-radio slot="right-icon" name="1" checked-color="#4D586D" icon-size="15px" />
          </van-cell>
          <van-cell v-if="isWeChat" :border="false" clickable @click="radio = '2'">
            <template slot="title">
              <div class="pay-box">
                <img class="pay-wechat" src="@/assets/images/pay/wechat.png" />
                <span>微信支付</span>
              </div>
            </template>
            <van-radio slot="right-icon" name="2" checked-color="#4D586D" icon-size="15px" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
import * as Helper from '@/helper'
import { mapState } from 'vuex'

export default {
  props: ['type'],
  data () {
    return {
      radio: '',
      isWeChat: false
    }
  },
  computed: {
    ...mapState(['isMobile'])
  },
  created () {
    this.isWeChat = false;
    // if (Helper.isWechat()) {
    //   this.isWeChat = true
    // } else {
    //   this.isWeChat = false
    // }
  },
  mounted () {
    if (this.type) this.radio = this.type
  },
  methods: {
    changePay (val) {
      this.$emit('pay', val)
    }
  }
}
</script>
<style lang="less" scoped>
.order-pay {
  padding: 5% 10%;
  margin: -1px;
  background: #ffffff;
}
.pay-box {
  display: flex;
  align-items: center;
}
.pay-wechat {
  width: 20px;
  height: 18px;
  margin-right: 10px;
}
.pay-applay {
  width: 21px;
  height: 17px;
  margin-right: 10px;
}
.title {
  color: #333333;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
}
.content {
  margin-top: 10px;
}
</style>
