<template>
  <div class="playTime">
    <div>
      <el-time-picker
        v-model="value1"
        placeholder="任意时间点"
        value-format="HH:mm"
      ></el-time-picker>
      <el-time-picker
        arrow-control
        v-model="value2"
        placeholder="任意时间点"
        value-format="HH:mm"
      ></el-time-picker>
    </div>
    <div>
      <el-date-picker
        type="dates"
        v-model="value3"
        placeholder="选择一个或多个日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <select v-model="type" @change="editType(type)">
        <option
          v-for="(item, index) in types"
          :key="index"
          :value="item.value"
          >{{ item.name }}</option
        >
      </select>
    </div>
    <select v-model="misfirePolicy" @change="editMisfirePolicy(misfirePolicy)">
      <option
        v-for="(misfirePolicy, index) in misfirePolicys"
        :value="misfirePolicy.value"
        :key="index"
        >{{ misfirePolicy.name }}</option
      >
    </select>

    <button @click="addTime()">添 加</button>
    <div class="close" @click="close()"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      itemId: "",
      // 时间
      time: {
        year: "",
        month: "",
        day: ""
      },
      // 下拉框默认值
      misfirePolicy: "1",
      // 措施执行策略
      misfirePolicys: [
        { value: "1", name: "立即执行" },
        { value: "2", name: "执行一次" },
        { value: "3", name: "下周期执行" }
      ],
      // 下拉框默认值
      type: "1",
      types: [
        { value: "1", name: "一次" },
        { value: "2", name: "每天" },
        { value: "3", name: "每周" },
        { value: "4", name: "每月" }
      ],
      week: ""
    };
  },
  props: ["modelid", "name"],
  methods: {
    // 添加时间
    addTime() {
      console.log(this.name);
      this.$axios({
        method: "put",
        url: "/loudspeaker/model",
        data: {
          modelId: this.modelid,
          name: this.name,
          playOrder: "1",
          time: [`${this.value1}-${this.value2}`],
          volume: 10,
          day: this.value3,
          month: this.time.month,
          week: [this.week],
          year: this.time.year,
          misfirePolicy: this.value,
          type: this.type,
          itemId: this.itemId
        }
      }).then(res => {
        console.log(res);
        this.$parent.playShow = !this.$parent.playShow;
        this.$parent.loadPattern();
      });
    },

    // 获取时间
    getDate() {
      const myDate = new Date();
      this.time.year = myDate.getFullYear();
      this.time.month = myDate.getMonth() + 1;
      this.time.day = myDate.getDate();
      this.week = myDate.getDay();
    },

    // 修改措施执行策略
    editMisfirePolicy(misfirePolicy) {
      this.value = misfirePolicy;
    },

    // 修改类型
    editType(type) {
      this.type = type;
    },
    // 关闭组件
    close() {
      this.$parent.playShow = !this.$parent.playShow;
    }
  },
  created() {
    this.getDate();
    this.itemId = sessionStorage.getItem("itemId");
  }
};
</script>

<style lang="less" scoped>
.playTime {
  width: 400px;
  height: 230px;
  background-color: rgba(0, 0, 0, 0.9);
  position: absolute;
  top: 80px;
  left: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-date-editor {
    width: 150px;
    margin-top: 25px;
    margin-right: 15px;
    // margin-bottom: 20px;
  }

  select {
    background: url("../../assets/img/dayBg.png");
    color: #fff;
    border: none; //清除select聚焦时候的边框颜色
    outline: none; //将select的宽高等于div的宽高
    width: 85px;
    margin-top: 15px;
    option {
      color: #000;
    }
  }
  .close {
    width: 20px;
    height: 20px;
    background: url("../../assets/img/close.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 8px;
    right: 15px;
  }
  button {
    margin-top: 20px;
    width: 50px;
    height: 30px;
    border: none;
    background-color: rgb(22, 22, 21);
    color: #fff;
  }
}
</style>
