<template>
  <div class="illumination">
    <template>
      <baidu-map
        class="baidumap"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="handler"
        :averageCenter="true"
      >
        <!-- 土壤 -->
        <div
          class="info2"
          v-for="(item, index) in markers1"
          :key="'info2-' + index"
        >
          <bm-marker
            v-if="item.status == 1"
            :icon="{
              url: require('../../assets/img/soil.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: item.lng, lat: item.lat }"
            @click="infoWindowOpen1(item, item.name)"
          ></bm-marker>
          <bm-marker
            v-if="item.status == 0"
            :icon="{
              url: require('../../assets/img/soil3.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: item.lng, lat: item.lat }"
            @click="infoWindowOpen1(item, item.name)"
          ></bm-marker>
          <bm-info-window
            :position="{
              lng: markLocation1.longitude,
              lat: markLocation1.latitude
            }"
            :show="showFlag1"
          >
            <p style="color: #409eff;">{{ markLocation1.name }}</p>
            <p>温度：{{ markLocation1.temperature }}</p>
            <p>湿度：{{ markLocation1.humidity }}</p>
            <p>盐度：{{ markLocation1.salinity }}</p>
          </bm-info-window>
        </div>
        <!-- 水表 -->
        <div v-for="(marker, index) in markers" :key="index">
          <!-- 开 -->
          <bm-marker
            v-if="marker.isOPen == 1"
            :icon="{
              url: require('../../assets/img/irr1.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <!-- 关 -->
          <bm-marker
            v-if="marker.isOPen == 0"
            :icon="{
              url: require('../../assets/img/irr.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <!-- 在线 -->
          <bm-marker
            v-if="marker.status == 1"
            :icon="{
              url: require('../../assets/img/irr.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <!-- 离线 -->
          <bm-marker
            v-if="marker.status == 0"
            :icon="{
              url: require('../../assets/img/irr3.png'),
              size: { width: 40, height: 40 }
            }"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="infoWindowOpen(marker)"
          ></bm-marker>
          <bm-info-window
            :position="{
              lng: markLocation.longitude,
              lat: markLocation.latitude
            }"
            :show="showFlag"
            style="height: 175px"
          >
            <p style="color: #409eff;">{{ markLocation.deviceName }}</p>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="基础面板" name="first">
                <p style="line-height: 17px;">
                  <span class="mapChartTit">设备状态：</span>
                  <span class="right" v-if="markLocation.isOPen == 1"
                    >开启</span
                  >
                  <span class="right" v-if="markLocation.isOPen == 0"
                    >关闭</span
                  >
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">累计用水量：</span>
                  <span class="right">{{ markLocation.totalWatering }}m³</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">灌溉次数：</span>
                  <span class="right">{{ markLocation.totalWaterNum }}次</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">上月灌溉次数：</span>
                  <span class="right">{{ markLocation.lastWaterNum }}次</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">上月用水量：</span>
                  <span class="right">{{ markLocation.lastWatering }}m³</span>
                </p>
                <p style="line-height: 17px;">
                  <span class="mapChartTit">灌溉点面积：</span>
                  <span class="right">{{ markLocation.irrigationArea }}m³</span>
                </p>
                <p>
                  <span class="mapChartTit" style="line-height: 35px;"
                    >阀门控制：</span
                  >
                  <el-button
                    type="success"
                    plain
                    style="right:70px;position: absolute;width: 50px;padding: 5px 10px;bottom: 0"
                    @click="openDevice(markLocation.deviceId)"
                    >开启</el-button
                  >
                  <el-button
                    type="danger"
                    plain
                    style="right:0px;position: absolute;width: 50px;padding: 5px 10px;bottom: 0"
                    @click="closeDevice(markLocation.deviceId)"
                    >关闭</el-button
                  >
                </p>
              </el-tab-pane>
              <el-tab-pane label="报表" name="second">
                <span style="display: inline-block;width: 26%;">间隔选择</span>
                <select
                  name="sel"
                  v-model="mapValue"
                  style="background-color:#fff;color:#000;width: 23%"
                >
                  <option
                    v-for="item in mapOptions"
                    :key="item.mapValue"
                    :label="item.mapLabel"
                    :value="item.mapValue"
                  ></option>
                </select>
                <button
                  @click="mapDemand"
                  style="right: 13px;float: right;position: absolute;background-color: #1e1e1e;border: none;color: #ffffff;
                padding-left: 10px;padding-right: 11px;line-height: 16px;padding: 3px 10px;font-size: 4px;border-radius: 4px;"
                >
                  查询
                </button>
                <div v-if="mapValue == '日'" class="comTop">
                  <span class="monitorPoint" style="width: 26%;">时间选择</span>
                  <select
                    v-model="mapYear"
                    class
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectYearList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapMonth"
                    class
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectMonthList"
                      :value="item.value1"
                      :key="item.value1"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapDay"
                    class
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectDayList"
                      :value="item.value2"
                      :key="item.value2"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapYear1"
                    class="comTop"
                    style="background-color:#fff;color:#000;margin-left:26%;width: 23%"
                  >
                    <option
                      v-for="item in selectYearList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapMonth1"
                    class="comTop"
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectMonthList"
                      :value="item.value1"
                      :key="item.value1"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapDay1"
                    class="comTop"
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectDayList"
                      :value="item.value2"
                      :key="item.value2"
                      >{{ item.label }}</option
                    >
                  </select>
                </div>
                <div v-if="mapValue == '月'" class="comTop">
                  <span class="monitorPoint" style="width: 26%;">时间选择</span>
                  <select
                    v-model="mapYear"
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectYearList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapMonth"
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectMonthList"
                      :value="item.value1"
                      :key="item.value1"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapYear1"
                    style="background-color:#fff;color:#000;margin-left:26%;width: 23%"
                    class="comTop"
                  >
                    <option
                      v-for="item in selectYearList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapMonth1"
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectMonthList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                </div>
                <div v-if="mapValue == '年'" class="comTop">
                  <span class="monitorPoint" style="width: 26%;">时间选择</span>
                  <select
                    v-model="mapYear"
                    style="background-color:#fff;color:#000;width: 23%"
                  >
                    <option
                      v-for="item in selectYearList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                  <select
                    v-model="mapYear1"
                    class="comTop"
                    style="margin-left:26%;display:block;width: 23%;background-color:#fff;color:#000;"
                  >
                    <option
                      v-for="item in selectYearList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</option
                    >
                  </select>
                </div>
                <div class="chart" id="mapChart"></div>
              </el-tab-pane>
            </el-tabs>
          </bm-info-window>
        </div>
      </baidu-map>
    </template>
    <!-- 左侧面板 -->
    <div class="leftside">
      <div class="aside1">
        <div class="nav1">
          <span class="titLeft">智能灌溉</span>
          <img src="../../assets/img/titRight.png" alt class="titRight" />
        </div>

        <div class="nav2">
          <div class="nav2Left">
            <span class="tit" style="margin-right:5px">设备总数</span>
            <span class="num">{{ zongNum }}</span>
          </div>
          <div class="nav2Right">
            <div style="width: 49%;text-align: center">
              <span style="font-size: 24px;">{{ onlineNum }}</span>
              <span style="letter-spacing: 2px">在线数量</span>
            </div>
            <div style="width: 49%;text-align: center">
              <!-- <span style="font-size: 24px;">{{notLineNum}}</span> -->
              <span style="font-size: 24px;">{{ notLineNum }}</span>
              <span style="letter-spacing: 2px">离线数量</span>
            </div>
          </div>
        </div>
        <div class="nav3">
          <div class="onLine">
            <p>在线:{{ onLinePer }}%</p>
            <!-- <p>在线:{{onLinePer}}%</p> -->
            <el-progress :percentage="onLinePer" :color="onLine"></el-progress>
          </div>
          <div class="not">
            <p>离线:{{ notPer }}%</p>
            <!-- <p>离线:{{notPer}}%</p> -->
            <el-progress :percentage="notPer" :color="not"></el-progress>
          </div>
        </div>
      </div>
      <div class="aside2">
        <div class="nav1">
          <span class="titLeft">灌溉分析</span>
          <img src="../../assets/img/titRight.png" alt class="titRight" />
        </div>
        <div class="nav2">
          <el-progress
            type="circle"
            :percentage="26"
            :color="not"
            style="margin-right:56px"
          ></el-progress>
          <el-progress
            type="circle"
            :percentage="48"
            :color="not"
            style="margin-right:56px"
          ></el-progress>
          <el-progress
            type="circle"
            :percentage="65"
            :color="not"
            style="margin-right:56px"
          ></el-progress>
          <el-progress
            type="circle"
            :percentage="48"
            :color="mon"
            style="float:right;right:0"
          ></el-progress>
          <!-- <el-progress
            type="circle"
            :percentage="total"
            :color="not"
            style="margin-right:56px"
            v-if="total"
          ></el-progress>
          <el-progress
            type="circle"
            :percentage="thisNum3"
            :color="not"
            style="margin-right:56px"
            v-if="thisNum3"
          ></el-progress>
          <el-progress
            type="circle"
            :percentage="economizeWater"
            :color="not"
            style="margin-right:56px"
            v-if="economizeWater"
          ></el-progress>
          <el-progress
            type="circle"
            :percentage="economizeMoney"
            :color="mon"
            style="float:right;right:0"
            v-if="economizeMoney"
          ></el-progress>-->
          <div style="margin-top:-47px;color:#00ffff">
            <div class="cir" style="margin-right:56px">
              <p style="font-size: 16px;">{{ total }}</p>
              <p>m³</p>
              <p style="margin-top:15px;font-size: 14px;">总耗水量</p>
            </div>
            <div class="cir" style="margin-right:56px">
              <p style="font-size: 16px;">{{ thisNum3 }}</p>
              <p>m³</p>
              <p style="margin-top:15px;font-size: 14px;">上月用水</p>
            </div>
            <div class="cir" style="margin-right:56px">
              <p style="font-size: 16px;">{{ economizeWater }}</p>
              <p>m³</p>
              <p style="margin-top:15px;font-size: 14px;">节省水量</p>
            </div>
            <div
              style="width: 60px;text-align:center;float:right;right:0;margin-top:-45px"
            >
              <p style="font-size: 16px;color:#ffb110;">{{ economizeMoney }}</p>
              <p style="color:#ffb110">元</p>
              <p style="margin-top:15px;font-size: 14px;color:#ffb110">
                节省金额
              </p>
            </div>
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="nav3">
          <p style="margin-top:5px">
            <span>上月节省水量：</span>
            <span style="float:right">
              <span>{{ economize3 }}</span>
              <span>m³</span>
            </span>
          </p>
          <p>
            <span>上月节省金额：</span>
            <span style="float:right">
              <span>{{ money3 }}</span>
              <span>元</span>
            </span>
          </p>
          <p>
            <span>上月智能灌溉区用水量：</span>
            <span style="float:right">
              <span>{{ thisNum1 }}</span>
              <span>m³</span>
            </span>
          </p>
          <p>
            <span>上月普通灌溉区用水量：</span>
            <span style="float:right">
              <span>{{ thisNum2 }}</span>
              <span>m³</span>
            </span>
          </p>
        </div>
      </div>
      <div class="aside3">
        <div class="nav1">
          <span class="titLeft">各项水量使用情况</span>
          <img src="../../assets/img/titRight.png" alt class="titRight" />
        </div>
        <div class="nav2">
          <span>智能灌溉区</span>
          <span
            style="font-size:17px;background-color:#007eff;padding:4px 3px 4px 3px;margin-bottom:2px;display:inline-block"
            >{{ zhi }}</span
          >
          <span>m³</span>
        </div>
        <div
          style="width:80%;display:inline-block;float:left;margin-bottom:5px"
        >
          <el-progress :percentage="smartPer" :color="not"></el-progress>
        </div>
        <!-- <span style="float:right;display:inline-block;right:0">{{smartPer}}%</span> -->
        <span style="float:right;display:inline-block;right:0">100%</span>
        <div style="clear:both"></div>
        <div class="nav2">
          <span>普通灌溉区</span>
          <span
            style="font-size:17px;background-color:#007eff;padding:4px 3px 4px 3px;margin-bottom:2px;display:inline-block"
            >{{ pu }}</span
          >
          <span>m³</span>
        </div>
        <div
          style="width:80%;display:inline-block;float:left;margin-bottom:5px"
        >
          <el-progress :percentage="ordinaryPer" :color="not"></el-progress>
        </div>
        <span style="float:right;right:0;display:inline-block;"
          >{{ ordinaryPer }}%</span
        >
        <div style="clear:both"></div>
      </div>
      <div class="aside4">
        <div class="nav1">
          <span class="titLeft">用水趋势</span>
          <img src="../../assets/img/titRight.png" alt class="titRight" />
        </div>
        <div class="nav2">
          <div class="comTop">
            <button
              class="pointLeft monitorPoint"
              style="width:24%;float:right;margin-right: 9%"
              @click="demand"
            >
              查询
            </button>
          </div>
          <div style="clear:both"></div>
          <div class="comTop">
            <span class="monitorPoint">间隔选择</span>
            <select name="sel" v-model="timeIntervalValue">
              <option
                v-for="(item, index) in timeIntervaloptions"
                :key="index"
                :label="item.timeIntervalLabel"
                :value="item.timeIntervalValue"
              ></option>
            </select>
            <span class="monitorPoint1">设备选择</span>
            <select class="sel" v-model="deviceValue">
              <option
                v-for="(item, index) in deviceOptions"
                :key="index"
                :label="item.deviceLabel"
                :value="item.deviceValue"
              ></option>
            </select>
          </div>
          <div>
            <div v-if="timeIntervalValue == '日'" class="comTop">
              <span class="monitorPoint">时间选择</span>
              <select v-model="selectYear" class style="margin-right:4%">
                <option
                  v-for="(item, index) in selectYearList"
                  :value="item.value"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectMonth" class style="margin-right:4%">
                <option
                  v-for="(item, index) in selectMonthList"
                  :value="item.value1"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectDay" class style="margin-right:4%">
                <option
                  v-for="(item, index) in selectDayList"
                  :value="item.value2"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectYear1"
                class="comTop"
                style="margin-right:4%;margin-left:14%"
              >
                <option
                  v-for="(item, index) in selectYearList"
                  :value="item.value"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectMonth1"
                class="comTop"
                style="margin-right:4%"
              >
                <option
                  v-for="(item, index) in selectMonthList"
                  :value="item.value1"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectDay1"
                class="comTop"
                style="margin-right:4%"
              >
                <option
                  v-for="(item, index) in selectDayList"
                  :value="item.value2"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <div style="margin-top: -39px;left: 93.5%;position: absolute;">
                <div
                  style="width:12px;height:12px;background-color:#00ffff"
                ></div>
                <div
                  style="width:12px;height:12px;background-color:#22ac38;margin-top:15px"
                ></div>
              </div>
            </div>
            <div v-if="timeIntervalValue == '月'" class="comTop">
              <span class="monitorPoint">时间选择</span>
              <select v-model="selectYear" style="margin-right: 4%;">
                <option
                  v-for="(item, index) in selectYearList"
                  :value="item.value"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectMonth" style="margin-right: 4%;">
                <option
                  v-for="(item, index) in selectMonthList"
                  :value="item.value1"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectDay"
                class
                style="margin-right:4%;background-color:#363a3d;color:#909090"
                disabled="disabled"
              >
                <option
                  v-for="(item, index) in selectDayList"
                  :value="item.value2"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectYear1"
                style="margin-right: 4%;margin-left: 14%;"
                class="comTop"
              >
                <option
                  v-for="(item, index) in selectYearList"
                  :value="item.value"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select v-model="selectMonth1" style="margin-right: 4%;">
                <option
                  v-for="(item, index) in selectMonthList"
                  :value="item.value1"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectDay1"
                class="comTop"
                style="margin-right:4%;background-color:#363a3d;color:#909090"
                disabled="disabled"
              >
                <option
                  v-for="(item, index) in selectDayList"
                  :value="item.value2"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <div style="margin-top: -39px;left: 93.5%;position: absolute;">
                <div
                  style="width:12px;height:12px;background-color:#00ffff"
                ></div>
                <div
                  style="width:12px;height:12px;background-color:#22ac38;margin-top:15px"
                ></div>
              </div>
            </div>
            <div v-if="timeIntervalValue == '年'" class="comTop">
              <span class="monitorPoint">时间选择</span>
              <select v-model="selectYear" style="margin-right: 4%;">
                <option
                  v-for="(item, index) in selectYearList"
                  :value="item.value"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectMonth"
                style="margin-right:4%;background-color:#363a3d;color:#909090"
                disabled="disabled"
              >
                <option
                  v-for="(item, index) in selectMonthList"
                  :value="item.value1"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectDay"
                style="margin-right:4%;background-color:#363a3d;color:#909090"
                disabled="disabled"
              >
                <option
                  v-for="(item, index) in selectDayList"
                  :value="item.value2"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectYear1"
                class="comTop"
                style="margin-left: 14%;margin-right:4%;"
              >
                <option
                  v-for="(item, index) in selectYearList"
                  :value="item.value"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectMonth1"
                style="margin-right:4%;background-color:#363a3d;color:#909090"
                disabled="disabled"
              >
                <option
                  v-for="(item, index) in selectMonthList"
                  :value="item.value1"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <select
                v-model="selectDay1"
                class="comTop"
                style="margin-right:4%;background-color:#363a3d;color:#909090"
                disabled="disabled"
              >
                <option
                  v-for="(item, index) in selectDayList"
                  :value="item.value2"
                  :key="index"
                  >{{ item.label }}</option
                >
              </select>
              <div style="margin-top: -39px;left:93.5%;position: absolute;">
                <div
                  style="width:12px;height:12px;background-color:#00ffff"
                ></div>
                <div
                  style="width:12px;height:12px;background-color:#22ac38;margin-top:15px"
                ></div>
              </div>
            </div>
            <!-- <div style="float: right;margin-top: -39px;right:0">
              <div style="width:10px;height:10px;background-color:#00ffff"></div>
              <div style="width:10px;height:10px;background-color:#22ac38;margin-top:12px"></div>
            </div>-->
          </div>
          <p v-show="isChart" class="fail">访问数据失败!</p>
          <div class="rightChart">
            <span style="font-size:15px;margin-left:250px">0</span>
            <span>m³</span>
            <div
              style="width:12px;height:12px;background-color:#00ffff;display:inline-block;margin-left:20px"
            ></div>
            <span style="font-size:15px;margin-left:20px">0</span>
            <span>m³</span>
            <div
              style="width:12px;height:12px;background-color:#22ac38;margin-left:20px;display:inline-block;"
            ></div>
          </div>
          <div class="chart" id="myChart1"></div>
        </div>
      </div>
      <div class="aside5">
        <div class="nav1">
          <span class="titLeft">土壤墒情记录</span>
          <img src="../../assets/img/titRight.png" alt class="titRight" />
        </div>
        <div class="comTop" style="margin-top:5px">
          <span style="display: inline-block;width: 12%;margin-right:2%;"
            >监测点</span
          >
          <select
            v-model="soilDeviceValue"
            class
            style="margin-right:3%;width:18%"
          >
            <option
              v-for="(item, index) in soilOption"
              :value="item.deviceValue"
              :label="item.deviceLabel"
              :key="index"
              >{{ item.deviceLabel }}</option
            >
          </select>
          <select v-model="selectWarnYear1" style="margin-right: 3%;width:14%">
            <option
              v-for="(item, index) in selectYearList"
              :value="item.value"
              :key="index"
              >{{ item.label }}</option
            >
          </select>
          <select
            v-model="selectWarnMonth1"
            class
            style="margin-right:3%;width:14%"
          >
            <option
              v-for="(item, index) in selectMonthList"
              :value="item.value1"
              :key="index"
              >{{ item.label }}</option
            >
          </select>
          <select
            v-model="selectWarnDay1"
            class
            style="margin-right:3%;width:14%"
          >
            <option
              v-for="(item, index) in selectDayList"
              :value="item.value2"
              :key="index"
              >{{ item.label }}</option
            >
          </select>
          <button
            class="pointLeft monitorPoint"
            style="width: 14%;margin-left:0"
            @click="demand1"
          >
            查询
          </button>
        </div>
        <div class="comTop" style="display:flex;margin-top:5px;">
          <span style="flex:0.8;text-align:left">灌溉用水</span>
          <span style="flex:0.8;text-align:left">灌溉时长</span>
          <span style="flex:1.2;text-align:center">起末土壤墒情</span>
          <span style="flex:0.8;text-align:right">上升比例</span>
          <span style="flex:1.5;text-align:center">时间</span>
        </div>

        <div style="overflow-y:scroll;width:100%;height:150px" class="soilData">
          <p style="font-size: 20px;letter-spacing: 3px;margin-top: 10px;">
            暂无数据
          </p>
          <!-- <div class="comTop" style="display:flex;" v-for="(item, index) in soilData" :key="index">
            <span style="flex:0.8;text-align:left">{{ item.wateringNum }}</span>
            <span style="flex:0.8;text-align:left">{{ item.wateringTime }}</span>
            <span style="flex:1.2;text-align:center">{{ item.soilMoisture }}</span>
            <span style="flex:0.5;text-align:right">{{ item.riseRatio }}</span>
            <span style="flex:2;text-align:center">{{ item.createTime }}</span>
          </div>-->
        </div>
      </div>
    </div>
    <!-- 右侧操作板 -->
    <!-- <div class="rightside"> -->
    <div class="topside">
      <!-- <img src="../../assets/img/设置面板未点击时.png" alt class="set" @click="operationShow('分组管理')" />
      <img src="../../assets/img/ti.png" alt class="hint" @click="getHint" />
      <img src="../../assets/img/errIcon.png" alt class="err" @click="alarmShow('全部')" />-->

      <div
        style="width:100px;height:50px;position:relative;text-align:center;margin-bottom:10px"
        class="set"
        @click="getHint"
        v-show="isShow1"
      >
        <img
          src="../../assets/img/right1.png"
          alt
          style="width:100%;height:100%"
        />
        <span class="ti">灌溉提示</span>
      </div>
      <div
        style="width:100px;height:50px;position:relative;text-align:center;margin-bottom:10px"
        class="set"
        v-show="isShow11"
      >
        <img
          src="../../assets/img/right1.png"
          alt
          style="width:100%;height:100%"
        />
        <span
          class="ti"
          style="color:#00ffff;border-right: 3px solid #00ffff;padding-right:5px"
          >灌溉提示</span
        >
      </div>

      <div
        style="width:100px;height:50px;position:relative;text-align:center;margin-bottom:10px"
        class="set"
        v-show="isShow2"
        @click="operationShow('分组管理')"
      >
        <img
          src="../../assets/img/right1.png"
          alt
          style="width:100%;height:100%;"
        />
        <span class="ti">灌溉策略</span>
      </div>
      <div
        style="width:100px;height:50px;position:relative;text-align:center;margin-bottom:10px"
        class="set"
        v-show="isShow22"
      >
        <img
          src="../../assets/img/right1.png"
          alt
          style="width:100%;height:100%"
        />
        <span
          class="ti"
          style="color:#00ffff;border-right: 3px solid #00ffff;padding-right:5px"
          >灌溉策略</span
        >
      </div>

      <div
        style="width:100px;height:50px;position:relative;text-align:center;margin-bottom:10px"
        class="set"
        v-show="isShow3"
        @click="alarmShow('全部')"
      >
        <img
          src="../../assets/img/right1.png"
          alt
          style="width:100%;height:100%"
        />
        <span class="ti">告警信息</span>
      </div>
      <div
        style="width:100px;height:50px;position:relative;text-align:center;margin-bottom:10px"
        class="set"
        v-show="isShow33"
      >
        <img
          src="../../assets/img/right1.png"
          alt
          style="width:100%;height:100%"
        />
        <span
          class="ti"
          style="color:#00ffff;border-right: 3px solid #00ffff;padding-right:5px"
          >告警信息</span
        >
      </div>

      <operation v-show="operation"></operation>
      <alarm v-show="alarm"></alarm>
      <div class="hintBg" v-show="isShowHint">
        <img
          src="../../assets/img/关闭.png"
          alt
          style="width: 20px;height: 20px;right: 50;position: absolute;top: 0;right: 0;margin: 10px;"
          @click="closeHint"
        />
        <div style="line-height:30px;margin-top: 20px;">
          <span style="font-size: 15px;">正在灌溉：</span>
          <span v-if="hintCon == 1" style="float:right;color:#05e6e7"
            >没有正在执行的策略</span
          >
          <span v-if="hintCon == 0" style="float:right;color:#05e6e7">{{
            jobName
          }}</span>
        </div>
        <div style="line-height:30px">
          <span style="font-size: 15px;">开启的灌溉设备：</span>
          <span
            v-for="(item, index) in lampList1"
            :key="index"
            style="margin-right:10px"
            >{{ item.deviceName }}</span
          >
        </div>
        <div style="line-height:30px">
          <span style="font-size: 15px;">灌溉水表状态：</span>
          <span :key="index" style="float:right;">正常</span>
        </div>
        <div style="line-height:30px">
          <span style="font-size: 15px;">策略结束时间：</span>
          <span :key="index" style="float:right;">{{ hintTime }}</span>
        </div>
        <div style="line-height:30px">
          <span style="font-size: 15px;">策略组剩余时间：</span>
          <span :key="index" style="float:right;">{{ hintNum }}分</span>
        </div>
        <div style="line-height:30px">
          <span style="font-size: 15px;">策略开启状态：</span>
          <span style="color:#03e405;float:right;" v-if="status == 1"
            >安全策略已经开启</span
          >
          <span style="color:#ff0000;float:right;" v-if="status == 2"
            >安全策略已经关闭</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import operation from "./operation";
import alarm from "./alarm";
export default {
  components: {
    operation,
    alarm
  },
  data() {
    return {
      a: [],
      center: { lng: 0, lat: 0 },
      zoom: 5,
      // 控制子组件显示
      operation: false,
      alarm: false,
      tag: "",
      timeIntervaloptions: [
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
      timeIntervalValue: "日",
      waterTypeList: [
        { label: "全部", value: "10" },
        { label: "普通灌溉区", value: "1" },
        { label: "智能灌溉区", value: "2" }
      ],
      value: "10",
      selectYearList: [
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" }
      ],
      selectMonthList: [
        { value1: "1", label: "1" },
        { value1: "2", label: "2" },
        { value1: "3", label: "3" },
        { value1: "4", label: "4" },
        { value1: "5", label: "5" },
        { value1: "6", label: "6" },
        { value1: "7", label: "7" },
        { value1: "8", label: "8" },
        { value1: "9", label: "9" },
        { value1: "10", label: "10" },
        { value1: "11", label: "11" },
        { value1: "12", label: "12" }
      ],
      selectDayList: [
        { value2: "1", label: "1" },
        { value2: "2", label: "2" },
        { value2: "3", label: "3" },
        { value2: "4", label: "4" },
        { value2: "5", label: "5" },
        { value2: "6", label: "6" },
        { value2: "7", label: "7" },
        { value2: "8", label: "8" },
        { value2: "9", label: "9" },
        { value2: "10", label: "10" },
        { value2: "11", label: "11" },
        { value2: "12", label: "12" },
        { value2: "13", label: "13" },
        { value2: "14", label: "14" },
        { value2: "15", label: "15" },
        { value2: "16", label: "16" },
        { value2: "17", label: "17" },
        { value2: "18", label: "18" },
        { value2: "19", label: "19" },
        { value2: "20", label: "20" },
        { value2: "21", label: "21" },
        { value2: "22", label: "22" },
        { value2: "23", label: "23" },
        { value2: "24", label: "24" },
        { value2: "25", label: "25" },
        { value2: "26", label: "26" },
        { value2: "27", label: "27" },
        { value2: "28", label: "28" },
        { value2: "29", label: "29" },
        { value2: "30", label: "30" },
        { value2: "31", label: "31" }
      ],
      selectYear: new Date().getFullYear(),
      selectMonth: 1,
      selectDay: 1,
      selectYear1: new Date().getFullYear(),
      selectMonth1: new Date().getMonth() + 1,
      selectDay1: new Date().getDate(),
      selectWarnYear1: "2019",
      selectWarnMonth1: "11",
      selectWarnDay1: "11",
      deviceOptions: [
        {
          deviceValue: "监测点1",
          deviceLabel: "监测点1"
        },
        {
          deviceValue: "监测点2",
          deviceLabel: "监测点2"
        }
      ],
      deviceValue: "监测点1",
      soilOption: [
        {
          soilDeviceValue: "监测点1",
          soilDeviceLabel: "监测点1"
        }
      ],
      soilDeviceValue: "",
      zhi: 0,
      pu: 0,
      zhiPro: 0,
      puPro: 0,
      irrList: [],
      thisNum1: 0,
      thisNum2: 0,
      thisNum3: 0,
      economize3: 0,
      money3: 0,
      markers: [],
      total: 0,
      lastMonth: 0,
      economizeWater: 0,
      economizeMoney: 0,
      irrGroupId: "",
      waterStartChartData: [],
      waterStartCreatTime: [],
      waterStartTypeNum: [],
      waterEndChartData: [],
      waterEndCreatTime: [],
      waterEndTypeNum: [],
      soilData: [],
      wateringNum: "",
      wateringTime: "",
      soilMoisture: "",
      riseRatio: "",
      createTime: "",
      markLocation: [],
      markLocation1: [],
      showFlag: false,
      showFlag1: false,
      loading: true,
      activeName: "first",
      mapOptions: [
        {
          mapValue: "年",
          mapLabel: "年"
        },
        {
          mapValue: "月",
          mapLabel: "月"
        },
        {
          mapValue: "日",
          mapLabel: "日"
        }
      ],
      mapValue: "日",
      mapYear: "2020",
      mapMonth: "03",
      mapDay: "03",
      mapYear1: "2020",
      mapMonth1: "03",
      mapDay1: "05",
      mapDeviceId: "",
      xData: [],
      xMapData: [],
      mapChartData: [],
      mapStartTime: [],
      mapStartNum: [],
      mapStartChartData: [],
      mapEndChartData: [],
      mapEndTime: [],
      mapEndNum: [],
      hintCon: "",
      lampList1: [],
      hintNum: "",
      hintTime: "",
      jobName: "",
      isShowHint: false,
      status: "",
      index: "",
      markers1: [],
      soilList: [],
      onLine: "#1ebd77",
      not: "#00a5bd",
      onLinePer: 0,
      notPer: 0,
      smartPer: 0,
      ordinaryPer: 0,
      mon: "#ffae11",
      isShow1: true,
      isShow11: false,
      isShow2: true,
      isShow22: false,
      isShow3: true,
      isShow33: false,
      irrNum: 0,
      soilNum: 0,
      zongNum: 0,
      irrLine: 0,
      soilLine: 0,
      onlineNum: 0,
      irrNot: 0,
      soilNot: 0,
      notLineNum: 0,
      isChart: false
    };
  },
  created() {
    this.getMeter();
    // this.getMeter1();
    this.getLamp();
    this.demand();
    this.demand1();
    this.getSoilData();
  },
  // mounted() {
  //   // this.mapDemand();
  // },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.678131;
      this.center.lat = 39.993762;
      this.zoom = 22;
      let mapStyle = { style: "midnight" };
      map.setMapStyle(mapStyle);
    },
    getMsg(data) {
      this.irrGroupId = data;
      console.log(this.irrGroupId);
    },
    // 控制子组件显示
    operationShow(name) {
      this.operation = true;
      this.alarm = false;
      this.isShow1 = true;
      this.isShow11 = false;
      this.isShow2 = false;
      this.isShow22 = true;
      this.isShow3 = true;
      this.isShow33 = false;
      this.isShowHint = false;

      this.tag - name;
      this.$router.push("/Ipartition");
    },
    alarmShow(name) {
      this.operation = false;
      this.alarm = true;
      this.isShow1 = true;
      this.isShow11 = false;
      this.isShow2 = true;
      this.isShow22 = false;
      this.isShow3 = false;
      this.isShow33 = true;
      this.isShowHint = false;
      this.tag - name;
      this.$router.push("/Iall");
    },
    // 获取所有水表
    getLamp() {
      this.$axios({
        method: "get",
        url: "/irrigation/water/all"
      }).then(res => {
        console.log(res);
        var DeviceIdList = []; // eslint-disable-line no-unused-vars
        var deviceList = res.data.data;
        this.irrList = res.data.data;
        this.irrNum = res.data.data.length;
        this.deviceValue = deviceList[0].deviceId;
        for (var i = 0; i < deviceList.length; i++) {
          DeviceIdList.push({
            deviceValue: deviceList[i].deviceId,
            deviceLabel: deviceList[i].deviceName
          });
          this.deviceOptions = [...DeviceIdList];
          this.markers.push({
            lng: deviceList[i].longitude,
            lat: deviceList[i].latitude,
            deviceId: deviceList[i].deviceId,
            status: deviceList[i].status,
            isOPen: deviceList[i].isOPen
          });
          console.log(this.markers);
          // if (deviceList[i].status == 1) {
          //   this.irrLine = deviceList[i].length;
          // } else if (deviceList[i].status == 0) {
          //   this.irrNot = deviceList[i].length;
          // }
          this.irrLine = deviceList.filter(ele => ele.status == 1).length;
          this.irrNot = deviceList.filter(ele => ele.status == 0).length;
          console.log(this.irrLine);
          console.log(this.irrNot);
        }
        this.getSoilData();
      });
    },
    getMeter() {
      this.$axios({
        method: "get",
        url: "/irrigation/data/getMeter",
        params: {
          type: "1"
        }
      }).then(res => {
        console.log(res);
        var data = res.data.data[0];
        this.economizeWater = data.economize;
        this.economizeMoney = data.money.toFixed(2);
        this.total = data.thisNum;
        console.log(this.total);
        this.zhi = res.data.data[0].thisNum;
        this.getMeter1();
      });
    },
    getMeter1() {
      this.$axios({
        method: "get",
        url: "/irrigation/data/getMeter",
        params: {
          type: "2"
        }
      }).then(res => {
        console.log(res);
        var data1 = res.data.data[0];
        var data2 = res.data.data[0];
        var thisNum1 = data1.thisNum;
        var economize1 = data1.economize;
        var money1 = data1.money;

        var thisNum2 = data2.thisNum;
        var economize2 = data2.economize;
        var money2 = data2.money;

        this.economize3 = economize1 + economize2;
        this.money3 = money1 + money2;
        this.thisNum3 = thisNum1 + thisNum2;
        this.thisNum1 = thisNum1;
        this.thisNum2 = thisNum2;

        this.pu = res.data.data[0].thisNum;
        this.smartPer = (this.zhi / (this.zhi + this.pu)) * 100;
        this.ordinaryPer = (this.pu / (this.zhi + this.pu)) * 100;
      });
    },
    demand() {
      var that = this;
      var startTime = "";
      var endTime = "";
      var timeType = "";
      if (that.timeIntervalValue == "日") {
        timeType = 3;
        startTime =
          that.selectYear + "-" + that.selectMonth + "-" + that.selectDay;
        endTime =
          that.selectYear1 + "-" + that.selectMonth1 + "-" + that.selectDay1;
      } else if (that.timeIntervalValue == "月") {
        timeType = 2;
        startTime = that.selectYear + "-" + that.selectMonth;
        endTime = that.selectYear1 + "-" + that.selectMonth1;
      } else if (that.timeIntervalValue == "年") {
        timeType = 1;
        startTime = that.selectYear;
        endTime = that.selectYear1;
      }
      let param = {
        // deviceId: that.deviceValue,
        deviceType: that.value,
        startTime: startTime,
        endTime: endTime,
        timeType: timeType
      };
      console.log(param);
      this.$axios({
        method: "get",
        url: "/irrigation/data/getChart",
        params: param
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          // 开始
          that.waterStartChartData = res.data.data.list;
          that.waterStartCreatTime = [];
          that.waterStartTypeNum = [];
          for (var i = 0; i < that.waterStartChartData.length; i++) {
            that.waterStartCreatTime[i] =
              that.waterStartChartData[i].createTime;
            that.waterStartTypeNum[i] = that.waterStartChartData[i].thisNum;
          }

          console.log(that.waterStartCreatTime);
          console.log(that.waterStartTypeNum);
          // 结束
          that.waterEndChartData = res.data.data.contrastList;
          that.waterEndCreatTime = [];
          that.waterEndTypeNum = [];
          for (var j = 0; j < that.waterEndChartData.length; j++) {
            that.waterEndCreatTime[j] = that.waterEndChartData[j].createTime;
            that.waterEndTypeNum[j] = that.waterEndChartData[j].thisNum;
          }
          console.log(that.waterEndCreatTime);
          console.log(that.waterEndTypeNum);
          that.drawChart();
        } else {
          this.isChart = true;
        }
      });
    },
    drawChart() {
      let that = this;
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      console.log(that.waterStartTypeNum);
      console.log(that.timeIntervalValue);
      if (that.timeIntervalValue == "日") {
        that.xData = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24"
        ];
      } else if (that.timeIntervalValue == "月") {
        that.xData = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31"
        ];
      } else if (that.timeIntervalValue == "年") {
        that.xData = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12"
        ];
      }
      console.log(that.xData);
      var options = {
        grid: {
          y: 10,
          height: 80,
          y2: 20
        },
        xAxis: {
          type: "category",
          data: that.xData,
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
            data: that.waterStartTypeNum,
            // data: 0,
            type: "line",
            color: "#00ffff",
            lineStyle: {
              color: "#00ffff"
            }
          },
          {
            data: that.waterEndTypeNum,
            // data: 1,
            type: "line",
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
    // 水表信息
    infoWindowOpen(marker) {
      console.log(marker.deviceId);
      this.mapDeviceId = marker.deviceId;
      this.showFlag = true;
      this.showFlag1 = false;
      console.log(this.showFlag);
      console.log(this.showFlag1);
      this.loading = true;
      if (this.showFlag == true) {
        this.$axios({
          method: "get",
          url: "/irrigation/water/getWaterData",
          params: {
            deviceId: marker.deviceId
          }
        }).then(res => {
          console.log(res);
          this.markLocation = res.data.data;
          console.log(this.markLocation);
          // for (var i = 0; i < this.irrList.length; i++) {
          //   console.log(this.markLocation.deviceId);
          //   if (this.irrList[i].deviceId == this.markLocation.deviceId) {
          //     this.markLocation.lat = this.irrList[i].latitude;
          //     this.markLocation.lng = this.irrList[i].longitude;
          //   }
          // }
        });
      }
    },
    closeDevice(deviceId) {
      this.$axios({
        method: "post",
        url: "/irrigation/water/close",
        params: {
          deviceId
        }
      }).then(res => {
        console.log(res);
        if (res.data.code.data == 0) {
          this.$message({
            message: res.data.data.msg,
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.data.msg,
            type: "success"
          });
        }
      });
    },
    openDevice(deviceId) {
      this.$axios({
        method: "post",
        url: "/irrigation/water/open",
        params: {
          deviceId
        }
      }).then(res => {
        console.log(res);
        if (res.data.code.data == 0) {
          this.$message({
            message: res.data.data.msg,
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.data.msg,
            type: "success"
          });
        }
      });
    },
    getByGroup(groupId) {
      this.$axios({
        method: "get",
        url: "/irrigation/group/ByGroup",
        params: {
          groupId
        }
      }).then(res => {
        console.log(res);
      });
    },
    demand1() {
      this.$axios({
        method: "get",
        url: "/irrigation/data/getMoisture",
        params: {
          deviceId: 7
        }
      }).then(res => {
        console.log(res);
        this.soilData = res.data.data;
        // this.wateringNum = data.wateringNum;
        // this.wateringTime = data.wateringTime;
        // this.soilMoisture = data.soilMoisture;
        // this.riseRatio = data.riseRatio;
        // this.createTime = data.createTime;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.index == 1) {
        this.mapDemand();
      }
    },
    mapDemand() {
      var that = this;
      var startTime = "";
      var endTime = "";
      var timeType = "";
      if (that.mapValue == "日") {
        timeType = 3;
        startTime = that.mapYear + "-" + that.mapMonth + "-" + that.mapDay;
        endTime = that.mapYear1 + "-" + that.mapMonth1 + "-" + that.mapDay1;
      } else if (that.mapValue == "月") {
        timeType = 2;
        startTime = that.mapYear + "-" + that.mapMonth;
        endTime = that.mapYear1 + "-" + that.mapMonth1;
      } else if (that.mapValue == "年") {
        timeType = 1;
        startTime = that.mapYear;
        endTime = that.mapYear1;
      }
      console.log(startTime);
      console.log(endTime);
      console.log(that.mapDeviceId);
      let param = {
        startTime: startTime,
        endTime: endTime,
        deviceId: that.mapDeviceId,
        timeType: timeType
      };
      this.$axios({
        method: "get",
        url: "/irrigation/data/getChart",
        params: param
      }).then(res => {
        console.log(res);
        // 开始
        that.waterStartChartData = res.data.data.list;
        that.mapStartTime = [];
        that.mapStartNum = [];
        for (var i = 0; i < that.waterStartChartData.length; i++) {
          that.mapStartTime[i] = that.waterStartChartData[i].createTime;
          that.mapStartNum[i] = that.waterStartChartData[i].thisNum;
        }

        console.log(that.mapStartTime);
        console.log(that.mapStartNum);
        // 结束
        that.waterEndChartData = res.data.data.contrastList;
        that.mapEndTime = [];
        that.mapEndNum = [];
        for (var j = 0; j < that.waterEndChartData.length; j++) {
          that.mapEndTime[j] = that.waterEndChartData[j].createTime;
          that.mapEndNum[j] = that.waterEndChartData[j].thisNum;
        }
        console.log(that.mapEndTime);
        console.log(that.mapEndNum);
        that.mapDrawChart();
      });
    },
    mapDrawChart() {
      let that = this;
      let mapChart = that.$echarts.init(document.getElementById("mapChart"));
      console.log(mapChart);
      if (that.mapValue == "日") {
        that.xMapData = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24"
        ];
      } else if (that.mapValue == "月") {
        that.xMapData = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31"
        ];
      } else if (that.mapValue == "年") {
        that.xMapData = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12"
        ];
      }
      console.log(that.mapValue);
      console.log(that.xMapData);
      console.log(that.mapStartNum);
      console.log(that.mapEndNum);
      // try {
      //   mapChart.setOption(options);
      // } catch (err) {
      //   console.log(err);
      // }
      var mapOption = {
        grid: {
          y: 10,
          height: 80,
          y2: 20
        },
        xAxis: {
          type: "category",
          data: that.xMapData,
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
            data: that.mapStartNum,
            // data: 0,
            type: "line",
            smooth: true,
            color: "#00ffff",
            lineStyle: {
              color: "#00ffff"
            }
          },
          {
            data: that.mapEndNum,
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
        mapChart.setOption(mapOption);
      } catch (err) {
        console.log(err);
      }
    },
    getHint() {
      this.isShowHint = "true";
      this.operation = false;
      this.alarm = false;
      this.isShow1 = false;
      this.isShow11 = true;
      this.isShow2 = true;
      this.isShow22 = false;
      this.isShow3 = true;
      this.isShow33 = false;

      this.$axios({
        method: "get",
        url: "/irrigation/strategy/getRunDate"
      }).then(res => {
        console.log(res);
        this.hintCon = res.data.code;
        var data = res.data.data;
        var groupId = "";
        var strategyId = "";
        if (res.data.code == 0) {
          for (var i = 0; i < data.length; i++) {
            this.hintNum = data[i].thisNum;
            this.hintTime = data[i].endHms;
            this.jobName = data[i].jobName;
            groupId = data[i].groupId;
            strategyId = data[i].strategyId;
          }
          this.$axios({
            method: "get",
            url: "/irrigation/group/ByGroup",
            params: {
              groupId
            }
          }).then(res => {
            console.log(res);
            this.lampList1 = res.data.data;
          });

          this.$axios({
            method: "get",
            url: "/irrigation/strategy/getByDis",
            params: {
              strategyId
            }
          }).then(res => {
            console.log(res);
            this.status = res.data.status;
          });
        }
      });
    },
    closeHint() {
      this.isShowHint = false;
      console.log(111);
    },
    // 获取土壤点位
    getSoilData() {
      this.$axios({
        method: "get",
        url: "/irrigation/soil/list"
      }).then(res => {
        console.log(res);
        var DeviceIdList = []; // eslint-disable-line no-unused-vars
        var deviceList = res.data.data;
        this.soilList = res.data.data;
        for (var i = 0; i < deviceList.length; i++) {
          // DeviceIdList.push({
          //   deviceValue: deviceList[i].deviceId,
          //   deviceLabel: deviceList[i].name,
          //   lng: deviceList[i].longitude,
          //   lat: deviceList[i].latitude,
          //   status: deviceList[i].status
          // });
          // this.soilOption = [...DeviceIdList];
          // this.soilDeviceValue = DeviceIdList[0].deviceValue;

          console.log(this.markers1);

          this.markers1.push({
            lng: deviceList[i].longitude,
            lat: deviceList[i].latitude,
            status: deviceList[i].status,
            deviceId: deviceList[i].deviceId,
            name: deviceList[i].name
          });
          console.log(this.markers1);
          this.soilNum = res.data.data.length;
          this.zongNum = this.irrNum + this.soilNum;
          this.soilLine = deviceList.filter(ele => ele.status == 1).length;
          this.soilNot = deviceList.filter(ele => ele.status == 0).length;
          this.onlineNum = this.irrLine + this.soilLine;
          this.notLineNum = this.irrNot + this.soilNot;
          this.onLinePer = (this.onlineNum / this.zongNum) * 100;
          this.notPer = (this.notLineNum / this.zongNum) * 100;
        }
        console.log(deviceList.length);
        console.log(this.markers1);
      });
    },
    // 土壤点位信息
    infoWindowOpen1(marker, name) {
      console.log(111);
      console.log(marker);
      console.log(name);
      this.showFlag = false;
      this.showFlag1 = true;
      this.$axios({
        method: "get",
        url: "/irrigation/soil/getById",
        params: {
          deviceId: marker.deviceId
        }
      }).then(res => {
        console.log(res);
        this.markLocation1 = res.data.data;
        console.log(this.markLocation1);
      });
    },
    infoWindowOpen2(marker, name) {
      console.log(111);
      console.log(marker);
      console.log(name);
      this.showFlag = false;
      this.showFlag1 = true;
      this.$axios({
        method: "get",
        url: "/irrigation/soil/getById",
        params: {
          deviceId: marker.deviceId
        }
      }).then(res => {
        console.log(res);
        this.markLocation1 = res.data.data;
        console.log(this.markLocation1);
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.BMap_cpyCtrl {
  display: none !important;
}
/deep/.anchorBL {
  display: none !important;
}
.baidumap {
  z-index: 999;
}
/deep/.el-progress-circle {
  height: 60px !important;
  width: 60px !important;
}
/deep/.el-progress-circle:nth-last-child(1) {
  margin-right: 0px !important;
}
/deep/.el-progress__text {
  display: none;
}
/deep/.el-progress-bar__outer {
  width: 145% !important;
}
/deep/.el-progress-bar__outer {
  height: 3px !important;
}
.illumination {
  // display: flex;
  // font-size: 12px;
  // background-image: url("../../assets/img/bg.jpg");
  // background-size: 100%;
  // background-repeat: no-repeat;
  // overflow: hidden;
  // width: 1920px;
  // height: 1080px;

  // /deep/.el-progress-bar {
  //   width: 93% !important;
  // }
  .sel::-webkit-scrollbar {
    display: none;
  }
  .soilData::-webkit-scrollbar {
    display: none;
  }
  .chart {
    width: 99%;
    height: 120px;
    margin-top: 15px;
    padding-top: 20px;
    background-color: #000000;
    opacity: 0.5;
  }
  // 左侧面板
  .leftside::-webkit-scrollbar {
    display: none;
  }
  .leftside {
    width: 408px;
    // height: 976px;
    height: 93vh;
    background-image: url("../../assets/img/leftPanel.png");
    background-size: 100% 100%;
    position: absolute;
    margin: 20px 20px 0 20px;
    color: #fff;
    padding: 10px 20px 10px 20px;
    z-index: 1;
    overflow: scroll;
    .nav1 {
      width: 100%;
      height: 20px;
      box-sizing: border-box;
      .titLeft {
        font-size: 18px;
        letter-spacing: 2px;
        color: #00ccee;
        vertical-align: middle;
        margin-right: 3px;
      }
      .titRight {
        width: 40px;
        height: 20px;
        vertical-align: middle;
      }
    }
    .comTop {
      // font-size: 13px;
      // letter-spacing: 2px;
    }
    .monitorPoint {
      display: inline-block;
      width: 14%;
    }
    .pointLeft {
      margin-left: 4.7%;
      background-color: #1e1e1e;
      border: none;
      color: #ffffff;
      border-radius: 5px;
      height: 22px;
      font-size: 12px;
      line-height: 20px;
    }
    .monitorPoint1 {
      display: inline-block;
      width: 21.5%;
      margin-left: 4.5%;
      padding-left: 1%;
    }
    .sel {
      margin-left: 4%;
    }
    .comTop {
      margin-top: 5px;
      position: relative;
    }
    /deep/.el-progress-bar {
      width: 93% !important;
    }
    .sel::-webkit-scrollbar {
      display: none;
    }
    .soilData::-webkit-scrollbar {
      display: none;
    }
    /deep/select::-webkit-scrollbar {
      display: none;
    }
    // .chart {
    //   width: 99%;
    //   height: 120px;
    //   margin-top: 15px;
    //   padding-top: 25px;
    // }
    .cir {
      width: 60px;
      text-align: center;
      float: left;
      p :nth-child(1) {
      }
    }
    .aside1 {
      width: 100%;
      .nav1 {
        width: 100%;
        height: 20px;
        box-sizing: border-box;
        .titLeft {
          font-size: 18px;
          letter-spacing: 2px;
          color: #00ccee;
          vertical-align: middle;
          margin-right: 3px;
        }
        .titRight {
          width: 40px;
          height: 20px;
          vertical-align: middle;
        }
      }
      .nav2 {
        width: 100%;
        height: 60px;
        margin-top: 12px;
        .nav2Left {
          width: 40%;
          height: 100%;
          background-image: url("../../assets/img/leftNavBg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          float: left;
          .tit {
            margin-left: 56px;
            margin-top: 30px;
            display: inline-block;
            color: #17fcc9;
            font-size: 14px;
          }
          .num {
            font-size: 26px;
            color: #17fcc9;
          }
        }
        .nav2Right {
          display: flex;
          justify-content: space-between;
          padding-top: 5px;
          width: 150px;
          float: right;
          div {
            display: flex;
            flex-direction: column;
          }
        }
      }
      .nav3 {
        width: 100%;
        height: 35px;
        // background-color: red;
        margin-top: 12px;
        font-size: 13px;
        letter-spacing: 1px;
        .onLine {
          width: 49%;
          margin-right: 1%;
          display: inline-block;
          color: #16fccc;
        }
        .not {
          width: 49%;
          display: inline-block;
          color: #00d7fd;
        }
      }
    }
    .aside2 {
      width: 100%;
      .nav2 {
        margin-top: 15px;
      }
      .nav3 p {
        line-height: 25px;
        span:nth-child(1) {
          font-size: 15px;
        }
        span:nth-child(2) {
          span:nth-child(1) {
            margin-right: 5px;
            font-size: 15px;
          }
        }
      }
    }
    .aside3 {
      width: 100%;
      margin-bottom: 5px;
      .nav1 {
        margin-top: 5px;
      }
      .nav2 {
        margin-top: 10px;
        span:nth-child(1) {
          font-size: 15px;
          margin-right: 20%;
        }
        span:nth-child(2) {
          font-size: 15px;
          margin-right: 10px;
        }
      }
    }
    .aside4 {
      width: 100%;
      margin-bottom: 5px;
    }
    .aside5 {
      width: 100%;
      margin-bottom: 5px;
    }
  }

  // 右侧内容
  .topside {
    height: 740px;
    margin-left: 650px;
    // position: absolute;
    .ti {
      color: rgb(255, 255, 255);
      position: absolute;
      left: 15%;
      // margin-left: 1200px;
      text-align: center;
      line-height: 50px;
      font-size: 15px;
      letter-spacing: 4px;
    }
    .set {
      position: absolute;
      top: 40px;
      right: 150px;
      opacity: 0.5;
      margin-left: 1270px;
      width: 50px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .hintBg {
      background-image: url("../../assets/img/tiCon.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: 40px;
      float: right;
      right: 155px;
      width: 300px;
      padding: 20px;
      color: #c0bfbf;
      letter-spacing: 2px;
    }
    .hint {
      position: absolute;
      top: 50px;
      margin-left: 1270px;
      width: 35px;
    }
    .err {
      position: absolute;
      top: 50px;
      margin-left: 1330px;
      width: 35px;
    }
  }
  .botside {
    color: #fff;
    font-size: 14px;
    display: flex;

    .warn {
      width: 340px;
      height: 130px;
      background: url("../../assets/img/error.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;

      span {
        margin-top: 7px;
        margin-left: 15px;
      }

      span:nth-child(1) {
        margin-top: 20px;
        width: 50px;
        text-align: center;
        background: url("../../assets/img/err.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
.fail {
  text-align: center;
  margin-top: 62px;
  position: absolute;
  margin-left: 29%;
  font-size: 18px;
  letter-spacing: 4px;
}
.rightChart {
  width: 100%;
  margin-top: 20px;
  position: absolute;
  right: 0;
  // font-size: 18px;
  letter-spacing: 4px;
  z-index: 999;
}
</style>
