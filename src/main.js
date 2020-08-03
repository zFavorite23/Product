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
axios.defaults.baseURL = "http://192.168.115.51:9999";

import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "yhGtwOULKUiUF4BIvyH75zGzLN0PdSrr"
});

router.beforeEach((to, from, next) => {
  if (to.fullPath == "/") {
    window.sessionStorage.removeItem("token");
  }
  let isLogin = window.sessionStorage.getItem("token");
  // console.log(isLogin);
  if (isLogin) {
    //如果用户信息存在则往下执行。
    next();
  } else {
    //如果用户token不存在则跳转到login页面
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

// 添加一个请求拦截器
axios.interceptors.request.use(
  function(config) {
    //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
    var token = window.sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

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
