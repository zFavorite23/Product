<template>
  <div class="manpower">
    <div class="search" style="margin-left:5px">
      <span>类型选择</span>
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
        <div v-if="warnList.length != 0" class="name">
          <span style="color:#e68600;margin-left:5px">
            {{ item.deviceName }}
          </span>
          <span v-if="item.status == 1" style="color:#00f8f8">人工处理</span>
        </div>
        <div v-if="warnList.length != 0" class="cause">
          <div>
            <span
              >告警原因及建议：{{ item.dictName }}，建议{{
                item.remark
              }}。</span
            >
          </div>
        </div>
        <div v-if="warnList.length != 0" class="time">
          <div>
            <span>提示时间：{{ item.createTime }}</span>
            <span>结束时间：{{ item.disposeTime }}</span>
          </div>
          <div>
            <span style="margin-right:35px">响应时间：3小时</span>
            <span>持续时间：{{ item.durationTime }}</span>
          </div>
        </div>
        <div v-if="warnList.length != 0" class="principal">
          <span>负责人：{{ item.disposePeople }}</span>
          <span></span>
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

.manpower .search select {
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
.manpower .search span {
  color: #fff;
  font-size: 14px;
}
.margin {
  margin: 0 10px;
}
.lianjie {
  margin: 0 10px;
}
.manpower .search button {
  color: #fff;
  border-radius: 15%;
  background-color: #000;
  border: 1px solid #000;
  outline: none;
}
.manpower .search .selectW {
  width: 40px;
}

/* 内容区域 -------------------------------------------------*/

.manpower .content {
  height: 400px;
  margin-top: 5px;
  background: url("../../../assets/img/框3.png") no-repeat;
  background-size: 100% 100%;
  font-size: 14px;
}
.manpower .content .info {
  color: #fff;
  background: url("../../../assets/img/上地0109-3_04.png") no-repeat;
  background-size: 100% 100%;
  padding: 0 10px;
  margin-left: 3px;
}
.manpower .content .info .name {
  padding-top: 8px;
}
.manpower .content .info .cause {
  display: flex;
  margin-top: 15px;
}
.manpower .content .info .cause div:nth-child(1) {
  flex: 60%;
}
.manpower .content .info .cause div:nth-child(2) {
  flex: 40%;
  display: flex;
  justify-content: space-between;
}
.content .info .time {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-bottom: 10px;
  color: #00f8f8;
  font-size: 12px;
}
.content .info .time div:nth-child(1) {
  flex: 50%;
  display: flex;
  justify-content: space-between;
}
.content .info .time div:nth-child(2) {
  flex: 50%;
  text-align: right;
}
</style>
