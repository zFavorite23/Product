<template>
  <div class="perception">
    <div class="main">
      <div class="leftSide">
        <!-- 头部标题 -->
        <div class="title">
          <span>环境感知</span>
          <span>POWRE DATE</span>
        </div>

        <!-- 设备数量 -->
        <div class="num">
          <div class="zuo">
            <span>设备总数</span>
            <span>{{ deviceNum.count }}</span>
          </div>
          <div class="you">
            <div style="margin-right:35px">
              <span style="font-size: 24px;text-align:right">
                {{ deviceNum.onCount }}
              </span>
              <span>在线数量</span>
            </div>
            <div>
              <span style="font-size: 24px;text-align:right"
                >{{ (deviceNum.onCount / deviceNum.count) * 100 }}%</span
              >
              <span>在线率</span>
            </div>
          </div>
        </div>

        <!-- 设备统计数量 -->
        <div class="amount">
          <div>
            <span style="color:#1afe98">在线：{{ deviceNum.onCount }}</span>
            <span class="skyblue"></span>
          </div>
          <div>
            <span style="color:#1cdefe">离线：{{ deviceNum.downCount }}</span>
            <span class="blue"></span>
          </div>
          <div>
            <span style="color:#fdcd04">故障：{{ deviceNum.badCount }}</span>
            <span class="yellow"></span>
          </div>
        </div>

        <!-- 头部标题 -->
        <div class="title">
          <span>土壤检测</span>
          <span>USE CONDITION</span>
        </div>

        <!-- 告警次数 -->
        <div class="warnNum">
          <div>
            <span>历史土壤告警次数</span>
            <span style=" font-weight: 700">{{ SoilWarnNum.historyNum }}</span>
          </div>
          <div>
            <span>昨日土壤告警次数</span>
            <span style=" font-weight: 700">{{ SoilWarnNum.lastDayNum }}</span>
          </div>
        </div>

        <!-- 时间筛选 -->
        <div class="comTop">
          <span class="monitorPoint">间隔选择</span>
          <select
            name="sel"
            style="margin-left:8%;margin-right:50px"
            v-model="timeIntervalValue"
          >
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
            <select
              v-model="selectYear"
              class
              style="margin-right:4%;margin-left:8%"
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select v-model="selectMonth" class style="margin-right:4%">
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select v-model="selectDay" class style="margin-right:4%">
              <option
                v-for="item in selectDayList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select
              v-model="selectYear1"
              class="comTop"
              style="margin-right:3%;margin-left:21.5%"
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select
              v-model="selectMonth1"
              class="comTop"
              style="margin-right:3%"
            >
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select v-model="selectDay1" class="comTop" style="margin-right:4%">
              <option
                v-for="item in selectDayList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
          </div>
          <div v-if="timeIntervalValue == '月'" class="comTop">
            <span class="monitorPoint">时间选择</span>
            <select
              v-model="selectYear"
              style="margin-right: 4%; margin-left: 8%"
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select v-model="selectMonth" class>
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
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
                >{{ item.label }}</option
              >
            </select>
            <select v-model="selectMonth1" class>
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <!-- </div> -->
          </div>
          <div v-if="timeIntervalValue == '年'" class="comTop">
            <span class="monitorPoint">时间选择</span>
            <select
              v-model="selectYear"
              style="margin-right: 4%;margin-left: 8% "
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select
              v-model="selectYear1"
              class="comTop"
              style="margin-left: 21.5%;display:block"
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
          </div>
        </div>

        <!-- 曲线图 -->
        <div id="map"></div>

        <!-- 头部标题 -->
        <div class="title">
          <span>水质检测</span>
          <span>USE CONDITION</span>
        </div>

        <!-- 告警次数 -->
        <div class="warnNum">
          <div>
            <span>历史水质告警次数</span>
            <span style=" font-weight: 700">{{ WaterWarnNum.historyNum }}</span>
          </div>
          <div>
            <span>昨日水质告警次数</span>
            <span style=" font-weight: 700">{{ WaterWarnNum.historyNum }}</span>
          </div>
        </div>

        <!-- 时间筛选 -->
        <div class="comTop">
          <span class="monitorPoint">间隔选择</span>
          <select
            name="sel"
            style="margin-left:8%;margin-right:50px"
            v-model="timeIntervalValue"
          >
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
            <select
              v-model="selectYear"
              class
              style="margin-right:4%;margin-left:8%"
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select v-model="selectMonth" class style="margin-right:4%">
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select v-model="selectDay" class style="margin-right:4%">
              <option
                v-for="item in selectDayList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select
              v-model="selectYear1"
              class="comTop"
              style="margin-right:3%;margin-left:21.5%"
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select
              v-model="selectMonth1"
              class="comTop"
              style="margin-right:3%"
            >
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select v-model="selectDay1" class="comTop" style="margin-right:4%">
              <option
                v-for="item in selectDayList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
          </div>
          <div v-if="timeIntervalValue == '月'" class="comTop">
            <span class="monitorPoint">时间选择</span>
            <select
              v-model="selectYear"
              style="margin-right: 4%; margin-left: 8%"
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select v-model="selectMonth" class>
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
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
                >{{ item.label }}</option
              >
            </select>
            <select v-model="selectMonth1" class>
              <option
                v-for="item in selectMonthList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <!-- </div> -->
          </div>
          <div v-if="timeIntervalValue == '年'" class="comTop">
            <span class="monitorPoint">时间选择</span>
            <select
              v-model="selectYear"
              style="margin-right: 4%;margin-left: 8% "
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
            <select
              v-model="selectYear1"
              class="comTop"
              style="margin-left: 21.5%;display:block"
            >
              <option
                v-for="item in selectYearList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</option
              >
            </select>
          </div>
        </div>

        <!-- 曲线图 -->
        <div id="map2"></div>
      </div>

      <div class="rightSide">
        <div class="topSide">
          <div class="left">
            <div style="display: flex;">
              <div class="panel">
                <div class="title">
                  <span style="color:#14e3b5">水质监测点02</span>
                  <span class="fz">控制面板</span>
                </div>
                <div class="warn">告警：土地湿度较低，请及时处理</div>
                <div class="mt">
                  <span>设备状态：</span>
                  <span style="color:#08ba0f">在线</span>
                </div>
                <div class="mt">
                  <span>土壤湿度：</span>
                  <span>17℃</span>
                </div>
                <div class="mt">
                  <span>土壤温度：</span>
                  <span>60%</span>
                </div>
                <div class="mt">
                  <span>土壤盐度：</span>
                  <span>1.16us/cm</span>
                </div>
              </div>
              <div class="panel">
                <div class="title">
                  <span style="color:#14e3b5">控制面板</span>
                  <span class="fz">水质监测点02</span>
                </div>
                <div class="info">
                  <span></span>
                  <span>明细</span>
                </div>
                <div class="mt">
                  <span>土壤湿度：</span>
                  <span>17%</span>
                </div>
                <div class="mt">
                  <span></span>
                  <span>17%</span>
                </div>
              </div>
            </div>
            <div style="display: flex;">
              <div class="panel">
                <div class="title2">
                  <span style="color:#14e3b5">水质监测点01</span>
                  <span class="fz">控制面板</span>
                </div>
                <div class="warn">告警：土地湿度较低，请及时处理</div>
                <div>
                  <span>设备状态：</span>
                  <span style="color:#08ba0f">在线</span>
                </div>
                <div>
                  <span>PH：</span>
                  <span>7</span>
                </div>
                <div>
                  <span>溶解氧：</span>
                  <span>1mg/I</span>
                </div>
                <div>
                  <span>浊度：</span>
                  <span>3NTU</span>
                </div>
                <div>
                  <span>导电率：</span>
                  <span>2um/cm</span>
                </div>
                <div>
                  <span>温度：</span>
                  <span>2um/cm</span>
                </div>
              </div>
              <div class="panel">
                <div class="title2">
                  <span style="color:#14e3b5">控制面板</span>
                  <span class="fz">水质监测点01</span>
                </div>
                <div class="info">
                  <span></span>
                  <span>明细</span>
                </div>
                <div class="mt">
                  <span>PH：</span>
                  <span>17%</span>
                </div>
                <div class="mt">
                  <span>溶解氧：</span>
                  <span>17%</span>
                </div>
                <div class="mt">
                  <span>浊度：</span>
                  <span>17%</span>
                </div>
                <div class="mt">
                  <span>导电率：</span>
                  <span>17%</span>
                </div>
                <div class="mt">
                  <span>温度：</span>
                  <span>17%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mid" :class="{ none: weathe }">
            <div class="tempMax">
              <img src="../../assets/img/tep.png" alt />
              <div class="tep" v-if="weather[0]">{{ weather[0].tempMax }}°</div>
              <div class="indices" v-if="indices[0]">
                <div class="info" v-bind:title="indices[0].text">
                  <div>
                    <img src="../../assets/img/10.png" alt />
                  </div>
                  <div>{{ indices[0].name }}</div>
                  <div>{{ indices[0].category }}</div>
                </div>
                <div class="info" v-bind:title="indices[1].text">
                  <div>
                    <img src="../../assets/img/12.png" alt />
                  </div>
                  <div>{{ indices[1].name }}</div>
                  <div>{{ indices[1].category }}</div>
                </div>
                <div class="info" v-bind:title="indices[2].text">
                  <div>
                    <img src="../../assets/img/14.png" alt />
                  </div>
                  <div>{{ indices[2].name }}</div>
                  <div>{{ indices[2].category }}</div>
                </div>
                <div class="info" v-bind:title="indices[3].text">
                  <div>
                    <img src="../../assets/img/16.png" alt />
                  </div>
                  <div>{{ indices[3].name }}</div>
                  <div>{{ indices[3].category }}</div>
                </div>
              </div>
            </div>
            <div v-for="(item, index) in weather" :key="index" class="weather">
              <span>{{ item.fxDate }}</span>
              <span>{{ item.textDay }}</span>
              <img :src="require(`../../assets/64/${item.iconDay}.png`)" alt />
              <span>{{ item.tempMin }}°~{{ item.tempMax }}°</span>
            </div>
          </div>
          <div class="right">
            <div :class="{ bc_color: tag == '气象信息' }" @click="weatheShow">
              气象信息
            </div>
            <div :class="{ bc_color: tag == '告警记录' }" @click="warnShow">
              告警记录
            </div>
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
        <warnRecord v-show="warn"></warnRecord>
      </div>
    </div>
  </div>
