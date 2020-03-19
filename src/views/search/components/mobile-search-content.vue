<template >
  <div class="home">
    <img
      class="top-banner"
      :class="{'search-banner': search_results.length > 0}"
      src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/home/person-face.png"
    />
    <div class="search my-searcher">
      <div class="search-box">
        <van-icon
          style="margin-right:5px;"
          name="add"
          size="20px"
          color="#53D5D7"
          @click="changeSearchStatus"
        />
        <div
          class="img-list"
          @click="changeSearchStatus"
          v-if="searchImagesList.length=== 0"
        >上传张图片看看</div>
        <div class="img-list" v-if="searchImagesList.length">
          <van-image
            v-for="(item, index) in searchImagesList"
            :key="index"
            :src="item.face_base64"
            width="45px"
            height="45px"
            fit="scale-down"
            @click="removeImage(index)"
          />
        </div>
        <span
          class="iconfont iconsousuo"
          style="float:right;color:#4D4D4D;margin-left:5px;"
          @click="onSearch"
        ></span>
      </div>
      <div class="search-message" @click="setReminder">
        <span class="iconfont icontixing" style="font-size:20px;"></span>
      </div>
    </div>
    <div class="main-condition" :class="{'search-condition': search_results.length > 0}">
      <div class="condition">
        <span style="color:#666666;">开启不良内容网站数据集</span>
        <van-checkbox
          icon-size="14px"
          checked-color="#4D586D"
          :disabled="!me || me.level === 0 || me.level === 1"
          shape="square"
          v-model="openAdultStatus"
          @click="onChangeAuth"
        ></van-checkbox>
      </div>
      <div class="select-date" @click="changeDateShow">
        <span class="title">{{searchDate || '请选项更新日期时间结果'}}</span>
        <span class="iconfont iconrili icon"></span>
      </div>
    </div>
    <div style="width:100%;" v-show="!searchLoading">
      <div class="main-content" v-show="search_results.length > 0">
        <template v-for="(item, index) in search_results">
          <div class="item" :key="index" v-if="item.show">
            <div class="show">
              <div class="cover" v-if="!item.url_to_source">
                <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/logo.png" />
              </div>
              <van-image
                @click="previewImage(item.url_to_image, item.url_to_source)"
                :class="{'cover-filter': !item.url_to_source }"
                width="175"
                height="175"
                fit="contain"
                @error="item.show = false"
                :src="item.url_to_image"
              >
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </div>
            <div class="info">
              <van-image
                class="avator"
                :class="{'head-filter': !item.url_to_source }"
                :src="item.url_to_small"
                width="53px"
                height="53px"
                round
                fit="scale-down"
              />=
              <span>{{item.similarity}}% 相似度</span>
            </div>
            <div v-if="item.url_to_source" class="desc">
              找到于
              <a target="_blank" :href="item.url_to_source">{{item.url_to_source}}</a>
            </div>
            <div v-if="!item.url_to_source" class="desc">
              目标来源于:
              <span style="filter: blur(4px);">#############。</span>
            </div>
            <div v-if="!item.url_to_source" class="default-btn" @click="showJustPay">查看详情</div>
          </div>
        </template>
      </div>
      <MobileEmpty v-show="search_results.length === 0" />
    </div>
    <van-popup round v-model="loadingText" :close-on-click-overlay="false">
      <div class="senior-member-reminder">
        <img class="t-pic" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/home/t-pic.png" />
        <div class="p" style="text-align: left;">
          <div>1、人脸侦探采用非人工检索方式，全网自动检索匹配，搜索结果仅供参考。</div>
          <div>2、我们不保证搜索结果满足你的要求。</div>
          <div>3、我们不保证搜索结果的及时性。</div>
          <div>4、建议您开通离线搜索服务，自动搜索，及时提醒，让您更省心。</div>
          <div>5、如有问题请联系客服QQ:741168132</div>
        </div>
        <div class="btns">
          <van-loading v-if="searchLoading" color="#87CBFC" size="30" />
          <button v-if="!searchLoading" class="cancel" @click="loadingText = false">知道了</button>
        </div>
      </div>
    </van-popup>
    <van-popup round :lock-scroll="false" v-model="changeSearchType" :get-container="getContainer">
      <div class="search-type">
        <div class="t">选择图片来源</div>
        <div class="search-item" @click="switchUpImage">
          <span class="iconfont iconpaizhao icon" style="font-size:16px"></span>
          <span>上传图片</span>
        </div>
        <div class="search-item" @click="switchUrlModel">
          <span class="iconfont iconlianjie icon"></span>
          <span>输入链接</span>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showDateSelector" position="bottom">
      <van-datetime-picker
        type="date"
        :minDate="minDate"
        v-model="currentDate"
        @confirm="confirmDate"
        @cancel="showDateSelector=false"
      />
    </van-popup>
    <van-popup round v-model="urlModel">
      <div class="senior-member-reminder">
        <div class="t">输入链接</div>
        <van-field v-model="searchUrl" placeholder="链接" />
        <div class="btns">
          <button @click="urlModel = false">
            <van-icon name="clear" color="#E85A53" />
            <span style="margin-left:5px;">取消</span>
          </button>
          <button @click="onTranFaceId">
            <van-icon name="checked" color="#03836B" />
            <span v-if="!upLoading" style="margin-left:5px;">发送</span>
            <van-loading v-if="upLoading" type="spinner" size="14" style="margin-left:5px;" />
          </button>
        </div>
      </div>
    </van-popup>
    <van-popup round v-model="upLoadStatus">
      <div class="upload-img-model">
        <div class="title" v-if="!upLoading&&searchImagesList.length === 0">请上传图片</div>
        <div class="title" v-if="upLoading">正在检测上传照片中的人脸</div>
        <div class="title" v-if="!upLoading&&searchImagesList.length">已检测到人脸</div>
        <div class="show">
          <div class="search-list">
            <van-uploader multiple v-model="fileList"  :after-read="onRead" :max-count="3"/>
          </div>
        </div>
        <div class="btns">
          <van-button
            class="item default-btn"
            :loading="upLoading"
            :disabled="upLoading || searchImagesList.length === 0"
            @click="onSearch"
          >
            <van-icon class="icon" name="search" />
            <span>搜索</span>
          </van-button>
          <button class="item" @click="closeSearch">
            <van-icon class="icon" name="clear" />取消
          </button>
        </div>
      </div>
    </van-popup>
    <van-popup round v-model="historySearchStatus">
      <div class="upload-img-model">
        <div class="title" style="margin-bottom:10px;">检测到您已有的上次搜索结果</div>
        <div class="search-list">
          <van-image
            v-for="(item, index) in searchImagesList"
            :key="index"
            width="78"
            height="78"
            :src="item.face_base64"
            @click="previewImage(item.face_base64, true)"
          />
        </div>
        <div class="btns" v-if="me">
          <van-button class="item default-btn" @click="historySearchStatus = false">
            <van-icon class="icon" name="search" />继续查看
          </van-button>
          <button class="item" @click="closeHistorySearch">
            <van-icon class="icon" name="clear" />不用了
          </button>
        </div>
      </div>
    </van-popup>
    <van-popup round v-model="showVip">
      <div class="senior-member-reminder">
        <div class="t">温馨提示</div>
        <div class="p">{{vipContent}}</div>
        <div class="btns">
          <button class="cancel" @click="showVip = false">知道了</button>
          <button class="confirm" @click="$router.push('/vip/introduction')">{{btnContent}}</button>
        </div>
      </div>
    </van-popup>
    <van-popup round v-model="showReminder">
      <div class="senior-member-reminder">
        <div class="t">离线提醒</div>
        <div class="p">人脸侦探不断更新数据库，探索新的人脸。当系统遇到您要找的人脸时会立即提醒你。</div>
        <div class="btns">
          <button class="cancel" @click="showReminder = false">不，谢谢</button>
          <button class="confirm" @click="$router.push('/reminder')">
            了解更多
            <van-icon name="arrow" />
          </button>
        </div>
      </div>
    </van-popup>
    <van-popup round v-model="remindSuccess">
      <div class="senior-member-reminder">
        <van-icon name="checked" size="60px" />
        <div class="p">已为您将人脸添加到提醒，您可以到我的账户查看详细信息</div>
        <div class="btns">
          <button class="confirm" @click="$router.push('/message')">查看</button>
          <button class="cancel" @click="remindSuccess = false">返回</button>
        </div>
      </div>
    </van-popup>
    <!-- 登录 -->
    <van-popup round v-model="showLogin">
      <div class="senior-member-reminder">
        <div class="t">人脸侦探</div>
        <div class="p">检测到您未登录，请先登录</div>
        <div class="btns">
          <button class="cancel" @click="showLogin = false">不，谢谢</button>
          <button class="confirm" @click="$router.push('/login')">
            前往登录
            <van-icon name="arrow" />
          </button>
        </div>
      </div>
    </van-popup>
    <!-- 并发 -->
    <van-popup round v-model="showErrorTip" :close-on-click-overlay="false">
      <div class="senior-member-reminder">
        <div class="t">温馨提示</div>
        <div class="p" style="margin-bottom:0;text-align: left;">
          当前并发人数已满，请关注微信公众号：”人脸侦探“，稍等片刻，继续使用。
        </div>
        <img style="width:150px;" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/fed-qrcode.jpeg" />
        <div class="b" style="font-size:12px;">
          截屏保存二维码，微信识别关注
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import * as Helper from '@/helper'
import * as UpLoadAction from '@/api/upload'
import * as AuthAction from '@/api/auth'

