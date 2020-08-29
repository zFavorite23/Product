<template>
  <div class="tactics">
    <div class="add" @click="addShow = true">
      <i class="el-icon-plus"></i>
      新建策略
    </div>
    <div class="name">
      <span>策略名称</span>
      <div class="data">
        <span
          style="border-bottom: 1px solid #000;"
          v-for="(item, index) in strategyList"
          :key="index"
          @click.stop="onselec(index, item.strategyId)"
          :class="{ active: index == current }"
        >
          <div>
            <i v-show="item.textShow">{{ item.name }}</i>
            <i
              class="el-icon-edit-outline"
              v-show="item.delShow"
              @click.stop="onEdit(index, item.strategyId)"
            ></i>
            <input
              type="text"
              v-show="item.inputshow"
              v-model="message"
              @blur="keyupInupt()"
            />
            <i
              class="el-icon-delete"
              v-show="item.delShow"
              @click="delShow = true"
            ></i>

            <span
              class="el-switch"
              @click.stop="editStatus(item.strategyId, item.status)"
              >{{ item.status == 0 ? "启用" : "禁用" }}</span
            >
          </div>
          <!-- 策略所选的分组 -->
          <div v-show="item.condition" class="child">
            <div
              v-for="(item, index) in strategyInfoList"
              :key="index"
              @click.stop="onselec2(index, item.groupId)"
              :class="{ active2: index == current2 }"
            >
              <span>{{ item.groupName }}</span>
              <span>{{ item.modelName }}</span>
            </div>
          </div>
        </span>
      </div>

      <!--  新增建策 -->
      <div class="addStrategy" v-show="addShow">
        <span>新建策略名称</span>
        <input type="text" v-model="name" />
        <div class="select">
          <div class="confirm" @click="addStrategy">确定</div>
          <div class="cancel" @click="addShow = false">取消</div>
        </div>
      </div>

      <!--  删除建策 -->
      <div class="delStrategy" v-show="delShow">
        <span>是否删除当前策略</span>
        <div class="select" style="margin-top:20px">
          <div class="confirm" @click="delStrategy()">确定</div>
          <div class="cancel" @click="delShow = false">取消</div>
        </div>
      </div>
    </div>
    <div class="status">
      <span class="title">
        <span>分区名称</span>
        <span>模式名称</span>
      </span>
      <div class="data">
        <div
          v-for="(item, index) in groupList"
          :key="index"
          @click.stop="onselec3(index, item.groupId)"
          :class="{ active3: index == current3 }"
        >
          <span style="margin-left:10px">{{ item.name }}</span>
          <span style="margin-right:10px">{{ item.modelName }}</span>
        </div>
      </div>
      <div class="select">
        <div class="confirm" @click="addMiddleStrategy()">添加</div>
        <div class="cancel" @click="delMiddleStrategy()">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addShow: false,
      delShow: false,
      status: "",
      name: "",
      current: -1, // 默认样式
      current2: -1,
      current3: -1,
      strategyInfoList: "", // 详情
      groupList: [], // 分组列表
      strategyList: [], // 策略列表
      newStrategy: [], // 新增策略
      strategyId: "", // 策略id
      groupId: "", // 分组id
      message: "" // 编辑框输入内容
    };
  },
  methods: {
    // 点击添加样式
    onselec(index, strategyId) {
      this.current = index;
      this.strategyId = strategyId;
      for (let i = 0; i < this.strategyList.length; i++) {
        if (index == i) {
          // icon图标
          this.strategyList[i].delShow = true;
          this.strategyList[i].condition = !this.strategyList[i].condition;
        } else {
          // icon图标
          this.strategyList[i].delShow = false;
          // 文字
          this.strategyList[i].textShow = true;
          // 输入框
          this.strategyList[i].inputshow = false;
          this.strategyList[i].condition = false;
        }
      }

      this.strategyInfo();
    },
    // 点击添加样式
    onselec2(index, groupId) {
      this.current2 = index;
      this.groupId = groupId;
    },
    // 点击添加样式
    onselec3(index, groupId) {
      this.current3 = index;
      this.groupId = groupId;
    },

    // 获取所有分组
    getGroup() {
      this.$axios({
        method: "get",
        url: "/lighting/group/all"
      }).then(res => {
        // console.log(res);
        this.groupList = res.data.data;
        this.total = res.data.data.total;
        this.groupList.reverse();
      });
    },

    // 获取策略列表
    getStrategy() {
      this.$axios({
        method: "get",
        url: "/lighting/strategy/list"
      }).then(res => {
        // console.log(res);
        this.strategyList = res.data.data;
        this.strategyList.forEach(item => {
          this.$set(item, "textShow", true);
        });
        this.strategyList.reverse();
      });
    },

    // 添加策略
    addStrategy() {
      this.$axios({
        method: "post",
        url: "/lighting/strategy/saveStrategy",
        data: {
          name: this.name
        }
      }).then(res => {
        // 进行判断
        if (res.data.code === 1) {
          confirm(res.data.msg);
          this.name = "";
          return;
        }

        // console.log(res);
        this.newStrategy = res.config.data;

        // 将新分组添加
        this.strategyList.push(this.newStrategy);

        // 关闭弹窗
        this.addShow = false;
        // 清除输入框缓存
        this.name = "";
        // 获取策略列表
        this.getStrategy();
      });
    },

    // 删除策略
    delStrategy() {
      this.$axios({
        method: "get",
        url: `/lighting/strategy/delStrategy`,
        params: {
          strategyId: this.strategyId
        }
      }).then(() => {
        // 获取策略列表
        this.getStrategy();
        this.current = -1;
        this.delShow = false;
      });
    },

    // 修改模式
    editStrategy(name, strategyId) {
      this.$axios({
        method: "POST",
        url: "/lighting/strategy/updateStrategy",
        data: {
          strategyId,
          name
        }
      }).then(res => {
        // 进行判断
        if (res.data.code === 1) {
          confirm(res.data.msg);
          this.name = "";
          return;
        }
        // 获取所有策略
        this.getStrategy();
      });
    },

    // 点击编辑按钮
    onEdit(index, strategyId) {
      for (var i = 0; i < this.strategyList.length; i++) {
        if (index == i) {
          // 输入框
          this.strategyList[i].inputshow = true;
          // 文字
          this.strategyList[i].textShow = false;
        } else {
          // 输入框
          this.strategyList[i].inputshow = false;
        }
      }

      this.strategyId = strategyId;
    },

    // input事件（按下回车）
    keyupInupt() {
      // 调用修改分组
      this.editStrategy(this.message, this.strategyId);
      // 清空输入框
      this.message = "";
    },

    // 修改策略状态
    editStatus(strategyId, status) {
      if (status == 0) {
        this.status = 1;
      } else {
        this.status = 0;
      }
      console.log(this.status);
      this.$axios({
        method: "post",
        url: "/lighting/strategy/updateStrategy",
        data: {
          strategyId,
          status: this.status
        }
      }).then(() => {
        // 获取策略列表
        this.getStrategy();
      });
    },

    //  策略详情
    strategyInfo() {
      this.$axios({
        method: "get",
        url: `/lighting/strategy/strategyById/${this.strategyId}`
      }).then(res => {
        // console.log(res);
        this.strategyInfoList = res.data.data;
      });
    },

    // 策略添加分组
    addMiddleStrategy() {
      this.$axios({
        method: "post",
        url: "/lighting/strategy/addMiddleStrategy",
        data: {
          strategyId: this.strategyId,
          groupId: this.groupId
        }
      }).then(() => {
        // console.log(res);

        this.strategyInfo();
      });
    },

    // 策略删除分组
    delMiddleStrategy() {
      console.log(this.groupId, this.strategyId);
      this.$axios({
        method: "post",
        url: "/lighting/strategy/delMiddleStrategy",
        data: {
          strategyId: this.strategyId,
          groupId: this.groupId
        }
      }).then(() => {
        // console.log(res);
        this.strategyInfo();
      });
    }
  },
  created() {
    // 获取所有分组
    this.getGroup();

    // 获取策略列表
    this.getStrategy();
  }
};
</script>

<style src="../../../style/compont/tactics.css" scoped></style>
