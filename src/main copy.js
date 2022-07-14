import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';

Vue.config.productionTip = false

// router 기능 확장 선언
Vue.use(VueRouter); 

//index.js에서 컴포넌트 가져오기
import {UserSignUp2, UserSignUp3, UserSignUp4} from './pages'

//router 등록공간
const routes = [
   {
      path: '/UserSignUp2', //경로 설정
      component: UserSignUp2 //컴포넌트 이름
   },
   {
      path: '/UserSignUp3',
      component: UserSignUp3
   },
   {
    path: '/UserSignUp4',
    component: UserSignUp4
 }
];

// router 객체생성
const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router // router 추가
}).$mount('#app')