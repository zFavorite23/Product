<template>
  <div class="setDevice">
    <nav>
      <router-link to="/camera">
        <span @click="tag = '实时画面'" :class="{ hover: tag == '实时画面' }"
          >实时画面</span
        >
      </router-link>
      <router-link to="/analyze">
        <span @click="tag = '画面分析'" :class="{ hover: tag == '画面分析' }"
          >画面分析</span
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
      tag: "实时画面"
    };
  },
  methods: {
    close() {
      this.$parent.set = !this.$parent.set;
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

.setDevice {
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

.setDevice nav {
  margin-top: 20px;
  margin-left: 40px;
}
.setDevice nav span {
  width: 65px;
  margin-right: 15px;
  margin-left: 10px;
  text-align: center;
  padding-bottom: 9px;
  font-size: 16px;
}
.setDevice .close {
  position: absolute;
  top: 15px;
  right: 30px;
}
.setDevice .close img {
  width: 30px;
  height: 30px;
}

/* 主要内容区域 -------------------------------------------------*/

.main {
  margin: 15px 35px;
}
</style>
