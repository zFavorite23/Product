<template>
  <div class="home">
    <!-- 导航栏 -->
    <div class="item">
      <router-link to="/security">
        <span :class="{ hover: tag == '智慧安防' }" @click="tag = '智慧安防'"
          >智慧安防</span
        >
      </router-link>
      <router-link to="/illumination">
        <span :class="{ hover: tag == '智慧照明' }" @click="tag = '智慧照明'"
          >智慧照明</span
        >
      </router-link>
      <router-link to="/message">
        <span :class="{ hover: tag == '信息发布' }" @click="tag = '信息发布'"
          >信息发布</span
        >
      </router-link>
      <router-link to="/clean">
        <span :class="{ hover: tag == '智能保洁' }" @click="tag = '智能保洁'"
          >智能保洁</span
        >
      </router-link>
      <router-link to="/perception">
        <span :class="{ hover: tag == '环境感知' }" @click="tag = '环境感知'"
          >环境感知</span
        >
      </router-link>
      <router-link to="/irrigate">
        <span :class="{ hover: tag == '智慧灌溉' }" @click="tag = '智慧灌溉'"
          >智慧灌溉</span
        >
      </router-link>
    </div>

    <!-- 主体区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: "", //定义一个定时器的变量
      time: "", // 年月日
      date: "", // 时分秒
      condcode: "", // 天气
      tmp: "", // 温度
      tag: "智慧安防"
    };
  }
};
</script>

<style scoped>
.home {
  background: url("../assets/img/bg.jpg") no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}
.item {
  height: 50px;
  width: 100%;
  color: #00f5f5;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
  background: url("../assets/img/top.png") no-repeat;
  background-size: 100% 100%;
}
.item a {
  margin-right: 30px;
}

a {
  text-decoration: none;
  font-size: 20px;
  color: white;
}
.hover {
  color: #15f6f3;
}
</style>
