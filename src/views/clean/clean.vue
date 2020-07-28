<template>
  <div class="clean">
    <div class="main">
      <!-- 左侧面板区域 -->
      <div class="left">
        <!-- 头部标题 -->
        <div class="title">
          <span>智能垃圾桶数据</span>
          <span>POWER DATE</span>
        </div>
        <!-- 设备数量 -->
        <div class="num">
          <div class="le">
            <span>保洁系统</span>
            <span style="font-size:10px">Cleaning System</span>
          </div>
          <div class="you">
            <div>
              <span style="font-size: 24px;text-align:center">{{
                DevicesList.total
              }}</span>
              <span>设备总数</span>
            </div>
            <div>
              <span style="font-size: 24px;text-align:center"
                >{{ (DevicesList.onLine / DevicesList.total) * 100 }}%</span
              >
              <span>在线率</span>
            </div>
          </div>
        </div>
        <!-- 设备统计数量 -->
        <div class="amount">
          <div>
            <span style="color:#1afe98">在线：{{ DevicesList.onLine }}</span>
            <span class="skyblue"></span>
          </div>
          <div>
            <span style="color:#1cdefe">离线：{{ DevicesList.offLine }}</span>
            <span class="blue"></span>
          </div>
          <div>
            <span style="color:#fdcd04">故障：{{ DevicesList.fault }}</span>
            <span class="yellow"></span>
          </div>
        </div>
        <!-- 使用情况 -->
        <div class="title">
          <span>开门次数</span>
          <span>USE CONDITION</span>
        </div>
        <!-- 使用情况详细 -->
        <div class="use">
          <div>总共</div>
          <div>
            <el-progress
              :show-text="false"
              :percentage="openNum"
              color="red"
            ></el-progress>
          </div>
          <div class="num">{{ openNum }} 次</div>
        </div>
        <!-- 使用情况 -->
        <div class="title">
          <span>压缩次数</span>
          <span>USE CONDITION</span>
        </div>
        <!-- 使用情况详细 -->
        <div class="use">
          <div>总共</div>
          <div>
            <el-progress
              :show-text="false"
              :percentage="compressNum"
              color="red"
            ></el-progress>
          </div>
          <div class="num">{{ compressNum }} 次</div>
        </div>
        <!-- 使用趋势 -->
        <div class="title">
          <span>统计</span>
          <span>USAGE ANALYSIS</span>
        </div>
        <!-- 时间筛选 -->

        <!-- 曲线图 -->
        <div id="map2"></div>
      </div>
      <!-- 右侧内容 -->
      <div class="right">
        <div class="topside">
          <div class="left_2">
            <operation v-if="operation"></operation>
            <warn v-if="warn"></warn>
          </div>
          <div class="right_2">
            <div
              :class="{ bc_color: tag == '操作面板' }"
              @click="operationShow"
            >
              操作面板
            </div>
            <div :class="{ bc_color: tag == '告警记录' }" @click="warnShow">
              告警记录
            </div>
          </div>
        </div>

        <div class="info">
          <!-- 地标看板 -->
          <div style="width:380px;height:220px;">
            <div class="panel" v-show="show">
              <nav>
                <span
                  @click="onDetailsShow('设备信息')"
                  :class="{ color: tag == '设备信息' }"
                  >设备信息</span
                >
                <!-- <span @click="onTableShow('报表')" :class="{color:tag=='报表'}">报表</span> -->
              </nav>
              <div class="item">
                <Details
                  v-show="detailsShow"
                  :deviceCode="deviceCode"
                ></Details>
                <!-- 图表 -->
                <div class="table" v-show="tableShow">
                  <div id="map"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- 地标 -->
          <div class="coordinate" @click="deviceInfo(spill.deviceCode)">
            <span>1号垃圾桶</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import operation from "./operation";
