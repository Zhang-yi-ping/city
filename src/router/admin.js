import  Login  from '@/pages/admin/Login.vue';
import  Home  from '@/pages/admin/Home.vue';
import  Index  from '@/pages/admin/Index.vue';
import  Category  from '@/pages/admin/Category.vue';

import GoodsList from '@/pages/admin/goods/goodsList';
import GoodsAdd from '@/pages/admin/goods/goodsAdd';

const admins = [
    {
        path: "/admin/login",
        name: "admin.login",
        component: Login,
    },{
        path: "/admin/home",
        name: "admin.home",
        component: Home,
        children:[
            {
                path: "/admin/index",
                name: "admin.index",
                component: Index
            },{
                path: "/admin/category",
                name: "admin.category",
                component: Category
            },{
                path: "/admin/goods/list",
                name: "admin.goods.list",
                component: GoodsList
            },{
                path: "/admin/goods/add",
                name: "admin.goods.add",
                component: GoodsAdd
            }
        ]
    },
];

export default admins;