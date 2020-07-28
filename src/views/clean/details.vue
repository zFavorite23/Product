<template>
  <div class="details">
    <!-- <div class="left1">
      <div>垃圾桶满溢率：95%</div>
      <div>
        <span>是否发送给保洁人员：</span>
        <button>发送</button>
      </div>
      <div>
        <span>是否发送给管理人员：</span>
        <button>发送</button>
      </div>
    </div> -->
    <div class="right2">
      <div>
        <span>设备状态：</span>
        <span style="color:#65fc01">{{
          spill.status === "0" ? "已连接" : "未连接"
        }}</span>
      </div>

      <div>
        <span>电池电压：</span>
        <span>220V</span>
      </div>

      <div>
        <span>满桶状态：</span>
        <span>{{ spill.totalRate == 0 ? "未满" : "已满" }}</span>
      </div>

      <div>
        <span>开门次数：</span>
        <span>3次</span>
      </div>
      <div>
        <span>压缩次数：</span>
        <span>5次</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spill: []
    };
  },
  props: ["deviceCode"],
  methods: {},
  watch: {
    deviceCode() {
      this.$axios({
        method: "get",
        url: `/cleaning/trashCan/info/${this.deviceCode}`
      }).then(res => {
        console.log(res);
        this.spill = res.data.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.details {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  .left1 {
    padding-top: 5px;
    div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      button {
        font-size: 10px;
        border-style: none;
        outline: none;
        border-radius: 5px;
        background-color: skyblue;
      }
    }
  }
  .right2 {
    padding-top: 5px;
    width: 150px;
    div {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
