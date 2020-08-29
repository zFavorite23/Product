<template>
  <div class="operation">
    <nav>
      <router-link to="/music">
        <span @click="tag = '音乐管理'" :class="{ hover: tag == '音乐管理' }"
          >音乐管理</span
        >
      </router-link>
      <router-link to="/grouping">
        <span @click="tag = '分组管理'" :class="{ hover: tag == '分组管理' }"
          >分组管理</span
        >
      </router-link>
      <router-link to="/pattern">
        <span @click="tag = '模式管理'" :class="{ hover: tag == '模式管理' }"
          >模式管理</span
        >
      </router-link>
      <router-link to="/matching">
        <span @click="tag = '匹配管理'" :class="{ hover: tag == '匹配管理' }"
          >匹配管理</span
        >
      </router-link>
      <router-link to="/paging">
        <span @click="tag = '实时寻呼'" :class="{ hover: tag == '实时寻呼' }"
          >实时寻呼</span
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
      tag: "音乐管理"
    };
  },
  methods: {
    close() {
      this.$parent.operation = !this.$parent.operation;
      this.$router.push("/message");
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
  z-index: 11;
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
