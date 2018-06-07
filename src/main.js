// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'animate.css'
import './assets/all.scss'
import App from './App'
import dateFilter from './filters/date' // TimeStamp 轉日期，後來沒有使用了

Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.filter('date', dateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
