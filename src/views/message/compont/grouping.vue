<template>
  <div class="grouping">
    <div class="add" @click="onAddGrouping">+ 新建分组</div>
    <!-- 底部内容 -->
    <div class="content1">
      <!-- 左侧分组 -->
      <div class="left">
        <div>所有分组</div>
        <div class="test-1 scroll">
          <li
            v-for="(item, index) in list"
            :key="index"
            @click="onselec(index, item.groupId, item.modelName)"
            :class="{ active: index == current }"
          >
            <span v-show="item.textShow">{{ item.name }}</span>
            <i
              class="el-icon-delete"
              @click="onDelGrouping(item.groupId)"
              v-show="item.delShow"
            ></i>
            <input
              type="text"
              v-show="item.inputshow"
              v-model="message"
              maxlength="6"
              @keyup.enter="keyupInupt()"
            />
            <i
              class="el-icon-edit-outline"
              @click="onEdit(index, item.groupId)"
              v-show="item.delShow"
            ></i>
          </li>
        </div>
      </div>
      <!-- 右侧设备 -->
      <div class="right">
        <div>所有设备</div>
        <div class="music">
          <span
            v-for="(item, index) in GroupInfo"
            :key="index"
            style="color:#f78606"
            @click="onColor2(index, item.soundId)"
            :class="{ textColor: index == current3 }"
          >
            <!-- 设备离线 -->
            {{ item.name }}
          </span>
        </div>
        <div class="music">
          <span v-for="(item, index) in loudspeakers" :key="index">
            <!-- 设备离线 -->
            <label
              style="cursor: not-allowed;color:red"
              v-if="item.status == 1"
              >{{ item.name }}</label
            >
            <!-- 在当前组里 正常 -->
            <label
              @click="onColor(index, item.soundId)"
              :class="{ textColor2: index == current2 }"
              style="color:#15f6f3"
              v-if="item.status == 0"
              >{{ item.name }}</label
            >
          </span>
        </div>
        <div class="select">
          <div class="confirm" @click="addLoudspeaker()">添加</div>
          <div class="cancel" @click="delLoudspeaker()">删除</div>
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
      // 文本内容显示或隐藏
      text: true,
      // 样式为空
      current: -1,
      current2: -1,
      current3: -1,
      // 删除图标隐藏
      delShow: false,
      // 输入框隐藏
      inputshow: false,
      modelName: "",
      // 分组列表
      list: [],
      // 新建分组
      newArr: [],
      // 音柱列表
      loudspeakers: [],
      // 输入框内容
      message: "",
      // 需要修改分组的id
      groupId: "",
      // 音柱多选
      arr: [],
      // 音柱id
      soundId: "",
      GroupInfo: []
    };
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");
    // 获取分组
    this.loadGrouping();
    // 获取音柱
    this.loadLoudspeaker();
  },
  mounted() {},
  methods: {
    // 点击添加样式
    onselec(index, groupId, modelName) {
      this.current = index;
      this.groupId = groupId;
      this.modelName = modelName;
      // this.delShow = true;
      for (let i = 0; i < this.list.length; i++) {
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
      this.getGroupInfo();
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
        this.list = res.data.data.records;
        this.list.forEach(item => {
          this.$set(item, "textShow", true);
        });
      });
    },

    // 删除分组
    onDelGrouping(id) {
      this.$axios({
        method: "DELETE",
        url: `/loudspeaker/group/${id}`
      }).then(() => {
        // 刷新数据
        this.loadGrouping();
        this.current = -1;
      });
    },

    // 添加分组
    onAddGrouping() {
      this.$axios({
        method: "POST",
        url: "/loudspeaker/group",
        data: {
          name: "新建分组",
          itemId: this.itemId
        }
      }).then(res => {
        console.log(res);
        this.newArr = res.config.data;
        // 将新分组添加
        this.list.unshift(this.newArr);
        // 重新获取数据
        this.loadGrouping();
        // console.log(res);
      });
    },

    // 修改分组
    editGrouping(name, groupId) {
      console.log(this.modelName);
      this.$axios({
        method: "put",
        url: "/loudspeaker/group",
        data: {
          groupId,
          name,
          itemId: this.itemId,
          modelName: this.modelName
        }
      }).then(res => {
        console.log(res);
        this.loadGrouping();
      });
    },

    // input事件（按下回车）
    keyupInupt() {
      // 调用修改分组
      this.editGrouping(this.message, this.groupId);
      // 清空输入框
      this.message = "";
    },

    // 点击编辑分组
    onEdit(index, groupId) {
      // this.inputshow = true;
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
      this.groupId = groupId;
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

    // 多选音柱
    onColor(index, soundId) {
      this.current2 = index;
      this.soundId = soundId;
    },
    onColor2(index, soundId) {
      this.current3 = index;
      this.soundId = soundId;
    },

    // 给分组添加音柱
    addLoudspeaker() {
      this.$axios({
        method: "post",
        url: "/loudspeaker/group/sound",
        data: {
          groupId: this.groupId,
          soundId: this.soundId
        }
      }).then(() => {
        this.current2 = -1;
        this.loadLoudspeaker();
        this.getGroupInfo();
      });
    },

    // 给分组删除音柱
    delLoudspeaker() {
      this.$axios({
        method: "DELETE",
        url: "/loudspeaker/group/sound",
        data: {
          groupId: this.groupId,
          soundId: this.soundId
        }
      }).then(() => {
        this.getGroupInfo();
        this.loadLoudspeaker();
        this.current3 = -1;
      });
    },

    // 根据id查询设备所在分组
    getGroupInfo() {
      this.$axios({
        method: "get",
        url: `/loudspeaker/group/sound/${this.groupId}`
      }).then(res => {
        this.GroupInfo = res.data.data.records;
      });
    }
  }
};
</script>

<style scoped src="../../../style/compont/grouping.css"></style>
