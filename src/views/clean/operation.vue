<template>
  <div class="operation">
    <nav>
      <router-link to="/rubbish">
        <span @click="tag = '垃圾桶'" :class="{ hover: tag == '垃圾桶' }"
          >垃圾桶</span
        >
      </router-link>
      <router-link to="/cleanPeople">
        <span @click="tag = '保洁人员'" :class="{ hover: tag == '保洁人员' }"
          >保洁人员</span
        >
      </router-link>
      <router-link to="/managePeople">
        <span @click="tag = '管理人员'" :class="{ hover: tag == '管理人员' }"
          >管理人员</span
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
      tag: "垃圾桶"
    };
  },
  methods: {
    close() {
      this.$parent.operation = !this.$parent.operation;
      this.$router.push("/clean");
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
