<template>
  <div class="operation">
    <nav>
      <router-link to="/partition">
        <span @click="tag = '分区管理'" :class="{ hover: tag == '分区管理' }"
          >分区管理</span
        >
      </router-link>
      <router-link to="/model">
        <span @click="tag = '模式管理'" :class="{ hover: tag == '模式管理' }"
          >模式管理</span
        >
      </router-link>
      <router-link to="/mate">
        <span @click="tag = '匹配管理'" :class="{ hover: tag == '匹配管理' }"
          >匹配管理</span
        >
      </router-link>
      <router-link to="/tactics">
        <span @click="tag = '策略管理'" :class="{ hover: tag == '策略管理' }"
          >策略管理</span
        >
      </router-link>
      <router-link to="/loop">
        <span @click="tag = '回路控制'" :class="{ hover: tag == '回路控制' }"
          >回路控制</span
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
      tag: "分区管理"
    };
  },
  methods: {
    close() {
      this.$parent.operation = !this.$parent.operation;
    }
  }
};
</script>

<style scoped>
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
.operation {
  width: 930px;
  height: 520px;
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: 100%;
  position: absolute;
  top: 110px;
  left: 90px;
  z-index: 99;
}
.operation nav {
  margin-top: 20px;
  margin-left: 40px;
}
.operation nav span {
  width: 65px;
  margin-right: 15px;
  margin-left: 10px;
  text-align: center;
  padding-bottom: 9px;
  font-size: 16px;
}

.operation nav .close {
  position: absolute;
  top: 15px;
  right: 30px;
}
.operation nav .close img {
  width: 30px;
  height: 30px;
}
.main {
  margin: 15px 35px;
}
</style>
