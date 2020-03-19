import wx from 'weixin-js-sdk'
import * as CommonAction from '@/api/order'
import startsWith from 'lodash/startsWith'

const APP_APPID = process.env.VUE_APP_WX_APPID
// const WX_OAUTH_HOST = process.env.VUE_APP_WX_OAUTH_HOST
/**
 *
 * 将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * yyyy-MM-dd hh:mm:ss.S ==> 2006-07-02 08:09:04.423
 * yyyy-M-d h:m:s.S      ==> 2006-7-2 8:9:4.18
 * @param date
 * @param fmt
 * @returns {*}
 */
export function dateFormat (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

export function isWechat () {
  var ua = navigator.userAgent.toLowerCase()
  // eslint-disable-next-line
  return ua.match(/MicroMessenger/i) == 'micromessenger'
}

export function isPhone (no) {
  return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(no)
}

// 微信登录
export function wechatAuth (target) {
  let redictUrl = window.location.protocol + '//' + window.location.host + target
  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APP_APPID + '&redirect_uri=' + redictUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
}

// 微博登录
export function weiboAuth (target) {
  let targetUrl = window.location.protocol + '//' + window.location.host + target
  let clientId = '2937511771'
  let redict = 'https://api.weibo.com/oauth2/authorize?client_id=' + clientId + '&redirect_uri=' + targetUrl + '&response_type=code'
  window.location.href = redict
}

// 获取第三方支付的appid
export function xiaoWeiAuth (item) {
  if (!item.oauth_url) {
    console.log(item, '不存在oauth_url参数')
    return
  }
  window.location.href = item.oauth_url
}

// 微信支付跳转
export function wxPayTarget (no, fromUrl) {
  let callback = window.location.protocol + '//' + window.location.host + '/pay/success?no=' + no
  window.location.href = 'https://www.faceleida.com/index.php/index/fpay/index.html?order_no=' + encodeURIComponent(no) + '&from_url=' + encodeURIComponent(fromUrl) + '&callback=' + callback
}

// 检测是否移动端
export function isMobile () {
  if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

// 微信分享
export function wechatShare (title, desc, imageUrl, link) {
  var url = window.location.href.split('#')[0]
  if (!link) {
    link = url
  }
  if (!startsWith(link, 'http')) {
    link = window.location.protocol + '//' + window.location.host + link
  }

  CommonAction.fetchWxSDK({ url: url }).then(data => {
    let wxApi = data.data.jsapi
    var apis = ['onMenuShareTimeline', 'onMenuShareAppMessage']
    let params = {}
    params.debug = false
    params.appId = wxApi.appId
    params.timestamp = wxApi.timestamp
    params.nonceStr = wxApi.nonceStr
    params.signature = wxApi.signature
    params.jsApiList = apis
    params.url = wxApi.url
    wx.config(params)
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imageUrl
      })
      wx.onMenuShareAppMessage({
        title: title,
        link: link,
        imgUrl: imageUrl,
        desc: desc
      })
    })

    wx.error(function (res) {
      console.log(res)
    })
  }).catch(err => console.log(err))
}

// 微信原生支付环境
export function jsSDK (params, no) {
  if (typeof window.WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', function () { onBridgeReady(params, no) }, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', function () { onBridgeReady(params, no) })
      document.attachEvent('onWeixinJSBridgeReady', function () { onBridgeReady(params, no) })
    }
  } else {
    onBridgeReady(params, no)
  }
}

// 唤起微信支付
function onBridgeReady (params, no) {
  window.WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      'appId': params.jsapi_app_id, // 公众号名称，由商户传入
      'timeStamp': params.jsapi_timeStamp, // 时间戳，自1970年以来的秒数
      'nonceStr': params.jsapi_nonceStr, // 随机串
      'package': params.jsapi_package,
      'signType': params.jsapi_signType, // 微信签名方式：
      'paySign': params.jsapi_paySign // 微信签名
    },
    function (res) {
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        // 使用以上方式判断前端返回,微信团队郑重提示：
        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        location.href = window.location.protocol + '//' + window.location.host + '/pay/success?no=' + no
      } else {
        location.href = window.location.protocol + '//' + window.location.host + '/pay/fail'
      }
    }
  )
}
