<template>
  <div class="grouping">
    <div class="add" @click="onAddGrouping">+ 新建分组</div>
    <!-- 底部内容 -->
    <div class="content1">
      <!-- 左侧分组 -->
      <div class="left">
        <div>所有分组 ({{ num }})</div>
        <div class="test-1 scroll">
          <li
            v-for="(item, index) in list"
            :key="index"
            @click="onselec(index, item.groupId)"
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
        <div>所有设备 ({{ facilityNum }})</div>
        <div class="music">
          <span v-for="(item, index) in loudspeakers" :key="index">
            <!-- 设备离线 -->
            <span
              class="color2"
              style="cursor: not-allowed"
              v-if="item.status == 1"
              >{{ item.name }}</span
            >
            <!-- 在当前组里 正常 -->
            <span
              @click="onColor(index, item.soundId, item.groupId)"
              class="color"
              v-if="item.groupId == groupId && item.status == 0"
              >{{ item.name }}</span
            >
            <!-- 不在当前在别组里  正常 -->
            <span
              @click="onColor(index, item.soundId, item.groupId)"
              class="color4"
              v-if="
                item.groupId != null &&
                  item.groupId != groupId &&
                  item.status == 0
              "
              >{{ item.name }}</span
            >
            <!-- 不在任何组里 正常 -->
            <span
              class="color3"
              @click="onColor(index, item.soundId, item.groupId)"
              v-if="item.groupId == null && item.status == 0"
              >{{ item.name }}</span
            >
          </span>
        </div>
        <div class="select">
          <div class="confirm" @click="addLoudspeaker()">添加</div>
          <div class="cancel" @click="addLoudspeaker()">删除</div>
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
      // 删除图标隐藏
      delShow: false,
      // 输入框隐藏
      inputshow: false,
      // 分组列表
      list: [],
      // 新建分组
      newArr: [],
      // 分组数量
      num: "",
      // 音柱列表
      loudspeakers: [],
      // 音柱设备数量
      facilityNum: "",
      // 输入框内容
      message: "",
      // 需要修改分组的id
      groupId: "",
      // 音柱多选
      arr: [],
      // 音柱id
      soundId: "",
      str: []
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
    onselec(index, groupId) {
      this.current = index;
      this.groupId = groupId;
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
      this.loadLoudspeaker();
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
        this.num = res.data.data.total;
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
          groupId: 0,
          modelId: 0,
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
      this.$axios({
        method: "put",
        url: "/loudspeaker/group",
        data: {
          groupId,
          name,
          itemId: this.itemId
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
        console.log(res);
        this.loudspeakers = res.data.data.records;
        this.facilityNum = res.data.data.total;
      });
    },

    // 多选音柱
    onColor(i, soundId) {
      var idx = this.arr.indexOf(i);
      if (idx > -1) {
        this.arr.splice(idx, 1);
      } else {
        this.arr.push(i);
      }
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
      }).then(res => {
        console.log(res);
        this.loadLoudspeaker();
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
      }).then(res => {
        console.log(res);
        this.loadLoudspeaker();
      });
    }
  }
};
</script>

<style scoped src="../../../style/compont/grouping.css"></style>
