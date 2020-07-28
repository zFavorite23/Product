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
      <!-- <el-button type="primary" size="mini" @click="dialogVisible = true;">新增</el-button> -->
    </div>
    <!-- table表单 -->
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column
        prop="deviceName"
        label="垃圾桶"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="deviceType"
        label="类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="deviceCreateat"
        label="安装时间"
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
      <!-- <el-table-column prop="operation" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="getId(scope.row.deviceCode)">编辑</el-button>
          <el-button size="mini" @click="delDevice(scope.row.deviceCode)">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <!-- 新增弹窗 -->
    <el-dialog
      title="新增垃圾桶"
      :lock-scroll="false"
      :visible.sync="dialogVisible"
      width="25%"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="垃圾桶：">
          <el-input v-model="formInline.deviceName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-radio v-model="formInline.deviceType" label="1"
            >可回收物</el-radio
          >
          <el-radio v-model="formInline.deviceType" label="2"
            >厨余垃圾</el-radio
          >
          <el-radio v-model="formInline.deviceType" label="3"
            >其他垃圾</el-radio
          >
          <el-radio v-model="formInline.deviceType" label="4"
            >有害垃圾</el-radio
          >
        </el-form-item>
        <el-form-item label="设备编号：">
          <el-input v-model="formInline.deviceCode" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="所属城市：" size="mini">
          <el-input v-model="formInline.deviceCity"></el-input>
        </el-form-item>
        <el-form-item label="型号：">
          <el-input v-model="formInline.model" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="安装时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="formInline.deviceCreateat"
            type="date"
            placeholder="选择日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="经度：">
          <el-input v-model="formInline.geoLng" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="纬度：">
          <el-input v-model="formInline.geoLat" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input v-model="formInline.tel" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="保洁人员：">
          <el-input v-model="list" size="mini">
            <i
              slot="suffix"
              class="el-input__icon el-icon-user-solid"
              @click="getClean()"
            ></i>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addDevice()" size="mini"
          >提 交</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <!-- <el-dialog :lock-scroll="false" title="编辑垃圾桶" :visible.sync="dialogVisible2" width="25%">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="垃圾桶：">
          <el-input v-model="formInline.deviceName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-radio v-model="formInline.deviceType" label="1">可回收物</el-radio>
          <el-radio v-model="formInline.deviceType" label="2">厨余垃圾</el-radio>
          <el-radio v-model="formInline.deviceType" label="3">其他垃圾</el-radio>
          <el-radio v-model="formInline.deviceType" label="4">有害垃圾</el-radio>
        </el-form-item>
        <el-form-item label="设备编号：">
          <el-input v-model="formInline.deviceCode" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="所属城市：" size="mini">
          <el-input v-model="formInline.deviceCity"></el-input>
        </el-form-item>
        <el-form-item label="型号：">
          <el-input v-model="formInline.model" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="安装时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="formInline.deviceCreateat"
            type="date"
            placeholder="选择日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="经度：">
          <el-input v-model="formInline.geoLng" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="纬度：">
          <el-input v-model="formInline.geoLat" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input v-model="formInline.tel" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="保洁人员：">
          <el-input v-model="list" size="mini">
            <i slot="suffix" class="el-input__icon el-icon-user-solid" @click="getClean()"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="editDevice()" size="mini">提 交</el-button>
      </span>
    </el-dialog>-->
    <!-- 分页 -->
    <!-- <div class="block">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="getPageIndex"></el-pagination>
    </div>-->
    <!-- 查询所有保洁人员弹窗 -->
    <!-- <el-dialog :lock-scroll="false" :visible.sync="centerDialogVisible" width="30%" center>
      <span slot="footer" class="dialog-footer">
        <el-checkbox-group v-model="clean">
          <el-checkbox
            v-for="item in cleanList"
            :label="item"
            :key="item.id"
            @change="addClean($event,item.cleanerName)"
          >{{item.cleanerName}}</el-checkbox>
        </el-checkbox-group>
        <div style="margin: 15px 0;"></div>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0, //数据总条数
      input: "", // 搜索框
      tableData: [], // table表单
      dialogVisible: false, // 新增弹窗
      dialogVisible2: false, // 编辑弹窗
      centerDialogVisible: false, // 所以保洁人员弹窗
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
      }, // from表单
      radio: "1", // 单选框
      value1: "", // 时间框
      deviceId: "", // 编辑设备id
      cleanList: [], // 所有保洁人员
      clean: [], // 复选框保洁空数组
      list: [] // 用来存勾选中的保洁人员
    };
  },
  created() {
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
          pageSize: 10
        }
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.records;
        // 数据总条数
        this.total = res.data.data.total;
      });
    },

    // 删除设备
    delDevice(deviceId) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "delete",
            url: "/cleaning/device/data/removInfo",
            data: {
              deviceId
            }
          }).then(() => {
            // console.log(res);
            // 重新获取设备列表
            this.getDevice();
          });
        })
        .catch(() => {
          console.log("已取消删除");
        });
    },

    // 新增设备
    addDevice() {
      this.$axios({
        method: "post",
        url: "/cleaning/device/data/save",
        data: {
          //  设备名称
          deviceName: this.formInline.deviceName,
          //  设备类型
          deviceType: this.formInline.deviceType,
          //  设备编号
          deviceCode: this.formInline.deviceCode,
          //  设备所属城市
          deviceCity: this.formInline.deviceCity,
          //  设备型号
          model: this.formInline.model,
          //  安装时间
          deviceCreateat: this.formInline.deviceCreateat,
          //  经度
          geoLng: this.formInline.geoLng,
          //  维度
          geoLat: this.formInline.geoLat,
          //  电话
          tel: this.formInline.tel,
          //  负责人
          foruser: this.list2
        }
      }).then(() => {
        // console.log(res);
        // 获取设备列表
        this.getDevice();
        // 关闭弹窗
        this.dialogVisible = false;
        // 清空原数组
        this.list = [];
        // 清空字符串
        this.list2 = "";
      });
    },

    // 获取当前设备id
    getId(deviceCode) {
      console.log(deviceCode);
      this.deviceId = deviceCode;
      // 开启弹窗
      this.dialogVisible2 = true;
      // 获取当前设备详情
      this.$axios({
        method: "get",
        url: `/cleaning/trashCan/info/${deviceCode}`
      }).then(res => {
        // console.log(res);
        this.formInline = res.data.data;
      });
    },

    // 编辑设备
    editDevice() {
      this.$axios({
        method: "put",
        url: "/cleaning/device/data/update",
        params: {
          //  id
          deviceid: this.deviceId,
          //  设备名称
          deviceName: this.formInline.deviceName,
          //  设备类型
          deviceType: this.formInline.deviceType,
          //  设备编号
          deviceCode: this.formInline.deviceCode,
          //  设备所属城市
          deviceCity: this.formInline.deviceCity,
          //  设备型号
          model: this.formInline.model,
          //  安装时间
          deviceCreateat: this.formInline.deviceCreateat,
          //  经度
          geoLng: this.formInline.geoLng,
          //  维度
          geoLat: this.formInline.geoLat,
          //  电话
          tel: this.formInline.tel,
          //  负责人
          foruser: this.list2
        }
      }).then(() => {
        // console.log(res);
        // 关闭弹窗
        this.dialogVisible2 = false;
        // 获取设备列表
        this.getDevice();
        // 清空原数组
        this.list = [];
        // 清空字符串
        this.list2 = "";
      });
    },

    // 获取所有保洁人员
    getClean() {
      // 开启弹窗
      this.centerDialogVisible = true;
      this.$axios({
        method: "get",
        url: "/cleaning/cleaner/page"
      }).then(res => {
        console.log(res);
        this.cleanList = res.data.data.records;
      });
    },

    // 给设备添加保洁人员
    addClean(e, name) {
      // 判断是否选中
      if (e === true) {
        // 选中则添加到数组中
        this.list.push(name);
      } else {
        // 取消选中 判断是否存在数组中 如果在则删除
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i] === name) {
            this.list.splice(i, 1);
          }
        }
      }
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
            pageSize: 10
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
