<template>
  <div class="parrern">
    <!-- 头部区域 -->
    <div class="top">
      <div class="left" @click="onAddPattern()">＋ 新建模式</div>
      <div class="right">
        <input type="text" placeholder="搜索模式..." />
      </div>
    </div>
    <!-- 中间内容区域 -->
    <div class="head">全部模式</div>
    <div class="list test-1">
      <div class="content img" v-for="(item, index) in list" :key="index">
        <div
          class="music"
          @click="onPattern(index)"
          :class="{ active: index == current }"
        >
          <span v-show="item.textShow" style="color:#15f6f3">{{
            item.name
          }}</span>
          <input
            type="text"
            v-show="item.inputshow"
            v-model="message"
            maxlength="6"
            @keyup.enter="keyupInupt(item.playOrder)"
          />
        </div>
        <i
          class="el-icon-edit-outline"
          @click="onEdit(item.modelId, index)"
          v-show="item.delShow"
        ></i>
        <i
          class="el-icon-delete"
          v-show="item.delShow"
          @click="onYesShow(item.modelId)"
        ></i>
        <div class="time">
          <span class="start">
            <span>
              播放内容:
              <select style="width:100px">
                <option
                  v-for="(item, index) in item.musics"
                  :key="index"
                  value
                  >{{ item.name }}</option
                >
              </select>
            </span>
            <span class="icon" @click="onAddMusic(item.modelId)"></span>
          </span>
          <span class="playTime">
            播放时间：
            <select>
              <option
                v-for="(item, index) in item.timeList"
                :key="index"
                value
                >{{ item }}</option
              >
            </select>
            <span
              class="icon"
              @click="onPlayTime(item.modelId, item.name)"
            ></span>
          </span>
          <span>
            播放顺序：
            <select
              v-model="item.playOrder"
              @change="editPlayOrdel(item.playOrder, item.name, item.modelId)"
            >
              <option
                v-for="(playOrderList, index) in playOrderList"
                :value="playOrderList.value"
                :key="index"
                >{{ playOrderList.name }}</option
              >
            </select>
          </span>
          <span>
            音量：
            <i
              class="el-icon-remove"
              @click="onSub(item.volume, item.modelId)"
            ></i>
            <span v-text="item.volume"></span>
            <i
              class="el-icon-circle-plus"
              @click="onAdd(item.volume, item.modelId)"
            ></i>
          </span>
        </div>
      </div>
    </div>
    <!-- 底部按钮区域 -->
    <div class="but" v-show="isShow">
      <div class="ok" @click="onDelPattern()">确定</div>
      <div class="del" @click="(isShow = false), (delShow = false)">取消</div>
    </div>
    <musicList v-show="musicListShow" :modelid="modelid"></musicList>
    <playTime v-show="playShow" :modelid="modelid" :name="name"></playTime>
  </div>
</template>

