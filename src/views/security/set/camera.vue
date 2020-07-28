<template>
  <div class="camera">
    <div class="leftSide">
      <div class="presetting">
        <div>
          <span>预置位</span>
          <span style="color:#15f6f3" @click="addShow = true">新增</span>
        </div>
        <div v-if="locationList.length != 0">
          <span
            v-for="(item, index) in locationList"
            :key="index"
            @click="goPreset(item.logId)"
            :class="{ active: item.logId == current }"
          >
            <i v-show="item.textShow">{{ item.name }}</i>
            <i
              v-show="item.editShow"
              @click="onEdit(item.logId)"
              class="el-icon-edit-outline"
            ></i>
            <input
              type="text"
              v-show="item.inputshow"
              v-model="editName"
              @keyup.enter="keyupInupt()"
            />
            <i
              v-show="item.editShow"
              @click="delShow = true"
              class="el-icon-delete"
            ></i>
          </span>
        </div>
        <div v-else>
          <span>暂无预置位</span>
        </div>
      </div>
      <div class="scaling">
        <span @click="control(10)">缩小</span>
        <span @click="control(9)">放大</span>
      </div>
      <div class="operate">
        <div>
          <img src="../../../assets/img/leftTop.png" @click="control(5)" />
          <img src="../../../assets/img/up.png" @click="control(1)" />
          <img src="../../../assets/img/rightTop.png" @click="control(6)" />
        </div>
        <div>
          <img src="../../../assets/img/left (2).png" @click="control(3)" />
          <img
            style=" width: 60px;height: 40px;"
            src="../../../assets/img/ok.png"
            @click="addShow = true"
          />
          <div class="ok" @click="addShow = true">OK</div>
          <img src="../../../assets/img/right.png" @click="control(4)" />
        </div>
        <div>
          <img src="../../../assets/img/leftDown.png" @click="control(7)" />
          <img
            style="margin-top:8px"
            src="../../../assets/img/down.png"
            @click="control(2)"
          />
          <span></span>
        </div>
      </div>
      <!--  添加预置位 -->
      <div class="addPreset" v-show="addShow">
        <span>新增预置位名称</span>
        <input type="text" v-model="name" />
        <div class="select">
          <div class="confirm" @click="addPreset">确定</div>
          <div class="cancel" @click="addShow = false">取消</div>
        </div>
      </div>
      <!--  删除预置位 -->
      <div class="delPreset" v-show="delShow">
        <span>是否删除当前预置位</span>
        <div class="select" style="margin-top:30px">
          <div class="confirm" @click="delPreset">确定</div>
          <div class="cancel" @click="delShow = false">取消</div>
        </div>
      </div>
    </div>
    <div class="rightSide">
      <videoPlayer
        class="video-player vjs-custom-skin"
        v-if="isshow"
        :options="playerOptions"
      ></videoPlayer>
    </div>
  </div>
</template>

<script>
import "videojs-flash";
// import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      camera: "",
      isshow: true,
      addShow: false,
      delShow: false,
      logId: "",
      name: "",
      editName: "",
      // 视频播放
      playerOptions: {
        techOrder: ["flash", "html5"], // 兼容顺序
        sources: [
          {
            // 流配置，数组形式，会根据兼容顺序自动切换
            type: "rtmp/hls",
            src: "rtmp://192.168.113.141:1935/live/robot"
          }
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        autoplay: true,
        controls: true
      },
      current: -1,
      locationList: [] // 预置位列表
    };
  },
  methods: {
    // 摄像头控制
    control(type) {
      this.$axios({
        method: "post",
        url: "/security/webcam/control",
        params: {
          type,
          webcamId: this.camera.webcamId
        }
      }).then(() => {});
    },

    // 获取预置位列表
    getPresetList() {
      this.$axios({
        method: "get",
        url: "/security/Preinstall/getList",
        params: {
          webcamId: this.camera.webcamId
        }
      }).then(res => {
        // console.log(res);
        this.locationList = res.data.data;
        this.locationList.forEach(item => {
          this.$set(item, "textShow", true);
        });
        this.locationList.reverse();
      });
    },

    // 跳转预置位
    goPreset(logId) {
      this.current = logId;
      this.logId = logId;
      this.locationList.forEach(item => {
        if (item.logId == logId) {
          item.editShow = true;
        } else {
          item.editShow = false;
          // 文字
          item.textShow = true;
          // 输入框
          item.inputshow = false;
        }
      });
      this.$axios({
        method: "get",
        url: "/security/Preinstall/goto",
        params: {
          logId
        }
      });
    },

    // 新增预置位
    addPreset() {
      this.$axios({
        method: "post",
        url: "/security/Preinstall/add",
        params: {
          name: this.name,
          webcamId: this.camera.webcamId
        }
      }).then(() => {
        this.name = "";
        this.addShow = false;
        this.getPresetList();
      });
    },

    // 删除预置位
    delPreset() {
      this.$axios({
        method: "DELETE",
        url: "/security/Preinstall/del",
        params: {
          logId: this.logId
        }
      }).then(() => {
        this.delShow = false;
        this.getPresetList();
      });
    },

    // 修改预置位
    onEdit(logId) {
      this.locationList.forEach(item => {
        if (item.logId == logId) {
          // 输入框
          item.inputshow = true;
          // 文字
          item.textShow = false;
        } else {
          // 输入框
          item.inputshow = false;
        }
      });
    },
    editPreset(name, logId) {
      this.$axios({
        method: "post",
        url: "/security/Preinstall/update",
        params: {
          name,
          logId
        }
      }).then(res => {
        console.log(res);
      });
    },

    // input事件（按下回车）
    keyupInupt() {
      console.log(this.editName);
      // 调用修改分组
      this.editPreset(this.editName, this.logId);
      // 清空输入框
      // this.editName = "";
    }
  },
  created() {
    this.camera = JSON.parse(window.sessionStorage.getItem("camera"));
    console.log(this.camera);
    this.getPresetList();
  }
};
</script>

