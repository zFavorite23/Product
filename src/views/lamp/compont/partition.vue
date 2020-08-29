<template>
  <div class="partition">
    <div class="add" @click="addShow = true">
      <i class="el-icon-plus"></i>
      新建分区
    </div>
    <div class="name">
      <span>分区名称</span>
      <div class="data">
        <span
          v-for="(item, index) in groupList"
          :key="index"
          @click="onselec(index, item.groupId)"
          :class="{ active: index == current }"
        >
          <i v-show="item.textShow">{{ item.name }}</i>
          <i
            class="el-icon-delete"
            v-show="item.delShow"
            @click="delShow = true"
          ></i>
          <input
            type="text"
            v-show="item.inputshow"
            v-model="message"
            @blur="keyupInupt()"
            maxlength="6"
          />
          <i
            class="el-icon-edit-outline"
            v-show="item.delShow"
            @click="onEdit(index, item.groupId)"
          ></i>
        </span>
      </div>

      <!--  添加分组 -->
      <div class="addGroup" v-show="addShow">
        <span>新建分区名称</span>
        <input type="text" v-model="name" maxlength="6" />
        <div class="select">
          <div class="confirm" @click="addGroup">确定</div>
          <div class="cancel" @click="addShow = false">取消</div>
        </div>
      </div>

      <!--  删除分区 -->
      <div class="delGroup" v-show="delShow">
        <span>是否删除当前分区</span>
        <div class="select" style="margin-top:20px">
          <div class="confirm" @click="deleteGroup()">确定</div>
          <div class="cancel" @click="delShow = false">取消</div>
        </div>
      </div>
    </div>
    <div class="facility">
      <span>所有路灯</span>

      <!-- 所有路灯 -->
      <div class="data2">
        <span v-for="(item, index) in lampList" :key="index">
          <!-- 设备离线 -->
          <span
            class="color2"
            style="cursor: not-allowed"
            v-if="item.status == 1"
            >{{ item.name }}</span
          >
          <!-- 在当前组里 正常 -->
          <span
            @click="onColor(item.lampId)"
            class="color"
            v-if="item.groupId == groupId && item.status == 0"
            >{{ item.name }}</span
          >
          <!-- 不在当前在别组里  正常 -->
          <span
            @click="onColor(item.lampId)"
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
            @click="onColor(item.lampId)"
            v-if="item.groupId == null && item.status == 0"
            >{{ item.name }}</span
          >
        </span>
      </div>

      <div class="select">
        <div class="confirm" @click="addLamp()">添加</div>
        <div class="cancel" @click="deleteLamp()">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addShow: false, // 新增分组名称显示控制
      delShow: false,
      name: "", // 新建分组名称
      current: -1, // 分组默认样式
      groupList: [], // 分组列表
      newGroup: [], // 新建分组
      lampList: [], // 路灯列表
      message: "", // 编辑输入框内容
      groupId: "", // 需要修改分组的ID
      lampId: "" // 路灯ID
    };
  },
  methods: {
    // 点击添加样式
    onselec(index, groupId) {
      this.current = index;
      this.groupId = groupId;
      // console.log(this.groupId);
      for (let i = 0; i < this.groupList.length; i++) {
        if (index == i) {
          // icon图标
          this.groupList[i].delShow = true;
        } else {
          // icon图标
          this.groupList[i].delShow = false;
          // 文字
          this.groupList[i].textShow = true;
          // 输入框
          this.groupList[i].inputshow = false;
        }
      }
      this.getLamp(groupId);
    },

    // 获取所有路灯
    getLamp() {
      this.$axios({
        method: "get",
        url: "/lighting/lamp/all/"
      }).then(res => {
        this.lampList = res.data.data;
      });
    },

    // 获取所有分组
    getGroup() {
      this.$axios({
        method: "get",
        url: "/lighting/group/all"
      }).then(res => {
        // console.log(res);
        this.groupList = res.data.data;
        this.groupList.forEach(item => {
          this.$set(item, "textShow", true);
        });
        this.groupList.reverse();
      });
    },

    // 添加分组
    addGroup() {
      this.$axios({
        method: "post",
        url: "/lighting/group",
        data: {
          groupId: null,
          name: this.name
        }
      }).then(res => {
        // 进行判断
        if (res.data.code === 1) {
          confirm(res.data.msg);
          this.name = "";
          return;
        }

        this.newGroup = res.config.data;

        // 将新分组添加
        this.groupList.push(this.newGroup);

        // 重新获取列表
        this.getGroup();

        // 关闭弹窗
        this.addShow = false;
        // 清除输入框缓存
        this.name = "";
      });
    },

    // 删除分组
    deleteGroup() {
      this.$axios({
        method: "delete",
        url: `/lighting/group/${this.groupId}`
      }).then(() => {
        // 获取所有分组
        this.getGroup();
        this.delShow = false;
        this.current = -1;
      });
    },

    // 修改分组
    editGroup(name, groupId) {
      this.$axios({
        method: "put",
        url: "/lighting/group",
        data: {
          groupId,
          name
        }
      }).then(() => {
        // console.log(res);
        // 获取所有分组
        this.getGroup();
      });
    },

    // 点击编辑按钮
    onEdit(index, groupId) {
      for (var i = 0; i < this.groupList.length; i++) {
        if (index == i) {
          // 输入框
          this.groupList[i].inputshow = true;
          // 文字
          this.groupList[i].textShow = false;
        } else {
          // 输入框
          this.groupList[i].inputshow = false;
        }
      }

      this.groupId = groupId;
    },

    // input事件（按下回车）
    keyupInupt() {
      // 调用修改分组
      this.editGroup(this.message, this.groupId);
      // 清空输入框
      this.message = "";
    },

    onColor(lampId) {
      this.lampId = lampId;
    },
    // 分组添加路灯
    addLamp() {
      this.$axios({
        method: "post",
        url: `/lighting/group/lamp`,
        data: {
          groupId: this.groupId,
          lampId: this.lampId
        }
      }).then(() => {
        this.getLamp();
      });
    },

    // 分组删除路灯
    deleteLamp() {
      this.$axios({
        method: "delete",
        url: `/lighting/group/lamp`,
        data: {
          groupId: this.groupId,
          lampId: this.lampId
        }
      }).then(() => {
        this.getLamp();
      });
    }
  },
  created() {
    // 获取所有分组
    this.getGroup();
    // 获取所有路灯
    this.getLamp();
  }
};
</script>
<style src="../../../style/compont/partition.css" scoped></style>
