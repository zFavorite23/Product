<template>
  <div class="playTime">
    <div>
      <el-time-picker
        v-model="value1"
        placeholder="任意时间点"
        value-format="HH:mm"
        size="mini"
        style="width:130px"
      ></el-time-picker>
      <el-time-picker
        arrow-control
        v-model="value2"
        placeholder="任意时间点"
        value-format="HH:mm"
        size="mini"
        style="width:130px;margin-right:0"
      ></el-time-picker>
    </div>
    <div>
      <el-date-picker
        type="dates"
        v-model="value3"
        placeholder="选择一个或多个日期"
        value-format="yyyy-MM-dd"
        size="mini"
        style="width:100%"
      ></el-date-picker>
    </div>
    <div>
      <select v-model="type" @change="editType(type)">
        <option
          v-for="(item, index) in types"
          :key="index"
          :value="item.value"
          >{{ item.name }}</option
        >
      </select>
      <select
        v-model="misfirePolicy"
        @change="editMisfirePolicy(misfirePolicy)"
      >
        <option
          v-for="(misfirePolicy, index) in misfirePolicys"
          :value="misfirePolicy.value"
          :key="index"
          >{{ misfirePolicy.name }}</option
        >
      </select>
    </div>

    <div class="select">
      <div class="confirm" @click="addTime()">确定</div>
      <div class="cancel" @click="close()">取消</div>
    </div>
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
      week: "",
      dayList: []
    };
  },
  props: ["modelid", "name"],
  methods: {
    // 添加时间
    addTime() {
      this.dayList = [];
      this.value3.forEach(item => {
        this.dayList.push(item.substr(-2));
      });
      this.$axios({
        method: "put",
        url: "/loudspeaker/model",
        data: {
          modelId: this.modelid,
          name: this.name,
          playOrder: "1",
          time: [`${this.value1}-${this.value2}`],
          volume: 10,
          day: this.dayList,
          month: this.time.month,
          week: [this.week],
          year: this.time.year,
          misfirePolicy: this.misfirePolicy,
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
  // width: 370px;
  height: 180px;
  background: url("../../assets/img/map_bg.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 90px;
  left: 230px;
  text-align: left;
  padding: 20px 40px;

  div:nth-child(3) {
    margin: 15px 0;
    display: flex;
    justify-content: space-around;
  }
  .select {
    width: 150px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 31%;
    bottom: 20px;
    text-align: center;

    .confirm {
      width: 60px;
      height: 20px;
      line-height: 20px;
      color: #0bb5b9;
      background: url("../../assets/img/Yes.png") no-repeat;
      background-size: 100% 100%;
    }

    .cancel {
      width: 60px;
      height: 20px;
      line-height: 20px;
      color: #f00;
      background: url("../../assets/img/No.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .el-date-editor {
    width: 150px;
    margin-top: 25px;
    margin-right: 15px;
  }

  select {
    outline: none;
    border: none;
    background: url("../../assets/img/dayBg.png") no-repeat;
    background-size: 100% 100%;
    width: 90px;
    color: #fff;
    background: #030d14;
  }
}
</style>
