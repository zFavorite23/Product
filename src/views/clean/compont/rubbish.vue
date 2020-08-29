<template>
  <div class="rubbish">
    <div class="add">
      <span></span>
      <input type="text" v-model="input" placeholder="关键字..." />
    </div>

    <div class="table">
      <div class="item">
        <span>垃圾桶</span>
        <span>所在项目</span>
        <span>满溢率</span>
        <span>型号</span>
        <span>相关保洁人员</span>
        <!-- <span>操作</span> -->
      </div>
      <div class="scroll">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          :class="{ bg: index % 2 == 1 }"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.itemName }}</span>
          <span>{{ item.spillPercent }}</span>
          <span>{{ item.model }}</span>
          <span>{{ item.cleanerName }}</span>
          <!-- <span>
            <el-button type="text" style="color:#f78606" @click="getId(item.id)"
              >编辑</el-button
            >
          </span> -->
        </div>
      </div>

      <div class="editClean" v-show="editCleanShow">
        <div>垃圾桶匹配</div>
        <div class="cleanInfo">
          <span>保洁人员：</span>
          <select v-model="cleanerId" @click="matching()">
            <option
              v-for="(item, index) in cleanList"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></option>
          </select>
        </div>
        <div class="select">
          <div class="confirm" @click="editClean()">确定</div>
          <div class="cancel" @click="editCleanShow = false">取消</div>
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
      cleanerId: "",
      editCleanShow: false,
      input: "", // 搜索框
      tableData: [], // table表单
      cleanList: []
    };
  },
  created() {
    this.itemId = sessionStorage.getItem("itemId");

    // 获取设备列表
    this.getDevice();
    this.getClean();
  },
  methods: {
    // 获取设备列表
    getDevice(current) {
      this.$axios({
        method: "get",
        url: "/cleaning/trashCan/page",
        params: {
          current,
          size: 8,
          itemId: this.itemId
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.records;
        // 数据总条数
      });
    },

    // 获取保洁人员
    getClean() {
      this.$axios({
        method: "get",
        url: "/cleaning/cleaner/page",
        params: {
          size: 50,
          itemId: this.itemId
        }
      }).then(res => {
        console.log(res);
        res.data.data.records.forEach(item => {
          this.cleanList.push({
            value: item.cleanerId,
            label: item.cleanerName
          });
        });
      });
    },

    // 获取需要编辑人员的id
    getId(cleanerId) {
      // 开启弹窗
      this.editCleanShow = true;
      // 获取当前id
      this.id = cleanerId;
      // 调用接口
      console.log(this.id);
    },

    // 垃圾桶绑定保洁人员
    matching() {
      console.log(this.cleanerId);
      console.log(this.id);
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
            size: 3,
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
<style lang="less" scoped>
.rubbish {
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
  }
}
</style>