<script>
import musicList from "../musicList";
import playTime from "../time";
export default {
  components: {
    musicList,
    playTime
  },
  data() {
    return {
      itemId: "",
      // 传给子组件的模式id
      modelid: "",
      // 传给子组件的模式名称
      name: "",
      // 音乐列表显示
      musicListShow: false,
      //
      playShow: false,
      // 文本内容显示
      text: true,
      // 播放时间
      times: "",
      // 时间
      time: {
        year: "",
        month: "",
        day: ""
      },
      // 模式列表
      list: [],
      // 删除按钮显示
      delShow: false,
      // 确定取消按钮隐藏
      isShow: false,
      // 需要删除模式的id
      id: "",
      // 输入框隐藏
      inputshow: false,
      // 输入框内容
      message: "",
      // 需要修改模式的id
      patternId: "",
      // 播放顺序
      playOrderList: [
        { value: "1", name: "顺序播放" },
        { value: "2", name: "倒序播放" },
        { value: "3", name: "随机播放" }
      ],
      // 选中模式的样式
      current: ""
    };
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");
    // 获取模式列表
    this.loadPattern();
    // 获取时间
    this.getDate();
  },
  methods: {
    // 获取模式列表
    loadPattern() {
      this.$axios({
        method: "get",
        url: "/loudspeaker/model/page",
        params: {
          size: 50,
          itemId: this.itemId
        }
      }).then(res => {
        // console.log(res);
        // 数量
        this.list = res.data.data.records;
        this.list.forEach(item => {
          this.$set(item, "textShow", true);
        });
      });
    },

    // 点击显示确定按钮
    onYesShow(id) {
      // 显示按钮
      this.isShow = true;
      // 将id存起来
      this.id = id;
    },

    // 点击确定删除模式
    onDelPattern() {
      this.$axios({
        method: "DELETE",
        url: `/loudspeaker/model/${this.id}`
      }).then(() => {
        // 重新获取数据
        this.loadPattern();
        // 点击确定之后 按钮隐藏
        this.isShow = false;
        this.delShow = false;
      });
    },

    // 点击模式
    onPattern(index) {
      this.current = index;
      // 显示删除图标
      // this.delShow = true;
      for (var i = 0; i < this.list.length; i++) {
        if (index == i) {
          // icon图标
          this.list[i].delShow = true;
        } else {
          // icon图标
          this.list[i].delShow = false;
          // 文字
          this.list[i].textShow = true;
          // 输入框
          this.list[i].inputshow = false;
        }
      }
    },

    // 获取时间
    getDate() {
      const myDate = new Date();
      this.time.year = myDate.getFullYear();
      this.time.month = myDate.getMonth() + 1;
      this.time.day = myDate.getDate();
    },

    // 添加模式
    onAddPattern() {
      this.$axios({
        method: "post",
        url: "/loudspeaker/model",
        data: {
          day: [this.time.day],
          misfirePolicy: "",
          modelId: 1,
          month: this.time.month,
          name: "新建模式",
          playOrder: "1",
          time: ["08:00-09:00"],
          type: "",
          volume: 10,
          week: [],
          year: this.time.year,
          musics: null,
          itemId: this.itemId
        }
      }).then(res => {
        // console.log(res);
        const newPattern = res.config.data;
        // 添加到数组中
        this.list.unshift(newPattern);
        // 刷新页面
        this.loadPattern();
      });
    },

    // 增加音量
    onAdd(num, id) {
      if (num >= 15) {
        return;
      } else {
        num++;
      }
      console.log(num);
      this.$axios({
        method: "put",
        url: "loudspeaker/model/volume",
        data: {
          modelId: id,
          volume: num
        }
      }).then(() => {});
      // 重新渲染页面
      this.loadPattern();
    },

    // 减少音量
    onSub(num, id) {
      if (num <= 0) {
        return;
      } else {
        num--;
      }
      console.log(num);
      this.$axios({
        method: "put",
        url: "loudspeaker/model/volume",
        data: {
          modelId: id,
          volume: num
        }
      }).then(() => {});
      // 重新渲染页面
      this.loadPattern();
    },

    // 修改模式
    editPattern(name, modelId, playOrder) {
      this.$axios({
        method: "put",
        url: "/loudspeaker/model",
        data: {
          day: [this.time.day],
          misfirePolicy: "",
          modelId,
          month: this.time.month,
          name,
          playOrder,
          time: ["08:00-11:00"],
          type: "",
          volume: 10,
          week: [],
          year: this.time.year,
          itemId: this.itemId
        }
      }).then(() => {
        // console.log(res);
        this.inputshow = false;
        this.loadPattern();
      });
    },

    // 改变播放顺序
    editPlayOrdel(playOrder, name, modelId) {
      this.$axios({
        method: "put",
        url: "/loudspeaker/model",
        data: {
          day: [this.time.day],
          misfirePolicy: "",
          modelId,
          month: this.time.month,
          name,
          playOrder,
          time: ["08:00-09:00"],
          type: "",
          volume: 10,
          week: [],
          year: this.time.year,
          itemId: this.itemId
        }
      }).then(() => {});
    },

    // input事件（按下回车）
    keyupInupt(playOrder) {
      // 调用修改模式
      this.editPattern(this.message, this.patternId, playOrder);
      this.inputshow = false;
      this.delShow = false;
    },

    // 点击编辑模式
    onEdit(id, index) {
      for (let i = 0; i < this.list.length; i++) {
        if (index == i) {
          // 输入框
          this.list[i].inputshow = true;
          // 文字
          this.list[i].textShow = false;
        } else {
          // 输入框
          this.list[i].inputshow = false;
        }
      }
      this.patternId = id;
    },

    // 模式添加音乐
    onAddMusic(modelId) {
      // 弹窗显示
      this.musicListShow = true;

      this.modelid = modelId;
    },

    // 添加播放时间
    onPlayTime(modelId, name) {
      this.playShow = true;

      this.modelid = modelId;

      this.name = name;
    }
  }
};
</script>

<style src="../../../style/compont/pattern.css" scoped></style>
