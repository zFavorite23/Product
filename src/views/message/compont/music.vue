<template>
  <div class="music">
    <!-- 头部区域 -->
    <div class="top">
      <input type="file" hidden ref="file" @change.prevent.stop="upload" />
      <div @click="onclick()">＋ 添加曲目</div>
      <div class="right">
        <input type="text" placeholder="搜索音乐..." v-model="text" />
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content1">
      <div class="item">
        <span style="flex:25%">文件名称</span>
        <span style="flex:25%">标签</span>
        <span style="flex:25%">上传时间</span>
        <span style="flex:25%">操作</span>
        <i class="el-icon-s-operation" @click="orderByIShow = true"></i>
        <div class="orderByList" v-show="orderByIShow">
          <div
            v-for="(item, index) in orderByList"
            :key="index"
            @click="getorderBy(item.value)"
          >{{ item.name }}</div>
        </div>
      </div>
      <div class="scroll">
        <div
          class="play"
          v-for="(item, index) in list"
          :key="index"
          @click="onselec(index)"
          :class="{ active: index == current }"
        >
          <span style="flex:25%" class="name">{{ item.name }}</span>
          <span style="flex:25%;margin-right: 138px;margin-left: -5px;">
            <select
              v-model="item.label"
              @change="label(item.label, item.musicId, item.name, item.url)"
            >
              <option
                v-for="(item, index) in labelList"
                :value="item.value"
                :key="index"
              >{{ item.name }}</option>
            </select>
          </span>
          <span style="flex:25%">{{ item.createTime }}</span>
          <span
            style="color:red;margin-left:13px"
            @click="onDelMusic(item.musicId)"
            v-show="item.delShow"
          >删除</span>
        </div>
      </div>

      <!-- 删除音乐 -->
      <div class="delClean" v-show="delShow">
        <span>是否删除当前音乐</span>
        <div class="select">
          <div class="confirm" @click="DelMusic()">确定</div>
          <div class="cancel" @click="delShow = false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      delShow: false,
      itemId: "",
      // 删除图标隐藏
      orderByIShow: false,
      // 样式为空
      current: -1,
      // 文件路径
      fileName: "",
      // 输入框内容
      text: "",
      // 音乐列表
      list: [],
      // 类别列表
      labelList: [
        { value: "1", name: "一类" },
        { value: "2", name: "二类" },
        { value: "3", name: "三类" },
        { value: "4", name: "四类" },
        { value: "5", name: "五类" }
      ],
      orderBy: "",
      orderByList: [
        { value: "11", name: "时间正排" },
        { value: "10", name: "时间倒排" },
        { value: "21", name: "名称正排" },
        { value: "20", name: "名称倒排" },
        { value: "31", name: "标签正排" },
        { value: "30", name: "标签倒排" }
      ],
      musicId: ""
    };
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");
    // 获取分页列表
    this.GetMusic();
  },
  methods: {
    // 获取分页列表
    GetMusic() {
      this.$axios({
        method: "GET",
        url: "/loudspeaker/music/page",
        params: {
          orderBy: this.orderBy,
          size: 50,
          itemId: this.itemId
        }
      }).then(res => {
        // console.log(res);
        this.list = res.data.data.records;
      });
    },

    // 排序方式
    getorderBy(orderBy) {
      this.orderBy = orderBy;
      this.orderByIShow = false;
      this.GetMusic();
    },

    // 获取删除音乐ID
    onDelMusic(musicId) {
      this.musicId = musicId;
      this.delShow = true;
    },
    // 确定删除
    DelMusic() {
      this.$axios({
        method: "DELETE",
        url: `/loudspeaker/music/${this.musicId}`
      }).then(() => {
        // 重新刷新页面
        this.GetMusic();
        this.current = -1;
        this.delShow = false;
      });
    },

    // 手动触发点击事件
    onclick() {
      this.$refs.file.click();
    },

    // 添加音乐
    upload(event) {
      // 用户当前点击对象
      let files = event.target.files[0];
      var params = new FormData();
      params.append("file", files);
      this.$axios({
        method: "POST",
        url: "/loudspeaker/music/upload",
        data: params
      }).then(res => {
        this.musicData = res.data.data;
        console.log(this.musicData);

        this.$axios({
          method: "post",
          url: "/loudspeaker/music",
          data: {
            itemId: this.itemId,
            label: 5,
            musicId: 0,
            name: this.musicData.name,
            orderBy: "",
            url: this.musicData.url
          }
        }).then(res => {
          console.log(res);
          this.GetMusic();
        });
      });
    },

    // 修改音乐类别
    label(label, musicId, name, url) {
      this.$axios({
        method: "put",
        url: "/loudspeaker/music",
        data: {
          itemId: this.itemId,
          label,
          musicId,
          name,
          orderBy: "",
          url
        }
      }).then(() => {});
    },

    // 点击添加样式
    onselec(index) {
      this.current = index;
      for (let i = 0; i < this.list.length; i++) {
        if (index == i) {
          this.list[i].delShow = true;
        } else {
          this.list[i].delShow = false;
        }
      }
    }
  },
  watch: {
    // 当输入框有变化时
    text() {}
  }
};
</script>

<style src="../../../style/compont/music.css" scoped></style>
