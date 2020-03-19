<template >
  <div class="account">
    <div class="title">订单详情</div>
    <div class="content" v-if="level">
      <div class="item">
        <span class="t">产品:</span>
        <span class="desc">{{titles[level -1] || 'vip'}}</span>
      </div>
      <div class="item">
        <span class="t">详情:</span>
        <div class="desc">{{contents[level -1]|| '查询一次，搜索结果不做限制，过滤低质量搜索结果' }} </div>
      </div>
      <div class="item">
        <span class="t">价格:</span>
        <span class="desc">{{discounts[level -1] || 29.4}}元</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['level'],
  data () {
    return {
      discounts: ['29.4', '59.4', '199.4'],
      titles: [
        'VIP',
        'VIP+',
        'SVIP'
      ],
      contents: [
        '查询一次，搜索结果不做限制，过滤低质量搜索结果',
        '查询一次，搜索结果不做限制，过滤低质量搜索结果，可获取成人网站数据',
        '不限查询次数，搜索结果不做限制，过滤低质量搜索结果，可获取成人网站数据。可设置离线搜索，命中自动提醒功能。平台新推功能，可优先免费使用'
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.account {
  background: #ffffff;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  margin-top: -1px;
}
.title {
  color: #333333;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
}
.content {
  background: #eeeeee;
  color: #333333;
  font-weight: 500;
  padding: 10px;
  margin: 15px 0;
  width: 15rem;
  font-size: 15px;
  border-radius: 5px;
  .item {
    margin: 10px 0;
    display: flex;
    align-items: center;
    .t {
      font-weight: 600;
      margin: 0 10px;
      width: 35px;
    }
    .desc {
      flex: 1;
      font-weight: 400;
      font-size: 13px;
    }
  }
}
// 兼容PC配置
@media screen and (min-width: 1000px) {
  .content {
    background: #eeeeee;
    color: #333333;
    font-weight: 500;
    padding: 10px;
    box-sizing: border-box;
    margin: 15px 50px;
    width: 84%;
    font-size: 15px;
    border-radius: 5px;
}
}
</style>
