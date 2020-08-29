<template>
  <div class="managePeople">
    <div class="add">
      <span>
        <i class="el-icon-plus"></i>
        <el-button type="text" @click="addManageShow = true">添加管理人员</el-button>
      </span>
      <input type="text" v-model="input" placeholder="关键字..." />
    </div>
    <div class="table">
      <div class="item">
        <span>管理人员姓名</span>
        <span>工号</span>
        <span>联系方式</span>
        <span>所管理保洁人员</span>
        <span>操作</span>
      </div>
      <div class="scroll">
        <div v-for="(item, index) in tableData" :key="index" :class="{ bg: index % 2 == 1 }">
          <span>{{ item.manageName }}</span>
          <span>{{ item.jobNum }}</span>
          <span>{{ item.tel }}</span>
          <span></span>
          <span>
            <el-button type="text" style="color:#f78606" @click="getId(item.manageId)">编辑</el-button>
            <el-button type="text" style="color:red" @click="getDelManageId(item.manageId)">删除</el-button>
          </span>
        </div>
      </div>

      <!-- 添加管理人员 -->
      <div class="addClean" v-show="addManageShow">
        <div>新增管理人员</div>
        <div class="cleanInfo">
          <span>姓名：</span>
          <input type="text" v-model="formInline.manageName" />
        </div>
        <div class="cleanInfo">
          <span>性别：</span>
          <span class="radio">
            <span>
              <input type="radio" v-model="formInline.sex" value="1" />
              <span>男</span>
            </span>
            <span>
              <input type="radio" v-model="formInline.sex" value="2" />
              <span>女</span>
            </span>
          </span>
        </div>
        <div class="cleanInfo">
          <span>工号：</span>
          <input type="text" v-model="formInline.jobNum" />
        </div>
        <div class="cleanInfo">
          <span>联系方式：</span>
          <input type="text" v-model="formInline.tel" />
        </div>

        <div class="select">
          <div class="confirm" @click="addManage()">确定</div>
          <div class="cancel" @click="cancel()">取消</div>
        </div>
      </div>

      <!-- 编辑管理人员 -->
      <div class="editClean" v-show="editManageShow">
        <div>编辑管理人员</div>
        <div class="cleanInfo">
          <span>姓名：</span>
          <input type="text" v-model="formInline.manageName" />
        </div>
        <div class="cleanInfo">
          <span>性别：</span>
          <span class="radio">
            <span>
              <input type="radio" v-model="formInline.sex" value="1" />
              <span>男</span>
            </span>
            <span>
              <input type="radio" v-model="formInline.sex" value="2" />
              <span>女</span>
            </span>
          </span>
        </div>
        <div class="cleanInfo">
          <span>工号：</span>
          <input type="text" v-model="formInline.jobNum" />
        </div>
        <div class="cleanInfo">
          <span>联系方式：</span>
          <input type="text" v-model="formInline.tel" />
        </div>

        <div class="select">
          <div class="confirm" @click="editManage()">确定</div>
          <div class="cancel" @click="cancel()">取消</div>
        </div>
      </div>

      <!-- 删除管理人员 -->
      <div class="delManage" v-show="delShow">
        <span>是否删除当前管理人员</span>
        <div class="select">
          <div class="confirm" @click="delManage()">确定</div>
          <div class="cancel" @click="delShow = false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemId: "",
      delShow: false,
      addManageShow: false,
      editManageShow: false,
      total: 0, // 数据总条数
      input: "", // 搜索框
      tableData: [], // 管理员列表
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
        cleanerIds: ""
      }, // from表单

      cleanList: []
    };
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");

    // 获取管理人员
    this.getManage();
    this.getClean();
  },
  methods: {
    // 获取管理人员
    getManage() {
      this.$axios({
        method: "get",
        url: "/cleaning/manage/page",
        params: {
          size: 50,
          itemId: this.itemId
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
      });
    },

    // 取消编辑或新增
    cancel() {
      this.addManageShow = false;
      this.editManageShow = false;
      this.formInline.manageName = "";
      this.formInline.jobNum = "";
      this.formInline.sex = "";
      this.formInline.tel = "";
      this.formInline.entryDay = "";
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
      }).then(res => {
        console.log(res);
        // 从新获取数据
        this.getManage();
        // 关闭弹窗
        this.addManageShow = false;
      });
    },

    // 过去删除管理人员ID
    getDelManageId(manageId) {
      // 获取当前id
      this.manageId = manageId;
      this.delShow = true;
    },

    // 确定删除
    delManage() {
      this.$axios({
        url: `/cleaning/manage/${this.manageId}`,
        method: "delete"
      }).then(() => {
        // 获取管理人员
        this.getManage();
        this.delShow = false;
      });
    },

    // 获取编辑id
    getId(manageId) {
      // 编辑弹框显示
      this.editManageShow = true;
      // 获取当前id
      this.manageId = manageId;
      // 查看当前详细信息
      this.$axios({
        method: "get",
        url: `/cleaning/manage/info/${manageId}`
      }).then(res => {
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
          tel: this.formInline.tel
        }
      }).then(res => {
        console.log(res);
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
        url: "/cleaning/cleaner/page",
        params: {
          itemId: this.itemId
        }
      }).then(res => {
        res.data.data.records.forEach(item => {
          this.cleanList.push({
            value: item.cleanerId,
            label: item.manageName
          });
        });
      });
    },

    // 获取分页数据
    getPageIndex(pageNum) {
      console.log(pageNum);
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
            size: 8,
            itemId: this.itemId
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

<style scoped lang="less">
.managePeople {
  color: #fff;
  font-size: 14px;

  .add {
    display: flex;
    justify-content: space-between;
    position: relative;

    .el-icon-plus {
      margin-right: 3px;
    }

    .el-button {
      padding: 0;
      color: #fff;
    }

    input {
      width: 100px;
      height: 20px;
      outline-style: none;
      border: 0px;
      background: url("../../../assets/img/search.png") no-repeat;
      background-size: 100% 100%;
      color: #ccc;
      margin-right: 15px;
    }
  }

  .table {
    background: url("../../../assets/img/框3.png") no-repeat;
    background-size: 100% 100%;
    width: 865px;
    height: 407px;
    position: relative;
    margin-top: 5px;
    .bg {
      background-color: #000;
    }

    .el-button {
      padding: 0;
    }

    .item {
      display: flex;
      justify-content: space-between;
      padding-top: 7px;

      span {
        text-align: center;
        flex: 15%;
      }
    }
    .scroll::-webkit-scrollbar {
      display: none;
    }
    .scroll {
      color: #969696;
      margin-top: 15px;
      height: 330px;
      overflow: auto;
      overflow-x: hidden;

      div {
        display: flex;
        justify-content: space-between;
        height: 35px;
        line-height: 35px;
        margin-left: 3px;

        span {
          text-align: center;
          flex: 15%;
        }
      }
    }

    .addClean,
    .editClean {
      width: 400px;
      height: 300px;
      position: absolute;
      top: 5%;
      left: 25%;
      // background: url("../../../assets/img/框3.png") no-repeat;
      // background-size: 100% 100%;
      background-color: #061826;
      padding: 0 15px;

      div:nth-child(1) {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
      }

      .cleanInfo {
        display: flex;

        span {
          color: #969696;
          margin-bottom: 17px;
          flex: 20%;
        }

        input {
          flex: 80%;
          height: 15px;
          padding-left: 5px;
          outline-style: none;
          border: 0px;
          background: url("../../../assets/img/search.png") no-repeat;
          background-size: 100% 100%;
          color: #fff;
          margin-right: 10px;
        }

        .radio {
          flex: 80%;
          display: flex;
          justify-content: space-around;
          span {
            display: inline-block;
            flex: 50%;
            text-align: center;
            margin-bottom: 0;
          }
        }
      }

      .select {
        width: 150px;
        display: flex;
        justify-content: space-between;
        position: absolute;
        left: 30%;
        bottom: 35px;
        text-align: center !important;

        .confirm {
          width: 60px;
          height: 20px;
          line-height: 20px;
          color: #0bb5b9;
          background: url("../../../assets/img/Yes.png") no-repeat;
          background-size: 100% 100%;
        }

        .cancel {
          width: 60px;
          height: 20px;
          line-height: 20px;
          color: #f00;
          background: url("../../../assets/img/No.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }

    .delManage {
      text-align: center;
      width: 300px;
      height: 150px;
      background: url("../../../assets/img/map_bg.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 105px;
      left: 245px;
      z-index: 99;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      input {
        outline-style: none;
        border: 0px;
        margin: 15px 0;
        padding-left: 3px;
      }

      .select {
        margin-top: 35px;
        width: 150px;
        display: flex;
        justify-content: space-between;

        .confirm {
          width: 60px;
          height: 20px;
          line-height: 20px;
          color: #0bb5b9;
          background: url("../../../assets/img/Yes.png") no-repeat;
          background-size: 100% 100%;
        }

        .cancel {
          width: 60px;
          height: 20px;
          line-height: 20px;
          color: #f00;
          background: url("../../../assets/img/No.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
