
import Vue from 'vue'
import Router from 'vue-router'
import Empty from './views/404/index'
import Focus from './views/help/focus'
import Home from './views/search/face'
import Question from './views/help/question'
import Contact from './views/help/contact'
import Secret from './views/help/secret'
import Reminder from './views/auth/reminder'
import Login from './views/auth/login'
import BindPhone from './views/auth/bind-phone'
import Agreement from './views/help/agreement'
import UserCenter from './views/auth/user'
import MessageList from './views/message/list'

// vip相关
import VipIntroduction from './views/vip/introduction'

// 订单部分
import OrderDetail from './views/order/detail'
import OrderList from './views/order/list'
import OrderApplyRefund from './views/order/apply-refund'
import OrderApplyDetail from './views/order/refund-detail'

// 支付部分
import PayList from './views/pay/pay-list'
import PayTest from './views/pay/pay-test'

// 显示数据资源
import showDetail from './views/show/index'

// 支付状态
import PayWaiting from './views/pay/waiting'
import PaySuccess from './views/pay/pay-success'
import PayFail from './views/pay/pay-fail'
import PayError from './views/pay/pay-error'
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    {
      path: '/404',
      component: Empty,
      hidden: true
    },
    {
      path: '/login',
      component: Login,
      name: 'Login'
    },
    {
      path: '/bind-phone',
      component: BindPhone,
      name: 'BindPhone'
    },
    {
      path: '/pay/list',
      component: PayList,
      name: 'PayList'
    },
    {
      path: '/pay/test',
      component: PayTest,
      name: 'PayTest'
    },
    {
      path: '/pay/error',
      component: PayError,
      name: 'PayError'
    },
    {
      path: '/show/detail',
      component: showDetail,
      name: 'showDetail'
    },
    {
      path: '/message',
      component: MessageList,
      name: 'MessageList'
    },
    {
      path: '/user',
      component: UserCenter,
      name: 'UserCenter'
    },
    {
      path: '/pay/waiting',
      component: PayWaiting,
      name: 'PayWaiting'
    },
    {
      path: '/pay/success',
      component: PaySuccess,
      name: 'PaySuccess'
    },
    {
      path: '/pay/fail',
      component: PayFail,
      name: 'PayFail'
    },
    {
      path: '/agreement',
      component: Agreement,
      name: 'Agreement'
    },
    {
      path: '/reminder',
      component: Reminder,
      name: 'Reminder'
    },
    {
      path: '/order/apply/refund',
      component: OrderApplyRefund,
      name: 'OrderApplyRefund'
    },
    {
      path: '/order/refund/detail',
      component: OrderApplyDetail,
      name: 'OrderApplyDetail'
    },
    {
      path: '/order/list',
      component: OrderList,
      name: 'OrderList'
    },
    {
      path: '/order/detail',
      component: OrderDetail,
      name: 'OrderDetail'
    },
    {
      path: '/vip/introduction',
      component: VipIntroduction,
      name: 'VipIntroduction'
    },
    {
      path: '/help/question',
      component: Question,
      name: 'Question'
    },
    {
      path: '/help/focus',
      component: Focus,
      name: 'Focus'
    },
    {
      path: '/help/contact',
      component: Contact,
      name: 'Contact'
    },
    {
      path: '/help/secret',
      component: Secret,
      name: 'Secret'
    },
  ]
})
