<template>
  <div>
    <van-nav-bar :title="active" left-arrow right-text="切换" >
    </van-nav-bar>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" size="large">立即登陆</van-button>

    <van-tabbar v-model="active" style="background-color: #F8F8F8" active-color="#FF0000">
      <van-tabbar-item name="首页" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item name="分类" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item name="购物车" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item name="我的" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        active:"首页",
    };
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style scoped>
</style>
