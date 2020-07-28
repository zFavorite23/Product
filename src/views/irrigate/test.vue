<template>
  <div class="message">
    <div class="bod">
      <!-- 左侧信息区域 -->
      <div class="mess">
        <div class="left1">
          <span class="title_1">设备管理</span>
          <span>POWER DATE</span>
        </div>
        <div class="left2">
          <div class="logo">
            <div>132</div>
            <div>终端设备(个)</div>
          </div>
          <div class="you">
            <div>
              <span style="font-size: 24px;">1360</span>
              <span>设备总数</span>
            </div>
            <div>
              <span style="font-size: 24px;">950</span>
              <span>在线数量</span>
            </div>
          </div>
        </div>
        <div class="left3">
          <div class="top">
            <div>
              <span style="color:#1afe98">在线：3</span>
              <span class="skyblue"></span>
            </div>
            <div>
              <span style="color:#1cdefe">离线：1</span>
              <span class="blue"></span>
            </div>
            <div>
              <span style="color:#fdcd04">故障：1</span>
              <span class="yellow"></span>
            </div>
          </div>
          <div class="but">
            <div style="color:#1afe98">开启数量：3</div>
            <div></div>
          </div>
        </div>
        <div class="left4">
          <span class="title_1">当前工作日志</span>
          <span>POWER DATE</span>
        </div>
        <div class="left5">
          <div class="title">
            <span>姓名</span>
            <span>事件</span>
            <span>时间</span>
            <span>次数</span>
          </div>
          <div class="from">
            <span>张三</span>
            <span>实时</span>
            <span>17:15</span>
            <span>1</span>
          </div>
          <div class="from">
            <span>张三</span>
            <span>实时</span>
            <span>17:15</span>
            <span>1</span>
          </div>
          <div class="from">
            <span>张三</span>
            <span>实时</span>
            <span>17:15</span>
            <span>1</span>
          </div>
          <div class="from">
            <span>张三</span>
            <span>实时</span>
            <span>17:15</span>
            <span>1</span>
          </div>
          <div class="from">
            <span>张三</span>
            <span>实时</span>
            <span>17:15</span>
            <span>1</span>
          </div>
          <div class="from">
            <span>张三</span>
            <span>实时</span>
            <span>17:15</span>
            <span>1</span>
          </div>
        </div>
      </div>
      <!-- 设置图标 -->
      <div class="icon" @click="isShow()">
        <img src="../../assets/img/设置面板未点击时.png" alt />
      </div>
      <!-- 右侧数据区域 -->
      <div class="ri">
        <div class="content">
          <!-- tab切换栏 -->
          <div class="data" v-if="show">
            <div class="tab">
              <div class="nav">
                <router-link to="/music">
                  <div
                    @click="tag = '音乐管理'"
                    :class="{ hover: tag == '音乐管理' }"
                  >
                    音乐管理
                  </div>
                </router-link>
                <router-link to="/grouping">
                  <div
                    @click="tag = '分组管理'"
                    :class="{ hover: tag == '分组管理' }"
                  >
                    分组管理
                  </div>
                </router-link>
                <router-link to="/pattern">
                  <div
                    @click="tag = '模式管理'"
                    :class="{ hover: tag == '模式管理' }"
                  >
                    模式管理
                  </div>
                </router-link>
                <router-link to="/matching">
                  <div
                    @click="tag = '匹配管理'"
                    :class="{ hover: tag == '匹配管理' }"
                  >
                    匹配管理
                  </div>
                </router-link>
                <router-link to="/paging">
                  <div
                    @click="tag = '实时寻呼'"
                    :class="{ hover: tag == '实时寻呼' }"
                  >
                    实时寻呼
                  </div>
                </router-link>
              </div>
              <div class="close" @click="onIsShow">
                <img src="../../assets/img/关闭.png" alt />
              </div>
            </div>
            <!-- 内容区域 -->
            <div class="bot">
              <router-view></router-view>
            </div>
          </div>
        </div>
        <!-- 警告区域 -->
        <div class="bot">
          <div class="warn">
            <span>告警</span>
            <span>故障信息：#15 配电箱</span>
            <span>故障原因：设备功率异常</span>
            <span>解决建议：请及时排查</span>
          </div>
          <div class="warn">
            <span>告警</span>
            <span>故障信息：#15 配电箱</span>
            <span>故障原因：设备功率异常</span>
            <span>解决建议：请及时排查</span>
          </div>
          <div class="warn">
            <span>告警</span>
            <span>故障信息：#15 配电箱</span>
            <span>故障原因：设备功率异常</span>
            <span>解决建议：请及时排查</span>
          </div>
          <div class="warn">
            <span>告警</span>
            <span>故障信息：#15 配电箱</span>
            <span>故障原因：设备功率异常</span>
            <span>解决建议：请及时排查</span>
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
      show: true,
      // 默认选择
      tag: "音乐管理"
    };
  },
  methods: {
    // 点击关闭
    onIsShow() {
      this.show = false;
    },
    // 点击设置图标
    isShow() {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="less" scoped>
.message {
  text-align: center;
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    font-size: 20px;
    color: white;
  }
}

.color {
  color: #15f6f3;
}

.color2 {
  color: #7a5320;
}

.red {
  background-color: red !important;
  font-weight: 700;
  width: 40px;
  margin: 30px 0 0 15px;
}

.hover {
  color: #15f6f3;
  background: url("../../assets/img/文字光标.png") no-repeat bottom;
  background-size: 100%;
}

.bod {
  display: flex;
  position: relative;
}

.ri {
  flex: 1;
  margin-left: 15px;
}

.ri .content {
  height: 740px;
  position: relative;
}

.ri .content .data {
  background: url("../../assets/img/bg.png"), no-repeat;
  background-size: 100%;
  width: 900px;
  height: 500px;
  position: absolute;
  top: 110px;
  left: 90px;
}

.ri .content .data .tab {
  display: flex;
  justify-content: space-between;
}

.ri .content .data .close img {
  width: 25px;
  height: 25px;
  margin-top: 15px;
  margin-right: 34px;
}

.ri .content .data .nav {
  color: #dae2e5;
  display: flex;
  line-height: 53px;
}

.ri .content .data .nav div {
  margin-left: 36px;
  font-weight: 700;
  font-size: 16px;
}

.ri .bot {
  color: #fff;
  font-size: 14px;
  display: flex;
  .warn {
    width: 340px;
    height: 130px;
    background: url("../../assets/img/告警bg.png") no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: column;

    span {
      margin-top: 7px;
      margin-left: 15px;
      text-align: left;
    }

    span:nth-child(1) {
      margin-top: 20px;
      width: 50px;
      text-align: center;
      background: url("../../assets/img/告警.png") no-repeat;
      background-size: 100%;
    }
  }
}

.mess {
  width: 420px;
  height: 848px;
  background: url("../../assets/img/左侧面板bg.png") no-repeat;
  background-size: 100%;
  margin: 10px 0 0 20px;
  color: white;
  padding: 10px;
  .left1 {
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 10px;
    .title_1::before {
      content: "";
      display: block;
      width: 40px;
      height: 32px;
      background: url("../../assets/img/bg_36.png") no-repeat;
      background-size: 100%;
      position: absolute;
      left: 100px;
      top: 3px;
    }
  }
  .left1 span:nth-child(1) {
    color: #00d8ff;
  }
  .left1 span:nth-child(2) {
    font-size: 14px;
    margin-top: 5px;
  }

  .left2 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .logo {
      background: url("../../assets/img/左侧面板设备框.png") no-repeat;
      background-size: 100%;
      width: 155px;
      height: 65px;
      text-align: right;
      color: #2df5cc;
      position: relative;
      div:nth-child(1) {
        position: absolute;
        top: 3px;
        right: 10px;
        font-size: 20px;
      }
      div:nth-child(2) {
        position: absolute;
        top: 28px;
        right: 5px;
      }
    }
    .you {
      display: flex;
      justify-content: space-between;
      width: 150px;

      div {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .left3 {
    margin-top: 20px;
    .top {
      display: flex;
      margin-bottom: 20px;
      div {
        display: flex;
        flex-direction: column;

        span {
          width: 80px;
          font-size: 14px;
        }

        span:nth-child(2) {
          width: 137px;
          height: 45px;
          border-bottom: 5px solid;
          margin-top: -40px;
          margin-right: 5px;
        }
      }
    }

    .but {
      text-align: left;
      font-size: 14px;
      div:nth-child(2) {
        width: 420px;
        height: 45px;
        border-image: linear-gradient(90deg, #1afe98 50%, white 50%) 1 1;
        border-bottom: 5px solid;
        margin-top: -40px;
      }
    }
  }
}
.left4 {
  display: flex;
  justify-content: space-between;
  margin: 10px 8px;
  margin-top: 50px;
  font-size: 16px;
  font-weight: 700;
  position: relative;
  .title_1::before {
    content: "";
    display: block;
    width: 40px;
    height: 32px;
    background: url("../../assets/img/bg_36.png") no-repeat;
    background-size: 100%;
    position: absolute;
    left: 140px;
    top: 3px;
  }
}
.left4 span:nth-child(1) {
  color: #00d8ff;
}
.left4 span:nth-child(2) {
  font-size: 14px;
  margin-top: 5px;
}

.left5 {
  margin-top: 20px;
  .title {
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    padding-left: 15px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    background-color: black;
  }
  .from {
    display: flex;
    justify-content: space-between;
    padding-right: 40px;
    padding-left: 15px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  .from span:last-child {
    color: #00d8ff;
  }
}
.skyblue {
  border-image: linear-gradient(90deg, #1afe98 50%, white 50%) 1 1;
}
.blue {
  border-image: linear-gradient(90deg, #1cdefe 50%, white 50%) 1 1 !important;
}
.yellow {
  border-image: linear-gradient(90deg, #fdcd04 50%, white 50%) 1 1 !important;
}

.bod {
  position: relative;
  .icon {
    img {
      width: 60px;
      height: 60px;
      position: absolute;
      top: 0;
      right: 45px;
      z-index: 99;
    }
  }
}
</style>
