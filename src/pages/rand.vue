<template>
  <div class="main">
    <label>选择班级:</label>
    <select v-model="currentClass" @change="getRandList">
      <option :value="item" v-for="(item,index) in classes" :key="index">{{item}}</option>
    </select>
    <label>设置抽取的人数:</label>
    <input type="text" class="nums" v-model="nums" />
    <div id="rand">
      <div
        class="name"
        v-for="(item,index) in students"
        :key="index"
        :class="{active: ind.includes(index)}"
      >{{item}}</div>
    </div>
    <el-button type="danger" @click="start" v-if="rand_status==false">开始点名</el-button>
    <el-button type="danger" @click="stop" v-else>停止点名</el-button>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    document.title = "最牛随机点名表";
    this.getRandList();
  },
  data() {
    return {
      classes: ["H1908C","H1912A"],
      currentClass: "H1908C",
      students: [],
      ind: [],
      rand_status: false,
      timer: null,
      nums: 1
    };
  },
  computed: {},
  watch: {},
  methods: {
    start() {
      this.timer = setInterval(() => {
          this.ind = [];
        for (var i = 0; i < this.nums; i++) {
          let l = this.students.length;
          let randIndex = parseInt(Math.random() * l);
          console.log(randIndex);
          this.ind.push(randIndex);
        }
      }, 50);
      this.rand_status = !this.rand_status;
    },
    stop() {
        console.log(this.ind);
      clearInterval(this.timer);
      this.rand_status = !this.rand_status;
    },
    getRandList() {
      this.$axios({
        url: "/api/stu/api/student/rand",
        params: {
          tags: this.currentClass
        }
      }).then(res => {
        console.log(res);
        if (res.status == true) {
          this.students = res.data.student_names;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 800px;
  text-align: center;
  background-color: #333;
  padding-top: 50px;
  #rand {
    width: 800px;
    padding: 20px;
    // min-height: 500px;
    text-align: center;
    border-radius: 5px;
    margin-top: 30px;
    margin: 20px auto;
    border: #a00000 2px solid;
    display: flex;
    flex-wrap: wrap;
    .name {
      width: 90px;
      height: 40px;
      line-height: 40px;
      background: #f0f0f0;
      margin: 10px 5px;
      border-radius: 3px;
    }
    .name.active {
      background-color: #a00000;
      color: #fff;
    }
  }
  label {
    color: #fff;
    font-size: 16px;
  }
  select,
  .nums {
    width: 100px;
    height: 30px;
  }
}
</style>
