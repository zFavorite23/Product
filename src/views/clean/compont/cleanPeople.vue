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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="editClean()" size="mini"
          >提 交</el-button
        >
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      class="right"
      layout="prev, pager, next"
      :total="total"
      @current-change="getPageIndex"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemId: "",
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
        // 入职时间
        entryDay: "",
        manageId: ""
      }, // from表单
      radio: "1", // 单选框
      value1: "", // 时间框
      id: "", // 编辑人员id
      manageList: [], // 所有管理人员列表
      DeviceCodesList: []
    };
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");
    // 获取保洁人员
    this.getClean();
    this.getManage();
    this.getDeviceCodes();
  },
  methods: {
    // 获取保洁人员
    getClean(current) {
      this.$axios({
        method: "get",
        url: "/cleaning/cleaner/page",
        params: {
          current,
          size: 8,
          itemId: this.itemId
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.records;
        // 数据总条数
        this.total = res.data.data.total;
      });
    },

    // 添加保洁人员
    addClean() {
      // 调用接口
      console.log(this.formInline);
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
          entryDay: this.formInline.entryDay
        }
      }).then(res => {
        console.log(res);
        // 获取保洁人员
        this.getClean();
        // 关闭弹窗
        this.dialogVisible = false;
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
        console.log(res);
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
          entryDay: this.formInline.entryDay
        }
      }).then(res => {
        console.log(res);
        // 关闭弹窗
        this.dialogVisible2 = false;
        // 重新获取保洁人员
        this.getClean();
      });
    },

    // 获取所有管理人员列表
    getManage() {
      // 开启弹窗
      this.centerDialogVisible = true;
      this.$axios({
        method: "get",
        url: "/cleaning/manage/page",
        params: {
          itemId: this.itemId
        }
      }).then(res => {
        res.data.data.records.forEach(item => {
          this.manageList.push({
            value: item.manageId,
            label: item.manageName
          });
        });
      });
    },

    // 获取所有垃圾桶
    getDeviceCodes() {
      this.$axios({
        method: "get",
        url: "/cleaning/trashCan/page",
        params: {
          itemId: this.itemId
        }
      }).then(res => {
        res.data.data.records.forEach(item => {
          this.DeviceCodesList.push({
            value: item.id,
            label: item.name
          });
        });
      });
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
            size: 8,
            itemId: this.itemId
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
.right {
  float: right;
  margin-top: 10px;
}
</style>
