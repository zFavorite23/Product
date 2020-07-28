<template>
  <div class="all">
    <div class="search">
      <select>
        <option value>设备选择</option>
      </select>
      <select v-model="query.status">
        <option
          v-for="item in statusList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</option
        >
      </select>
      <select v-model="query.selectYear">
        <!-- <option value>2020</option> -->
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
      <span>
        累计告警次数:
        <span class="margin">{{ warnNum.totalNum }}</span>
      </span>
      <span>
        今日告警次数:
        <span class="margin">{{ warnNum.todayNum }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 告警列表
      warnList: [],
      // 告警次数
      warnNum: "",
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
      statusList: [
        {
          value: null,
          label: "全部"
        },
        {
          value: "1",
          label: "未处理"
        },
        {
          value: "2",
          label: "未知"
        },
        {
          value: "3",
          label: "自动处理"
        },
        {
          value: "4",
          label: "人工处理"
        }
      ],
      query: {
        // 开始年月日
        selectYear: 2020,
        selectMonth: "01",
        selectDay: "01",
        // 状态
        status: null,
        // 结束年月日
        selectYear_1: new Date().getFullYear(),
        selectMonth_1: ("0" + (new Date().getMonth() + 1)).slice(-2),
        selectDay_1: new Date().getDate()
      }
    };
  }
};
</script>

<style>
/* 筛序区域 -------------------------------------------------*/

.all .search select {
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
.all .search .selectW {
  width: 40px;
}
.margin {
  margin: 0 10px;
}
.lianjie {
  margin: 0 10px;
}
.all .search span {
  color: #fff;
  font-size: 14px;
}
.all .search button {
  color: #fff;
  border-radius: 15%;
  background-color: #000;
  border: 1px solid #000;
  outline: none;
  margin-right: 15px;
}
</style>
