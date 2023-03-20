import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'

export const router = createRouter({
  history: createWebHistory(),//URL의 변화 없이 사용하는 기본 방식 선택
  routes,
})