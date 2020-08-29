<template>
  <div class="message">
    <div class="bod">
      <!-- 左侧信息区域 -->
      <div class="mess">
        <!-- 头部 -->
        <div class="title">
          <span>设备数据</span>
          <span>POWER DATE</span>
        </div>

        <div class="left2">
          <div class="logo">
            <div>{{ num.total }}</div>
            <div>终端设备(个)</div>
          </div>
          <div class="you">
            <div>
              <span style="font-size: 24px;">{{ num.total }}</span>
              <span>设备总数</span>
            </div>
            <div>
              <span style="font-size: 24px;"
                >{{ ((num.onLine / num.total) * 100).toFixed(1) }}%</span
              >
              <span>在线率</span>
            </div>
          </div>
        </div>
        <div class="left3">
          <div class="top">
            <div>
              <span style="color:#1afe98">在线：{{ num.onLine }}</span>
              <span class="skyblue"></span>
            </div>
            <div>
              <span style="color:#1cdefe">离线：{{ num.offLine }}</span>
              <span class="blue"></span>
            </div>
            <div>
              <span style="color:#fdcd04">故障：0</span>
              <span class="yellow"></span>
            </div>
          </div>
          <div class="but">
            <div style="color:#1afe98">开启数量：{{ num.playLine }}</div>
            <div></div>
          </div>
        </div>
        <div class="title" style="margin: 20px 0">
          <span>当前工作日志</span>
          <span>POWER DATE</span>
        </div>
        <div class="left5">
          <div class="title2">
            <span style="flex: 15%;">姓名</span>
            <span>开启日期</span>
            <span>时间区间</span>
            <span style="flex: 15%;">时长</span>
          </div>
          <div class="scroll">
            <div
              class="text"
              v-for="(item, index) in speakLogList"
              :key="index"
            >
              <span style="flex: 15%;">admin</span>
              <span>{{ item.startTime.substring(0, 10) }}</span>
              <span
                >{{ item.startTime.substring(11, 19) }} -
                {{ item.endTime.substring(11, 19) }}</span
              >
              <span style="flex: 15%;">{{ item.lastTime }}s</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧数据区域 -->
      <div class="ri">
        <div class="topside">
          <div class="left">
            <operation v-if="operation"></operation>
            <warn v-if="warn"></warn>
          </div>
          <div class="right">
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
      num: "",
      tag: "",
      speakLogList: []
    };
  },
  methods: {
    // 控制子组件显示
    operationShow() {
      this.operation = !this.operation;
      this.warn = false;
      this.$router.push("/music");
      this.tag = "操作面板";
    },
    warnShow() {
      this.warn = !this.warn;
      this.operation = false;
      this.$router.push("/Mall");
      this.tag = "告警记录";
    },

    // 设备数量统计
    getnum() {
      this.$axios({
        method: "get",
        url: "/loudspeaker/sound/statistics"
      }).then(res => {
        // console.log(res);
        this.num = res.data.data;
      });
    },

    // 寻呼日志记录
    getSpeakLog() {
      this.$axios({
        method: "get",
        url: "/loudspeaker/speakLog/page",
        params: {
          size: 500
        }
      }).then(res => {
        console.log(res);
        this.speakLogList = res.data.data.records;
      });
    }
  },
  created() {
    this.getnum();
    this.getSpeakLog();
  }
};
</script>

<style src="../../style/message/message.css" scoped></style>
