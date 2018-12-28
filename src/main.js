import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/index.js'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
