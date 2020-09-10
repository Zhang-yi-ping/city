<template>
  <!-- 左侧菜单栏 -->
  <el-menu 
    background-color="#545c64" 
    text-color="#fff" 
    active-text-color="#2288dd" 
    :collapse="this.$store.state.isCollapse"
    router
  >
    <el-menu-item index="/admin/index">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-data"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/goods/list">商品管理</el-menu-item>
        <el-menu-item index="/admin/category">分类管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">订单管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">用户管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { Menu, MenuItem, MenuItemGroup, Submenu } from "element-ui";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem,
    [MenuItemGroup.name]: MenuItemGroup
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse){
  width: 200px;
}
</style>
