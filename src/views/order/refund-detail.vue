<template>
  <div class="refund-page">
    <Header title="退款详情" />
    <div class="waiting">
      <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/order/success.png" />
      <div class="content">
        <div>您已成功发起退款申请</div>
        <div v-if="status === 4">
          您的退款申请已被驳回
        </div>
          <div v-if="status === 5">
          您的退款申请在处理中
        </div>
        <div v-if="status === 3">
          请耐心等待平台处理
        </div>
        <div
          v-if="status === 3"
          v-clipboard:copy="wxCode"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          <div style="text-decoration: underline;">
            如有疑问，请联系客服QQ:741168132
          </div>
        </div>
        <div v-if="status === 2">
          已成功退款
        </div>
      </div>
      <div v-if="status === 3" class="back-btn" @click="onStopRefund">
        撤销申请
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/header'
import * as OrderAction from '@/api/order'

export default {
  components: {
    Header
  },
  data () {
    return {
      status: 3,
      wxCode: 'f2018018'
    }
  },
  created () {
    this.fetchModel()
  },
  methods: {
    onCopy (e) {
      this.$toast('客服微信已在您粘贴板')
      console.log(e.text, 'copy success')
    },
    onError (e) {
      console.error('Failed to copy texts')
    },
    fetchModel () {
      OrderAction.refundStatus({ order_id: this.$route.query.order_id })
        .then(data => {
          this.status = data.data.order_status
        })
        .catch(err => this.$toast(err.error))
    },
    onStopRefund () {
      OrderAction.cancelRefund({ order_id: this.$route.query.order_id })
        .then(data => {
          this.$toast('撤销成功')
          this.$router.push('/order/list')
        })
        .catch(err => this.$toast(err.error))
    }
  }
}
</script>

<style lang="less" scoped>
.refund-page {
  .waiting {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 3rem 0;
    img {
      width: 11.6875rem;
    }
    .content {
      text-align: center;
      margin: 0.625rem 1.25rem;
      color: #333333;
      font-size: 14px;
    }
    .back-btn {
      font-size: 12px;
      color: #66cbfb;
      padding: 3px 6px;
      border-radius: 15px;
      border: 1px solid #66cbfb;
    }
  }
}
</style>
