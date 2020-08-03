<template>
  <div class="matching">
    <div class="search">
      <input type="text" placeholder="搜索分组..." />
    </div>
    <div class="main">
      <!-- 左侧分组 -->
      <div class="left">
        <div class="title">所有分组（{{ groupingNum }}）</div>
        <div class="scroll test-1">
          <li
            v-for="(item, index) in groupingList"
            :key="index"
            @click="onselec(index, item.groupId, item.groupName)"
            :class="{ active: index == current }"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.modelName }}</span>
          </li>
        </div>
      </div>
      <!-- 右侧模式 -->
      <div class="right">
        <div class="head">全部模式 （{{ pattrenNum }}）</div>
        <div class="scroll test-1">
          <div
            class="playList img"
            v-for="(item, index) in pattrenList"
            :key="index"
            @click="getModelId(item.modelId, index)"
            :class="{ active_1: index == current_1 }"
          >
            <div class="music" style="color:#15f6f3">{{ item.name }}</div>
            <div class="time">
              <span style="width: 29%">
                播放内容：{{
                  item.musics == "" ||
                  item.musics == null ||
                  item.musics == undefined
                    ? ""
                    : item.musics[0].name
                }}
              </span>
              <span style="width: 29%">
                播放时间：
                <select>
                  <option
                    v-for="(item, index) in item.timeList"
                    :key="index"
                    value
                    >{{ item }}</option
                  >
                </select>
              </span>
              <span style="width: 29%">
                播放顺序：
                <i v-if="item.playOrder === '1'">顺序播放</i>
                <i v-if="item.playOrder === '2'">倒序播放</i>
                <i v-if="item.playOrder === '3'">随机播放</i>
              </span>
              <span style="width: 13%">
                音量：
                <span>{{ item.volume }}</span>
              </span>
            </div>
          </div>
        </div>
        <!-- 底部按钮区域 -->

        <div class="select">
          <div class="confirm" @click="putPattern()">添加</div>
          <div class="cancel" @click="delShow = true">删除</div>
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
      // 模式列表
      pattrenList: [],
      // 模式时间
      times: [],
      // 模式数量
      pattrenNum: "",
      // 分组列表
      groupingList: [],
      // 分组数量
      groupingNum: "",
      // 分组样式为空
      current: -1,
      // 模式样式为空
      current_1: "",
      // 分组id
      groupId: "",
      // 分组名称
      groupName: "",
      // 模式id
      modelId: ""
    };
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");
    // 获取模式列表
    this.loadPattern();
    // 获取分组列表
    this.loadGrouping();
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
        // 数量
        this.pattrenNum = res.data.data.total;
        this.pattrenList = res.data.data.records;
      });
    },

    // 获取分组列表
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
        // 模式数量
        this.groupingNum = res.data.data.total;
      });
    },

    // 点击添加样式
    onselec(index, groupId, groupName) {
      this.current = index;
      // 分组id
      this.groupId = groupId;
      // 分组名称
      this.groupName = groupName;
    },

    // 获取模式id
    getModelId(modelId, index) {
      this.modelId = modelId;
      this.current_1 = index;
    },

    // 修改分组
    putPattern() {
      this.$axios({
        method: "put",
        url: "/loudspeaker/group",
        data: {
          groupId: this.groupId,
          modelId: this.modelId,
          name: `${this.groupName}`,
          itemId: this.itemId
        }
      })
        .then(res => {
          console.log(res);
          // 获取分组列表
          this.loadGrouping();
        })
        .catch(() => {
          // 获取分组列表
          this.loadGrouping();
        });
    }
  }
};
</script>

<style src="../../../style/compont/matching.css" scoped></style>
