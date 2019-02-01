import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import eventBus from '@/eventBus'
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.prototype.$bus = eventBus


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
