<template>
  <div class="managePeople">
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
      <el-button type="primary" @click="dialogVisible = true" size="mini"
        >新增</el-button
      >
    </div>
    <!-- table表单 -->
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column
        prop="manageName"
        label="管理人员姓名"
        height="20px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="jobNum"
        label="工号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tel"
        label="联系方式"
        align="center"
      ></el-table-column>
      <el-table-column prop="cleanerList" label="所管理保洁人员" align="center">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.cleanerList" :key="index">{{
            `${item.cleanerName} 、`
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <!-- 在 template 上声明slot-scope ，然后通过scope.row来获取遍历项
        scope.row就相当于v-for中的item-->
        <template slot-scope="scope">
          <el-button size="mini" @click="getId(scope.row.manageId)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            :lock-scroll="false"
            @click="delManage(scope.row.manageId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div class="block">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="getPageIndex"></el-pagination>
    </div> -->
    <!-- 新增弹窗 -->
    <el-dialog
      :lock-scroll="false"
      title="新增管理人员"
      :visible.sync="dialogVisible"
      width="20%"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input
            v-model="formInline.manageName"
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addManage()" size="mini"
          >提 交</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog
      :lock-scroll="false"
      title="编辑管理人员"
      :visible.sync="dialogVisible2"
      width="20%"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input
            v-model="formInline.manageName"
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
        <el-form-item label="保洁人员：">
          <el-input v-model="name" size="mini">
            <i
              slot="suffix"
              class="el-input__icon el-icon-user-solid"
              @click="getClean()"
            ></i>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="editManage()" size="mini"
          >提 交</el-button
        >
      </span>
    </el-dialog>
    <!-- 查询所有保洁人员弹窗 -->
    <el-dialog
      :lock-scroll="false"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span slot="footer" class="dialog-footer">
        <el-checkbox-group v-model="clean">
          <el-checkbox
            v-for="item in cleanList"
            :label="item"
            :key="item.cleanerId"
            @change="addClean($event, item.cleanerId, item.cleanerName)"
            >{{ item.cleanerName }}</el-checkbox
          >
        </el-checkbox-group>
        <div style="margin: 15px 0;"></div>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
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
      total: 0, // 数据总条数
      input: "", // 搜索框
      tableData: [], // 管理员列表
      dialogVisible: false, // 新增弹窗
      dialogVisible2: false, // 编辑弹窗
      centerDialogVisible: false, // 所有保洁人员弹窗
      formInline: {
        // 姓名
        manageName: "",
        // // 工号
        jobNum: "",
        // 性别
        sex: "",
        // 电话
        tel: "",
        // 下属保洁员工
        cleanerList: ""
      }, // from表单
      radio: "1", // 单选框
      value1: "", // 时间框
      manageId: "", // 编辑id
      cleanList: [], // 所有保洁人员列表
      clean: [], // 复选框保洁空数组
      list: [], // 用来存勾选中的保洁人员
      name: "",
      arr: []
    };
  },
  created() {
    // 获取管理人员
    this.getManage();
  },
  methods: {
    // 给管理人员添加保洁人员
    addClean(e, cleanerId, cleanerName) {
      // 判断是否选中
      if (e === true) {
        // 选中则添加到数组中
        this.list.push(cleanerId);
      } else {
        // 取消选中 判断是否存在数组中 如果在则删除
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i] === cleanerId) {
            this.list.splice(i, 1);
          }
        }
      }
      this.name = cleanerName;
    },

    // 获取管理人员
    getManage(pageNum) {
      this.$axios({
        method: "get",
        url: "/cleaning/manage/page",
        params: {
          pageNum,
          pageSize: 10
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
      });
    },

    // 添加管理人员
    addManage() {
      // 调用接口
      this.$axios({
        method: "post",
        url: "/cleaning/manage/save",
        data: {
          // 姓名
          manageName: this.formInline.manageName,
          // // 工号
          jobNum: this.formInline.jobNum,
          // 性别
          sex: this.formInline.sex,
          // 电话
          tel: this.formInline.tel
        }
      })
        .then(res => {
          console.log(res);
          // 从新获取数据
          this.getManage();
          // 关闭弹窗
          this.dialogVisible = false;
          // 清空原数组
          this.list = [];
        })
        .catch(() => {
          // 从新获取数据
          this.getManage();
          // 关闭弹窗
          this.dialogVisible = false;
          // 清空原数组
          this.list = [];
        });
    },

    // 删除管理人员
    delManage(manageId) {
      console.log(manageId);
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: `/cleaning/manage/${manageId}`,
            method: "delete"
          }).then(() => {
            // 获取管理人员
            this.getManage();
          });
        })
        .catch(() => {
          console.log("删除失败");
        });
    },

    // 获取编辑id
    getId(manageId) {
      // 编辑弹框显示
      this.dialogVisible2 = true;
      // 获取当前id
      this.manageId = manageId;
      // 查看当前详细信息
      this.$axios({
        method: "get",
        url: `/cleaning/manage/info/${manageId}`
      }).then(res => {
        console.log(res);
        this.formInline = res.data.data;
      });
    },

    // 修改管理人员
    editManage() {
      // 调用接口
      this.$axios({
        method: "put",
        url: "/cleaning/manage",
        data: {
          // id
          manageId: this.manageId,
          // 姓名
          manageName: this.formInline.manageName,
          // // 工号
          jobNum: this.formInline.jobNum,
          // 性别
          sex: this.formInline.sex,
          // 电话
          tel: this.formInline.tel,
          // 下属保洁员工
          cleanerIds: this.list
        }
      }).then(() => {
        // 关闭弹窗
        this.dialogVisible2 = false;
        // 获取管理人员
        this.getManage();
        // 清空原数组
        this.list = [];
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
        this.cleanList = res.data.data.records;
      });
    },

    // 获取分页数据
    getPageIndex(pageNum) {
      // 获取当前页管理人员
      this.getManage(pageNum);
    }
  },
  watch: {
    // 搜索管理人员
    input() {
      console.log(this.input);
      if (this.input != "") {
        this.$axios({
          method: "get",
          url: "/cleaning/manage/page",
          params: {
            likeKeyWords: this.input,
            pageNum: 1,
            pageSize: 10
          }
        }).then(res => {
          console.log(res);
          this.tableData = res.data.data.records;
        });
      } else {
        this.getManage();
      }
    }
  }
};
</script>

<style lang="less" scoped>
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
