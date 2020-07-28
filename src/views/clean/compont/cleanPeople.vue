<template>
  <div class="cleanPeople">
    <!-- 搜索 -->
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
      <el-button type="primary" size="mini" @click="dialogVisible = true"
        >新增</el-button
      >
    </div>
    <!-- table表单 -->
    <el-table :data="tableData" border size="mini">
      <el-table-column
        prop="cleanerName"
        label="保洁人员姓名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="jobNum"
        label="工号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tel"
        label="联系方式"
        align="center"
      ></el-table-column>
      <el-table-column prop="trashCanList" label="垃圾桶" align="center">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.trashCanList" :key="index">{{
            item.deviceName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="manageName"
        label="管理人员"
        align="center"
      ></el-table-column>
      <el-table-column prop="opetelon" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="getId(scope.row.cleanerId)"
            >编辑</el-button
          >
          <el-button size="mini" @click="delClean(scope.row.cleanerId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增弹窗 -->
    <el-dialog
      :lock-scroll="false"
      title="新增员工"
      :visible.sync="dialogVisible"
      width="20%"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input
            v-model="formInline.cleanerName"
            size="mini"
            maxlength="3"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio v-model="formInline.sex" label="1">男</el-radio>
          <el-radio v-model="formInline.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="工号：">
          <el-input v-model="formInline.jobNum" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input
            v-model="formInline.tel"
            size="mini"
            maxlength="11"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="入职时间：">
          <el-date-picker
            v-model="formInline.entryDay"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="垃圾桶：">
          <el-input v-model="deviceName" size="mini">
            <i
              slot="suffix"
              class="el-input__icon el-icon-delete-solid"
              @click="getDevices()"
            ></i>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="管理人员：">
          <el-input v-model="list" size="mini">
            <i slot="suffix" class="el-input__icon el-icon-user-solid" @click="getManage()"></i>
          </el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addClean()" size="mini"
          >提 交</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog
      :lock-scroll="false"
      title="编辑员工"
      :visible.sync="dialogVisible2"
      width="20%"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input
            v-model="formInline.cleanerName"
            size="mini"
            maxlength="3"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio v-model="formInline.sex" label="1">男</el-radio>
          <el-radio v-model="formInline.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="工号：">
          <el-input v-model="formInline.jobNum" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input
            v-model="formInline.tel"
            size="mini"
            maxlength="11"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="入职时间：">
          <el-date-picker
            v-model="formInline.entryDay"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="垃圾桶：">
          <el-input v-model="deviceName" size="mini">
            <i
              slot="suffix"
              class="el-input__icon el-icon-delete-solid"
              @click="getDevices()"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item label="管理人员：">
          <el-input v-model="name" size="mini">
            <i
              slot="suffix"
              class="el-input__icon el-icon-user-solid"
              @click="getManage()"
            ></i>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="editClean()" size="mini"
          >提 交</el-button
        >
      </span>
    </el-dialog>
    <!-- 分页 -->
    <!-- <div class="block">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="getPageIndex"></el-pagination>
    </div>-->
    <!-- 查询所有管理人员弹窗 -->
    <el-dialog
      :lock-scroll="false"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span slot="footer" class="dialog-footer">
        <el-checkbox-group v-model="mangae">
          <el-checkbox
            v-for="item in manageList"
            :label="item"
            :key="item.manageId"
            @change="addManage(item.manageId, item.manageName)"
            >{{ item.manageName }}</el-checkbox
          >
        </el-checkbox-group>
        <div style="margin: 15px 0;"></div>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 查询所以设备弹框 -->
    <el-dialog
      :lock-scroll="false"
      :visible.sync="centerDialogVisible2"
      width="30%"
      center
    >
      <span slot="footer" class="dialog-footer">
        <el-checkbox-group v-model="mangae">
          <el-checkbox
            v-for="item in deviceList"
            :label="item"
            :key="item.deviceid"
            @change="addDevices($event, item.deviceCode, item.deviceName)"
            >{{ item.deviceName }}</el-checkbox
          >
        </el-checkbox-group>
        <div style="margin: 15px 0;"></div>
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible2 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0, // 数据的总条数
      input: "", // 搜索框
      tableData: [], // table表单
      dialogVisible: false, // 新增弹窗
      dialogVisible2: false, // 编辑弹窗
      centerDialogVisible: false, // 查询所有管理人员弹窗
      centerDialogVisible2: false, // 查询所以设备弹窗
      formInline: {
        // 姓名
        cleanerName: "",
        // // 工号
        jobNum: "",
        // 性别
        sex: "",
        // 电话
        tel: "",
        // 相关设备
        trashCanList: "",
        // 入职时间
        entryDay: "",
        // 上级
        manageName: ""
      }, // from表单
      radio: "1", // 单选框
      value1: "", // 时间框
      id: "", // 编辑人员id
      manageList: [], // 所有管理人员列表
      deviceList: [], // 所以设备列表
      mangae: [], // 复选框绑定管理空数组
      list: "", // 用来存勾选中的管理人员
      name: "",
      deviceName: "",
      devices: [] // 用来存勾选中的设备
    };
  },
  created() {
    // 获取保洁人员
    this.getClean();
  },
  methods: {
    // 获取保洁人员
    getClean(pageNum) {
      this.$axios({
        method: "get",
        url: "/cleaning/cleaner/page",
        params: {
          pageNum,
          pageSize: 10
        }
      }).then(res => {
        this.tableData = res.data.data.records;
        // 数据总条数
        this.total = res.data.data.total;
      });
    },

    // 添加保洁人员
    addClean() {
      // 调用接口
      this.$axios({
        method: "POST",
        url: "/cleaning/cleaner/save",
        data: {
          // 姓名
          cleanerName: this.formInline.cleanerName,
          // // 工号
          jobNum: this.formInline.jobNum,
          // 性别
          sex: this.formInline.sex,
          // 电话
          tel: this.formInline.tel,
          // 入职时间
          entryDay: this.formInline.entryDay,
          // 垃圾桶
          deviceCodes: this.devices
        }
      }).then(res => {
        console.log(res);
        // 获取保洁人员
        this.getClean();
        // 关闭弹窗
        this.dialogVisible = false;
        // 清空保洁人员原数组
        this.list = [];
        // 清空设备原数组
        this.devices = [];
      });
    },

    // 删除保洁人员
    delClean(cleanerId) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "delete",
            url: `/cleaning/cleaner/${cleanerId}`
          }).then(() => {
            // console.log(res);
            // 重新获取保洁人员
            this.getClean();
          });
        })
        .catch(() => {
          console.log("删除失败");
        });
    },

    // 获取需要编辑人员的id
    getId(cleanerId) {
      // 开启弹窗
      this.dialogVisible2 = true;
      // 获取当前id
      this.id = cleanerId;
      // 调用接口
      this.$axios({
        method: "get",
        url: `/cleaning/cleaner/info/${cleanerId}`
      }).then(res => {
        this.formInline = res.data.data;
      });
    },

    // 编辑保洁人员
    editClean() {
      this.$axios({
        method: "put",
        url: "/cleaning/cleaner",
        data: {
          // id
          cleanerId: this.id,
          // 姓名
          cleanerName: this.formInline.cleanerName,
          // // 工号
          jobNum: this.formInline.jobNum,
          // 性别
          sex: this.formInline.sex,
          // 电话
          tel: this.formInline.tel,
          // 入职时间
          entryDay: this.formInline.entryDay,
          // 相关设备
          deviceCodes: this.devices,
          // 上级
          manageId: this.list
        }
      }).then(res => {
        console.log(res);
        // 关闭弹窗
        this.dialogVisible2 = false;
        // 重新获取保洁人员
        this.getClean();
        // 清空保洁人员原数组
        this.list = [];
        // 清空设备原数组
        this.devices = [];
      });
    },

    // 获取所有管理人员列表
    getManage() {
      // 开启弹窗
      this.centerDialogVisible = true;
      this.$axios({
        method: "get",
        url: "/cleaning/manage/page"
      }).then(res => {
        console.log(res);
        this.manageList = res.data.data.records;
      });
    },

    // 获取所有设备列表
    getDevices() {
      // 开启弹窗
      this.centerDialogVisible2 = true;
      this.$axios({
        method: "get",
        url: "/cleaning/trashCan/all"
      }).then(res => {
        console.log(res);
        this.deviceList = res.data.data;
      });
    },

    // 给保洁人员添加管理人员
    addManage(manageId, manageName) {
      this.list = manageId;
      this.name = manageName;
    },

    // 给保洁人员添加设备
    addDevices(e, deviceCode, deviceName) {
      this.deviceName = deviceName;
      // 判断是否选中
      if (e === true) {
        // 选中则添加到数组中
        this.devices.push(deviceCode);
        console.log(this.devices);
      } else {
        // 取消选中 判断是否存在数组中 如果在则删除
        for (let i = 0; i < this.devices.length; i++) {
          if (this.devices[i] === deviceCode) {
            this.devices.splice(i, 1);
          }
        }
      }
    },

    // 获取分页数据
    getPageIndex(pageNum) {
      // 获取保洁人员
      this.getClean(pageNum);
    }
  },
  watch: {
    // 搜索保洁人员
    input() {
      if (this.input != "") {
        this.$axios({
          method: "get",
          url: "/cleaning/cleaner/page",
          params: {
            likeKeyWords: this.input,
            pageNum: 1,
            pageSize: 10
          }
        }).then(res => {
          this.tableData = res.data.data.records;
        });
      } else {
        // 获取保洁人员
        this.getClean();
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
</style>
