<template>
  <div class="automatic">
    <div class="search">
      <select>
        <option value>设备选择</option>
      </select>
      <select>
        <option value>2020</option>
      </select>
      <select class="selectW">
        <option value>01</option>
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
    <!-- <div class="content">
      <div class="info">
        <div class="name">
          <span style="color:#00f8f8">[ 自动处理 ]</span>
          <span style="color:#e68600;margin-left:5px">18号配电柜1路</span>
        </div>
        <div class="cause">
          <div>
            <span>告警原因及建议：功率过低，存在故障路灯，是否请排查电路</span>
          </div>
          <div>
            <span>负责人：自动处理</span>
            <span>2020-06-09 19:09:27</span>
          </div>
        </div>
        <div class="time">
          <div>
            <span>提示时间：2020-06-08 19:25:02</span>
            <span>结束时间：2020-06-08 19:25:02</span>
          </div>
          <div>
            <span>持续时间：0天23小时44分</span>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="name">
          <span style="color:#00f8f8">[ 自动处理 ]</span>
          <span style="color:#e68600;margin-left:5px">18号配电柜1路</span>
        </div>
        <div class="cause">
          <div>
            <span>告警原因及建议：功率过低，存在故障路灯，是否请排查电路</span>
          </div>
          <div>
            <span>负责人：自动处理</span>
            <span>2020-06-09 19:09:27</span>
          </div>
        </div>
        <div class="time">
          <div>
            <span>提示时间：2020-06-08 19:25:02</span>
            <span>结束时间：2020-06-08 19:25:02</span>
          </div>
          <div>
            <span>持续时间：0天23小时44分</span>
          </div>
        </div>
      </div>
    </div> -->
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
