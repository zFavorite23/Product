<template>
  <div class="illumination">
    <div class="main">
      <div class="leftside">
        <!-- 头部 -->
        <div class="title">
          <span>设备数据</span>
          <span>POWER DATE</span>
        </div>

        <!-- 照明设备数量区域 -->
        <div class="num">
          <div class="le"></div>
          <div class="rig">
            <div>
              <span style="font-size: 24px;text-align:center">{{ lampNum.totalNum }}</span>
              <span>设备总数</span>
            </div>
            <div>
              <span
                style="font-size: 24px;text-align: right"
              >{{ ((lampNum.onNum / lampNum.totalNum) * 100).toFixed(1) }}%</span>
              <span>在线率</span>
            </div>
          </div>
        </div>

        <!-- 设备统计数量区域 -->
        <div class="amount">
          <div>
            <span style="color:#1afe98">在线：{{ lampNum.onNum }}</span>
            <span class="skyblue"></span>
          </div>
          <div>
            <span style="color:#1cdefe">离线：{{ lampNum.downNum }}</span>
            <span class="blue"></span>
          </div>
          <div>
            <span style="color:#fdcd04">故障：{{ lampNum.warnNum }}</span>
            <span class="yellow"></span>
          </div>
        </div>
        <div class="but">
          <div style="color:#1afe98">开启数量：{{ lampNum.onNum }}</div>
          <div></div>
        </div>

        <!-- 头部标题 -->
        <div class="title">
          <span>用电数据</span>
          <span>POWER DATE</span>
        </div>
        <div class="electric">
          <div>
            <span>总耗电量</span>
            <span>{{ Power.thisNum }}</span>
          </div>
          <div>
            <span>节省电量</span>
            <span>{{ Power.savePower }}</span>
          </div>
          <div>
            <span>上月耗电量</span>
            <span>{{ Power.lastSavePower }}</span>
          </div>
          <div>
            <span>总节省金额</span>
            <span>{{ Power.saveMoney }}</span>
          </div>
          <div>
            <span>上月节省金额</span>
            <span>{{ Power.lastSaveMoney }}</span>
          </div>
        </div>

        <!-- 头部标题 -->
        <div class="title">
          <span>各项电量使用情况</span>
        </div>

        <!-- 各项路灯 -->
        <div class="light">
          <div>普通路灯</div>
          <div>
            <el-progress
              v-if="PowerType.commonLamp"
              :percentage="(PowerType.commonLamp / Power.thisNum) * 100"
              :show-text="false"
            ></el-progress>
          </div>
          <div>{{ PowerType.commonLamp }}</div>
        </div>
        <div class="light">
          <div>智慧路灯</div>
          <div>
            <el-progress
              v-if="PowerType.streetLamp"
              :percentage="(PowerType.streetLamp / Power.thisNum) * 100"
              :show-text="false"
            ></el-progress>
          </div>
          <div>{{ PowerType.streetLamp }}</div>
        </div>
        <div class="light">
          <div>草坪路灯</div>
          <div>
            <el-progress
              v-if="PowerType.lawnLamp"
              :percentage="PowerType.lawnLamp"
              :show-text="false"
            ></el-progress>
          </div>
          <div>{{ PowerType.lawnLamp }}</div>
        </div>
        <div class="light">
          <div>感应路灯</div>
          <div>
            <el-progress
              v-if="PowerType.lnductionLamp"
              :percentage="PowerType.lnductionLamp"
              :show-text="false"
            ></el-progress>
          </div>
          <div>{{ PowerType.lnductionLamp }}</div>
        </div>

        <!-- 头部标题 -->
        <div class="title">
          <span>用电趋势</span>
        </div>

        <!-- 时间筛选 -->

        <div class="comTop">
          <span class="monitorPoint">间隔选择</span>
          <select name="sel" style="margin-left:8%;margin-right:50px" v-model="timeIntervalValue">
            <option
              v-for="item in timeIntervalOptions"
              :key="item.timeIntervalValue"
              :label="item.timeIntervalLabel"
              :value="item.timeIntervalValue"
            ></option>
          </select>
          <span class="monitorPoint1">类别选择</span>
          <!-- <select style="margin-left:8%" v-model="WaterCategorySelectionValue" class="sel">
            <option
              v-for="item in WaterCategorySelectionOptions"
              :key="item.WaterCategorySelectionValue"
              :label="item.WaterCategorySelectionLabel"
              :value="item.WaterCategorySelectionValue"
            ></option>
          </select>-->
        </div>
        <div>
          <div v-if="timeIntervalValue == '日'" class="comTop">
            <span class="monitorPoint">时间选择</span>
            <select v-model="selectYear" class style="margin-right:4%;margin-left:8%">
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
            <select v-model="selectMonth" class style="margin-right:4%">
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
            <select v-model="selectDay" class style="margin-right:4%">
              <option
                v-for="item in selectDayList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
            <select v-model="selectYear1" class="comTop" style="margin-right:3%;margin-left:21.5%">
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
            <select v-model="selectMonth1" class="comTop" style="margin-right:3%">
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
            <select v-model="selectDay1" class="comTop" style="margin-right:4%">
              <option
                v-for="item in selectDayList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
          </div>
          <div v-if="timeIntervalValue == '月'" class="comTop">
            <span class="monitorPoint">时间选择</span>
            <select v-model="selectYear" style="margin-right: 4%; margin-left: 8%">
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
            <select v-model="selectMonth" class>
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
            <!-- <div class="comTop" style="margin-left: 19%;"> -->
            <select
              v-model="selectYear1"
              style="margin-right: 4%;margin-left: 21.5%;"
              class="comTop"
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
            <select v-model="selectMonth1" class>
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
            <!-- </div> -->
          </div>
          <div v-if="timeIntervalValue == '年'" class="comTop">
            <span class="monitorPoint">时间选择</span>
            <select v-model="selectYear" style="margin-right: 4%;margin-left: 8% ">
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
            <select v-model="selectYear1" class="comTop" style="margin-left: 21.5%;display:block">
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</option>
            </select>
          </div>
        </div>
        <button @click="getTime()" class="buttom">查询</button>
        <!-- 曲线图 -->
        <div id="map2"></div>
      </div>
      <div class="rightside">
        <div class="topside">
          <div class="left">
            <operation v-if="operation"></operation>
            <warn v-if="warn"></warn>
          </div>
          <div class="right">
            <div :class="{ bc_color: tag == '配置面板' }" @click="operationShow">配置面板</div>
            <div :class="{ bc_color: tag == '告警记录' }" @click="warnShow">告警记录</div>
          </div>
        </div>
        <div class="info_1">
          <div class="coordinate" @click="getLampInfo1(lampList1.lightId)">
            <span>路灯1</span>
          </div>
          <div class="panel" v-show="isShow">
            <div>
              <span>面板</span>
              <span>控制面板</span>
            </div>
            <div>
              <span>设备状态</span>
              <!-- <span v-if="status == 1" style="color:#1cdefe">在线</span> -->
              <!-- <span style="color:red" v-else>离线</span> -->
            </div>
            <div>
              <span>路灯模式</span>
              <span>感应模式</span>
            </div>
            <div>
              <span>当前路灯亮度</span>
              <span>
                52
                <span style="font-size:12px;color:#fff">lux</span>
              </span>
            </div>
            <div>
              <span>有人亮度</span>
              <span>
                63
                <span style="font-size:12px;color:#fff">lux</span>
              </span>
            </div>
            <div>
              <span>无人亮度</span>
              <span>
                23
                <span style="font-size:12px;color:#fff">lux</span>
              </span>
            </div>
            <div>
              <span>开始时间</span>
              <span>15:00</span>
            </div>
            <div>
              <span>结束时间</span>
              <span>24:00</span>
            </div>
            <div>
              <span>开关控制</span>
              <span>
                <el-switch
                  v-model="value"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="change(lampList1.lightId)"
                ></el-switch>
              </span>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import operation from "./operation";
