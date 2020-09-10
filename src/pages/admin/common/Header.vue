<template>
    <el-header
    >
    <div id="left-head" @click="setCollapse">
        <i class="el-icon-s-fold"></i>
    </div>
    <div id="right-head">
        你好：admin 欢迎登陆 <el-button type="text" @click="logout">退出</el-button>
    </div>
    </el-header>
</template>

<script>
import {Header} from "element-ui"
export default {
  name: '',
  data() {
    return {
    };
  },
  components:{
      [Header.name]:Header
  },
  watch:{
  },
  methods: {
      setCollapse(){
            this.$store.commit('setCollapse')
      },
      logout(){
          //1. 清除token值
          localStorage.removeItem("admin_token");

          this.$router.push("/admin/login")
      }
  },
};
</script>

<style lang="scss" scoped>
    .el-header{
        flex: 1;
        display: flex;
        justify-content: space-between;
        background-color: #F0F0F0;
        line-height: 60px;
        border-bottom: #dddddd 1px solid;
        #left-head{
            width:60px;
            font-size: 30px;
        }
        #right-head{
            width: 200px;
        }
    }
</style>
