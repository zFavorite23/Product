<template>
  <div class="mate">
    <div class="name">
      <span class="title">
        <span>分区名称</span>
        <span>模式名称</span>
      </span>
      <div class="data">
        <div
          v-for="(item, index) in groupList"
          :key="index"
          @click="onselec(index, item.groupId, item.modelId)"
          :class="{ active: index == current }"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.modelName }}</span>
        </div>
      </div>
      <!-- 添加模式 -->
      <div class="addModel" v-show="delShow">
        <span>是否删除分区模式</span>
        <div class="select">
          <div class="confirm" @click="delGroupModelList()">确定</div>
          <div class="cancel" @click="delShow = false">取消</div>
        </div>
      </div>
    </div>
    <div class="status">
      <span>状态面板</span>
      <div class="data">
        <div
          class="main"
          v-for="(item, index) in modelList"
          :key="index"
          @click="onselec2(index, item.modelId)"
        >
          <div class="top" :class="{ color1: index == current2 }">
            <span>{{ item.name }}</span>
            <span>
              <span>类型：GT</span>
              <span style="margin-left:25px"
                >开启时间：{{ item.openTime }}</span
              >
            </span>
          </div>

          <div class="bot" :class="{ color2: index == current2 }">
            <div>
              <span v-if="item.status == 1">光照开关</span>
              <span v-if="item.status == 0">时段开关</span>
              <span style="font-size:12px">{{ item.city }}</span>
              <span style="font-size:12px">{{ item.sesson }}</span>
              <span>关闭时间</span>
              <span style="font-size:12px">{{ item.downTime }}</span>
            </div>
            <div>
              <span>时间递减</span>
              <span style="font-size:12px">{{
                item.selfData[0].selfTime
              }}</span>
              <span style="font-size:12px">{{
                `${item.selfData[0].lightNess} lux`
              }}</span>
              <span style="font-size:12px">{{
                item.selfData.length > 1 ? item.selfData[1].selfTime : ""
              }}</span>
              <span style="font-size:12px">{{
                item.selfData.length > 1
                  ? `${item.selfData[1].lightNess}lux`
                  : ""
              }}</span>
              <span>无人时亮度</span>
              <span style="font-size:12px">{{ item.noLightness }}lux</span>
            </div>
          </div>
        </div>
      </div>
      <div class="select">
        <div class="confirm" @click="addGroupModelList()">添加</div>
        <div class="cancel" @click="delShow = true">删除</div>
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
      selectModel: "",
      groupList: [], // 分组列表
      modelList: [], // 模式列表
      groupId: "", // 分组ID
      modelId: "" // 模式id
    };
  },
  methods: {
    // 点击添加样式
    onselec(index, groupId, modelId) {
      this.current = index;
      this.groupId = groupId;
      this.modelId = modelId;
    },
    // 点击添加样式
    onselec2(index, modelId) {
      this.current2 = index;
      this.modelId = modelId;
    },

    // 获取所有分组
    getGroup() {
      this.$axios({
        method: "get",
        url: "/lighting/group/all"
      }).then(res => {
        // console.log(res)
        this.groupList = res.data.data;
        this.total = res.data.data.total;
        this.groupList.reverse();
      });
    },

    // 获取所有模式
    getModel() {
      this.$axios({
        method: "get",
        url: "/lighting/model/all"
      }).then(res => {
        console.log(res);
        this.modelList = res.data.data;
        this.modelList.reverse();
      });
    },

    // 分组添加模式
    addGroupModelList() {
      this.$axios({
        method: "post",
        url: "/lighting/model/groupModelAdd",
        data: {
          groupId: this.groupId,
          modelId: this.modelId
        }
      }).then(res => {
        console.log(res);

        this.getGroup();
      });
    },

    // 分组删除模式
    delGroupModelList() {
      console.log(this.modelId, this.groupId);
      this.$axios({
        method: "get",
        url: `/lighting/model/delGroupModelById/${this.modelId}/${this.groupId}`
      }).then(() => {
        // console.log(res);
        // 获取所有分组
        this.getGroup();
        this.delShow = !this.delShow;
      });
    }
  },
  created() {
    // 获取所有分组
    this.getGroup();

    // 获取所有模式
    this.getModel();
  }
};
</script>

<style src="../../../style/compont/mate.css" scoped></style>
