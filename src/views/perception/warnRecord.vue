<template>
  <div class="warnRecord">
    <nav>
      <router-link to="/all">
        <span @click="tag = '全部'" :class="{ hover: tag == '全部' }"
          >全部</span
        >
      </router-link>
      <router-link to="/manpower">
        <span @click="tag = '人工处理'" :class="{ hover: tag == '人工处理' }"
          >人工处理</span
        >
      </router-link>
      <router-link to="/automatic">
        <span @click="tag = '自动处理'" :class="{ hover: tag == '自动处理' }"
          >自动处理</span
        >
      </router-link>
      <router-link to="/untreated">
        <span @click="tag = '未处理'" :class="{ hover: tag == '未处理' }"
          >未处理</span
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
      tag: "全部"
    };
  },
  methods: {
    close() {
      this.$parent.warn = !this.$parent.warn;
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

.warnRecord {
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

.warnRecord nav {
  margin-top: 20px;
  margin-left: 40px;
}
.warnRecord nav span {
  width: 65px;
  margin-right: 15px;
  margin-left: 10px;
  text-align: center;
  padding-bottom: 9px;
  font-size: 16px;
}
.warnRecord .close {
  position: absolute;
  top: 15px;
  right: 30px;
}
.warnRecord .close img {
  width: 30px;
  height: 30px;
}

/* 主要内容区域 -------------------------------------------------*/

.main {
  margin: 15px 35px;
}
</style>
