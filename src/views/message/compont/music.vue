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
          @click="onselec(index)"
          :class="{ active: index == current }"
        >
          <span class="name">{{ item.name }}</span>
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
          <span
            style="color:red"
            @click="onDelMusic(item.musicId)"
            v-show="item.delShow"
            >删除</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 删除图标隐藏
      delShow: false,
      // 样式为空
      current: "",
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
      ]
    };
  },
  created() {
    // 获取分页列表
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

    // 删除音乐
    onDelMusic(id) {
      // console.log(id);
      this.$axios({
        method: "DELETE",
        url: `/loudspeaker/music/${id}`
      }).then(() => {
        // 重新刷新页面
        this.GetMusic();
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
      // 文件路径
      this.fileName = this.getObjectUrl(files);

      console.log(this.fileName);
      this.$axios({
        method: "POST",
        url: "/loudspeaker/music",
        data: {
          label: "1",
          musicId: 0,
          name: files.name,
          orderBy: "",
          url: this.fileName
        }
      }).then(() => {
        // console.log(res);
        this.GetMusic();
      });
    },

    // 获取文件路径
    getObjectUrl(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url;
    },

    // 修改音乐类别
    label(label, musicId, name, url) {
      this.$axios({
        method: "put",
        url: "/loudspeaker/music",
        data: {
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
