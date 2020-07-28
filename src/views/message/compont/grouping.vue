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
            <span v-show="text">{{ item.groupName }}</span>
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
          <label v-for="(item, index) in loudspeakers" :key="index">
            <!-- 设备离线 -->
            <span
              class="color2"
              style="cursor: not-allowed"
              v-if="item.status == 1"
              >{{ item.name }}</span
            >
            <!-- 在当前组里 正常 -->
            <span
              @click="onColor(index, item.loudspeakerId, item.groupId)"
              class="color"
              v-if="item.groupId == groupId && item.status == 0"
              >{{ item.name }}</span
            >
            <!-- 不在当前在别组里  正常 -->
            <span
              @click="onColor(index, item.loudspeakerId, item.groupId)"
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
              @click="onColor(index, item.loudspeakerId, item.groupId)"
              v-if="item.groupId == null && item.status == 0"
              >{{ item.name }}</span
            >
          </label>
        </div>
        <div class="xuan">
          <div class="ok" @click="addLoudspeaker()">添加</div>
          <div class="del" @click="delLoudspeaker()">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文本内容显示或隐藏
      text: true,
      // 样式为空
      current: "",
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
      loudspeakerId: "",
      str: []
    };
  },
  created() {
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
          // console.log(this.list[i].groupName);
          this.list[i].delShow = true;
        } else {
          this.list[i].delShow = false;
        }
      }
      this.loadLoudspeaker();
    },

    // 获取分组
    loadGrouping() {
      this.$axios({
        method: "GET",
        url: "/loudspeaker/group/page"
      }).then(res => {
        this.list = res.data.data.records;
        this.num = res.data.data.total;
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
          name: "新建分组"
        }
      }).then(res => {
        this.newArr = res.config.data;
        // 将新分组添加
        this.list.unshift(this.newArr);
        // 重新获取数据
        this.loadGrouping();
        // console.log(res);
      });
    },

    // 修改分组
    editGrouping(text, id) {
      this.$axios({
        method: "put",
        url: "/loudspeaker/group",
        data: {
          groupId: id,
          modelId: 0,
          name: text
        }
      }).then(() => {
        this.loadGrouping();
      });
    },

    // input事件（按下回车）
    keyupInupt() {
      // 调用修改分组
      this.editGrouping(this.message, this.groupId);
    },

    // 点击编辑分组
    onEdit(index, groupId) {
      // this.inputshow = true;
      for (let i = 0; i < this.list.length; i++) {
        if (index == i) {
          this.list[i].inputshow = true;
          // 隐藏文字
          this.text = false;
        } else {
          this.list[i].inputshow = false;
          this.text = true;
        }
      }
      this.groupId = groupId;
    },

    // 获取音柱列表
    loadLoudspeaker() {
      this.$axios({
        method: "GET",
        url: "/loudspeaker/loudspeaker/page"
      }).then(res => {
        this.loudspeakers = res.data.data.records;
        this.facilityNum = res.data.data.total;
      });
    },

    // 多选音柱
    onColor(i, loudspeakerId) {
      var idx = this.arr.indexOf(i);
      if (idx > -1) {
        this.arr.splice(idx, 1);
      } else {
        this.arr.push(i);
      }
      this.loudspeakerId = loudspeakerId;
    },

    // 给分组添加音柱
    addLoudspeaker() {
      this.$axios({
        method: "post",
        url: "/loudspeaker/group/loudspeaker",
        data: {
          groupId: this.groupId,
          loudspeakerId: this.loudspeakerId
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
        url: "/loudspeaker/group/loudspeaker",
        data: {
          groupId: this.groupId,
          loudspeakerId: this.loudspeakerId
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
