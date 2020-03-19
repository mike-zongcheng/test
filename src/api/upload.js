import fly from './fly'

export function uploadImage (formData) {
  return fly.post('/face/uploads.html', formData, { contentType: 'multipart/form-data; charset=UTF-8' })
}

export function imageSearch (formData) {
  return fly.post('/face/search.html', formData, { contentType: 'multipart/form-data; charset=UTF-8' })
}

export function urlSearch (formData) {
  return fly.post('/face/uploads_url.html', formData, { contentType: 'multipart/form-data; charset=UTF-8' })
}
// 提醒接口
export function remind (formData) {
  return fly.post('/Face/remind.html', formData)
}
// 取消提醒
export function cancelRemind (params) {
  return fly.post('/Face/cancel_remind.html', params)
}

// 测试
export function testLog (params) {
  return fly.post('/Account/get_request_log.html', params)
}
