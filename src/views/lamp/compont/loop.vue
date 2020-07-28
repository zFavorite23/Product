<template>
  <div class="loop">
    <div class="name">
      <span>全部分组</span>
      <div class="data">
        <span
          v-for="(item, index) in groupList"
          :key="index"
          @click="onselec(index)"
          :class="{ active: index == current }"
          >{{ item.name }}</span
        >
      </div>
      <div class="addModel" v-show="delShow">
        <span>{{ status == 1 ? "是否开启路灯" : "是否关闭路灯" }}</span>
        <div class="select">
          <div class="confirm" @click="lampStatus()">确定</div>
          <div
            class="cancel"
            @click="
              delShow = false;
              current2 = -1;
            "
          >
            取消
          </div>
        </div>
      </div>
    </div>
    <div class="status">
      <span>状态面板</span>
      <div class="data">
        <span v-for="(item, index) in lampList" :key="index">
          <!-- 离线状态 -->

          <p
            style="color:red"
            v-if="item.status == 1"
            @click="onselec2(index, item.status, item.lampId)"
            :class="{ active2: index == current2 }"
          >
            {{ item.name }}
          </p>

          <p
            v-else
            @click="onselec2(index, item.status, item.lampId)"
            :class="{ active2: index == current2 }"
          >
            {{ item.name }}
          </p>
        </span>
      </div>
      <div class="select">
        <div class="confirm" @click="delShow = true" v-if="status == 1">
          开启
        </div>
        <div class="cancel" @click="delShow = true" v-if="status == 0">
          关闭
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      delShow: false, // 新增框显示状态
      current: -1, // 默认样式
      current2: -1, // 默认样式
      status: 2,
      lampId: "",
      lampList: [],
      groupList: []
    };
  },
  methods: {
    // 点击添加样式
    onselec(index) {
      this.current = index;
    },
    onselec2(index, status, lampId) {
      this.current2 = index;
      this.status = status;
      this.lampId = lampId;
    },

    // 获取所有路灯
    getLamp() {
      this.$axios({
        method: "get",
        url: "/lighting/lamp/all"
      }).then(res => {
        console.log(res);
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
        this.total = res.data.data.total;
        this.groupList.reverse();
      });
    },

    // 开启/关闭路灯
    lampStatus() {
      if (this.status == 0) {
        this.status = 1;
        this.$axios({
          method: "GET",
          url: "/lighting/lamp/lampStatus",
          params: {
            lampId: this.lampId,
            status: this.status
          }
        }).then(() => {
          this.delShow = false;
          this.getLamp();
          this.current2 = -1;
        });
      } else if (this.status == 1) {
        this.status = 0;
        this.$axios({
          method: "GET",
          url: "/lighting/lamp/lampStatus",
          params: {
            lampId: this.lampId,
            status: this.status
          }
        }).then(() => {
          this.delShow = false;
          this.getLamp();
          this.current2 = -1;
        });
      }
    }
  },
  created() {
    this.getLamp();
    this.getGroup();
  }
};
</script>

<style src="../../../style/compont/loop.css" scoped></style>
