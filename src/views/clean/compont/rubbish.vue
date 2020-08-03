<template>
  <div class="rubbish">
    <!-- 搜索框 -->
    <div class="search">
      <el-input
        v-model="input"
        style="width:80px"
        placeholder="关键字..."
        size="mini"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" size="mini"
        >搜索</el-button
      >
    </div>
    <!-- table表单 -->
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column
        prop="name"
        label="垃圾桶"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="itemName"
        label="所在项目"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="spillPercent"
        label="满溢率"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="model"
        label="型号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="deviceCity"
        label="所属城市"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="cleanerName"
        label="相关保洁人员"
        width="100px"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemId: "",
      total: 0, //数据总条数
      input: "", // 搜索框
      tableData: [], // table表单
      formInline: {
        // 设备名称
        deviceName: "",
        // 设备类型
        deviceType: "",
        // 设备编号
        deviceCode: "",
        // 设备所属城市
        deviceCity: "",
        // 设备型号
        model: "",
        // 安装时间
        deviceCreateat: "",
        // 经度
        geoLng: "",
        // 维度
        geoLat: "",
        // 电话
        tel: "",
        // 负责人
        cleanerName: ""
      } // from表单
    };
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");

    // 获取设备列表
    this.getDevice();
  },
  methods: {
    // 获取设备列表
    getDevice(pageNum) {
      this.$axios({
        method: "get",
        url: "/cleaning/trashCan/page",
        params: {
          pageNum,
          pageSize: 20,
          itemId: this.itemId
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.records;
        // 数据总条数
        this.total = res.data.data.total;
      });
    },

    // 获取分页数据
    getPageIndex(pageNum) {
      // 获取当前页数据
      this.getDevice(pageNum);
    }
  },
  watch: {
    // 搜索设备
    input() {
      if (this.input != "") {
        this.$axios({
          method: "GET",
          url: "/cleaning/trashCan/page",
          params: {
            likeKeyWords: this.input,
            pageNum: 1,
            pageSize: 10,
            itemId: this.itemId
          }
        }).then(res => {
          this.tableData = res.data.data.records;
        });
      } else {
        // 获取设备列表
        this.getDevice();
      }
    }
  }
};
</script>

<style scoped>
.search {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 7px;
}
.search .el-button {
  background-color: #000001;
  margin-left: 5px;
  border: 0;
}
.el-table__header-wrapper {
  background-color: #000;
}
</style>
