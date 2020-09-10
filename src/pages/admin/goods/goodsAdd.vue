<template>
  <div>
      <el-form label-width="100px">
          <el-form-item label="商品名字:">
              <el-input placeholder="商品名字" v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类:" >
               <el-select placeholder="请选择上级分类" v-model="form.c_id">
                <el-option
                :label="item.cate_name"
                :value="item.id"
                v-for="(item,index) in category"
                :key="index"
                ></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="商品单价:">
              <el-input placeholder="商品单价" type="number" v-model="form.price">
                  <template slot="append">元</template>
              </el-input>
          </el-form-item>
          <el-form-item label="商品数量:" >
              <el-input placeholder="商品数量" v-model="form.store_num" type="number">
                  <template slot="append">件</template>
              </el-input>
          </el-form-item>
          <el-form-item label="上传图片">
              <el-upload
                action="/api/stu/admin/goods/img"
                list-type="picture-card"
                :on-success="uploadFile"
              >
                <i class="el-icon-plus"></i>
                </el-upload>
          </el-form-item>
           <el-form-item label="商品简介:">
              <el-input placeholder="商品简介" v-model="form.goods_desc" type="textarea"> </el-input>
          </el-form-item>
          <el-form-item label="商品详情:">
              <el-input placeholder="商品详情" v-model="form.goods_detail" type="textarea"> </el-input>
          </el-form-item>

          <el-form-item >
             <el-button type="danger" @click="addGoods">添加商品</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  mounted() {
      document.title = "商品添加";
      this.getCategory();
  },
  data() {
    return {
        category: [],
        form:{
            goods_name:"",
            c_id:"",
            price:"",
            store_num:"",
            goods_desc:"",
            goods_detail:"",
            file_list: [],
        }
    };
  },
 
  methods: {
    //请求不带分页的列表接口
    getCategory() {
      this.$axios({
        url: "/api/stu/admin/category"
      }).then(res => {
        console.log(res);
        //获取所有的分类列表数据
        this.category = res.data;
      });
    },

    addGoods(){
        this.$axios({
            method:"post",
            url:"/api/stu/admin/goods/add",
            params:this.form
        }).then(res=>{
            console.log(res);
            if(res.status == false){
                this.$message.error(res.msg);
            }else{
              this.$message.success(res.msg);
              this.$router.push("/admin/goods/list");
            }
        })
    },
    //文件上传成功后触发
    uploadFile(res,file){
        if(res.status == true){
          //拼接传递的图片的地址
          this.form.file_list.push(res.data);
        }
        
        
    }
  },
};
</script>

<style scoped>

</style>
