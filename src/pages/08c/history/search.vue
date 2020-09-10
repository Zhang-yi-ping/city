<template>
  <div>
      <van-icon name="arrow-left" @click="fanh"/>
      <van-search v-model="keywords" show-action background="#F0F0F0" placeholder="输入搜索的内容" @focus="ulShow = true">
        <template #action>
            <div @click="addHistory">
                搜索
            </div>
        </template>
      </van-search>

      <!-- 历史搜索记录 -->
      <ul v-show="ulShow">
          <li v-for="(item,index) in searchList" :key="index">{{item.title}}</li>
      </ul>
      <!-- 历史记录信息 -->
      <div id="history">
          <div id="history-head">
              <span>历史记录</span>
              <van-icon name="delete" size="15" @click="removeHistory"/>
          </div>
          <div id="history-list">
              <div class="item" v-for="(item,index) in historyList" :key="index">{{item}}</div>
          </div>
      </div>
  </div>
</template>
<script>
import "@/assets/style/reset.css";
import qs from "qs";
export default {
  name: '',
  mounted() {
      this.getGoodsList();
      this.getHistory();
  },
  data() {
    return {
        keywords:'',
        historyList: [],
        goodsList:[],
        ulShow: false,
    };
  },
  computed:{
      //计算属性进行模糊搜索
      searchList(){
          if(this.keywords == ""){
              return [];
          }
          this.ulShow = true;
          //执行模糊搜索
          return this.goodsList.filter((item)=>{
              return item.title.indexOf(this.keywords) > -1;
          })
      }
  },
  watch:{
  },
  methods: {
      //获取商品列表接口数据
      getGoodsList(){
          //axios获取数据
          this.$axios({
              url: "/static/mock/list.json"
          }).then(res=>{
             // console.log(res);
              this.goodsList = res.result;
          })
      },
      //获取历史记录列表
      getHistory(){
          let data = localStorage.getItem("test_history");
          if(data == null){
              this.historyList = [];
          }else{
              this.historyList = JSON.parse(data);
          }
          console.log("test");
      },
      //添加历史记录
      addHistory(){
          this.ulShow = false;
          //如果文本框内容为空，不能添加
          if(this.keywords.length <=0){
              return false;
          }
          //头部添加记录操作
          this.historyList.unshift(this.keywords);
           //超过6条执行尾部删除
          if(this.historyList.length>6){
              this.historyList.pop();
          }

          localStorage.setItem("test_history",JSON.stringify(this.historyList));
      },
      //删除历史记录
      removeHistory(){
          localStorage.removeItem("test_history");//删除历史记录
          this.getHistory();//
      },
      fanh(){
      this.$router.push("/")
    }
  },
};
</script>

<style lang="scss" scoped>
header{
    width: 100%;
    height: .88rem;
    background-color: #FAFAFA;
    border-bottom: #dddddd 1px solid;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-search{
        flex: 1;
        .inp{
            width: 95%;
            background-color: #F0F0F0;
            text-indent: .2rem;
            height: .7rem;
            margin-left: 2%;
            border-radius: .15rem;
        }
    }
    .right-head{
        width: 1rem;
        text-align: center;
    }
}

ul{
    width: 100%;
    position: absolute;
    top: .88rem;
    background-color: #F8F8F8;
    z-index: 1;
    li{
        width: 100%;
        text-indent: .2rem;
        line-height: .88rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: #dddddd 1px solid;
    }
}

#history{
    width: 100%;
    #history-head{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 6% 5%;
        box-sizing: border-box;
        span{
            font-size: .25rem;
            font-weight: bold;
        }
    }
    #history-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .item{
            width: 23%;
            margin: 1%;
            background-color: #F0F0F0;
            border-radius: .1rem;
            padding: 3% 2%;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
.van-icon{
    font-size: 0.5rem;
}
</style>
