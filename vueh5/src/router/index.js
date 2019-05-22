import Vue from 'vue'
import Router from 'vue-router'

import Calendar from '../pages/Calendar'
import List from '../pages/List'
import Index from '../pages/Index'
import Chart from '../pages/Chart'
import Message from '../pages/Message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'List',
      component: List,
      meta: {
        // keepAlive:true
      }
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:"/date",
      name: 'Calendar',
      component: Calendar
    },
    {
      path:"/chart",
      name: 'Chart',
      component: Chart
    },
    {
      path:"/msg",
      name: 'Message',
      component: Message
    }
  ]
})
