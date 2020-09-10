// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/index';

import axios from '@/utils/request';
Vue.prototype.$axios = axios;

//单独引入消息组件
import elementUi from 'element-ui';
// Vue.prototype.$message = Message;
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementUi);

//全局引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false


// 全局路由守卫
router.beforeEach((to,from,next)=>{
  //管理后台需要登陆才能访问的页面
  let needAdminLogin = ['admin.home','admin.index','admin.goods.add','admin.goods.list'];

  //判断当前页面是否需要进行校验
  if(needAdminLogin.indexOf(to.name) > -1){
    //取出缓存中的token值
    let token = localStorage.getItem("admin_token");
    if(token){
      //请求校验token是否存在的接口
      axios('/api/stu/admin/check/token?token='+token)
      .then(res=>{
        //token不合法，返回登陆页面
        if(res.status==false){
          next("/admin/login");
        }
      })

    }else{
      next("/admin/login");
    }
  }

  //判断后台登陆页面
  if(to.name == "admin.login"){
     //取出缓存中的token值
     let token = localStorage.getItem("admin_token");

     if(token){
      //请求校验token是否存在的接口
      axios('/api/stu/admin/check/token?token='+token)
      .then(res=>{
        //token合法，返回后台首页
        if(res.status==true){
          next("/admin/home")
        }
      })

    }
  }

  next();//继续往下走
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