import MobileEmpty from '@/components/mobile-empty'
import { mapState } from 'vuex'
import { ImagePreview } from 'vant'

export default {
  components: {
    MobileEmpty
  },
  data () {
    return {
      changeSearchType: false,
      historySearchStatus: false,
      showErrorTip: false,
      urlModel: false,
      upLoadStatus: false,
      openAdultStatus: false,
      showDateSelector: false,
      upLoading: false,
      searchLoading: false,
      loadingText: false,
      hideGreyHead: false,
      showVip: false,
      vipContent: '此搜索详细情况，仅付费会员有资格查看',
      btnContent: '成为会员',
      showReminder: false,
      remindSuccess: false,
      showLogin: false,
      fileList: [],
      searchUrl: '',
      searchDomain: [],
      searchDate: '',
      minDate: new Date(2000, 1, 1),
      currentDate: new Date(),
      conditionOptions: [],
      search_results: [],
      domainList: ['.com', '.org', '.net', '.info', '.biz'],
      searchImagesList: []
    }
  },
  computed: {
    ...mapState(['me'])
  },
  created () {
    this.fetchMe()
    if (this.$route.query.target === 'image') this.switchUpImage()
    if (this.$route.query.target === 'url') this.urlModel = true
  },
  methods: {
    fetchHistory () {
      if (localStorage.search_results) {
        this.search_results = JSON.parse(localStorage.search_results) || []
      }
      if (localStorage.searchImagesList) {
        this.searchImagesList = JSON.parse(localStorage.searchImagesList) || []
        this.historySearchStatus = true
      }
    },
    onChangeAuth () {
      this.vipContent = '此处为高级套餐权限，请升级你的套餐'
      this.btnContent = '升级套餐'
      if (!this.me) {
        this.openAdultStatus = false
        this.showLogin = true
        return false
      }
      if (this.me.level * 1 < 2) {
        this.openAdultStatus = false
        this.showVip = true
        return false
      }
      return true
    },
    showJustPay () {
      this.vipContent = '此搜索详细内容情况，仅付费后有资格查看'
      this.btnContent = '立即付费'
      this.showVip = true
    },
    closeSearch () {
      this.upLoadStatus = false
      this.upLoading = false
      this.searchImagesList = []
      this.fileList = []
    },
    getContainer () {
      return document.querySelector('.my-searcher')
    },
    removeImage (index) {
      this.searchImagesList.splice(index, 1)
    },
    changeDateShow () {
      let status = this.onChangeAuth()
      console.log(status, 'test')
      if (status) this.showDateSelector = !this.showDateSelector
    },
    closeHistorySearch () {
      this.searchImagesList = []
      this.search_results = []
      this.historySearchStatus = false
      delete localStorage.search_results
      delete localStorage.searchImagesList
    },
    previewImage (item, auth) {
      if (!auth) return false
      ImagePreview({
        images: [item],
        showIndex: false
      })
    },
    changeSearchStatus () {
      if (!this.me) {
        this.showLogin = true
        return
      }
      if (!this.me.search_power) {
        this.vipContent = '次数已用尽，请升级套餐'
        this.btnContent = '升级套餐'
        this.showVip = true
        return
      }
      this.changeSearchType = !this.changeSearchType
    },
    switchUrlModel () {
      this.urlModel = true
      this.changeSearchType = false
    },
    confirmDate (value) {
      this.searchDate = Helper.dateFormat(value, 'yyyy-MM-dd')
      this.showDateSelector = false
    },
    switchUpImage () {
      this.upLoadStatus = !this.upLoadStatus
      this.changeSearchType = false
    },
    setReminder () {
      if (!this.me) {
        this.showLogin = true
        return
      }
      if (this.me.level === 3) this.addReminder()
      else {
        this.showReminder = true
      }
    },
    addReminder () {
      let formData = new FormData()
      if (this.searchImagesList.length === 0) {
        this.$toast('请添加搜索图片')
        return
      }
      this.searchImagesList.forEach((val, index) => {
        formData.append(`face_ids[${index}]`, this.searchImagesList[index].id)
      })
      UpLoadAction.remind(formData)
        .then(res => {
          this.remindSuccess = true
        })
        .catch(err => {
          this.upLoading = false
          if (err.code === 500) {
            this.showErrorTip = true
            return
          }
          this.$toast(err.error)
        })
    },
    onRead (file) {
      if (!file.file || !file.file.size) {
        this.$toast('仅支持单次上传查询')
        return
      }
      this.upLoading = true
      let formData = new FormData()
      formData.append(`image`, file.file)
      UpLoadAction.uploadImage(formData)
        .then(res => {
          res.data.face_info.map(val => {
            if (val.face_base64) {
              val.face_base64 = 'data:image/jpeg;base64,' + val.face_base64
            } else {
              val.face_base64 = file.content
            }
            return val
          })
          this.fileList[this.fileList.length - 1].content = res.data.face_info[0].face_base64
          this.searchImagesList = this.searchImagesList.concat(
            res.data.face_info
          )
          if (this.me.level > 0) localStorage.searchImagesList = JSON.stringify(this.searchImagesList)
          this.upLoading = false
        })
        .catch(err => {
          this.upLoading = false
          if (err.code === 500) {
            this.showErrorTip = true
            return
          }
          this.$toast(err.error)
        })
    },
    onTranFaceId () {
      if (!this.searchUrl) {
        this.$toast('请输入图片链接')
        return false
      }
      this.upLoading = true
      let formData = new FormData()
      formData.append(`imgurl`, this.searchUrl)
      UpLoadAction.urlSearch(formData)
        .then(res => {
          res.data.face_info.map(val => {
            val.face_base64 = 'data:image/jpeg;base64,' + val.face_base64
            return val
          })
          this.upLoading = false
          this.searchImagesList = this.searchImagesList.concat(
            res.data.face_info
          )
          if (this.me.level > 0) localStorage.searchImagesList = JSON.stringify(this.searchImagesList)
          this.onSearch()
        })
        .catch(err => {
          this.upLoading = false
          if (err.code === 500) {
            this.showErrorTip = true
            return
          }
          this.$toast(err.error)
        })
    },
    fetchMe () {
      AuthAction.me()
        .then(data => {
          this.$store.commit('set_me', data.data.user_info)
          if (this.search_results.length === 0) this.fetchHistory()
        })
        .catch(err => {
          if (err.code === 500) this.showErrorTip = true
          console.log(err)
        })
    },
    onSearch () {
      this.urlModel = false
      this.changeSearchType = false
      this.upLoadStatus = false
      this.historySearchStatus = false
      if (this.searchImagesList.length === 0) {
        this.$toast('请您添加搜索图片')
        return
      }
      let formData = new FormData()
      this.searchImagesList.forEach((val, index) => {
        formData.append(`face_ids[${index}]`, this.searchImagesList[index].id)
      })
      if (this.searchDate) formData.append(`date`, this.searchDate)
      // if (this.openAdultStatus) formData.append(`dataset`, 'adult') // 成人数据集暂不开启
      if (this.hideGreyHead) formData.append(`showOnlyConfidentResults`, 1)
      if (this.searchDomain.length) {
        formData.append(`domains`, this.searchDomain)
      }
      this.searchLoading = true
      this.loadingText = true
      UpLoadAction.imageSearch(formData)
        .then(res => {
          this.searchLoading = false
          if (res.data.search_results.length > 0) {
            this.search_results = res.data.search_results.map(val => {
              val.show = true
              return val
            })
            if (this.me.level > 0) localStorage.search_results = JSON.stringify(this.search_results)
          } else {
            this.$toast('查询结果为空，更换图片查询！')
          }
          this.fetchMe()
        })
        .catch(err => {
          this.searchLoading = false
          if (err.code === 500) {
            this.showErrorTip = true
            return
          }
          if (err.code === 40307 || err.code === 40308) {
            this.vipContent = err.error
            this.showVip = true
            return
          }
          this.$toast(err.error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  position: relative;
  padding-top: 14rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: -46px;
  .top-banner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    object-fit: cover;
    width: 100%;
  }
  .search-banner {
    height: 180px;
  }
  .search {
    position: absolute;
    width: 90%;
    top: 105px;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-box {
      z-index: 5;
      width: 80%;
      border-radius: 34px;
      padding: 1px 18px;
      background: #ffffff;
      height: 50px;
      display: flex;
      color: #3333;
      align-items: center;
      .img-list {
        width: 90%;
        display: flex;
        flex-flow: row nowrap;
        overflow: hidden;
        font-size: 14px;
        cursor: pointer;
        img {
          margin-right: 5px;
        }
      }
    }
    .search-message {
      cursor: pointer;
      outline: 0;
      border: 0;
      background-color: #73c0fb;
      color: #fff;
      box-sizing: border-box;
      -webkit-box-flex: 0;
      width: 50px;
      border-radius: 0 30px 30px 0;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: -12px;
    }
  }
  .search-type {
    background: #ffffff;
    padding: 15px 35px;
    border-radius: 10px;
    .t {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .search-item:hover {
      cursor: pointer;
    }
    .search-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 15px;
      span {
        width: 65%;
        text-align: left;
        font-weight: 400;
        font-size: 13px;
        color: rgba(51, 51, 51, 1);
      }
      .icon {
        flex: 1;
        font-size: 20px;
      }
    }
  }
  .main-condition {
    width: 100%;
    padding: 0 15px 15px;
    margin-top: 45px;
    font-size: 12px;
    line-height: 40px;
    .condition {
      font-size: 14px;
      color: #999;
      display: flex;
      padding: 0 16px;
      align-items: center;
      span {
        width: 96%;
      }
    }
    .select-date {
      padding: 0 16px;
      color: #373738;
      display: flex;
      .title {
        font-size: 14px;
        width: 96%;
      }
      .icon {
        font-size: 18px;
        flex: 1;
        color: #999999;
      }
    }
  }
  .search-condition {
    margin-top: -40px;
  }
  .main-content {
    width: 100%;
    .cover-filter {
      -webkit-filter: blur(15px); /* Chrome, Opera */
      -moz-filter: blur(15px);
      -ms-filter: blur(15px);
      filter: blur(15px);
    }
    .head-filter {
      -webkit-filter: blur(5px); /* Chrome, Opera */
      -moz-filter: blur(5px);
      -ms-filter: blur(5px);
      filter: blur(5px);
    }

    .item {
      border-radius: 10px;
      margin: 15px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 18px 0px rgba(202, 202, 202, 0.33);
      border-radius: 10px;
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 15px;
      .show {
        width: 100%;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        background: #eeeeee;
        position: relative;
        padding: 10px;
        .cover {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 3.125rem;
          }
        }
      }
      .info {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #008467;
        .avator {
          margin-right: 15px;
        }
        span {
          color: #666666;
          font-size: 13px;
          margin-left: 10px;
        }
      }
      .desc {
        margin: 15px;
        padding-left: 15px;
        font-size: 13px;
        width: 100%;
        text-align: left;
        word-break: break-all;
      }
    }
  }
}
</style>
