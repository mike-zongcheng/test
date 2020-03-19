var Fly = require('flyio/dist/npm/fly')
var fly = new Fly()

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  request.headers['Accept'] = 'application/json'
  if (localStorage.token) request.headers['Authorization'] = localStorage.token
  return request
})

fly.interceptors.response.use(
  (response) => {
    let data = response.data
    if (data.code === 200) {
      return data
    } else {
      if (data.status === 500) console.error(response)
      return Promise.reject(data)
    }
  },
  (err) => {
    let defalutError = { code: 500, error: '网络错误，请联系客服处理' }
    if (err.data) { return Promise.reject(err) } else {
      return Promise.reject(defalutError)
    }
  }
)
fly.config.baseURL = process.env.VUE_APP_API_HOST
export default fly
