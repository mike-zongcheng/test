
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    me: null,
    order: null,
    isMobile: null,
    step: 0
  },
  mutations: {
    set_me (state, me) {
      state.me = me
    },
    SET_MOBILE (state, isMobile) {
      state.isMobile = isMobile
    },
    set_order (state, order) {
      state.order = order
    },
    set_step (state, step) {
      state.step = step
    }
  }
})

export default store
