import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//定义仓库
const store = new Vuex.Store({
    state:{
        isCollapse:false,//后台菜单栏展开或折叠,
        goods_cart: [],//购物车的商品
    },
    mutations:{
        //切换菜单的状态
        setCollapse(state){
            state.isCollapse = !state.isCollapse;
        },
        //加入购物车
        addCart(state,goods){
            //重复提交的问题
            let  flag = 0;//记录重复的数据
            //遍历购物车的数据
            state.goods_cart.map((item)=>{
                if(item.productId == goods.productId){
                    flag++;
                    item.count++;
                }
            })

            //添加的商品不重复的时候
            if(flag == 0){
                //添加商品数量的属性
                //goods.count = 1;
                //添加选中
                //goods.checked = false;
                Vue.set(goods,'count',1);
                Vue.set(goods,'checked',false);
                //提交数据
                state.goods_cart.push(goods);
            }
        },
        //数量自增
        increment(state,index){
            state.goods_cart[index].count++;
        }
    },

    getters:{
        totalAmount(state){
            let amount = 0;

            state.goods_cart.forEach((item)=>{
                if(item.checked == true){
                    amount += item.count* item.salePrice;
                }
            })

            return amount.toFixed(2);
        }
    }
});


export default store;