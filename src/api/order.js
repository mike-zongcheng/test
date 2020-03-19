import fly from './fly'

// 订单列表
export function orderList (params) {
  return fly.post('/Account/user_order.html', params)
}

//
export function refundStatus (params) {
  return fly.post('/Account/order_refund_detail.html', params)
}

// 提交申请
export function submitRefund (params) {
  return fly.post('/Account/user_refund.html', params)
}
// 撤掉申请
export function cancelRefund (params) {
  return fly.post('/Account/cancel_refund.html', params)
}

export function fetchAppId (params) {
  return fly.get('/pay/get_openid.html', params)
}

export function payWxOrder (params) {
  return fly.post('/pay/pay.html', params)
}

// 调用微信SDK
export function fetchWxSDK (params) {
  return fly.post('/index/get_jssdk_sign.html', params)
}

export function orderDetail (params) {
  return fly.post('/pay/order_query.html', params)
}

// 支付测试
export function fetchTest (params) {
  return fly.post('/index/pay_test.html', params)
}

// 获取支付参数
export function getPayItem (params) {
  return fly.post('/pay/get_mch_id.html', params)
}

// 获取平台交易信息
export function fetchTestList (params) {
  return fly.get('/index/get_mch_id.html', params)
}
