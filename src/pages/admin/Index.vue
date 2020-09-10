<template>
  <div class="main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >首页</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <h3>用户数量</h3>
        <h1>{{userData.userCount}}</h1>
      </el-col>
      <el-col :span="6">
        <h3>商品数量</h3>
        <h1>{{userData.goodsCount}}</h1>
      </el-col>
      <el-col :span="6">
        <h3>订单数量</h3>
        <h1>{{userData.orderCount}}</h1>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.$axios({
      url: "/api/stu/admin/homeData"
    }).then(res => {
      console.log(res);
      if (res.status == true) {
        this.userData = res.data;
      }
    });
  },
  data() {
    return {
      userData: {}
    };
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
  
  .el-row {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    .el-col {
      height: 200px;
      border-radius: 5px;
      color: #fff;
    }
    .el-col:nth-child(1) {
      background-color: #2288dd;
    }
    .el-col:nth-child(2) {
      background-color: #a00000;
    }
    .el-col:nth-child(3) {
      background-color: #008800;
    }
  }
}
</style>
