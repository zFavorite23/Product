<template>
  <div class="deviceInfo">
    <nav>
      <router-link to="/deviceAdd">
        <span @click="tag = '设备添加'" :class="{ hover: tag == '设备添加' }"
          >设备添加</span
        >
      </router-link>
      <router-link to="/deviceList">
        <span @click="tag = '查看列表'" :class="{ hover: tag == '查看列表' }"
          >查看列表</span
        >
      </router-link>
      <div class="close" @click="close()">
        <img src="../../assets/img/close.png" alt />
      </div>
    </nav>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文本样式
      tag: "设备添加"
    };
  },
  methods: {
    close() {
      this.$parent.devic = !this.$parent.devic;
    }
  }
};
</script>

<style scoped>
/* 默认样式 -------------------------------------------------*/

.hover {
  color: #15f6f3;
  background: url("../../assets/img/text_color.png") no-repeat bottom;
  background-size: 100%;
}
a {
  text-decoration: none;
  font-size: 20px;
  color: white;
}

/* 导航栏区域 -------------------------------------------------*/

.deviceInfo {
  width: 930px;
  height: 520px;
  background-color: pink;
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 110px;
  left: 90px;
  z-index: 99;
}

.deviceInfo nav {
  margin-top: 20px;
  margin-left: 40px;
}
.deviceInfo nav span {
  width: 65px;
  margin-right: 15px;
  margin-left: 10px;
  text-align: center;
  padding-bottom: 9px;
  font-size: 16px;
}
.deviceInfo .close {
  position: absolute;
  top: 15px;
  right: 30px;
}
.deviceInfo .close img {
  width: 30px;
  height: 30px;
}

/* 主要内容区域 -------------------------------------------------*/

.main {
  margin: 15px 35px;
}
</style>
