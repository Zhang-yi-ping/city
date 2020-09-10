<template>
  <div>
      <el-header>
          <el-button type="success" @click="gotoAdd('/admin/goods/add')">添加商品</el-button>
      </el-header>
      <el-table :data="goodsList">
          <el-table-column label="ID" prop="id" ></el-table-column>
          <el-table-column label="图片" >
              <template slot-scope="scope">
                  <el-image :src="scope.row.goods_img[0].img_url" style="width: 80px;" />
              </template>
          </el-table-column>
          <el-table-column label="商品名字" prop="goods_name"></el-table-column>
          <el-table-column label="商品分类" prop="cate_name"></el-table-column>
          <el-table-column label="商品单价" prop="price"></el-table-column>
          <el-table-column label="商品库存" prop="store_num"></el-table-column>
          <el-table-column label="商品状态" >
              <template slot-scope="scope">
                 <el-button type="text" v-if="scope.row.status==1" @click="changeStatus(scope.row)">再售</el-button>
                 <el-button type="text" v-if="scope.row.status==2" @click="changeStatus(scope.row)">已下架</el-button>
              </template>
          </el-table-column>
          <el-table-column label="操作" >
              <template slot-scope="scope">
                 <el-button type="text" @click="remove(scope.row)">删除</el-button>
                
              </template>
          </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :total="totals">
        </el-pagination>
  </div>
</template>

<script>
export default {
  name: '',
  mounted(){
      document.title = "商品列表";
      this.getGoodsList();
      this.$axios({
          url: "http://img.happyknowshare.cn",
      }).then(res=>{
          console.log(res);
      })
  },
  data() {
    return {
        current_page: 1,//当前页
        totals: 0,
        goodsList: [],//商品列表数据
    };
  },
  methods: {
      //获取商品列表
      getGoodsList(){
          this.$axios({
              method:"post",
              url:"/api/stu/admin/goods/list",
              params:{
                  page: this.current_page,
              }
          }).then(res=>{
              console.log(res);
              if(res.status == true){
                  this.goodsList = res.data.data;
                  this.current_page = res.data.current_page;
                  this.totals = res.data.total;
              }
          })
      },
      changePage(val){
          console.log(val);
      },
      gotoAdd(url){
          this.$router.push(url);
      },

      //改变商品的状态
      changeStatus(scope){
          console.log(scope);
          let status = 1;
          //改变状态值
          if(scope.status == 1){
              status = 2;
          }

          this.$axios({
              url:"/api/stu/admin/goods/status",
              method:"post",
              params:{
                  id: scope.id,
                  status: status
              }
          }).then(res=>{
              console.log(res);
              if(res.status == true){
                  this.getGoodsList();
              }
          })

      },
      //删除的方法
      remove(scope){
          this.$axios({
              url: "/api/stu/admin/goods/del/"+scope.id
          }).then(res=>{
              if(res.status == true){
                  this.getGoodsList();
              }
          })
      }
  },
};
</script>

<style scoped>
    .el-pagination{
        margin-top: 20px;
    }
</style>
