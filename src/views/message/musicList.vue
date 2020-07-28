<template>
  <div class="musicList">
    <div class="content">
      <div class="item">
        <span>文件名称</span>
        <span>标签</span>
        <span>上传时间</span>
        <!-- <span>状态</span> -->
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
          <!-- <span>
          <img src="../../../assets/暂停.png" alt />
          </span>-->
          <span style="color:red" @click="onDelMusic(item.musicId)"></span>
        </div>
      </div>
      <!-- 底部按钮区域 -->
      <div class="but">
        <div class="ok" @click="upMusic()">确定</div>
        <div class="del" @click="cancel()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    this.GetMusic();
  },

  methods: {
    // 获取分页列表
    GetMusic() {
      this.$axios({
        method: "GET",
        url: "/loudspeaker/music/page"
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
      }).then(() => {
        // console.log(res);
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
  margin: 10px 15px;
  background-size: 100%;
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
    margin: 0 20px;
    padding-top: 20px;
    margin-bottom: 10px;
    span {
      font-size: 14px;
      width: 25%;
    }
  }
  .play {
    font-size: 14px;
    color: white;
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    padding-top: 20px;
    margin-bottom: 10px;
    span {
      width: 25%;
      flex: 25%;
      font-size: 12px;
    }
    img {
      width: 25px;
      height: 25px;
    }
  }
}
.but {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  position: absolute;
  top: 340px;
  left: 300px;
  div {
    width: 85px;
    height: 50px;
    line-height: 25px;
    margin-right: 35px;
    color: white;
    text-align: center;
  }
  .ok {
    background: url("../../assets/img/Yes.png") no-repeat;
    background-size: 100%;
  }
  .del {
    background: url("../../assets/img/No.png") no-repeat;
    background-size: 100%;
  }
}
</style>
