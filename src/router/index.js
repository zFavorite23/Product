import Vue from "vue";
import VueRouter from "vue-router";

// 登陆
import login from '../views/login/login.vue'

// 首页
import home from "../components/index.vue";

// 环境感知
import perception from "../views/perception/perception.vue";
// 环境感知告警
import all from "../views/perception/component/all.vue";
import manpower from "../views/perception/component/manpower.vue";
import automatic from "../views/perception/component/automatic.vue";
import untreated from "../views/perception/component/untreated.vue";

// 信息发布
import message from "../views/message/message.vue";
import music from "../views/message/compont/music.vue";
import grouping from "../views/message/compont/grouping.vue";
import matching from "../views/message/compont/matching.vue";
import pattern from "../views/message/compont/pattern.vue";
// 信息发布告警
import Mall from "../views/message/warn/all.vue";
import Mmanpower from "../views/message/warn/manpower.vue";
import Mautomatic from "../views/message/warn/automatic.vue";
import Muntreated from "../views/message/warn/untreated.vue";

// 智慧照明模块
import illumination from "../views/lamp/illumination.vue";

import loop from "../views/lamp/compont/loop.vue";
import mate from "../views/lamp/compont/mate.vue";
import model from "../views/lamp/compont/model.vue";
import partition from "../views/lamp/compont/partition.vue";
import tactics from "../views/lamp/compont/tactics.vue";

// 智慧照明告警
import Lall from "../views/lamp/warn/all.vue";
import Lmanpower from "../views/lamp/warn/manpower.vue";
import Lautomatic from "../views/lamp/warn/automatic.vue";
import Luntreated from "../views/lamp/warn/untreated.vue";

// 智慧保洁模块
import clean from "../views/clean/clean.vue";

import managePeople from "../views/clean/compont/managePeople.vue";
import cleanPeople from "../views/clean/compont/cleanPeople.vue";
import rubbish from "../views/clean/compont/rubbish.vue";

// 智慧保洁告警
import Call from "../views/clean/warn/all.vue";
import Cmanpower from "../views/clean/warn/manpower.vue";
import Cautomatic from "../views/clean/warn/automatic.vue";
import Cuntreated from "../views/clean/warn/untreated.vue";

// 智慧安防模块
import security from "../views/security/security.vue";

// 智慧安防配置信息
import deviceAdd from "../views/security/device/deviceAdd.vue";
import deviceList from "../views/security/device/deviceList.vue";

// 智慧安防实时画面
import analyze from "../views/security/set/analyze.vue";
import camera from "../views/security/set/camera.vue";

// 智慧安防告警
import Sall from "../views/security/warn/all.vue";
import Smanpower from "../views/security/warn/manpower.vue";
import Sautomatic from "../views/security/warn/automatic.vue";
import Suntreated from "../views/security/warn/untreated.vue";

