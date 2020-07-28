import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
import "amfe-flexible"; // 引入REM基准值
import echarts from "echarts";
import ElementUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
// 引入axios
import axios from "axios";
// 设置axios的常态地址
axios.defaults.baseURL = "http://192.168.113.141:9999";

import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "yhGtwOULKUiUF4BIvyH75zGzLN0PdSrr"
});

Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

// 将axios共享给所有实例使用
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
