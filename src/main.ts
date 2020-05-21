import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import hooks from '@u3u/vue-hooks'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(hooks)
Vue.use(VueCompositionAPI) // Don't forget to use the plugin!

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