<style>
.camera .rightSide .video-player .video-js {
  width: 565px !important;
  height: 430px !important;
}
</style>
<style scoped>
.camera {
  display: flex;
}
.active {
  background: url("../../../assets/img/text_bg.png") no-repeat;
  background-size: 100%;
  color: #ff9000 !important;
}

i {
  font-style: normal;
}
/* 左侧 ----------------------------------------------------*/

.camera .leftSide {
  margin-top: 10px;
  margin-right: 5px;
  width: 290px;
  height: 430px;
  text-align: center;
  background: url("../../../assets/img/框2.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}

/* 左侧 操作面板----------------------------------------------------*/

.camera .leftSide .presetting {
  height: 270px;
}
.camera .leftSide .operate div {
  display: flex;
  justify-content: space-around;
}
.camera .leftSide .operate div:nth-child(2) {
  margin: 5px 0;
  position: relative;
}
.camera .leftSide .operate div:nth-child(2) img {
  width: 40px;
  height: 40px;
}
.camera .leftSide .operate div:nth-child(2) .ok {
  position: absolute;
  top: 8px;
  font-size: 18px;
  color: #15f6f3;
}
.camera .leftSide .operate div span {
  width: 40px;
  height: 30px;
}
.camera .leftSide .operate div img {
  width: 40px;
  height: 30px;
}
.camera .leftSide .operate div img:nth-child(2) {
  width: 40px;
  height: 20px;
}

/* 左侧 预置位列表----------------------------------------------------*/

.camera .leftSide .presetting {
  margin-top: 5px;
}
.camera .leftSide .presetting input {
  width: 90px;
  height: 15px;
  outline-style: none;
  border: 0px;
  background: url("../../../assets/img/search.png") no-repeat;
  background-size: 100% 100%;
  color: #ccc;
}
.camera .leftSide .presetting div:nth-child(1) {
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
}
.camera .leftSide .presetting div:nth-child(2) {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.camera .leftSide .presetting div:nth-child(2) .active {
  background: url("../../../assets/img/text_bg.png") no-repeat;
  background-size: 100%;
  color: #ff9000 !important;
}
.camera .leftSide .presetting div:nth-child(2) i {
  font-style: normal;
}
.camera .leftSide .presetting div:nth-child(2) span {
  height: 24px;
  line-height: 24px;
  color: #15f6f3;
  position: relative;
  padding-left: 15px;
  font-size: 12px;
}
.camera .leftSide .presetting div:nth-child(2) span .el-icon-delete,
.camera .leftSide .presetting div:nth-child(2) span .el-icon-edit-outline {
  position: absolute;
  top: 8px;
  right: 10px;
  color: #ff9000;
}
.camera .leftSide .presetting div:nth-child(2) span .el-icon-edit-outline {
  position: absolute;
  top: 8px;
  right: 40px;
}

/* 左侧 缩放----------------------------------------------------*/
.camera .leftSide .scaling {
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
.camera .leftSide .scaling span {
  width: 60px;
  line-height: 25px;
  height: 25px;
  color: #15f6f3;
}
.camera .leftSide .scaling span:nth-child(1) {
  background: url("../../../assets/img/No.png") no-repeat;
  background-size: 100% 100%;
  color: red;
}
.camera .leftSide .scaling span:nth-child(2) {
  background: url("../../../assets/img/Yes.png") no-repeat;
  background-size: 100% 100%;
}

/* 左侧 新增----------------------------------------------------*/

.camera .leftSide .addPreset,
.delPreset {
  width: 300px;
  height: 150px;
  background: url("../../../assets/img/map_bg.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 105px;
  left: 245px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.camera .leftSide .addPreset input {
  outline-style: none;
  border: 0px;
  margin: 15px 0;
  padding-left: 3px;
}
.camera .leftSide .select {
  margin-top: 10px;
  width: 150px;
  display: flex;
  justify-content: space-between;
}
.camera .leftSide .confirm {
  width: 60px;
  height: 20px;
  line-height: 20px;
  color: #0bb5b9;
  background: url("../../../assets/img/Yes.png") no-repeat;
  background-size: 100% 100%;
}

.camera .leftSide .cancel {
  width: 60px;
  height: 20px;
  line-height: 20px;
  color: #f00;
  background: url("../../../assets/img/No.png") no-repeat;
  background-size: 100% 100%;
}

/* 右侧------------------------------------------------------- */

.rightSide {
  margin-top: 10px;
}
</style>
