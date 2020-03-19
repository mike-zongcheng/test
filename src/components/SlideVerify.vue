<template>
  <div class="verify-btn" :class="{'active-sucess': status}">
    <span>
      <van-icon name="success" size="20" style="margin: 0 5px;" v-if="status" />
      <van-icon name="question-o"  size="20" style="margin: 0 5px;"  v-if="!status" />
      点击验证
    </span>
  </div>
</template>

<script>
export default {
  props: ['status']
}
</script>

<style lang="less" scoped>
.verify-btn {
    position: relative;
    height: 40px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid #e4e7eb;
    background-color: #f7f9fa;
    overflow: hidden;
    color: #45494c;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: flex;
      align-items: center;
    }
}

.active-sucess {
  border-color: #52ccba;
  color: #52ccba;
  background-color: #d2f4ef;
}
</style>
