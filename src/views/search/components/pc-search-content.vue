<template>
  <div class="search-page">
    <img class="top-banner" src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/pc/1.png" />
    <div class="searcher">
      <div class="search-box">
        <van-icon
          style="margin-right:5px;"
          name="add"
          size="20px"
          color="#53D5D7"
          @click="switchSearchType"
        />
        <div class="img-list" v-if="searchImagesList.length=== 0" @click="switchSearchType">上传张图片看看</div>
        <div class="img-list" v-if="searchImagesList.length">
          <img
            v-for="(item, index) in searchImagesList"
            :key="index"
            :src="item.face_base64"
            @click="removeImage(index)"
          />
        </div>
        <span
          class="iconfont iconsousuo icon-tools"
          style="float:right;color:#4D4D4D;margin-left:5px; padding-bottom: 1px;margin-bottom: -1px;"
          @click="onSearch"
        ></span>
      </div>
      <button class="search-message" @click="setReminder">
        <i class="iconfont icontixing icon-tools"></i>
      </button>
    </div>
    <div class="main-condition">
      <div class="line">
        <van-checkbox
          icon-size="14px"
          style="display:inline-block;margin-right:5px"
                checked-color="#4D586D"
          v-model="openAdultStatus"
          :disabled="!me || me.level === 0 || me.level === 1"
          @click="onChangeAuth"
        ></van-checkbox>开启不良内容网站数据集
      </div>
      <div class="select-date" @click="onChangeAuth">
        <VueCtkDateTimePicker
          v-model="searchDate"
          label="请选择日期更新结果"
          color="#4D586D"
          formatted="YYYY-MM-DD"
          format="YYYY-MM-DD"
          output-format="YYYY-MM-DD"
        />
        <span class="iconfont iconrili" style="color: #999999;"></span>
      </div>
    </div>
    <div class="main-content" style="justify-content: center; padding:10%;" v-show="searchLoading">
      <van-loading color="#008467" size="60" />
    </div>
    <div v-show="!searchLoading">
      <div class="main-content" v-if="search_results.length > 0">
        <template v-for="(item, index) in search_results">
          <div class="item" :key="index" v-if="item.show">
            <div class="show">
              <div class="blur" v-if="!item.url_to_source">
                <img src="https://privhub.oss-cn-hangzhou.aliyuncs.com/privhub-fed/logo.png" />
              </div>
              <van-image
                @click="previewImage(item.url_to_image, item.url_to_source)"
                :class="{'filter': !item.url_to_source }"
                width="150"
                height="150"
                fit="contain"
                :src="item.url_to_image"
                @error="item.show = false"
              >
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </div>
            <div class="info">
              <van-image
                class="avator"
                :src="item.url_to_small"
                :class="{'filter': !item.url_to_source }"
                width="60px"
                height="60px"
                round
                fit="scale-down"
              />=
              <span>{{item.similarity}}% 相似度</span>
            </div>
            <div v-if="!item.url_to_source" class="desc">该搜索结果只提供给付费会员。</div>
            <div v-if="item.url_to_source" class="desc">
              找到于
              <a target="_blank" :href="item.url_to_source">{{item.url_to_source}}</a>
            </div>
            <div v-if="!item.url_to_source" class="default-btn" @click="showVip= true">查看详情</div>
          </div>
        </template>
      </div>
      <PcEmpty v-if="search_results&&search_results.length === 0" />
    </div>

    <van-popup v-model="changeSearchType" :get-container="getContainer">
      <div class="search-content">
        <div class="t">选择图片来源</div>
        <div class="search-item" @click="switchUpImage">
          <span class="iconfont iconpaizhao icon" style="font-size:16px"></span>
          <span class="icon-text">上传图片</span>
        </div>
        <div class="search-item" @click="urlModel = true">
          <span class="iconfont iconlianjie icon"></span>
          <span class="icon-text">输入链接</span>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="urlModel">
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
            <span style="margin-left:5px;">发送</span>
          </button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showReminder">
      <div class="senior-member-reminder">
        <div class="t">离线提醒</div>
        <div class="p">人脸侦探不断更新数据库，探索新的人脸。当系统遇到您要找的人脸时会立即发送邮件通知您。</div>
        <div class="btns">
          <button class="cancel" @click="showReminder = false">不，谢谢</button>
          <button class="confirm" @click="$router.push('/reminder')">了解更多</button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="upLoadStatus">
      <div class="upload-img-model">
        <div
          class="title"
          style="margin-bottom:10px;"
          v-if="!upLoading&&searchImagesList.length === 0"
        >请上传图片</div>
        <div class="title" style="margin-bottom:10px;" v-if="upLoading">正在检测上传照片中的人脸</div>
        <div
          class="title"
          style="margin-bottom:10px;"
          v-if="!upLoading&&searchImagesList.length"
        >已检测到人脸</div>
        <div class="search-list">
          <van-uploader v-model="fileList" :after-read="onRead" :max-count="3"/>
        </div>

        <div class="btns">
          <van-button
            class="item default-btn"
            :loading="upLoading"
            :disabled="upLoading || searchImagesList.length === 0"
            @click="onSearch"
          >
            <van-icon class="icon" name="search" />搜索
          </van-button>
          <button class="item" @click="closeSearch">
            <van-icon class="icon" name="clear" />取消
          </button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="historySearchStatus">
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
            <van-icon class="icon" name="search" />立刻查看
          </van-button>
          <button class="item" @click="closeHistorySearch">
            <van-icon class="icon" name="clear" />不用了
          </button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showVip">
      <div class="senior-member-reminder">
        <div class="t">仅限高级会员</div>
        <div class="p">此搜索详细情况，仅付费会员有资格查看</div>
        <div class="btns">
          <button class="cancel" @click="showVip = false">不，谢谢</button>
          <button class="confirm" @click="$router.push('/vip/introduction')">成为会员</button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="remindSuccess">
      <div class="senior-member-reminder">
        <van-icon name="checked" color="#098793" size="60px" />
        <div class="p">已为您将人脸添加到提醒，您可以到我的账户查看详细信息</div>
        <div class="btns">
          <button class="confirm" @click="$router.push('/message')">查看</button>
          <button class="cancel" @click="remindSuccess = false">返回</button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showLogin">
      <div class="senior-member-reminder">
        <div class="t">人脸侦探</div>
        <div class="p">检测到您未登录，请先登录</div>
        <div class="btns">
          <button class="cancel" @click="showLogin = false">不，谢谢</button>
          <button class="confirm" @click="$router.push('/login')">前往登录</button>
        </div>
      </div>
    </van-popup>
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
import '@/assets/font/iconfont.css'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import * as UpLoadAction from '@/api/upload'
import { mapState } from 'vuex'
import PcEmpty from '@/components/pc-empty'
import { ImagePreview } from 'vant'
import * as AuthAction from '@/api/auth'

