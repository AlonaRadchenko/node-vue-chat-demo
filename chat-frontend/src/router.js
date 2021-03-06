import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'chat',
      component: () => import(/* webpackChunkName: "chat" */ './views/Chat.vue')
    },
    
  ]
})
