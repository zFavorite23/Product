<template>
  <div class="operation">
    <nav>
      <router-link to="/Ipartition">
        <span @click="tag = '分组管理'" :class="{ hover: tag == '分组管理' }"
          >分组管理</span
        >
      </router-link>
      <router-link to="/Imodel">
        <span @click="tag = '分区管理'" :class="{ hover: tag == '分区管理' }"
          >分区管理</span
        >
      </router-link>
      <router-link to="/Itactics">
        <span @click="tag = '策略管理'" :class="{ hover: tag == '策略管理' }"
          >策略管理</span
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
      tag: "分组管理"
    };
  },
  methods: {
    close() {
      this.$parent.operation = !this.$parent.operation;
      // alert('11111')
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
  // top: 260px;
  top: 50%;
  margin-top: -280px;
  left: 488px;
  color: #ffffff;

  .hover {
    color: #15f6f3;
    background: url("../../assets/img/文字光标.png") no-repeat bottom;
    background-size: 100%;
  }

  nav {
    margin-left: 40px;
    padding: 20px 0;
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
    margin: 0 24px;
  }
}
</style>
