<template>
  <div class="operation">
    <nav>
      <router-link to="/Iall">
        <span @click="tag = '全部'" :class="{ hover: tag == '全部' }"
          >全部</span
        >
      </router-link>
      <router-link to="/Ilabour">
        <span @click="tag = '人工处理'" :class="{ hover: tag == '人工处理' }"
          >人工处理</span
        >
      </router-link>
      <router-link to="/Iself">
        <span @click="tag = '自动处理'" :class="{ hover: tag == '自动处理' }"
          >自动处理</span
        >
      </router-link>
      <router-link to="/Inot">
        <span @click="tag = '未处理'" :class="{ hover: tag == '未处理' }"
          >未处理</span
        >
      </router-link>
      <div class="close" @click="close()">
        <img src="../../assets/img/关闭.png" alt />
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
  created() {},
  methods: {
    close() {
      this.$parent.alarm = !this.$parent.alarm;
    }
  }
};
</script>

<style lang="less" scoped>
a {
  color: #ffffff;
  text-decoration: none;
}
.operation {
  width: 944px;
  height: 560px;
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 260px;
  left: 488px;
  color: #ffffff;
  .hover {
    color: #15f6f3;
    background: url("../../assets/img/文字光标.png") no-repeat bottom;
    background-size: 100%;
  }

  nav {
    margin-top: 20px;
    margin-left: 40px;
    span {
      width: 65px;
      margin-right: 60px;
      margin-left: 10px;
      text-align: center;
      padding-bottom: 18px;
      font-size: 16px;
    }

    .close {
      position: absolute;
      top: 15px;
      right: 30px;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }

  .main {
    margin: 10px 24px;
  }
}
</style>
