<template>
  <div class="login">
    <div class="header">管理后台登陆</div>
    <el-form ref="form">
      <el-form-item>
        <el-input placeholder="请输入用户名" v-model="username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="doLogin">立即登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, Input, Header, FormItem, Button } from "element-ui";
export default {
  name: "",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Header.name]: Header
  },
  methods: {
    doLogin() {
      //判断用户名或密码不能为空
      if (this.username == "" || this.password == "") {
        this.$message.error("用户名或密码不能为空");
        return false;
      }
      //请求登陆的接口，需要用户名密码是否正确
      this.$axios({
        methods: "get",
        url: "/api/stu/admin/login",
        params: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        //状态值如果为false
        if(res.status == false){
          this.$message.error(res.msg);
          return false;
        }else{
          this.$message.success(res.msg);

          //设置缓存值
          localStorage.setItem("admin_token",res.data.token);

          //跳转到后台首页
          this.$router.push("/admin/home");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  margin: 100px auto;
  border: #dddddd 1px solid;
  border-radius: 5px;
  padding: 20px;

  .el-button {
    width: 100%;
  }

  .header {
    height: 40px;
    line-height: 40px;
    margin-left: 0px;
  }
}
</style>
