<template>
  <div id="app">
    <transition name="fade" :duration="100" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isMobile'])
  },
  created () {
    this.fechIndex()
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => { that.fechIndex() })()
    }
  },
  methods: {
    fechIndex () {
      // 屏幕宽度
      let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
      // 页面DOM节点
      let htmlDom = document.getElementsByTagName('html')[0]
      if (htmlWidth < 768) {
        this.$store.commit('SET_MOBILE', true)
      } else {
        this.$store.commit('SET_MOBILE', false)
      }
      htmlDom.style.fontSize = htmlWidth / (375 / 16) + 'px'
    }
  }
}
</script>
<style lang="less" >
@primary-color: #24282e;
#app {
  position: relative;
  font-family: PingFangSC-Regular, sans-serif;
  input {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    -webkit-appearance: none;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #030203; //分页器主题色修改
  }
  .van-checkbox__icon .van-icon {
    border: 1px solid #999999;
  }
  .van-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .van-popup--center {
    top: 40%;
  }
  .van-steps--horizontal {
    padding: 20px 10px 0;
  }
  .van-cell.van-field {
    margin: 15px 0;
    padding: 6px 10px;
    height: 44px;
    line-height: 30px;
    // border-bottom: 1px dotted #ebedf0;
  }
  .van-cell__title {
    color: #999999;
  }
  .van-cell__right-icon {
    color: #999999;
  }
  .van-button--primary {
    background: transparent;
    border: 0;
    color: #87cbfc;
    font-size: 12px;
  }
  .select-date {
    .title {
      color: #999999;
    }
  }
  .van-popup--top {
    top: 0%;
    left: unset;
    width: 150px;
    color: #ffffff;
    right: 7%;
    border-radius: 11px;
    overflow: hidden;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border: 0;
  }
  .van-collapse-item__content {
    padding: 10px 16px;
  }

  .van-uploader__input-wrapper {
    width: 100%;
  }
  .van-search {
    border-radius: 34px;
    width: 80%;
  }
  .van-search__content {
    background: #ffffff;
  }
  .van-checkbox {
    border-radius: 4px;
  }
  .van-nav-bar {
    background-color: #272933;
    .van-nav-bar__title {
      color: #fff;
      font-size: 18px;
    }
    .van-icon {
      color: #fff;
      font-size: 18px;
    }
  }
  .default-btn {
    cursor: pointer;
    color: #ffffff;
    background: linear-gradient(#83cafb, #58a9fa);
    text-align: center;
    padding: 6px 20px;
    border-radius: 20px;
    font-size: 12px;
  }
  .default-btn:hover {
    background: #58a9fa;
  }

  .active {
    background: linear-gradient(#83cafb, #58a9fa);
  }
  .cancel-btn {
    color: #cccccc;
    border: 1px solid #cccccc;
    background: #ffff;
    padding: 0;
    margin: 0;
    height: 27px;
    padding: 0px 8px;
    border-radius: 20px;
    font-size: 13px;
  }
  .cancel-btn:active {
    cursor: pointer;
    color: #ffffff;
    background: #999999;
  }
  .upload-img-model {
    width: 264px;
    background: #ffffff;
    padding: 15px;
    border-radius: 5px;
    text-align: center;
    .title {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 15px;
    }
    .search-list {
      display: flex;
      flex-flow: row wrap;
      box-sizing: border-box;
      img {
        border-radius: 5px;
      }
    }
    .show {
      padding: 10px 0 5px;
      position: relative;
      .checked {
        position: absolute;
        width: 100px;
        height: 100px;
        background: rgba(0, 0, 0, 0.5);
        left: 68px;
        top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .btns {
      font-size: 12px;
      margin-top: 10px;
      .item {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        width: 100%;
        border-radius: 20px;
        margin-bottom: 10px;
        height: unset;
        line-height: unset;
        .icon {
          margin-right: 5px;
        }
      }
    }
  }

  .senior-member-reminder {
    background: #ffff;
    color: #373738;
    padding: 20px 10px;
    width: 260px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    border-radius: 10px;
    .t-pic {
      width: 60%;
    }
    .t {
      font-weight: 600;
      font-size: 20px;
      color: #333333;
    }
    .p {
      margin: 20px;
    }
    .b {
      color: #666666;
    color: 12px;
    margin-top: -10px;
    margin-bottom: 18px;
    }
    .btns {
      text-align: center;
      display: flex;
      justify-content: space-evenly;
      font-size: 14px;
      button {
        border: 0;
        background: transparent;
        display: flex;
        border-radius: 15px;
        align-items: center;
        align-content: center;
        margin: 0 10px;
      }
      .confirm {
        color: #ffffff;
        background: linear-gradient(#83cafb, #58a9fa);
        padding: 5px 15px;
        display: flex;
        align-items: center;
      }
      .cancel {
        background: rgba(238, 238, 238, 1);
        padding: 5px 15px;
      }
      .cancel:hover {
        background: #cccccc;
      }
      .cancel:active {
        background: #999999;
      }
      .confirm:hover {
        background: #58a9fa;
      }
    }
  }
}
@media screen and (min-width: 1125px) {
  #app {
    font-family: Microsoft YaHei;
    .van-popup--top {
      width: 200px;
      right: 2%;
      border-radius: 11px;
    }
    .senior-member-reminder {
      background: #ffff;
      color: #373738;
      padding: 30px 40px;
      text-align: center;
      cursor: pointer;
      border-radius: 10px;
      .t {
        font-weight: 500;
        font-size: 20px;
      }
      .p {
        margin: 20px;
      }
      .btns {
        text-align: center;
        button {
          border: 0;
          background: transparent;
        }
        .confirm {
          color: #ffffff;
          background: linear-gradient(#83cafb, #58a9fa);
          padding: 5px 15px;
          border-radius: 5px;
        }
        .cancel {
          background: rgba(238, 238, 238, 1);
          border-radius: 5px;
          padding: 5px 15px;
        }
        .cancel:hover {
          background: #cccccc;
        }
        .cancel:active {
          background: #999999;
        }
        .confirm:hover {
          background: #58a9fa;
        }
      }
    }
  }
}
</style>