</template>

<script>
import warnRecord from "./warnRecord";
export default {
  components: {
    warnRecord
  },
  data() {
    return {
      tag: "气象信息",
      warn: false,
      weathe: false,
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
      weather: [], // 天气
      indices: [], // 生活指数
      SoilWarnNum: "",
      WaterWarnNum: "",
      deviceNum: ""
    };
  },
  methods: {
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

    // 告警列表 显示
    warnShow() {
      this.warn = true;
      this.weathe = true;
      this.tag = "告警记录";
      this.$router.push("/all");
    },

    // 气象天气 显示
    weatheShow() {
      this.warn = false;
      this.weathe = false;
      this.tag = "气象信息";
    },

    // 天气
    getWeather() {
      this.$axios({
        method: "get",
        url:
          "https://devapi.heweather.net/v7/weather/7d?location=101010100&key=4f4fc1eb4fab4a77a45f74663dedb1a6"
      }).then(res => {
        // console.log(res);
        this.weather = res.data.daily;
      });
    },

    // 生活指数
    getIndices() {
      this.$axios({
        method: "get",
        url:
          "https://devapi.heweather.net/v7/indices/1d?type=1,3,5,8&location=101010100&key=4f4fc1eb4fab4a77a45f74663dedb1a6"
      }).then(res => {
        this.indices = res.data.daily;
      });
    },

    // 获取设备数量
    getDeviceNum() {
      this.$axios({
        method: "get",
        url: "/environment/soil/deviceNum"
      }).then(res => {
        this.deviceNum = res.data.data;
      });
    },
    // 获取土壤告警次数
    getSoilWarnNum() {
      this.$axios({
        method: "get",
        url: "/environment/soilWarn/warnByNum"
      }).then(res => {
        // console.log(res);
        this.SoilWarnNum = res.data.data;
      });
    },
    // 获取水质告警次数
    getWaterWarnNum() {
      this.$axios({
        method: "get",
        url: "/environment/waterWarn/warnByNum"
      }).then(res => {
        this.WaterWarnNum = res.data.data;
      });
    }

    //
  },
  mounted() {
    this.drawLin();
    this.drawLin2();
  },
  created() {
    // 天气
    this.getWeather();
    // 生活指数
    this.getIndices();

    // 获取土壤告警次数
    this.getSoilWarnNum();
    // 获取水质告警次数
    this.getWaterWarnNum();
    // 获取设备数量
    this.getDeviceNum();
  }
};
</script>

<style scoped src="../../style/perception.css"></style>
