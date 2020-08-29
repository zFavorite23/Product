<template>
  <div class="all">
    <div class="search" style="margin-left:5px">
      <span>设备选择</span>
      <select v-model="soundId">
        <option
          v-for="(item, index) in Loudspeaker"
          :key="index"
          :value="item.value"
          :label="item.label"
        ></option>
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
            item.trashCanName
            }}
          </span>
          <span v-if="item.status == 1" style="color:#00f8f8">人工处理</span>
          <span v-if="item.status == 2" style="color:#00f8f8">自动处理</span>
          <span v-if="item.status == 3" style="color:#00f8f8">未处理</span>
        </div>
        <div class="cause">
          <div>
            <span>告警原因：{{ item.desc }}</span>
          </div>
          <div v-if="item.status == 3">
            <el-button type="text" class="go">去处理</el-button>
          </div>
        </div>
        <div class="time">
          <div>
            <span>提示时间：{{ item.createTime }}</span>
            <span v-if="item.status == 1">结束时间：{{ item.disposeTime }}</span>
          </div>
          <div>
            <span v-if="item.status == 1" style="margin-right:35px">响应时间：{{ item.lastTime }}小时</span>
            <span v-if="item.status == 2 || item.status == 1">持续时间：{{ item.durationTime }}</span>
          </div>
        </div>
        <div class="principal">
          <span>负责人：{{ item.disposePeople }}</span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      timeList: "",
      itemId: "",
      soundId: "",
      type: "",
      // 告警列表
      warnList: [],
      Loudspeaker: [
        {
          value: "",
          label: "全部"
        }
      ],

      statusList: [
        {
          value: null,
          label: "全部"
        },
        {
          value: "0",
          label: "上线"
        },
        {
          value: "1",
          label: "离线"
        }
      ]
    };
  },
  methods: {
    // 获取告警列表
    getWarnPage() {
      this.$axios({
        method: "get",
        url: "/cleaning/log/page",
        params: {
          itemId: this.itemId,
          size: 20
        }
      }).then(res => {
        console.log(res);
        this.warnList = res.data.data.records;
      });
    },

    // 获取所有设备
    getLoudspeakerPage() {
      this.$axios({
        method: "GET",
        url: "/cleaning/trashCan/page",
        params: {
          size: 50,
          itemId: this.itemId
        }
      }).then(res => {
        res.data.data.records.forEach(item => {
          this.Loudspeaker.push({
            value: item.soundId,
            label: item.name
          });
        });
      });
    },

    inquire() {
      this.$axios({
        method: "get",
        url: "/cleaning/log/page",
        params: {
          type: this.type,
          soundId: this.soundId,
          itemId: this.itemId,
          size: 20
        }
      }).then(res => {
        console.log(res);
        this.warnList = res.data.data.records;
      });
    }
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");
    this.getWarnPage();
    // 获取所有设备
    this.getLoudspeakerPage();
  }
};
</script>


<style>
.el-range-editor--mini.el-input__inner {
  height: 20px !important;
  padding: 0 10px !important;
  width: 270px !important;
  border: 0 !important;
  background-color: #000;
  margin-right: 5px;
}
.el-range-input {
  background-color: #000;
  color: #969696 !important;
}
.el-picker-panel {
  left: 645px !important;
}
.popper__arrow {
  left: 316px !important;
}
</style>
<style lang="less" scoped>
/* 筛序区域 -------------------------------------------------*/

.all .search select {
  border: none;
  background: url("../../../assets/img/dayBg.png") no-repeat;
  background-size: 100% 100%;
  width: 80px;
  margin: 0 5px;
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
}
.all .search button {
  color: #fff;
  border-radius: 15%;
  background-color: #000;
  border: 1px solid #000;
  outline: none;
  margin-right: 15px;
}

.content {
  height: 400px;
  margin-top: 5px;
  background: url("../../../assets/img/框3.png") no-repeat;
  background-size: 100% 100%;
  overflow-x: hidden;
  font-size: 14px;
}
.content::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.content .info {
  color: #fff;
  background: url("../../../assets/img/上地0109-3_04.png") no-repeat;
  background-size: 100% 100%;
  padding: 0 10px;
  margin-left: 3px;
}

.content .info .name {
  padding-top: 8px;
  display: flex;
  justify-content: space-between;
}
.content .info .name span:nth-child(2) {
  width: 70px;
  border: 1px solid #00f8f8;
  text-align: center;
  font-size: 12px;
}

.content .info .cause {
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
}
.content .info .principal {
  font-size: 12px;
  margin-bottom: 3px;
  color: #00f8f8;
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

.content .info .cause .go {
  display: inline-block;
  width: 72px;
  text-align: center;
  background-color: #ff7e00;
  padding: 0;
  color: #fff;
}
</style>
