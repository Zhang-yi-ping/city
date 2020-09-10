import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Rand from '@/pages/rand'
import admins from './admin';

// 08c的路由地址
import HistorySearch1 from "@/pages/08c/history/search";
import vant from "@/pages/08c/vant";
import LativHome from "@/pages/08c/lativ/home";

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: "/rand",
      component: Rand
    },
    // 08c路由地址
    {
      path: "/history/search",
      component: HistorySearch1,
    },
    {
      path:"/vant",
      component: vant,
    },
    {
      path: "/",
      name: "lativ_home",
      component:LativHome
    },
    // 08c路由地址
    ...admins
  ]
})
