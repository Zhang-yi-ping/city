<template>
  <div class="main">
    <header>
      <!-- 搜索框组件 -->
      <van-search placeholder="搜索商品" shape="round" @click="gotoSearch"/>
      <!-- 头部滚动标签 -->
      <van-tabs v-model="c_id" line-height="2px" @click="changeTab">
        <van-tab
          :title="item.title"
          :name="item._id"
          v-for="(item,index) in cate_list"
          :key="index"
        />
      </van-tabs>
      <ul>
        <li>综合</li>
        <li>销量</li>
        <li>新品</li>
        <li @click="changeSort">
          价格
          <van-icon name="arrow-up" v-show="sortKey==1" />
          <van-icon name="arrow-down" v-show="sortKey == 2" />
        </li>
      </ul>
    </header>

    <!-- 中间盒子的布局 -->
    <div class="container">
      <div class="item" v-for="(item,index) in getGoods" :key="index">
        <div>
          <img :src="item.pic" />
        </div>
        <p>{{item.title}}</p>
        <p class="price">
          <span>¥{{item.price}}</span>
          <van-icon name="cart-o" size="20" @click="addCart(item)" />
        </p>
      </div>
    </div>

    <!-- 底部布局 -->
    <footer>
      <van-tabbar>
        <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="wap-nav">分类</van-tabbar-item>
        <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o">个人</van-tabbar-item>
      </van-tabbar>
    </footer>
    <!-- 返回顶部的操作 -->
    <div id="to-top" @click="gotoTop">
      <van-icon name="arrow-up" size="25" />
    </div>

    <!-- 点击加入购物和，使用vant中sku的组件 -->
    <van-sku v-model="skuShow" :sku="sku" :goods="goods" />
  </div>
</template>

<script>
//import "@/assets/js/jquery.min.js";
export default {
  name: "",
  mounted() {
    this.getCategory(); //获取分类列表数据
    this.getGoodsList(); //获取商品列表的数据
  },
  data() {
    return {
      c_id: "", //商品分类的id
      cate_list: [], //分类的列表
      goods_list: [], //商品的列表
      sortKey: 0, //0原始数据，1升序 2降序
      
      skuShow: false,
      sku: {
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: "100.00", // 默认价格（单位元）
        stock_num: 100, // 商品总库存
        none_sku: true, // 是否无规格商品
        hide_stock: true // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg"
      }

    };
  },
  computed: {
    //过滤函数的操作
    getGoods() {
      let goods = [];
      //按照商品的分类的ID进行过滤
      goods = this.goods_list.filter((item, index) => {
        return item.cid == this.c_id;
      });
      //按照价格进行升序或降序排列
      if (this.sortKey > 0) {
        //价格排序用数组的sort方法
        goods.sort((a, b) => {
          return this.sortKey == 1 ? a.price - b.price : b.price - a.price;
        });
      }

      return goods;
    }
  },
  watch: {},
  methods: {
    addCart(obj){
      this.skuShow = true;
      console.log(obj);
      this.goods.picture  = obj.pic;
      this.sku.price = obj.price;
    },
    //控制升序或者降序排列
    changeSort() {
      if (this.sortKey == 0 || this.sortKey == 2) {
        this.sortKey = 1;
      } else {
        this.sortKey = 2;
      }
    },
    //切换头部tabs事件
    changeTab(name, title) {
      //console.log(name,title);
      this.c_id = name; //让c_id等于当前切换分类的_id
    },
    //获取分类列表
    getCategory() {
      this.$axios({
        url: "/static/mock/fenlei.json"
      }).then(res => {
        //console.log(res);
        this.cate_list = res.result;
      });
    },
    //商品列表信息
    getGoodsList() {
      this.$axios({
        url: "/static/mock/list.json"
      }).then(res => {
        console.log(res);
        this.goods_list = res.result;
      });
    },
    //回到页面顶部
    gotoTop() {
      let html = document.documentElement || document.body;
      html.scrollTop = 0;
      // $(html).css({scrollTop:0});
    },
    gotoSearch(){
      this.$router.push("/history/search")
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-color: #f0f0f0;
  //返回顶部的按钮
  #to-top {
    width: 1rem;
    height: 1rem;
    background-color: #fff;
    position: fixed;
    right: 0.2rem;
    bottom: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0px 5px 7px rgba($color: #000000, $alpha: 0.4);
  }
}
header {
  ul {
    width: 100%;
    height: 0.88rem;
    display: flex;
    align-items: center;
    line-height: 0.88rem;
    background-color: #fff;
    border-bottom: #dddddd 1px solid;
    li {
      padding: 0px 0.4rem;
    }
    li:nth-child(4) {
      color: #a00000;
    }
  }
}
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 0.88rem;
  .item {
    font-size: 0.32rem;
    width: 46%;
    margin: 2%;
    background-color: #fff;
    img {
      width: 100%;
      height: 4rem;
    }
    p {
      width: 100%;
      text-indent: 0.2rem;
      height: 0.8rem;
      line-height: 0.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem;
      align-items: center;
      box-sizing: border-box;
      span {
        font-size: 0.35rem;
        color: #a00000;
      }
    }
  }
}
</style>