export default {
  components: {
    VueCtkDateTimePicker,
    PcEmpty
  },
  data () {
    return {
      showErrorTip: false,
      changeSearchType: false,
      historySearchStatus: false,
      urlModel: false,
      hideGreyHead: false,
      openAdultStatus: false,
      showReminder: false,
      showLogin: false,
      upLoadStatus: false,
      showVip: false,
      loadingText: false,
      searchLoading: false,
      upLoading: false,
      remindSuccess: false,
      searchUrl: '',
      fileList: [],
      searchDomain: [],
      searchImagesList: [],
      searchDate: '',
      conditionOptions: [],
      search_results: [],
      domainList: ['.com', '.org', '.net', '.info', '.biz']
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
    fetchMe () {
      AuthAction.me()
        .then(data => {
          this.$store.commit('set_me', data.data.user_info)
          if (this.search_results.length === 0) this.fetchHistory()
        })
        .catch(err => console.warn(err))
    },
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
    getContainer () {
      return document.querySelector('.my-searcher')
    },
    removeImage (index) {
      this.searchImagesList.splice(index, 1)
    },
    closeSearch () {
      this.upLoadStatus = false
      this.upLoading = false
    },
    switchSearchType () {
      if (!this.me) {
        this.showLogin = true
        return
      }
      this.changeSearchType = !this.changeSearchType
    },
    closeHistorySearch () {
      this.searchImagesList = []
      this.search_results = []
      this.historySearchStatus = false
      delete localStorage.search_results
      delete localStorage.searchImagesList
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
        .catch(err => this.$toast(err.error))
    },
    switchUpImage () {
      this.upLoadStatus = !this.upLoadStatus
      this.changeSearchType = false
    },
    onRead (file) {
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
        }).catch(err => {
          this.upLoading = false
          this.$toast(err.error)
        })
    },
    onTranFaceId () {
      if (!this.searchUrl) {
        this.$toast('请输入图片链接')
        return false
      }
      let formData = new FormData()
      formData.append(`imgurl`, this.searchUrl)
      UpLoadAction.urlSearch(formData)
        .then(res => {
          this.changeSearchType = false
          res.data.face_info.map(val => {
            val.face_base64 = 'data:image/jpeg;base64,' + val.face_base64
            return val
          })
          this.searchImagesList = this.searchImagesList.concat(
            res.data.face_info
          )
          if (this.me.level > 0) localStorage.searchImagesList = JSON.stringify(this.searchImagesList)
          this.onSearch()
        })
        .catch(err => {
          this.upLoading = false
          this.$toast(err.error)
        })
    },
    onSearch () {
      this.changeSearchType = false
      this.urlModel = false
      this.upLoadStatus = false
      this.historySearchStatus = false
      if (!this.me) {
        this.showLogin = true
        return
      }
      if (this.searchImagesList.length === 0) {
        this.$toast('请上传至少一张图片')
        return
      }
      let formData = new FormData()
      this.searchImagesList.forEach((val, index) => {
        formData.append(`face_ids[${index}]`, this.searchImagesList[index].id)
      })
      if (this.searchDate) formData.append(`date`, this.searchDate)
      if (this.hideGreyHead) formData.append(`showOnlyConfidentResults`, 1)
      // if (this.openAdultStatus) formData.append(`dataset`, 'adult')
      if (this.searchDomain.length) {
        formData.append(`domains`, this.searchDomain)
      }
      this.searchLoading = true
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
            this.showVip = true
            return
          }
          this.$toast(err.error)
        })
    },
    previewImage (item, auth) {
      if (!auth) return false
      ImagePreview({
        images: [item],
        showIndex: false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.datetimepicker .datepicker {
  left: -20%;
}
.search-page {
  position: relative;
  .top-banner {
    width: 100%;
  }
  .searcher {
    cursor: pointer;
    width: 100%;
    position: absolute;
    top: 175px;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-box {
      z-index: 5;
      width: 30%;
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
        align-items: center;
        font-size: 16px;
        img {
          width: 45px;
          height: 45px;
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
      flex: 0 0 auto;
      width: 50px;
      border-radius: 0 30px 30px 0;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: -12px;
    }
    .icon-tools {
      font-size: 20px;
    }
  }
  .search-content {
    background: #ffffff;
    padding: 20px 40px;
    border-radius: 10px;
    .t {
      font-size: 18px;
      font-weight: 500;
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
    padding: 0 6%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: flex-end;
    height: 140px;
    padding-top: 60px;
    box-sizing: border-box;
    cursor: pointer;
    .line {
      margin: 10px;
      color: #999999;
      font-size: 14px;
    }
    .select-date {
      font-size: 14px;
      margin-left: 10px;
      color: #373738;
      display: flex;
      span {
        margin: 7px;
        font-size: 25px;
      }
    }
  }
  .main-content {
    padding: 2% 8%;
    display: flex;
    flex-flow: row wrap;
    .filter {
      -webkit-filter: blur(6px); /* Chrome, Opera */
      -moz-filter: blur(6px);
      -ms-filter: blur(6px);
      filter: blur(6px);
    }
    .item {
      cursor: pointer;
      width: 28%;
      margin: 15px 20px;
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
        height: 210px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background: #eeeeee;
        position: relative;
        .blur {
          position: absolute;
          width: 100%;
          height: 210px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100px;
          }
        }
      }
      .info {
        width: 100%;
        padding: 20px 10px 5px;
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
        font-size: 13px;
        width: 100%;
        text-align: center;
        word-break: break-word;
        a {
          display: block;
          color: #008467;
        }
      }
    }
  }
}
</style>
