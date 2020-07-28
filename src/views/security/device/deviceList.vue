<template>
  <div class="deviceList">
    <div class="info">
      <div class="topSide">
        <span>Channel 01</span>
        <span style="color:red">删除</span>
      </div>
      <div class="botSide">
        <div>
          <span>相机编号：</span>
          <span>相机IP：</span>
          <span>端口：</span>
          <span>相机URL：</span>
        </div>
        <div>
          <span>相机通道号：</span>
          <span>视频流类型：</span>
          <span>服务类型：</span>
          <span>videoURL：</span>
        </div>
        <div>
          <span>视频类型：</span>
          <span>用户名：</span>
          <span>用户密码</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.info {
  background: url("../../../assets/img/上地0109-3_04.png") no-repeat;
  background-size: 100% 100%;
  height: 100px;
  padding: 10px 15px;
}
.info .topSide {
  display: flex;
  justify-content: space-between;
}
.info .botSide {
  margin-top: 15px;
}
.info .botSide div {
  margin-bottom: 3px;
  display: flex;
  justify-content: space-around;
}
.info .botSide div span {
  flex: 25%;
  font-size: 14px;
}
</style>
