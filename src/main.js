import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import store from './store'
import router from './router'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import VueClipboard from 'vue-clipboard2'
import * as filters from './filter' // global filters
import * as AuthAction from '@/api/auth'

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

Sentry.init({
  dsn: 'https://0c05fdf3408544d7ae83d41736dd9acc@develop.api.privhub.com//3',
  environment: process.env.NODE_ENV,
  integrations: [new Integrations.Vue({ Vue, attachProps: true, logErrors: true })]
})
if (localStorage.token) {
  AuthAction.me().then(data => {
    store.commit('set_me', data.data.user_info)
  }).catch(err => console.log(err))
}
// 粘贴板效果
Vue.component(VueQrcode.name, VueQrcode)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

(function () {
  var mta = document.createElement('script')
  mta.src = '//pingjs.qq.com/h5/stats.js?v2.0.4'
  mta.setAttribute('name', 'MTAH5')
  mta.setAttribute('sid', '500711212')
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(mta, s)
})()

Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
