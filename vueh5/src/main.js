// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin,{position: 'bottom'})

import VCharts from 'v-charts'
Vue.use(VCharts)

//vue项目引入FastClick组件解决IOS系统下h5页面中的按钮点击延迟，连续点击无反应的问题
import FastClick from 'fastclick'
//在created或monted生命周期中将FastClick绑定到body
FastClick.attach(document.body)

// http://localhost:8088/article.html#/article

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
