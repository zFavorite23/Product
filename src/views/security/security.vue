<template>
  <!-- 首页 -->
  <div class="security">
    <div class="main">
      <div class="leftSide">
        <!-- 头部标题 -->
        <div class="title">
          <span>监测点设备数据</span>
          <span>POWRE DATE</span>
        </div>

        <!-- 设备数量 -->
        <div class="num">
          <div class="zuo">
            <span>设备总数</span>
            <span>10</span>
          </div>
          <div class="you">
            <div style="margin-right:35px">
              <span style="font-size: 24px;text-align:right">4</span>
              <span>在线数量</span>
            </div>
            <div>
              <span style="font-size: 24px;text-align:right">100%</span>
              <span>在线率</span>
            </div>
          </div>
        </div>

        <!-- 设备统计数量 -->
        <div class="amount">
          <div>
            <span style="color:#1afe98">在线：4</span>
            <span class="skyblue"></span>
          </div>
          <div>
            <span style="color:#1cdefe">离线：0</span>
            <span class="blue"></span>
          </div>
          <div>
            <span style="color:#fdcd04">故障：0</span>
            <span class="yellow"></span>
          </div>
        </div>

        <!-- 头部标题 -->
        <div class="title">
          <span>在园人数统计</span>
          <span>USE CONDITION</span>
        </div>

        <!-- 告警次数 -->
        <div class="warnNum">
          <div>
            <span>当前在园人数</span>
            <span style=" font-weight: 700">20人</span>
          </div>
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

        <!-- 曲线图 -->
        <div id="map"></div>

        <!-- 头部标题 -->
        <div class="title">
          <span>告警统计</span>
          <span>USE CONDITION</span>
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

        <!-- 曲线图 -->
        <div id="map2"></div>
      </div>

      <div class="rightSide">
        <div class="topSide">
          <div class="left">
            <div v-if="WebcamList[0]">
              <div class="video" @click="setShow(WebcamList[0].webcamId, WebcamList[0].rtmpUrl)">
                <span>{{ WebcamList[0].name }}</span>
                <div>
                  <videoPlayer class="video-player vjs-custom-skin" :options="playerOptions"></videoPlayer>
                </div>
              </div>
              <div class="camera" @click="setShow(WebcamList[0].webcamId, WebcamList[0].rtmpUrl)">
                <span>{{ WebcamList[0].name }}</span>
              </div>
            </div>
            <div v-if="WebcamList[1]">
              <div class="video2" @click="setShow(WebcamList[1].webcamId, WebcamList[1].rtmpUrl)">
                <span>{{ WebcamList[1].name }}</span>
                <div>
                  <videoPlayer class="video-player vjs-custom-skin" :options="playerOptions"></videoPlayer>
                </div>
              </div>
              <div class="camera2" @click="setShow(WebcamList[1].webcamId, WebcamList[1].rtmpUrl)">
                <span>{{ WebcamList[1].name }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <div :class="{ bc_color: tag == '配置面板' }" @click="devicShow">配置面板</div>
            <!-- <div :class="{ bc_color: tag == '设置面板' }" @click="setShow">设置面板</div> -->
            <div :class="{ bc_color: tag == '告警记录' }" @click="warnShow">告警记录</div>
          </div>
        </div>
        <!-- 告警区域 -->
        <div class="botside">
          <div class="warn">
            <span>告警</span>
            <span>故障信息：#15 设备离线</span>
            <span>故障原因：#15 设备离线</span>
            <span>解决建议：请及时排查</span>
          </div>
          <div class="warn">
            <span>告警</span>
            <span>故障信息：#15 设备离线</span>
            <span>故障原因：#15 设备离线</span>
            <span>解决建议：请及时排查</span>
          </div>
          <div class="warn">
            <span class="back">告警</span>
            <span>告警信息：#15 垃圾满溢</span>
            <span>告警原因：纸类垃圾已满</span>
            <span>解决建议：请及时清理</span>
          </div>
          <div class="warn">
            <span class="back">告警</span>
            <span>告警信息：#15 垃圾满溢</span>
            <span>告警原因：纸类垃圾已满</span>
            <span>解决建议：请及时清理</span>
          </div>
        </div>

        <!-- 告警记录 -->
        <warnRecord v-if="warn"></warnRecord>
        <deviceInfo v-if="devic"></deviceInfo>
        <setDevice v-if="set"></setDevice>
      </div>
    </div>
  </div>
</template>

<script>
import warnRecord from "./warnRecord";
import deviceInfo from "./deviceInfo";
import setDevice from "./setDevice";
import "videojs-flash";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    warnRecord,
    deviceInfo,
    setDevice,
    videoPlayer
  },
  data() {
    return {
      // 控制子组件显示
      devic: false,
      warn: false,
      set: false,
      tag: "1",
      // 视频播放
      playerOptions: {
        techOrder: ["flash", "html5"], // 兼容顺序
        sources: [
          {
            // 流配置，数组形式，会根据兼容顺序自动切换
            type: "rtmp/hls",
            src: "rtmp://192.168.113.141:1935/live/robot"
          }
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        autoplay: true,
        controls: true
      },
      // 路灯统计列表
      lampNum: "",
      selectDay1: new Date().getDate(),
      selectDay: 1,
      selectMonth1: new Date().getMonth() + 1,
      selectMonth: 1,
      selectYear1: new Date().getFullYear(),
      selectYear: 2020,
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
      option: {
        grid: {
          left: "5%",
          right: "10%",
          top: "20%",
          bottom: "15%",
          containLabel: true
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
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
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
            name: "已采纳",
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
            data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
          },
          {
            name: "已发布",
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
            data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410]
          }
        ]
      },
      option2: {
        grid: {
          left: "5%",
          right: "10%",
          top: "20%",
          bottom: "15%",
          containLabel: true
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
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
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
            name: "已采纳",
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
            data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
          },
          {
            name: "已发布",
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
            data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410]
          }
        ]
      },
      camera: "",
      WebcamList: []
    };
  },
  methods: {
    // 获取摄像头列表
    getWebcamList() {
      this.$axios({
        method: "get",
        url: "/security/webcam/list"
      }).then(res => {
        // console.log(res);
        this.WebcamList = res.data.data;
      });
    },
    // 告警列表 显示
    warnShow() {
      this.warn = true;
      this.devic = false;
      this.set = false;
      this.tag = "告警记录";
      this.$router.push("/Sall");
    },

    // 配置面板 显示
    devicShow() {
      this.warn = false;
      this.devic = true;
      this.set = false;
      this.tag = "配置面板";
      this.$router.push("/deviceAdd");
    },

    // 设置面板
    setShow(webcamId, rtmpUrl) {
      this.warn = false;
      this.devic = false;
      this.set = true;
      this.tag = "设置面板";
      this.$router.push("/camera");
      this.camera = {
        webcamId: webcamId,
        rtmpUrl: rtmpUrl
      };
      var camera = JSON.stringify(this.camera);
      window.sessionStorage.setItem("camera", camera);
    },

    // 折线图
    drawLin() {
      let lin = this.$echarts.init(document.getElementById("map"));

      lin.setOption(this.option, (window.onresize = lin.resize));
      lin.resize();
      window.addEventListener("resize", function() {
        lin.resize();
      });
    },

    // 折线图
    drawLin2() {
      let lin = this.$echarts.init(document.getElementById("map2"));

      lin.setOption(this.option, (window.onresize = lin.resize));
      lin.resize();
      window.addEventListener("resize", function() {
        lin.resize();
      });
    },

    ces() {
      this.$axios({
        method: "get",
        url: "cleaning/trashCan/page"
      }).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {
    this.drawLin();
    this.drawLin2();
  },
  created() {
    // 获取摄像头列表
    this.getWebcamList();
    this.ces();
  }
};
</script>

<style>
.rightSide .video-player .video-js {
  width: 230px !important;
  height: 155px !important;
}
</style>

<style src="../../style/security/security.css" scoped></style>
