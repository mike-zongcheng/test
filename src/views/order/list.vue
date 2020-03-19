<template>
  <div class="order-page">
    <Header title="我的订单" />
    <div class="tabs">
      <van-tabs
        title-active-color="#63C6FB"
        color="#63C6FB"
        @click="changeTabs"
      >
        <van-tab title="全部订单"> </van-tab>
        <van-tab title="退款/售后"> </van-tab>
      </van-tabs>
      <div class="tab-content" v-if="list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="客服QQ:741168132"
          @load="onLoad"
        >
         <div
          class="tabs-item"
          v-for="(item, index) in list"
          :key="item.id + index"
        >
          <div class="header">
            {{ item.level | transVipTitle }}
            <span class="right-tip" v-if="item.order_status * 1 === 2">退款成功</span>
            <span class="right-tip" v-if="item.order_status * 1 === 3">退款审核中</span>
            <span class="right-tip" v-if="item.order_status * 1 === 4">申请已被驳回</span>
            <span class="right-tip" v-if="item.order_status * 1 === 5">退款处理中</span>
          </div>
          <div class="body">
            <div class="left" @click="onDetail(item)">
              <div class="d" v-if="item.level < 3">查询一次</div>
              <div class="d">过滤低质量结果</div>
              <div class="d">搜索结果不做限制</div>
              <div class="d">过滤低质量搜索结果</div>
              <div class="d" v-if="item.level > 1">可获取成人网站数据</div>
              <div class="d" v-if="item.level === 3">可设置离线搜索</div>
              <div class="d" v-if="item.level === 3">平台新推功能</div>
              <div class="d" v-if="item.level === 3">可优先免费使用</div>
            </div>
            <div class="right">
              <div class="price" v-if="item.order_status * 1 !== 2">￥ {{ item.total_fee }}</div>
              <div class="price refund"  v-if="item.order_status * 1 === 2">￥ {{ item.actual_refund_fee }}</div>
              <div class="info" v-if="item.order_status * 1 === 2">备注:{{item.actual_refund_remark}}</div>
              <div class="btns">
                <div
                  class="apply-btn"
                  v-if="item.order_status * 1 === 1"
                  @click="onApply(item)"
                >
                  申请退款
                </div>
                <div class="del-btn"  @click="onStopRefund(item, index)" v-if="item.order_status * 1 === 3">
                  撤销申请
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="empty-item" v-if="list.length === 0">
          <img style="width:8rem;height:9.375rem"  src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/order/empty.png" alt="">
        </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/header'
import * as OrderAction from '@/api/order'
export default {
  data () {
    return {
      page: 1,
      type: 1,
      list: null,
      loading: false,
      finished: false
    }
  },
  components: {
    Header
  },
  created () {
    this.fetchList()
  },
  methods: {
    onLoad () {
      var that = this
      setTimeout(function () {
        that.fetchList()
      }, 500)
    },

    fetchList () {
      let params = {
        page: this.page,
        type: this.type
      }
      OrderAction.orderList(params)
        .then(data => {
          if (data.data.length === 0) {
            this.finished = true
            this.loading = false
          } else {
            if (!this.list) this.list = []
            this.list = this.list.concat(data.data)
            this.page = this.page + 1
            this.loading = false
          }
        })
        .catch(err => {
          this.loading = false
          this.$toast(err.error)
        })
    },
    onStopRefund (item, index) {
      OrderAction.cancelRefund({ order_id: item.id })
        .then(data => {
          this.$toast('撤销成功')
          this.$set(this.list[index], 'order_status', 1)
        })
        .catch(err => this.$toast(err.error))
    },
    onDetail (item) {
      if (item.order_status * 1 !== 3) return
      this.$router.push('/order/refund/detail?order_id=' + item.id)
    },
    onApply (item) {
      this.$router.replace({ path: '/order/apply/refund', query: { order_id: item.id, maxLimit: item.limit_total_fee, level: item.level } })
    },
    changeTabs (name, title) {
      this.list = []
      this.page = 1
      this.type = name + 1
      this.fetchList()
    }
  }
}
</script>

<style lang="less" scoped>
.order-page {
  background-color: #ffffff;
  .tab-content {
    background-color: #f8f8f8;
    padding: 0.625rem;
    min-height: 41.6875rem;
    .empty-item {
      display: flex;
      justify-content: center;
      padding: 6.25rem 0 20rem;
    }
    .tabs-item {
      background-color: #ffffff;
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 10px;
      .header {
        font-size: 14px;
        margin-bottom: 10px;
        .right-tip {
          float: right;
          font-size: 12px;
          color: #66cbfb;
        }
      }
      .body {
        display: flex;
        font-size: 12px;
        color: #666666;
        .left {
          width: 60%;
        }
        .right {
          flex: 1;
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          .price {
            color: #333333;
            text-align: right;
            font-size: 20px;
          }
          .refund{
            color: #66cbfb;
            background: #ffffff;
          }
          .info{
            font-size: 12px;
             width: 150px;
    height: 35px;
    word-break: break-all;
    overflow: hidden;

          }
          .btns {
            display: flex;
            justify-content: flex-end;
            .del-btn {
              color: #66cbfb;
              padding: 3px 6px;
              border-radius: 15px;
              border: 1px solid #66cbfb;
            }
            .apply-btn {
              display: flex;
              align-items: center;
              color: #666666;
              padding: 3px 6px;
              border-radius: 15px;
              margin-left: 6px;
              border: 1px solid #666666;
            }
          }
        }
      }
    }
    .tabs-item:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
}
</style>
