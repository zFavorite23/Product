<template>
  <div class="musicList">
    <div class="content">
      <div class="item">
        <span style="flex:33.33%">文件名称</span>
        <span style="flex:33.33%">标签</span>
        <span style="flex:33.33%">上传时间</span>
      </div>
      <div class="scroll">
        <div
          class="play"
          v-for="(item, index) in list"
          :key="index"
          @click="onselec(index, item.musicId)"
          :class="{ active: index == current }"
        >
          <span>{{ item.name }}</span>
          <span>
            <select
              v-model="item.label"
              @change="label(item.label, item.musicId, item.name, item.url)"
              style="border: none;outline: none;background: #905200;color: white;"
            >
              <option
                v-for="(item, index) in labelList"
                :value="item.value"
                :key="index"
                >{{ item.name }}</option
              >
            </select>
          </span>
          <span>{{ item.createTime }}</span>
        </div>

        <!-- 底部按钮区域 -->
        <div class="select">
          <div class="confirm" @click="upMusic()">确定</div>
          <div class="cancel" @click="cancel()">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemId: "",
      // 音乐id
      id: "",
      // 样式
      current: "",
      // 音乐列表
      list: [],
      // 类别列表
      labelList: [
        { value: "1", name: "一类" },
        { value: "2", name: "二类" },
        { value: "3", name: "三类" },
        { value: "4", name: "四类" },
        { value: "5", name: "五类" }
      ]
    };
  },
  props: ["modelid"],
  created() {
    this.itemId = sessionStorage.getItem("itemId");
    this.GetMusic();
  },

  methods: {
    // 获取分页列表
    GetMusic() {
      this.$axios({
        method: "GET",
        url: "/loudspeaker/music/page",
        params: {
          size: 50,
          itemId: this.itemId
        }
      }).then(res => {
        // console.log(res);
        this.list = res.data.data.records;
      });
    },

    // 获取id个添加样式
    onselec(index, id) {
      this.current = index;
      this.id = id;
    },

    // 给模式添加音乐
    upMusic() {
      this.$parent.musicListShow = !this.$parent.musicListShow;
      this.$axios({
        method: "post",
        url: "/loudspeaker/model/music",
        data: {
          modelId: this.modelid,
          musicId: this.id
        }
      }).then(res => {
        console.log(res);
        // 调用父组件获取模式列表
        this.$parent.loadPattern();
      });
    },

    cancel() {
      this.$parent.musicListShow = !this.$parent.musicListShow;
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  background-color: #686666;
}
.content {
  width: 865px;
  height: 375px;
  .scroll {
    overflow-y: auto;
    height: 330px;
  }
  .scroll::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .item {
    color: white;
    display: flex;
    padding-top: 8px;
    margin-bottom: 10px;
    margin-right: 10px;
    span {
      font-size: 14px;
      text-align: center;
    }
  }
  .play {
    font-size: 14px;
    color: white;
    display: flex;
    height: 30px;
    line-height: 30px;
    span {
      flex: 33.33%;
      font-size: 12px;
      text-align: center;
    }
    img {
      width: 25px;
      height: 25px;
    }
  }
}
.select {
  width: 150px;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  margin-left: 39%;

  .confirm {
    width: 60px;
    height: 20px;
    line-height: 20px;
    color: #0bb5b9;
    background: url("../../assets/img/Yes.png") no-repeat;
    background-size: 100% 100%;
  }

  .cancel {
    width: 60px;
    height: 20px;
    line-height: 20px;
    color: #f00;
    background: url("../../assets/img/No.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
