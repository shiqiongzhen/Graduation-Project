// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css';
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from 'qs'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.Qs = Qs

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