// 智慧灌溉
import irrigate from "../views/irrigate/illumination.vue";
import Imodel from "../views/irrigate/compont/model.vue";
import Ipartition from "../views/irrigate/compont/partition.vue";
import Itactics from "../views/irrigate/compont/tactics.vue";
import Iall from "../views/irrigate/compont/all.vue";
import Ilabour from "../views/irrigate/compont/labour.vue";
import Iself from "../views/irrigate/compont/self.vue";
import Inot from "../views/irrigate/compont/not.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",   // path 设置为 “/” ，默认显示该页面
    component: login,
  },
  {
    // 登录页
    path: '/login',
    component: login
  },
  {
    path: "/home",
    component: home,
    children: [
      {
        path: '',
        redirect: '/security'
      },
      // 环境感知
      {
        path: "/perception",
        component: perception,
        children: [
          // 全部
          {
            path: "/all",
            component: all
          },
          // 人工处理
          {
            path: "/manpower",
            component: manpower
          },
          // 自动处理
          {
            path: "/automatic",
            component: automatic
          },
          // 未处理
          {
            path: "/untreated",
            component: untreated
          }
        ]
      },
      // 信息发布
      {
        path: "/message",
        component: message,
        children: [
          {
            // 默认显示路由
            path: "",
            redirect: "/music"
          },
          {
            // 音乐管理
            path: "/music",
            component: music
          },
          // 分组管理
          {
            path: "/grouping",
            component: grouping
          },
          // 匹配管理
          {
            path: "/matching",
            component: matching
          },
          // 模式管理
          {
            path: "/pattern",
            component: pattern
          },
          // 全部
          {
            path: "/Mall",
            component: Mall
          },
          // 人工处理
          {
            path: "/Mmanpower",
            component: Mmanpower
          },
          // 自动处理
          {
            path: "/Mautomatic",
            component: Mautomatic
          },
          // 未处理
          {
            path: "/Muntreated",
            component: Muntreated
          }
        ]
      },
      // 智慧照明
      {
        path: "/illumination",
        component: illumination,
        children: [
          // 回路控制
          {
            path: "/loop",
            component: loop
          },
          // 匹配管理
          {
            path: "/mate",
            component: mate
          },
          // 模式管理
          {
            path: "/model",
            component: model
          },
          // 分区管理
          {
            path: "/partition",
            component: partition
          },
          // 策略管理
          {
            path: "/tactics",
            component: tactics
          },
          // 全部
          {
            path: "/Lall",
            component: Lall
          },
          // 人工处理
          {
            path: "/Lmanpower",
            component: Lmanpower
          },
          // 自动处理
          {
            path: "/Lautomatic",
            component: Lautomatic
          },
          // 未处理
          {
            path: "/Luntreated",
            component: Luntreated
          }
        ]
      },
      // 智慧保洁
      {
        path: "/clean",
        component: clean,
        children: [
          // 默认显示路由
          {
            path: "",
            redirect: "/rubbish"
          },
          // 垃圾桶上传
          {
            path: "/rubbish",
            component: rubbish
          },
          // 保洁人员
          {
            path: "/cleanPeople",
            component: cleanPeople
          },
          // 管理人员
          {
            path: "/managePeople",
            component: managePeople
          },
          // 全部
          {
            path: "/Call",
            component: Call
          },
          // 人工处理
          {
            path: "/Cmanpower",
            component: Cmanpower
          },
          // 自动处理
          {
            path: "/Cautomatic",
            component: Cautomatic
          },
          // 未处理
          {
            path: "/Cuntreated",
            component: Cuntreated
          }
        ]
      },
      // 智慧安防
      {
        path: "/security",
        component: security,
        children: [
          // 全部
          {
            path: "/Sall",
            component: Sall
          },
          // 人工处理
          {
            path: "/Smanpower",
            component: Smanpower
          },
          // 自动处理
          {
            path: "/Sautomatic",
            component: Sautomatic
          },
          // 未处理
          {
            path: "/Suntreated",
            component: Suntreated
          },
          // 设备添加
          {
            path: "/deviceAdd",
            component: deviceAdd
          },
          // 设备列表
          {
            path: "/deviceList",
            component: deviceList
          },
          // 分析画面
          {
            path: "/analyze",
            component: analyze
          },
          // 实时画面
          {
            path: "/camera",
            component: camera
          }
        ]
      },
      {
        // 默认显示路由
        path: "/irrigate",
        component: irrigate,
        children: [
          // 分组管理s
          {
            path: "/Imodel",
            component: Imodel
          },
          // 分区管理
          {
            path: "/Ipartition",
            component: Ipartition
          },
          // 策略管理
          {
            path: "/Itactics",
            component: Itactics
          },
          // 告警
          // 全部
          {
            path: "/Iall",
            component: Iall
          },
          // 人工处理
          {
            path: "/Ilabour",
            component: Ilabour
          },
          // 自动处理
          {
            path: "/Iself",
            component: Iself
          },
          // 未处理
          {
            path: "/Inot",
            component: Inot
          }
        ]
      }
    ]
  }
];

// 点击按钮进行跳转时，路由为当前路由，再次点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
