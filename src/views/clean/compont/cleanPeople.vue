<template>
  <div class="cleanPeople">
    <div class="add">
      <span>
        <i class="el-icon-plus"></i>
        <el-button type="text" @click="addCleanShow = true">添加保洁人员</el-button>
      </span>
      <input type="text" v-model="input" placeholder="关键字..." />
    </div>
    <div class="table">
      <div class="item">
        <span>保洁人员姓名</span>
        <span>工号</span>
        <span>联系方式</span>
        <span>垃圾桶</span>
        <span>管理人员</span>
        <span>操作</span>
      </div>
      <div class="scroll">
        <div v-for="(item, index) in tableData" :key="index" :class="{ bg: index % 2 == 1 }">
          <span>{{ item.cleanerName }}</span>
          <span>{{ item.jobNum }}</span>
          <span>{{ item.tel }}</span>
          <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
            <span v-for="(item, index) in item.trashCanList" :key="index">{{ item.name }},</span>
          </span>
          <span>{{ item.manageName }}</span>
          <span>
            <el-button type="text" style="color:#f78606" @click="getId(item.cleanerId)">编辑</el-button>
            <el-button type="text" style="color:red" @click="getDelCleanId(item.cleanerId)">删除</el-button>
          </span>
        </div>
      </div>

      <!-- 添加保洁人员 -->
      <div class="addClean" v-show="addCleanShow">
        <div>新增保洁人员</div>
        <div class="cleanInfo">
          <span>姓名：</span>
          <input type="text" v-model="formInline.cleanerName" />
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
        <div class="cleanInfo">
          <span>入职时间：</span>
          <input type="text" v-model="formInline.entryDay" />
        </div>

        <div class="select">
          <div class="confirm" @click="addClean()">确定</div>
          <div class="cancel" @click="cancel()">取消</div>
        </div>
      </div>

      <!-- 编辑保洁人员 -->
      <div class="editClean" v-show="editCleanShow">
        <div>编辑保洁人员</div>
        <div class="cleanInfo">
          <span>姓名：</span>
          <input type="text" v-model="formInline.cleanerName" />
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
        <div class="cleanInfo">
          <span>入职时间：</span>
          <input type="text" v-model="formInline.entryDay" />
        </div>
        <div class="cleanInfo">
          <span>垃圾桶：</span>
          <select v-model="trashCanId" @click="matching()">
            <option
              v-for="(item, index) in DeviceCodesList"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></option>
          </select>
        </div>
        <div class="select">
          <div class="confirm" @click="editClean()">确定</div>
          <div class="cancel" @click="cancel()">取消</div>
        </div>
      </div>

      <!-- 删除保洁人员 -->
      <div class="delClean" v-show="delShow">
        <span>是否删除当前保洁人员</span>
        <div class="select">
          <div class="confirm" @click="delClean()">确定</div>
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
      addCleanShow: false,
      editCleanShow: false,
      trashCanId: "", // 设备id
      input: "", // 搜索框
      tableData: [], // table表单
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
          size: 50,
          itemId: this.itemId
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.records;
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
          entryDay: this.formInline.entryDay
        }
      }).then(() => {
        // 获取保洁人员
        this.getClean();
        // 关闭弹窗

        this.cancel();
      });
    },

    // 获取删除保洁人员id
    getDelCleanId(cleanerId) {
      this.delShow = true;
      // 获取当前id
      this.id = cleanerId;
    },

    // 确定删除
    delClean() {
      this.$axios({
        method: "delete",
        url: `/cleaning/cleaner/${this.id}`
      }).then(() => {
        // 重新获取保洁人员
        this.getClean();
        this.delShow = false;
      });
    },

    // 获取需要编辑人员的id
    getId(cleanerId) {
      // 开启弹窗
      this.editCleanShow = true;
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
        this.editCleanShow = false;
        // 重新获取保洁人员
        this.getClean();
        this.cancel();
      });
    },

    // 取消编辑或新增
    cancel() {
      this.addCleanShow = false;
      this.editCleanShow = false;
      this.formInline.cleanerName = "";
      this.formInline.jobNum = "";
      this.formInline.sex = "";
      this.formInline.tel = "";
      this.formInline.entryDay = "";
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
    },

    // 保洁人员绑定垃圾桶
    matching() {
      console.log(this.trashCanId);
      console.log(this.id);
      this.$axios({
        method: "put",
        url: "/cleaning/cleaner/trashcan/bind",
        params: {
          trashCanId: this.trashCanId,
          cleanerId: this.id
        }
      }).then(res => {
        console.log(res);
      });
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

<style scoped lang="less">
.cleanPeople {
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
      height: 310px;
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

        select {
          // border: none;
          outline: none;
          border: none;
          height: 20px;
          // background: url("../../../assets/img/dayBg.png") no-repeat;
          background-color: #020a0f;
          background-size: 100% 100%;
          flex: 80%;
          color: #fff;
          margin-right: 10px;

          // option {
          //   color: black;
          // }
        }
      }

      .select {
        width: 150px;
        display: flex;
        justify-content: space-between;
        position: absolute;
        left: 30%;
        bottom: 20px;
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

    .delClean {
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
