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
              <span style="font-size: 24px;text-align:right">{{
                DevicesList.total
              }}</span>
              <span>设备总数</span>
            </div>
            <div>
              <span style="font-size: 24px;text-align:right">
                {{
                  ((DevicesList.onLine / DevicesList.total) * 100).toFixed(1)
                }}%
              </span>
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
          <span>满溢次数</span>
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
          <span>清理次数</span>
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
          <span>七日统计</span>
          <span>USAGE ANALYSIS</span>
        </div>
        <!-- 设备筛选 -->
        <div class="devices">
          <div>设备选择</div>
          <select v-model="DevicesId" @change="changeDevices()">
            <option
              v-for="(item, index) in list"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></option>
          </select>
        </div>

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
      option: {
        grid: {
          left: "5%",
          right: "10%",
          top: "20%",
          bottom: "15%",
          containLabel: true
        },
        legend: {
          show: true,
          x: "center",
          top: "10",
          textStyle: {
            color: "#fff"
          },
          data: ["满溢次数", "清理次数"]
        },
        tooltip: {
          show: true,
          trigger: "item"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#30eee9"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#397cbc"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#195384"
              }
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 1000,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#2ad1d2"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#27b4c2"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#11366e"
              }
            }
          }
        ],
        series: [
          {
            name: "满溢次数",
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#0092f6",
                lineStyle: {
                  color: "#0092f6",
                  width: 1
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: "red"
                }
              }
            },
            data: []
          },
          {
            name: "清理次数",
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 8,

            itemStyle: {
              normal: {
                color: "#00d4c7",
                lineStyle: {
                  color: "#00d4c7",
                  width: 1
                }
              }
            },
            data: []
          }
        ]
      },
      show: false,
      tag: "设备信息",
      // 智慧保洁首页显示
      cleanHomeShow: false,
      // 相关设备列表
      DevicesList: [],
      list: [],
      openNum: 0,
      compressNum: 0,
      itemId: "",
      DevicesId: ""
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

    // 设备在线数量统计
    getDevicesNum() {
      this.$axios({
        method: "get",
        url: "/cleaning/statistic/num",
        params: {
          itemId: this.itemId
        }
      }).then(res => {
        console.log(res);
        this.DevicesList = res.data.data;
      });
    },

    // 七天历史数据
    changeDevices() {
      this.option.xAxis[0].data = [];
      this.option.series[0].data = [];
      this.option.series[1].data = [];
      this.$axios({
        method: "get",
        url: "/cleaning/statistic/trashCan/seven",
        params: {
          deviceCode: this.DevicesId
        }
      }).then(res => {
        console.log(res);
        res.data.data.forEach(item => {
          this.openNum += item.spillOverNum;
          this.compressNum += item.cleanNum;

          this.option.xAxis[0].data.push(item.time);
          this.option.series[0].data.push({
            value: item.spillOverNum
          });
          this.option.series[1].data.push({
            value: item.cleanNum
          });
        });

        this.drawChart();
      });
    },

    // 获取设备列表
    getDevice() {
      this.$axios({
        method: "get",
        url: "/cleaning/trashCan/page",
        params: {
          pageSize: 50,
          itemId: this.itemId
        }
      }).then(res => {
        res.data.data.records.forEach(item => {
          this.list.push({
            value: item.id,
            label: item.name
          });
        });
        if (this.DevicesId == "") {
          this.DevicesId = this.list[0].value;
        }
        this.changeDevices();
      });
    }
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");
    // 设备在线数量统计
    this.getDevicesNum();
    this.getDevice();
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style src="../../style/clean/clean.css" scoped></style>
