<template>
  <div style="margin-top:25px">
    <span>设备选择</span>
    <el-select
      v-model="value1"
      placeholder
      class="xuan"
      style="margin-right:153px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <!-- <span>状态选择</span>
    <el-select v-model="value2" placeholder="" class="xuan">
      <el-option
        v-for="item in options1"
        :key="item.name"
        :label="item.name"
        :value="item.warnLogStatus"
      ></el-option>
    </el-select>-->
    <el-date-picker
      class="timePicker"
      value-format="yyyy-MM-dd"
      format="yyyy-MM-dd"
      v-model="startYtd1"
      :picker-options="changeStartPicker"
      type="date"
      placeholder="选择日期"
      style="width:14%"
    ></el-date-picker>
    <el-date-picker
      class="timePicker"
      value-format="yyyy-MM-dd"
      format="yyyy-MM-dd"
      v-model="endYtd1"
      :picker-options="changeEndPicker"
      type="date"
      placeholder="选择日期"
      style="width:14%"
    ></el-date-picker>
    <el-button
      type="primary"
      style="background-color:#1E1E1E;border:none"
      @click="demand"
      >查询</el-button
    >
    <span class="leiji">上月告警次数：{{ last }}</span>
    <span class="leiji">今日告警次数：{{ sum }}</span>
    <div class="main" style="height:41vh;overflow-y: scroll;">
      <div class="aside">
        <div class="warnTit" v-for="(item, index) in notLog" :key="index">
          <div class="box1">
            <span
              v-if="item.status == 3 || item.status == 4"
              style="margin-right: 10px;border-radius: 3px;color:#15C8DB"
              >[ 人工处理 ]</span
            >
            <span
              v-if="item.status == 2"
              style="margin-right: 10px;border-radius: 3px;color:#15C8DB"
              >[ 自动处理 ]</span
            >
            <span
              v-if="item.status == 1"
              style="margin-right: 10px;border-radius: 3px;color:#15C8DB"
              >[ 未处理 ]</span
            >
            <span style="color:#E17014">{{ item.deviceName }}</span>
            <span class="right" v-if="item.status == 3" style="color:#0E8B28"
              >已完成</span
            >
            <span class="right" v-if="item.status == 4" style="color:#FC7C15"
              >正在进行</span
            >
          </div>
          <div style="color:#C0C1C1">
            <el-row :gutter="20">
              <el-col
                :span="12"
                style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                >告警原因及建议：{{ item.remark }}</el-col
              >
              <el-col :span="6" style="text-align: left;"
                >负责人：{{ item.disposePeople }}</el-col
              >
              <el-col :span="6" style="text-align: right;">{{
                item.createTime
              }}</el-col>
            </el-row>
          </div>
          <div style="color:#15C8DB">
            <el-row :gutter="20">
              <el-col :span="6">提示时间：{{ item.createTime }}</el-col>
              <el-col :span="6">结束时间：{{ item.disposeTime }}</el-col>
              <el-col :span="6">响应时间：{{ item.responseTime }}</el-col>
              <el-col :span="6">持续时间：{{ item.TimeDifference }}</el-col>
            </el-row>
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
      deviceValue: [],
      options: [],
      value1: "",
      value2: "",
      options1: [
        { warnLogStatus: 3, name: "已完成" },
        { warnLogStatus: 4, name: "正在进行" }
      ],
      startYtd1: "",
      endYtd1: "",
      notLog: [],
      warnData: [],
      last: "",
      sum: "",
      changeStartPicker: {
        disabledDate: this.disabledDate1
      },
      changeEndPicker: {
        disabledDate: this.disabledDate2
      }
    };
  },
  created() {
    this.getIrr();
    this.allWarn();
    this.getErrNum();
  },
  methods: {
    // 水表列表
    getIrr() {
      this.$axios({
        method: "get",
        url: "/irrigation/water/all"
      }).then(res => {
        console.log(res);
        var DeviceIdList = []; // eslint-disable-line no-unused-vars
        var deviceList = res.data.data;
        this.value1 = deviceList[0].deviceId;
        for (var i = 0; i < deviceList.length; i++) {
          DeviceIdList.push({
            value: deviceList[i].deviceId,
            label: deviceList[i].deviceName
          });

          console.log(this.deviceValue);
          this.options = [...DeviceIdList];
        }
      });
    },
    // 告警列表
    allWarn() {
      this.$axios({
        method: "get",
        url: "/irrigation/warn/list?classify=" + "204" + "&status=" + 1
      }).then(res => {
        console.log(res);
        var data = res.data.data.records;
        if (res.data.code == 0) {
          if (data == "" || data == null || data == undefined) {
            // this.$message("暂无告警！");
            this.notLog = [];
          } else {
            this.notLog = data;
          }
        }
        console.log(this.notLog);
      });
    },
    // 查询
    demand() {
      this.notLog = [];
      console.log(this.value1);
      console.log(this.startYtd1);
      console.log(this.endYtd1);
      console.log(this.value2);
      this.$axios({
        method: "get",
        url:
          "/irrigation/warn/list?deviceId=" +
          this.value1 +
          "&startTime=" +
          this.startYtd1 +
          "&endTime=" +
          this.endYtd1 +
          "&warnLogStatus=" +
          this.value2
      }).then(res => {
        console.log(res);
        var data = res.data.data.records;
        if (res.data.code == 0) {
          if (data == "" || data == null || data == undefined) {
            this.$message("暂无告警！");
          } else {
            this.notLog = data;
          }
        }
      });
    },
    // 告警个数
    getErrNum() {
      this.$axios({
        method: "get",
        url: "/irrigation/warn/getNum"
      }).then(res => {
        console.log(res);
        this.last = res.data.data.last;
        this.sum = res.data.data.sum;
      });
    },
    disabledDate1(time) {
      var times = this.endYtd1;
      if (times) {
        return time.getTime() > new Date(this.endYtd1);
      }
    },
    disabledDate2(time) {
      var times = this.startYtd1;
      if (times) {
        return time.getTime() < new Date(this.startYtd1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
p {
  font-size: 15px;
  color: aquamarine;
}
.xuan {
  width: 90px;
  margin-right: 5px;
  margin-left: 5px;
}
.timePicker {
  width: 16% !important;
  margin-right: 5px;
}
.leiji {
  line-height: 40px;
  // font-size: 15px;
  width: 14% !important;
  display: inline-block;
  color: #ffffff;
  margin-left: 5px;
}
.main::-webkit-scrollbar {
  display: none;
}
.warnTit {
  width: 93%;
  // box-shadow: 0 2px 6px 0 #eeeeee;
  padding: 10px 20px;
  line-height: 30px;
  font-size: 13px;
  // margin-top: 20px;
  margin-left: 5px;
  background: #000000;
}
/deep/.el-input--suffix .el-input__inner {
  background: #1e1e1e;
  border: none;
  // padding: 0 5px;
}
/deep/.el-input__inner {
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
}
/deep/.timePicker {
  width: 14.6% !important;
  margin-right: 5px;
}
.el-button {
  padding: 6px 10px;
}
/deep/.el-input__icon {
  line-height: 25px;
}
/deep/.el-popper[x-placement^="bottom"] {
  background: #1e1e1e;
}
/deep/.el-select-dropdown__item.hover {
  background: #1e1e1e;
}
</style>