import warn from "./warn";
// 引入设备详情组件
import Details from "./details";
export default {
  components: {
    Details,
    operation,
    warn
  },
  data() {
    return {
      // 控制子组件显示
      operation: false,
      warn: false,
      option: {
        color: ["RGB(1,255,152)", "RGB(244,191,70)"],
        title: {
          text: "使用趋势",
          top: 0,
          left: "21",
          textStyle: {
            fontSize: 12,
            color: "#fff"
          }
        },
        animation: false,
        grid: {
          top: "25",
          left: "32",
          bottom: "15",
          right: "39",
          containLabel: true
        },
        legend: {
          show: true,
          top: 0,
          right: 26,
          data: ["开门", "压缩"],
          textStyle: {
            color: "RGB(193,223,255)"
          }
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            nameTextStyle: {
              color: "#fff"
            },
            axisLine: {
              lineStyle: {
                color: "RGB(47,68,114)"
              }
            },
            axisLabel: {
              textStyle: {
                color: "RGB(145,155,183)"
              },
              margin: 20,
              //底部文字倾斜
              interval: 0,
              rotate: 25
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "RGB(145,155,183)"
              },
              formatter: "{value}"
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "RGB(47,68,114)"
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "RGB(47,68,114)"
              }
            }
          }
        ],
        series: [
          {
            name: "开门",
            type: "bar",
            //silent: true,
            barWidth: "12",
            //barGap: '-100%', // Make series be overlap
            data: []
          },
          {
            name: "压缩",
            type: "bar",
            //silent: true,
            barWidth: "12",
            //barGap: '-100%', // Make series be overlap
            data: []
          }
        ]
      },
      spill: "",
      spill_1: "",
      spill_2: "",
      spill_3: "",
      spill_4: "",
      show: false,
      show_1: false,
      show_2: false,
      show_3: false,
      show_4: false,
      tag: "设备信息",
      // 设备列表
      tableData: [],
      // 设备code码
      deviceCode: "",
      // 智慧保洁首页显示
      cleanHomeShow: false,
      // 相关设备列表
      DevicesList: [],
      // 设备使用情况
      devicesUse: [],
      selectType: "",
      tableShow: false,
      detailsShow: true,
      timeIntervalValue: "日",
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
      timeIntervalValue1: "日",
      timeIntervalOptions1: [
        {
          timeIntervalValue1: "年",
          timeIntervalLabel1: "年"
        },
        {
          timeIntervalValue1: "月",
          timeIntervalLabel1: "月"
        },
        {
          timeIntervalValue1: "日",
          timeIntervalLabel1: "日"
        }
      ],
      selectYearList: [
        { value: "2018", label: "2018" },
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" }
      ],
      selectMonthList: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" }
      ],
      selectDayList: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
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
      str_3: [], // 一号点位曲线图数据
      str_4: [],
      time_1: [],
      selectYear: 2020,
      selectMonth: 5,
      selectDay: 1,
      selectYear1: new Date().getFullYear(),
      selectMonth1: new Date().getMonth() + 1,
      selectDay1: new Date().getDate(),
      tow_1: [], // 2号垃圾桶
      tow_2: [],
      time_2: [],
      thr_1: [], // 3号垃圾桶
      thr_2: [],
      time_3: [],
      four_1: [], // 4号垃圾桶
      four_2: [],
      time_4: [],
      five_1: [], // 5号垃圾桶
      five_2: [],
      time_5: [],
      openNum: 0,
      compressNum: 0
    };
  },
  methods: {
    // 控制子组件显示
    operationShow() {
      this.operation = !this.operation;
      this.warn = false;
      this.$router.push("/rubbish");
      this.tag = "操作面板";
    },
    warnShow() {
      this.warn = !this.warn;
      this.operation = false;
      this.$router.push("/Call");
      this.tag = "告警记录";
    },
    // 左侧区域曲线图
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("map2"));
      try {
        myChart.setOption(this.option);
      } catch (err) {
        console.log(err);
      }
    },
    // 智慧保洁首页显示
    onCleanHome() {
      this.cleanHomeShow = !this.cleanHomeShow;
    },

    // 相关设备查询
    getDevices() {
      this.$axios({
        method: "get",
        url: "/cleaning/statistic/num"
      }).then(res => {
        // console.log(res);
        this.DevicesList = res.data.data;
      });
    },

    // 设备使用情况
    DevicesUse() {
      this.$axios({
        method: "get",
        url: "/cleaning/statistic/spill"
      }).then(res => {
        console.log(res);
        res.data.data.forEach(item => {
          this.openNum += item.openNum;
          this.compressNum += item.compressNum;

          this.option.xAxis[0].data.push(item.deviceName);
          this.option.series[0].data.push({
            value: item.openNum
          });
          this.option.series[1].data.push({
            value: item.compressNum
          });
          console.log(this.option.xAxis[0].data);
        });

        this.drawChart();
      });
    },

    // 时间查询 （年）
    // getTime() {
    //   var startTime = "";
    //   var endTime = "";
    //   if (this.timeIntervalValue == "日") {
    //     this.selectType = 3;
    //     startTime =
    //       this.selectYear + "-" + this.selectMonth + "-" + this.selectDay;
    //     endTime =
    //       this.selectYear1 + "-" + this.selectMonth1 + "-" + this.selectDay1;
    //   } else if (this.timeIntervalValue == "月") {
    //     this.selectType = 2;
    //     startTime = this.selectYear + "-" + this.selectMonth;
    //     endTime = this.selectYear1 + "-" + this.selectMonth1;
    //   } else if (this.timeIntervalValue == "年") {
    //     this.selectType = 1;
    //     startTime = this.selectYear;
    //     endTime = this.selectYear1;
    //   }
    //   this.$axios({
    //     method: "get",
    //     url: "/cleaning/statistic/trashCan",
    //     params: {
    //       startTime: startTime,
    //       endTime: endTime,
    //       selectType: this.selectType
    //     }
    //   }).then(res => {
    //     var arr = res.data.data;
    //     for (let i = 0; i < arr.length; i++) {
    //       this.str_1[i] = arr[i].spillOverNum;
    //       this.str_2[i] = arr[i].cleanNum;
    //       this.time[i] = arr[i].time;
    //     }
    //     this.drawChart();
    //   });
    // },

    // 组件切换
    onTableShow(name) {
      this.tableShow = true;
      this.detailsShow = false;
      this.tag = name;
    },

    onDetailsShow(name) {
      this.tableShow = false;
      this.detailsShow = true;
      this.tag = name;
    },

    // 获取1设备列表
    getdeviceCode() {
      this.$axios({
        method: "get",
        url: `/cleaning/trashCan/info/${65233030107149}`
      }).then(res => {
        console.log(res);
        this.spill = res.data.data;
      });
    },
    // 获取2设备列表
    getdeviceCode_1() {
      this.$axios({
        method: "get",
        url: `/cleaning/trashCan/info/${65233030107248}`
      }).then(res => {
        // console.log(res);
        this.spill_1 = res.data.data;
      });
    },
    // 获取3设备列表
    getdeviceCode_2() {
      this.$axios({
        method: "get",
        url: `/cleaning/trashCan/info/${65233030108089}`
      }).then(res => {
        // console.log(res);
        this.spill_2 = res.data.data;
      });
    },
    // 获取4设备列表
    getdeviceCode_3() {
      this.$axios({
        method: "get",
        url: `/cleaning/trashCan/info/${65233030109814}`
      }).then(res => {
        // console.log(res);
        this.spill_3 = res.data.data;
      });
    },
    // 获取5设备列表
    getdeviceCode_4() {
      this.$axios({
        method: "get",
        url: `/cleaning/trashCan/info/${65233030115647}`
      }).then(res => {
        // console.log(res);
        this.spill_4 = res.data.data;
      });
    },

    // 获取1号code码
    deviceInfo(deviceCode) {
      this.show = !this.show;
      this.show_1 = false;
      this.show_2 = false;
      this.show_3 = false;
      this.show_4 = false;
      this.deviceCode = deviceCode;
    },
    // 获取2号code码
    deviceInfo_1(deviceCode) {
      this.show_1 = !this.show_1;
      this.show = false;
      this.show_2 = false;
      this.show_3 = false;
      this.show_4 = false;
      this.deviceCode = deviceCode;
    },
    // 获取3号code码
    deviceInfo_2(deviceCode) {
      this.show_2 = !this.show_2;
      this.show = false;
      this.show_1 = false;
      this.show_3 = false;
      this.show_4 = false;
      this.deviceCode = deviceCode;
    },
    // 获取4号code码
    deviceInfo_3(deviceCode) {
      this.show_3 = !this.show_3;
      this.show_1 = false;
      this.show_2 = false;
      this.show = false;
      this.show_4 = false;
      this.deviceCode = deviceCode;
    },
    // 获取5号code码
    deviceInfo_4(deviceCode) {
      this.show_4 = !this.show_4;
      this.show_1 = false;
      this.show_2 = false;
      this.show_3 = false;
      this.show = false;
      this.deviceCode = deviceCode;
    }
  },
  created() {
    // 相关设备查询
    this.getDevices();
    // 设备使用情况
    this.DevicesUse();
    // 查询
    // this.getTime();
    this.getdeviceCode();
    this.getdeviceCode_1();
    this.getdeviceCode_2();
    this.getdeviceCode_3();
    this.getdeviceCode_4();
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style src="../../style/clean/clean.css" scoped></style>
