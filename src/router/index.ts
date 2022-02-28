import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Todo from '../views/Todo.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/inquiry',
    name: 'Inquiry',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "inqiry" */ '../views/Inquiry.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
