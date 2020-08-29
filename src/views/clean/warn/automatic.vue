<template>
  <div class="automatic">
    <div class="search" style="margin-left:5px">
      <span>类型选择</span>
      <select v-model="Device" @change="DeviceSwitchover">
        <option v-for="item in DeviceClasses" :value="item.value" :key="item.value">{{ item.label }}</option>
      </select>
      <select v-model="deviceId">
        <option
          v-for="item in DeviceList"
          :value="item.deviceId"
          :key="item.deviceId"
        >{{ item.deviceName }}</option>
      </select>
      <el-date-picker
        v-model="timeList"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        size="mini"
      ></el-date-picker>
      <button @click="inquire()">查询</button>
    </div>
    <div class="content">
      <div class="info" v-for="(item, index) in warnList" :key="index">
        <div class="name">
          <span style="color:#e68600;margin-left:5px">
            {{
            item.deviceName
            }}
          </span>
          <span style="color:#00f8f8">自动处理</span>
        </div>
        <div class="cause">
          <div>
            <span>告警原因及建议：{{ item.dictName }}，建议{{ item.remark }}。</span>
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
export default {};
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
