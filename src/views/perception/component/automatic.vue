<template>
  <div class="automatic">
    <div class="search">
      <select v-model="Device" @change="DeviceSwitchover">
        <option
          v-for="item in DeviceClasses"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</option
        >
      </select>
      <select v-model="deviceId">
        <option
          v-for="item in DeviceList"
          :value="item.deviceId"
          :key="item.deviceId"
          >{{ item.deviceName }}</option
        >
      </select>
      <select v-model="query.selectYear">
        <option
          v-for="item in selectYearList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</option
        >
      </select>
      <select class="selectW" v-model="query.selectMonth">
        <option
          v-for="item in selectMonthList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</option
        >
      </select>
      <select class="selectW" v-model="query.selectDay">
        <option
          v-for="item in selectDayList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</option
        >
      </select>
      <span class="lianjie">-</span>
      <select v-model="query.selectYear_1">
        <option
          v-for="item in selectYearList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</option
        >
      </select>
      <select class="selectW" v-model="query.selectMonth_1">
        <option
          v-for="item in selectMonthList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</option
        >
      </select>
      <select class="selectW" v-model="query.selectDay_1">
        <option
          v-for="item in selectDayList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</option
        >
      </select>
      <button @click="inquire()">查询</button>
    </div>
    <div class="content">
      <div class="info" v-for="(item, index) in warnList" :key="index">
        <div class="name">
          <span v-if="item.status == 2" style="color:#00f8f8"
            >[ 自动处理 ]</span
          >
          <span style="color:#e68600;margin-left:5px">{{
            item.deviceName
          }}</span>
        </div>
        <div class="cause">
          <div>
            <span>
              告警原因及建议：{{ item.dictName }}，建议{{ item.remark }}。
            </span>
          </div>
          <div style="padding-left:60px"></div>
        </div>
        <div class="time">
          <div>
            <span>提示时间：{{ item.createTime }}</span>
          </div>
          <div>
            <span>持续时间：{{ item.durationTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Device: "1",
      DeviceClasses: [
        {
          value: "1",
          label: "土壤"
        },
        {
          value: "2",
          label: "水质"
        }
      ],
      selectYearList: [
        { value: "2018", label: "2018" },
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" }
      ],
      selectMonthList: [
        { value: "01", label: "01" },
        { value: "02", label: "02" },
        { value: "03", label: "03" },
        { value: "04", label: "04" },
        { value: "05", label: "05" },
        { value: "06", label: "06" },
        { value: "07", label: "07" },
        { value: "08", label: "08" },
        { value: "09", label: "09" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" }
      ],
      selectDayList: [
        { value: "01", label: "01" },
        { value: "02", label: "02" },
        { value: "03", label: "03" },
        { value: "04", label: "04" },
        { value: "05", label: "05" },
        { value: "06", label: "06" },
        { value: "07", label: "07" },
        { value: "08", label: "08" },
        { value: "09", label: "09" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
        { value: "17", label: "17" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
        { value: "20", label: "20" },
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" },
        { value: "25", label: "25" },
        { value: "26", label: "26" },
        { value: "27", label: "27" },
        { value: "28", label: "28" },
        { value: "29", label: "29" },
        { value: "30", label: "30" },
        { value: "31", label: "31" }
      ],
      query: {
        // 开始年月日
        selectYear: 2020,
        selectMonth: "01",
        selectDay: "01",
        // 结束年月日
        selectYear_1: new Date().getFullYear(),
        selectMonth_1: ("0" + (new Date().getMonth() + 1)).slice(-2),
        selectDay_1: new Date().getDate()
      },
      DeviceList: [],
      warnList: [],
      deviceId: ""
    };
  },
  methods: {
    // 设备类型切换
    DeviceSwitchover() {
      if (this.Device == 1) {
        this.$axios({
          method: "get",
          url: "/environment/soil/soilAll"
        }).then(res => {
          this.DeviceList = res.data.data;
        });
      }
      if (this.Device == 2) {
        this.$axios({
          method: "get",
          url: "/environment/water/waterAll"
        }).then(res => {
          this.DeviceList = res.data.data;
        });
      }
    },

    // 查询
    inquire() {
      this.warnList = [];
      var startTime = `${this.query.selectYear}-${this.query.selectMonth}-${this.query.selectDay}`;
      var endTime = `${this.query.selectYear_1}-${this.query.selectMonth_1}-${this.query.selectDay_1}`;
      if (this.Device == 1) {
        this.$axios({
          method: "get",
          url: "/environment/soilWarn/soilWarnPage",
          params: {
            startTime,
            endTime,
            deviceId: this.deviceId
          }
        }).then(res => {
          this.warnList = res.data.data.records.filter(
            item => item.status == 2
          );
        });
      }
      if (this.Device == 2) {
        this.$axios({
          method: "get",
          url: "/environment/waterWarn/waterWarnPage",
          params: {
            startTime,
            endTime,
            deviceId: this.deviceId
          }
        }).then(res => {
          this.warnList = res.data.data.records.filter(
            item => item.status == 2
          );
        });
      }
    }
  },
  created() {
    this.DeviceSwitchover();
  }
};
</script>

<style scoped>
/* 筛序区域 -------------------------------------------------*/

.automatic .search select {
  border: none;
  background: url("../../../assets/img/dayBg.png") no-repeat;
  background-size: 100% 100%;
  width: 80px;
  margin-right: 5px;
  height: 20px;
  color: #fff;
  background: #030d14;
  outline: none;
  text-align-last: center;
}
.automatic .search .selectW {
  width: 40px;
}
.margin {
  margin: 0 10px;
}
.lianjie {
  margin: 0 10px;
}
.automatic .search span {
  color: #fff;
  font-size: 14px;
}
.automatic .search button {
  color: #fff;
  border-radius: 15%;
  background-color: #000;
  border: 1px solid #000;
  outline: none;
  margin-right: 15px;
}

/* 内容区域 -------------------------------------------------*/

.automatic .content {
  height: 400px;
  margin-top: 5px;
  background: url("../../../assets/img/框3.png") no-repeat;
  background-size: 100% 100%;
  font-size: 14px;
}
.automatic .content .info {
  color: #fff;
  background: url("../../../assets/img/上地0109-3_04.png") no-repeat;
  background-size: 100% 100%;
  padding: 0 10px;
  margin-left: 3px;
}
.automatic .content .info .name {
  padding-top: 8px;
}
.automatic .content .info .cause {
  display: flex;
  margin-top: 15px;
}
.automatic .content .info .cause div:nth-child(1) {
  flex: 60%;
}
.automatic .content .info .cause div:nth-child(2) {
  flex: 40%;
  display: flex;
  justify-content: space-between;
}
.automatic .content .info .time {
  display: flex;
  margin-top: 10px;
  padding-bottom: 10px;
  color: #00f8f8;
  font-size: 12px;
}
.automatic .content .info .time div:nth-child(1) {
  flex: 60%;
  display: flex;
  justify-content: space-between;
}
.automatic .content .info .time div:nth-child(2) {
  flex: 40%;
  text-align: right;
}
</style>
