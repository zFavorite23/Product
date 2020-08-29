<template>
  <div class="paging">
    <!-- 顶部选项 -->
    <div class="head">
      <span @click="volumeShow = true">音量选择</span>
    </div>
    <!-- 主体内容 -->
    <div class="content1">
      <!-- 左侧分组 -->
      <div class="left">
        <div class="title">
          <span>所有分组</span>
          <span @click="choosecheckClass()">
            {{ isCheckAllClass ? "清空" : "全选" }}
          </span>
        </div>
        <div class="test-1 scroll">
          <li
            v-for="(item, index) in groupingList"
            :key="index"
            @click="onClass(index)"
            :class="arr2.includes(index) ? 'active' : ''"
          >
            {{ item.name }}
          </li>
        </div>

        <!--  修改音量 -->
        <div class="volumeEdit" v-show="volumeShow">
          <span>修改音量</span>
          <input
            type="number"
            v-model="volume"
            oninput="if(value>15)value=15;if(value<0)value=0"
          />
          <div class="select">
            <div class="confirm" @click="volumeShow = false">确定</div>
            <div class="cancel" @click="volumeShow = false">取消</div>
          </div>
        </div>
      </div>
      <!-- 右侧设备 -->
      <div class="right">
        <div class="top">
          <div>所有设备</div>
          <span @click="choosecheck()">{{ isCheckAll ? "清空" : "全选" }}</span>
        </div>
        <div class="but">
          <span
            v-for="(item, index) in loudspeakers"
            :key="index"
            @click="onColor(item.soundId)"
            :class="arr.includes(item.soundId) ? 'color' : ''"
            >{{ item.name }}</span
          >
        </div>
        <div class="icn" v-if="Start == false" @click="speakStart()">
          <img src="../../../assets/img/paging_17.png" alt />
          <div>开启寻呼</div>
        </div>
        <div class="icn" v-if="Start == true" @click="speakStop()">
          <img src="../../../assets/img/paging_17.png" alt />
          <div>关闭寻呼</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      volumeShow: false,
      volume: 10,
      itemId: "",
      Start: false,
      // 多选音柱的数组
      arr: [],
      // 多选分组的数组
      arr2: [],
      // 默认样式为空
      current: "",
      now: "",
      // 分组列表
      groupingList: [],
      // 分组数量
      groupingNum: "",
      // 音柱列表
      loudspeakers: [],
      // 音柱设备数量
      facilityNum: ""
    };
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");

    // 获取分组
    this.loadGrouping();
    // 获取音柱
    this.loadLoudspeaker();
  },
  methods: {
    // 多选音柱
    onColor(soundId) {
      var idx = this.arr.indexOf(soundId);

      if (idx > -1) {
        this.arr.splice(idx, 1);
      } else {
        this.arr.push(soundId);
      }
    },
    //全选/取消全选转换
    choosecheck() {
      if (this.isCheckAll) {
        this.clearCheckbox();
      } else {
        this.checkAll();
      }
    },
    //全选
    checkAll() {
      this.arr = [];
      this.loudspeakers.forEach(item => {
        this.arr.push(item.soundId);
      });
      console.log(this.arr);
    },
    //取消全选
    clearCheckbox() {
      this.arr = [];
    },

    // 多选分组
    onClass(i) {
      var idx = this.arr2.indexOf(i);
      if (idx > -1) {
        this.arr2.splice(idx, 1);
      } else {
        this.arr2.push(i);
      }
    },
    //全选/取消全选转换
    choosecheckClass() {
      if (this.isCheckAllClass) {
        this.clearCheckboxClass();
      } else {
        this.checkAllClass();
      }
    },
    //全选
    checkAllClass() {
      var len = this.groupingList.length;
      this.arr2 = [];
      for (var i = 0; i < len; i++) {
        this.arr2.push(i);
      }
    },
    //取消全选
    clearCheckboxClass() {
      this.arr2 = [];
    },

    // 获取分组
    loadGrouping() {
      this.$axios({
        method: "GET",
        url: "/loudspeaker/group/page",
        params: {
          size: 50,
          itemId: this.itemId
        }
      }).then(res => {
        this.groupingList = res.data.data.records;
      });
    },

    // 获取音柱列表
    loadLoudspeaker() {
      this.$axios({
        method: "GET",
        url: "/loudspeaker/sound/page",
        params: {
          size: 50,
          itemId: this.itemId
        }
      }).then(res => {
        this.loudspeakers = res.data.data.records;
      });
    },

    // 开启寻呼
    speakStart() {
      this.Start = true;
      this.arr = this.arr.join(",");
      console.log(this.arr);
      this.$axios({
        method: "get",
        url: "/loudspeaker/sound/server/speakStart",
        params: {
          soundIds: this.arr,
          volume: this.volume
        }
      }).then(res => {
        console.log(res);
      });
    },

    // 取消寻呼
    speakStop() {
      this.Start = false;
      this.$axios({
        method: "get",
        url: "/loudspeaker/sound/server/speakStop",
        params: {
          soundIds: this.arr
        }
      }).then(() => {
        this.arr = [];
        this.$parent.getSpeakLog();
      });
    }
  },
  computed: {
    // 全选 全部选音柱
    isCheckAll() {
      if (this.arr.length == this.loudspeakers.length) {
        return true;
      }
      return false;
    },

    // 全选 全部选分组
    isCheckAllClass() {
      if (this.arr2.length == this.groupingList.length) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.test-1::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.scroll {
  height: 300px;
  overflow-y: auto;
}
li {
  list-style: none;
}
.head {
  text-align-last: left;
  color: white;
  font-size: 14px;
  span {
    margin-right: 20px;
  }
}
.content1 {
  display: flex;
  margin-top: 10px;
  text-align: center;
  .left {
    background: url("../../../assets/img/框2.png") no-repeat;
    background-size: 100% 100%;
    width: 260px;
    height: 380px;
    color: white;
    position: relative;
    .title {
      position: relative;
      span:nth-child(2) {
        font-size: 12px;
        position: absolute;
        top: -2px;
        right: 7px;
        cursor: pointer;
      }
    }
    div {
      margin-top: 10px;
    }
    ul {
      padding: 0;
    }
    li {
      height: 30px;
      line-height: 30px;
      color: #15f6f3;
      cursor: pointer;
      font-size: 14px;
    }

    .volumeEdit {
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

      input {
        outline-style: none;
        border: 0px;
        margin: 15px 0;
        padding-left: 3px;
      }

      .select {
        margin-top: 10px;
        width: 150px;
        display: flex;
        justify-content: space-between;

        .confirm {
          width: 60px;
          height: 20px;
          line-height: 20px;
          color: #0bb5b9;
          background: url("../../../assets/img/Yes.png") no-repeat;
          background-size: 100% 100%;
        }

        .cancel {
          width: 60px;
          height: 20px;
          line-height: 20px;
          color: #f00;
          background: url("../../../assets/img/No.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .right {
    background: url("../../../assets/img/框3.png") no-repeat;
    background-size: 100% 100%;
    width: 569px;
    color: white;
    height: 380px;
    margin-left: 10px;
    position: relative;
    .top {
      position: relative;
      span:nth-child(2) {
        position: absolute;
        top: -2px;
        right: 15px;
        font-size: 12px;
        cursor: pointer;
      }
    }
    div {
      margin-top: 10px;
    }
    .but {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 10px;
      span {
        width: 95px;
        margin-top: 15px;
        font-size: 14px;
        color: #969696;
        cursor: pointer;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .icn {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      bottom: 5%;
      left: 45%;
      color: #0ccad4;
      font-size: 16px;
      img {
        width: 60px;
        height: 30px;
      }
    }
  }
  .active {
    background: url("../../../assets/img/text_bg.png") no-repeat;
    background-size: 100%;
    color: #f78606;
  }
  .color {
    color: #f78606 !important;
  }
}
</style>
