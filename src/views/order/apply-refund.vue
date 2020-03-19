<template>
  <div class="refund-page">
    <Header title="申请退款" />
    <div class="refund-form">
      <div class="item">
        <van-cell value="商品" :border="false" />
        <div class="main">{{ goods_name }}</div>
      </div>
      <div class="item">
        <van-cell value="退款金额" :border="false" />
        <van-field
          style="padding: 0 16px;color:#64C9FB;"
          readonly
          clickable
          :value="refund_fee"
          @touchstart.native.stop="keyboard = true"
        />
        <van-number-keyboard
          :show="keyboard"
          theme="custom"
          v-model="refund_fee"
          extra-key="."
          close-button-text="完成"
          @blur="keyboard = false"
        />
      </div>
      <div class="item">
        <van-cell value="退款说明" :border="false" />
        <div class="main">
          <van-field
            v-model="refund_remark"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="请输入留言"
            show-word-limit
          />
        </div>
      </div>
      <div class="item">
        <van-cell value="联系方式" :border="false" />
        <div class="main">
          <van-field
            v-model="contact"
            autosize
            placeholder="请留下微信(wx:XXXXXXXX)"
          />
        </div>
      </div>
      <div class="item">
        <van-cell value="上传凭证" :border="false" />
        <div class="main">
          <van-uploader
            v-model="fileList"
            :max-count="3"
          />
        </div>
      </div>
      <div
        class="submit"
        :class="{ default: !submitStatus, active: submitStatus }"
        @click="onSubmit"
      >
        提交
      </div>
    </div>
    <!-- 退款须知 -->
    <van-popup round v-model="showTips" :close-on-click-overlay="false">
      <div class="senior-member-reminder">
        <div class="t">《退款须知》</div>
        <div class="intro">
          请您知悉，我司提供的产品为在线查询服务，根据《消费者权益保护法》等规定，不适用七天无理由退货规定。
        </div>
        <div class="content">
          <template v-for="(item, index) in tipList">
            <div :key="index">
              <div class="title">
                {{item.title}}:
              </div>
              <div class="text-item" v-for="(i, idx) in item.content" :key="i + idx">
                {{idx + 1}}、{{i}};
              </div>
            </div>
          </template>
        </div>
         <div class="btns">
          <button class="confirm" @click="showTips = false">继续退款</button>
          <button class="cancel" @click="$router.push('/order/list')">我不退了</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Header from './components/header'
import * as OrderAction from '@/api/order'
import * as Filter from '@/filter'

export default {
  components: {
    Header
  },
  computed: {
    submitStatus () {
      if (this.refund_remark && this.refund_fee && this.refund_remark && this.fileList.length && this.contact) {
        return true
      }
      return false
    }
  },
  data () {
    return {
      goods_name: '平台单次查询',
      fileList: [],
      tipList: [
        {
          title: '目前人脸侦探仅支持三种退款类型',
          content: [
            '重复购买经协商核实可退款',
            '套餐买错经协商核实可退款',
            '因本司原因造成无法正常使用的经协商核实可退款'
          ]
        },
        {
          title: '退款限制',
          content: [
            '因客户通过支付宝及微信向我司付款时，我司承担了手续费，因此，我司将在退款时，扣除消费额10%的手续费',
            '财务审核时间为用户申请退款之日起7个工作日内，审核通过将直接原路退款到您付款的账户'
          ]
        },
        {
          title: '补充说明',
          content: [
            '符合三种情形的，仅在未使用的情况下可全额退款,如已使用搜索次数，则按单次搜索最低金额29.4扣款，搜索几次就扣几次的费用。（但需扣除支付渠道手续费）',
            '如在使用后发起的退款，请与客服协商处理。达成退款需求后，也需扣除我司实际成本进行退款'
          ]
        }
      ],
      submitLoading: false,
      voucher_img: [],
      showTips: true,
      keyboard: false,
      refund_fee: '0',
      contact: '',
      refund_remark: ''
    }
  },
  created () {
    if (this.$route.query.level) this.goods_name = Filter.transVipTitle(this.$route.query.level * 1)
    if (this.$route.query.maxLimit) this.refund_fee = this.$route.query.maxLimit.toString()
  },
  methods: {
    onSubmit () {
      if (this.submitLoading) return
      if (!this.submitStatus) {
        this.$toast('请完善内容')
        return
      }
      if (this.refund_fee * 1 > this.$route.query.maxLimit * 1) {
        this.$toast('您的退款金额已超过最大限额')
        return
      }
      let formData = new FormData()
      formData.append(`order_id`, this.$route.query.order_id)
      formData.append(`goods_name`, this.goods_name)
      formData.append(`refund_fee`, this.refund_fee)
      formData.append(`contact`, this.contact)
      formData.append(`refund_remark`, this.refund_remark)
      this.fileList.forEach((val, index) => {
        formData.append(`voucher_img[${index}]`, this.fileList[index].file)
      })
      this.submitLoading = true
      OrderAction.submitRefund(formData)
        .then(data => {
          this.submitLoading = false
          this.$router.push('/order/refund/detail?order_id=' + this.$route.query.order_id)
        })
        .catch(err => {
          this.submitLoading = true
          this.$toast(err.error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
#app .van-cell.van-field {
  height: auto;
  margin: 0;
  padding: 0;
  font-size: 12px;
}
.van-field__control {
  color: #e0e0e0;
}
#app .van-popup--center {
    top: 50%;
}
#app .senior-member-reminder {
  width: 300px;
  padding:20px;
  .intro {
    margin: 10px;
    text-align: left;
    color: #888888;
    font-size: 14px;
  }
  .content {
    color: #666666;
    text-align: left;
    margin-bottom: 15px;
    .title {
      font-size: 14px;
      margin-top: 10px;
    }
    .text-item {
      font-size: 12px;
    }
  }
  .btns {
    button {
    justify-content: center;
    width: 85px;
    padding: 5px;
    }
  }
}
.refund-page {
  .submit {
    margin: 0 0.925rem;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    padding: 5px;
    margin-top: 25px;
    color: #ffffff;
  }
  .refund-form {
    .item {
      .main {
        padding: 0 16px;
        color: #666666;
        font-size: 12px;
        .icon-bg {
          background: #e0e0e0;
          display: inline-block;
          padding: 10px;
          color: #ffffff;
          border-radius: 5px;
        }
      }
    }
  }
  .default {
    background-color: #c9c9c9;
  }
  .active {
    background-color: #66cbfb;
  }
}
</style>
