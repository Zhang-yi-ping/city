<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      <el-button
        type="danger"
        size="small"
        style="float:right;margin-right: 20px;"
        @click="addForm.ifShow = ! addForm.ifShow"
      >添加分类</el-button>
    </el-breadcrumb>

    <!-- table数据 -->
    <el-table :data="categoryData" border style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- //分页器 -->
    <el-pagination background layout="prev, pager, next" :total="totals" @current-change="gotoPage"></el-pagination>

    <!-- 添加分类表单对话框 -->
    <el-dialog title="添加分类" :visible.sync="addForm.ifShow">
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入分类名字" v-model="addForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="请选择上级分类" v-model="addForm.pid">
            <el-option
              :label="item.cate_name"
              value="item.id"
              v-for="(item,index) in category"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCategoty">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加分类表单对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editForm.ifShow">
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入分类名字" v-model="editForm.cate_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    //调用分页的数据
    this.getCateList();

    //获取不带分页的顶级分类接口
    this.getCategory();
  },
  data() {
    return {
      current_page: 1, //当前页码
      totals: 0,
      //分类列表数据
      categoryData: [],
      //添加表单的数据
      addForm: {
        ifShow: false, //控制盒子的显示或者隐藏
        cate_name: "",
        pid: ""
      },
      category: [],
      //添加表单的数据
      editForm: {
        ifShow: false, //控制盒子的显示或者隐藏
        cate_name: "",
        id: ""
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    //点击编辑按钮触发编辑探矿
    edit(row) {
      console.log(row);

      this.editForm.ifShow = true;//控制显示隐藏
      this.editForm.cate_name = row.cate_name;// 分类名字
      this.editForm.id = row.id; //分类ID
    },
    //执行编辑操作接口
    doEdit() {
      this.editForm.ifShow = false; //关闭添加分类的弹框
      //调用编辑分类的接口
      this.$axios({
        url: "/api/stu/admin/category/edit",
        params: {
          cate_name: this.editForm.cate_name,
          id: this.editForm.id,
        }
      }).then(res => {
        console.log(res);
        if (res.status == true) {
          this.$message.success(res.msg);
          //调用接口数据
          this.getCateList();
        }
      });
    },
    //添加分类的接口方法
    addCategoty() {
      this.addForm.ifShow = false; //关闭添加分类的弹框
      //调用添加分类的接口
      this.$axios({
        url: "/api/stu/admin/category/add",
        params: {
          cate_name: this.addForm.cate_name
        }
      }).then(res => {
        console.log(res);
        if (res.status == true) {
          this.$message.success(res.msg);
          //调用接口数据
          this.getCateList();
        }
      });
    },

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

    //封装获取列表数据
    getCateList() {
      this.$axios({
        url: "/api/stu/admin/category/list",
        params: {
          page: this.current_page
        }
      }).then(res => {
        console.log(res);
        if (res.status == true) {
          //列表数据渲染
          this.categoryData = res.data.data;
          this.totals = res.data.total;
        }
      });
    },

    //点击分页数据的时候触发
    gotoPage(val) {
      //改当前页
      this.current_page = val;
      this.getCateList();
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  height: 40px;
  line-height: 40px;
  border-bottom: #dddddd 1px solid;
  text-indent: 10px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
