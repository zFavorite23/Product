<template>
  <div class="untreated">
    <div class="search">
      <select>
        <option value>设备选择</option>
      </select>
      <select>
        <option value>状态选择</option>
      </select>
      <select>
        <option value>2020</option>
      </select>
      <select class="selectW">
        <option value>01</option>
      </select>
      <select class="selectW">
        <option value>01</option>
      </select>
      <span class="lianjie">-</span>
      <select>
        <option value>2020</option>
      </select>
      <select class="selectW">
        <option value>01</option>
      </select>
      <select class="selectW">
        <option value>01</option>
      </select>
      <button>查询</button>
      <span>
        累计告警次数:
        <span class="margin">0</span>
      </span>
      <span>
        今日告警次数:
        <span class="margin">0</span>
      </span>
    </div>
    <div class="content">
      <div class="info">
        <div class="name">
          <span style="color:#00f8f8">[ 未处理 ]</span>
          <span style="color:#e68600;margin-left:5px">18号配电柜1路</span>
        </div>
        <div class="cause">
          <div>
            <span>告警原因及建议：功率过低，存在故障路灯，是否请排查电路</span>
          </div>
        </div>
        <div class="time">
          <div>
            <span>提示时间：2020-06-08 19:25:02</span>
          </div>
          <div style="margin-top: -20px; margin-right:40px">
            <span class="go">去处理</span>
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

.untreated .search select {
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
.untreated .search .selectW {
  width: 40px;
}
.margin {
  margin: 0 10px;
}
.lianjie {
  margin: 0 10px;
}
.untreated .search span {
  color: #fff;
  font-size: 14px;
}
.untreated .search button {
  color: #fff;
  border-radius: 15%;
  background-color: #000;
  border: 1px solid #000;
  outline: none;
}

/* 内容区域 -------------------------------------------------*/

.untreated .content {
  height: 400px;
  margin-top: 5px;
  background: url("../../../assets/img/框3.png") no-repeat;
  background-size: 100% 100%;
  font-size: 14px;
}
.untreated .content .info {
  color: #fff;
  background: url("../../../assets/img/上地0109-3_04.png") no-repeat;
  background-size: 100% 100%;
  padding: 0 10px;
  margin-left: 3px;
}
.untreated .content .info .name {
  padding-top: 8px;
}
.untreated .content .info .cause {
  display: flex;
  margin-top: 15px;
}
.untreated .content .info .cause div:nth-child(1) {
  flex: 60%;
}
.untreated .content .info .cause div:nth-child(2) {
  flex: 40%;
  display: flex;
  justify-content: space-between;
}
.untreated .content .info .time {
  display: flex;
  margin-top: 10px;
  padding-bottom: 10px;
  color: #00f8f8;
  font-size: 12px;
}
.untreated .content .info .time div:nth-child(1) {
  flex: 60%;
  display: flex;
  justify-content: space-between;
}
.untreated .content .info .time div:nth-child(2) {
  flex: 40%;
  text-align: right;
}

.untreated .content .info .time .go {
  display: inline-block;
  width: 50px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border: 1px solid #00f8f8;
  border-radius: 15%;
}
</style>
