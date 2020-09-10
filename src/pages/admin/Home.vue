<template>
  <!-- 外层盒子容器 -->
  <el-container>
    <!-- 左侧菜单栏 -->
    <leftMenu></leftMenu>
    <el-main>
      <!-- 右侧头部信息 -->
      <Header></Header>
      <div class="main">
        <router-view />
      </div>
      
    </el-main>
  </el-container>
</template>

<script>
import { Container, Main } from "element-ui";

import leftMenu from "@/pages/admin/common/leftMenu";
import Header from "@/pages/admin/common/Header";

export default {
  name: "",
  mounted() {
    this.autoSetContainer();
  },
  data() {
    return {};
  },
  components: {
    leftMenu,
    Header,
    [Container.name]: Container,
    [Main.name]: Main
  },
  methods: {
    autoSetContainer() {
      //
      let html = document.documentElement || document.body;

      let container = document.querySelector(".el-container");

      container.style.height = html.clientHeight + "px";
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  display: flex;
  background-color: #f8f8f8;
  .el-main {
    margin: 0px !important;
    padding: 0px !important;
    .main{
      margin: 10px;
    }
  }
}
</style>
