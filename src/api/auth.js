import fly from './fly'

// 获取用户信息
export function me () {
  return fly.get('/account/user_info.html')
}

// h5登录
export function login (data) {
  return fly.post('/account/login.html', data)
}

// 微信绑定手机号
export function bindPhone (data) {
  return fly.post('/account/bind_phone.html', data)
}

// 获取验证码
export function verifyCode (params) {
  return fly.post('/account/phone_verify_code.html', params)
}

// 获取验证id
export function fetchVerify (params) {
  return fly.post('/Account/create_unid_id.html', params)
}

// 验证id
export function postVerify (params) {
  return fly.post('/Account/verify_sendmsg.html', params)
}

// wx登录
export function wxLogin (data) {
  return fly.get('/account/wx_login.html', data)
}

export function weiboLogin (data) {
  return fly.get('/account/weblogin', data)
}
