<template>
  <div class="home">
    <!-- 导航栏 -->
    <div class="item">
      <nav>
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
      </nav>
      <el-dropdown class="el-dropdown">
        <span class="el-dropdown-link">
          {{ userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="open()">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 主体区域 -->
    <div class="main">
      <router-view></router-view>
    </div>

    <!-- 地图-->
    <baidu-map
      id="map"
      :center="center"
      :zoom="zoom"
      @ready="handler"
      class="map"
      :scroll-wheel-zoom="true"
    >
      <div v-for="(item, index) in list" :key="index">
        <bm-marker
          v-if="item.status == 0"
          :icon="{
            url: require('../assets/img/soil.png'),
            size: { width: 40, height: 40 }
          }"
          :position="{ lng: item.longitude, lat: item.latitude }"
          :dragging="true"
          @click="infoWindowOpen(index, item)"
        >
          <bm-info-window
            :show="item.show"
            @close="infoWindowClose"
            @open="infoWindowOpen(index)"
          >
            名称：{{ item.name }}
            <br />
            IP：{{ item.ip }}
            <br />
            地址：{{ item.address }}
          </bm-info-window>
        </bm-marker>
        <bm-marker
          v-if="item.status == 1"
          :icon="{
            url: require('../assets/img/soil2.png'),
            size: { width: 40, height: 40 }
          }"
          :position="{ lng: item.longitude, lat: item.latitude }"
          :dragging="true"
          @click="infoWindowOpen(index)"
        >
          <bm-info-window
            :show="item.show"
            @close="infoWindowClose"
            @open="infoWindowOpen(index)"
          >
            名称：{{ item.name }}
            <br />
            IP：{{ item.ip }}
            <br />
            地址：{{ item.address }}
          </bm-info-window>
        </bm-marker>
      </div>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: "",
      center: { lng: 116.192408, lat: 39.910162 },
      zoom: 12,
      list: [],
      show: false,
      userInfo: "",
      itemId: ""
    };
  },
  methods: {
    // 初始化地图
    handler({ BMap, map }) {
      var point = new BMap.Point(this.center.lng, this.center.lat);
      map.centerAndZoom(point, 12);
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      let mapStyle = { style: "midnight" };
      map.setMapStyle(mapStyle);
    },

    // 获取所有音柱
    getLoudspeaker() {
      this.$axios({
        method: "get",
        url: "/loudspeaker/sound/page",
        params: {
          size: 50,
          itemId: this.itemId
        }
      }).then(res => {
        this.list = res.data.data.records;
        this.list.forEach(item => {
          this.$set(item, "show", false);
        });
      });
    },

    // 获取所有垃圾桶
    getCleaning() {
      this.$axios({
        method: "get",
        url: "/cleaning/trashCan/all",
        params: {
          size: 30,
          itemId: this.itemId
        }
      }).then(res => {
        this.list = res.data.data;
        this.list.forEach(item => {
          this.$set(item, "show", false);
        });
      });
    },

    // 获取所有摄像头
    getWebCam() {
      this.$axios({
        method: "get",
        url: "/security/webcam/page",
        params: {
          itemId: this.itemId,
          size: 20
        }
      }).then(res => {
        this.list = res.data.data.records;
        this.list.forEach(item => {
          this.$set(item, "show", false);
        });
      });
    },

    // 标注点弹窗
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen(index, item) {
      console.log(item);
      for (let i = 0; i < this.list.length; i++) {
        if (i == index) {
          this.list[i].show = true;
        } else {
          this.list[i].show = false;
        }
      }
    },

    // 退出登录
    open() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("itemId");
        this.$router.push("/login");
      });
    }
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.itemId = sessionStorage.getItem("itemId");
  },
  watch: {
    // 监听路由变化 隐藏视频点
    $route: {
      handler: function(val) {
        if (val.path == "/message") {
          this.getLoudspeaker();
        } else if (val.path == "/clean") {
          this.getCleaning();
        } else if (val.path == "/security") {
          this.getWebCam();
        } else {
          this.list = [];
        }
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>
<style>
.pano_close {
  top: 25px !important;
}
.anchorBL {
  display: none;
}
</style>

<style scoped>
.map {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
/* .home {
  background: url("../assets/img/bg.jpg") no-repeat;
  background-size: 100% 100%;
  height: 100vh;
} */
.item {
  height: 50px;
  width: 100%;
  color: #00f5f5;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
  background: url("../assets/img/top.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  z-index: 99;
}
nav {
  position: absolute;
  left: 55%;
  top: 47%;
  transform: translate(-50%, -47%);
}

.el-dropdown {
  position: absolute;
  top: -5px;
  right: 20px;
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

.main {
  margin-top: 70px;
}
</style>