import warn from "./warn";
export default {
  components: {
    operation,
    warn
  },
  data() {
    return {
      // 控制子组件显示
      operation: false,
      warn: false,
      // 路灯统计列表
      lampNum: "",
      selectDay1: new Date().getDate(),
      selectDay: 1,
      selectMonth1: new Date().getMonth() + 1,
      selectMonth: 1,
      selectYear1: new Date().getFullYear(),
      selectYear: 2020,
      timeIntervalValue: "年",
      timeIntervalOptions: [
        {
          timeIntervalValue: "年",
          timeIntervalLabel: "年"
        },
        {
          timeIntervalValue: "月",
          timeIntervalLabel: "月"
        },
        {
          timeIntervalValue: "日",
          timeIntervalLabel: "日"
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
      str_1: [], // 左侧曲线图数据
      str_2: [],
      time: [],
      Power: "",
      PowerType: "",
      isShow: false,
      tag: "",
      LampList: "",
      LampInfo: "",
      LampStatus: ""
    };
  },
  methods: {
    // 控制子组件显示
    operationShow() {
      this.operation = !this.operation;
      this.warn = false;
      this.$router.push("/partition");
      this.tag = "配置面板";
    },
    warnShow() {
      this.warn = !this.warn;
      this.operation = false;
      this.$router.push("/lall");
      this.tag = "告警记录";
    },
    // 获取路灯统计数量
    getLampNum() {
      this.$axios({
        method: "get",
        url: "/lighting/lamp/lampNum"
      }).then(res => {
        // console.log(res);
        this.lampNum = res.data.data;
      });
    },

    // 时间查询 （年）
    getTime() {
      var startTime = "";
      var endTime = "";
      if (this.timeIntervalValue == "日") {
        this.selectType = 3;
        startTime =
          this.selectYear + "-" + this.selectMonth + "-" + this.selectDay;
        endTime =
          this.selectYear1 + "-" + this.selectMonth1 + "-" + this.selectDay1;
      } else if (this.timeIntervalValue == "月") {
        this.selectType = 2;
        startTime = this.selectYear + "-" + this.selectMonth;
        endTime = this.selectYear1 + "-" + this.selectMonth1;
      } else if (this.timeIntervalValue == "年") {
        this.selectType = 1;
        startTime = this.selectYear;
        endTime = this.selectYear1;
      }
      this.$axios({
        method: "get",
        url: "/lighting/lamp/powerDiagram",
        params: {
          startTime: startTime,
          endTime: endTime,
          timeType: this.selectType
        }
      }).then(res => {
        var arr = res.data.data;
        for (let i = 0; i < arr.length; i++) {
          this.str_1[i] = arr[i].thisNum;
          this.time[i] = arr[i].createTime;
        }
        this.drawChart();
      });
    },

    // 左侧区域曲线图
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("map2"));
      var options = {
        grid: {
          y: 10,
          height: 70,
          y2: 20
        },
        xAxis: {
          type: "category",
          data: this.time,
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: this.str_1,
            // data: 0,
            type: "line",
            smooth: true,
            color: "#00ffff",
            lineStyle: {
              color: "#00ffff"
            }
          },
          {
            data: this.str_2,
            // data: 1,
            type: "line",
            smooth: true,
            color: "#22ac38",
            lineStyle: {
              color: "#22ac38"
            }
          }
        ]
      };
      try {
        myChart.setOption(options);
      } catch (err) {
        console.log(err);
      }
    },

    // 获取路灯统计数量
    getLampNum2() {
      this.$axios({
        method: "get",
        url: "/lighting/lamp/lampNum"
      }).then(res => {
        console.log(res);
        this.lampNum = res.data.data;
      });
    },

    // 获取节省电量
    getPower() {
      this.$axios({
        method: "get",
        url: "/lighting/lamp/powerList"
      }).then(res => {
        // console.log(res);
        this.Power = res.data.data;
      });
    },

    // 获取电量信息
    getPowerType() {
      this.$axios({
        method: "get",
        url: "/lighting/lamp/powerType"
      }).then(res => {
        // console.log(res);
        this.PowerType = res.data.data;
      });
    },

    // 获取所有路灯
    getLamp() {
      this.$axios({
        method: "get",
        url: "/lighting/lamp/all"
      }).then(res => {
        // console.log(res);
        this.LampList = res.data.data;
      });
    }
  },
  watch: {
    value(val) {
      localStorage.value = val;
    }
  },
  mounted() {
    this.value = localStorage.getItem("value") === "true" ? true : false;

    // 时间查询
    this.getTime();
  },
  created() {
    // 获取所有路灯
    this.getLampNum2();
    this.getPower();
    this.getPowerType();
    this.getLamp();
  }
};
</script>
<style>
.el-progress-bar__outer {
  height: 4px !important;
  width: 300px !important;
  margin-right: 10px !important;
  margin-top: 5px !important;
}
</style>

<style src="../../style/illumination/illumination.css" scoped></style>
