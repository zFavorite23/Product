<template>
  <div class="partition">
    <div class="add">
      <span @click="addStrate()">
        <i class="el-icon-plus"></i>
        <span>添加策略</span>
      </span>
      <span style="float:right;right:0">
        <span>搜索分区：</span>
        <input
          type="text"
          v-model="searchName"
          @keyup.enter="keyupInuptSearch()"
          placeholder="搜索分组"
          style="padding: 2px 5px;border-radius: 2px;border: 0;background-color:#cfd5d9"
        />
      </span>
    </div>
    <div class="name">
      <span>分区名称 ( {{ total }} )</span>
      <div class="data">
        <span
          v-for="(item, index) in groupList"
          :key="index"
          @click="onselec(index, item.districtId, item.districtName)"
          :class="{ active: index == current }"
        >
          <i>{{ item.districtName }}</i>
          <!-- <img
            src="../../../assets/img/add.png"
            alt
            v-show="item.delShow"
            @click="addStrate(item.districtId)"
            style="float: right;right: 5%;position: absolute;"
          />-->
        </span>
      </div>
    </div>
    <div class="facility">
      <span>所有设备</span>
      <div class="box-card" style="padding:10px">
        <el-card
          style="margin-bottom:20px;background:#000"
          v-for="(item, index) in lampList2"
          :key="index"
        >
          <div>
            <p style="text-align:left">
              <span>{{ item.strategyName }}</span>
              <img
                src="../../../assets/img/update.png"
                alt
                style="float:right"
                @click="
                  updateCurrent(
                    item.strategyId,
                    item.strategyName,
                    item.startYtd,
                    item.endYtd,
                    item.openInterval,
                    item.startHms,
                    item.endHms,
                    item.openTime
                  )
                "
              />
              <img
                src="../../../assets/img/remove.png"
                alt
                style="float:right;margin-right: 3%;"
                @click="removeCurrent(item.strategyId, item.strategyName)"
              />
            </p>
            <p style="text-align:left">
              <span>季节时间：{{ item.startYtd }}——{{ item.endYtd }}</span
              >---
              <span>{{ item.openInterval }}天/次</span>
            </p>
            <p style="text-align:left">
              <span style="text-align:left">默认开启状态：</span>
              <span
                style="text-align:right;color:#03e405;"
                v-if="item.status == 1"
                >开启</span
              >
              <span
                style="text-align:right;color:#ff0000;"
                v-if="item.status == 0"
                >关闭</span
              >
            </p>
            <p style="text-align:left">
              <span style="text-align:left"
                >默认开启时间：{{ item.startHms }}</span
              >
              <span style="text-align:right"
                >默认开启时长：{{ item.openTime }} 分</span
              >
            </p>
            <p style="text-align:left;">
              <span>默认关闭时间：{{ item.endHms }}</span>
              <span class="select">
                <div class="confirm" @click="openStrategy(item.strategyId)">
                  开启
                </div>
                <div class="cancel" @click="closeStrategy(item.strategyId)">
                  关闭
                </div>
              </span>
              <!-- <span>
                <el-button type="danger" plain @click="openStrategy(item.strategyId)">开启</el-button>
                <el-button type="success" plain @click="closeStrategy(item.strategyId)">关闭</el-button>
              </span>-->
            </p>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog
      title="当前区域新建策略"
      :visible.sync="addVisible"
      style="letter-spacing: 3px"
    >
      <el-form label-width="80px">
        <el-form-item label="策略名称">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="季节时间">
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="startYtd"
              type="date"
              :picker-options="changeStartPicker"
              placeholder="选择季节开始日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="endYtd"
              type="date"
              :picker-options="changeEndPicker"
              placeholder="选择季节结束日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="开启时长">
          <el-col :span="11">
            <el-input v-model="openTime"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="开启时间">
          <el-col :span="11">
            <el-time-picker
              v-model="startHms"
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              style="width: 100%;"
              placeholder="选择开启时间"
              @change="changeTime"
            ></el-time-picker>
          </el-col>
          <el-col
            id="endLine"
            class="line"
            :span="2"
            style="text-align: center;"
            >-</el-col
          >
          <el-col :span="11" id="endTime">
            <el-time-picker
              v-model="endHms"
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              style="width: 100%;"
              placeholder="选择关闭时间"
              @change="changeTime1"
            ></el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="开启频率">
          <el-col :span="11">
            <el-input v-model="interval"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addStrategy">立即创建</el-button>
          <el-button @click="cancelAdd">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="编辑当前策略"
      :visible.sync="editVisible"
      style="letter-spacing: 3px"
    >
      <el-form label-width="80px" :data="editCon">
        <el-form-item label="策略名称">
          <el-input v-model="editCon.strategyName"></el-input>
        </el-form-item>
        <el-form-item label="季节时间">
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="editCon.startYtd"
              type="date"
              :picker-options="changeEditStartPicker"
              placeholder="选择季节开始日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="editCon.endYtd"
              type="date"
              :picker-options="changeEditEndPicker"
              placeholder="选择季节结束日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="开启时长">
          <el-col :span="11">
            <el-input v-model="editCon.openTime"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="开启时间">
          <el-col :span="11">
            <el-time-picker
              v-model="editCon.startHms"
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              style="width: 100%;"
              placeholder="选择开启时间"
              @change="changeTime"
            ></el-time-picker>
          </el-col>
          <el-col
            id="endLine"
            class="line"
            :span="2"
            style="text-align: center;"
            >-</el-col
          >
          <el-col :span="11" id="endTime">
            <el-time-picker
              v-model="editCon.endHms"
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              style="width: 100%;"
              placeholder="选择关闭时间"
              @change="changeTime1"
            ></el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="开启频率">
          <el-col :span="11">
            <el-input v-model="editCon.openInterval"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editStrategy">立即创建</el-button>
          <el-button @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 999, // 分组默认样式
      current_1: 999, // 路灯默认样式
      current_2: 999,
      groupList: [], // 分组列表
      total: "", // 分组数量
      newGroup: [], // 新建分组
      lampList: [], // 路灯列表
      message: "", // 输入框内容
      districtId: "", // 需要修改分组的ID
      deviceId: "", // 路灯ID
      groupName: "",
      lampList2: [],
      isSHow: false,
      addGroupName: "",
      addVisible: false,
      editVisible: false,
      name: "",
      startYtd: "",
      endYtd: "",
      startHms: "",
      endHms: "",
      openTime: "30",
      interval: "",
      editCon: [],
      status: "",
      isShowHint: false,
      searchName: "",
      changeStartPicker: {
        disabledDate: this.disabledDate1
      },
      changeEndPicker: {
        disabledDate: this.disabledDate2
      },
      changeEditStartPicker: {
        disabledDate: this.disabledDate3
      },
      changeEditEndPicker: {
        disabledDate: this.disabledDate4
      }
    };
  },
  methods: {
    disabledDate1(time) {
      var times = this.endYtd;
      if (times) {
        return time.getTime() > new Date(this.endYtd);
      }
    },
    disabledDate2(time) {
      var times = this.startYtd;
      if (times) {
        return time.getTime() < new Date(this.startYtd);
      }
    },
    disabledDate3(time) {
      var times = this.editCon.endYtd;
      if (times) {
        return time.getTime() > new Date(this.editCon.endYtd);
      }
    },
    disabledDate4(time) {
      var times = this.editCon.startYtd;
      if (times) {
        return time.getTime() < new Date(this.editCon.startYtd);
      }
    },
    keyupInuptSearch() {
      console.log(this.searchName);
      var a = this.groupList.filter(ele => ele.districtName == this.searchName);
      console.log(a);
      if (a == [] || a == "") {
        console.log(111);
        this.$message.error("没有检测到当前内容");
      } else {
        this.groupList = a;
      }
    },
    // 点击添加样式
    onselec(index, districtId, districtName) {
      this.current = index;
      this.districtId = districtId;
      this.districtName = districtName;
      for (let i = 0; i < this.groupList.length; i++) {
        if (index == i) {
          this.groupList[i].delShow = true;
        } else {
          this.groupList[i].delShow = false;
        }
      }
      this.getByDis(districtId);
    },
    getByDis(districtId) {
      this.$axios({
        method: "get",
        url: "/irrigation/strategy/getByDis",
        params: {
          districtId
        }
      }).then(res => {
        this.lampList2 = res.data.data;
        if (this.lampList2.length == 0) {
          this.$message("当前区域暂无策略！");
        }
      });
    },

    // 获取所有水表
    getLamp() {
      this.$axios({
        method: "get",
        url: "/irrigation/water/page"
      }).then(res => {
        this.lampList = res.data.data.records;
      });
    },
    // 获取所有策略
    getGroup() {
      this.$axios({
        method: "get",
        url: "/irrigation/district/all"
      }).then(res => {
        this.groupList = res.data.data;
        this.total = res.data.data.length;
        this.groupList.reverse();
        this.onselec(0, res.data.data[0].districtId);
        this.districtId = res.data.data[0].districtId;
        this.districtName = res.data.data[0].districtName;
      });
    },
    addStrate() {
      this.addVisible = !this.addVisible;
      console.log(this.districtId);
    },
    cancel() {
      this.addVisible = !this.addVisible;
      this.editVisible = !this.editVisible;
    },
    addStrategy() {
      this.addVisible = !this.addVisible;
      this.$axios({
        method: "post",
        url: "/irrigation/strategy/save",
        data: {
          districtId: this.districtId,
          strategyName: this.name,
          startYtd: this.startYtd,
          endYtd: this.endYtd,
          startHms: this.startHms,
          endHms: this.endHms,
          openTime: this.openTime,
          openInterval: this.interval
        }
      }).then(res => {
        this.newGroup = res.config.data;
        this.lampList2.push(this.newGroup);
        this.getByDis(this.districtId);
      });
    },
    // 删除当前策略
    removeCurrent(strategyId, strategyName) {
      var districtName = this.districtName;
      this.$confirm(
        "是否删除" + districtName + "下的" + strategyName + "?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios({
            method: "POST",
            url: "/irrigation/strategy/del",
            params: {
              strategyId
            }
          }).then(res => {
            this.getByDis(this.districtId);
            if (res.data.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
            if (res.data.code == 1) {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑当前策略
    // item.strategyId,item.strategyName,item.startYtd,item.endYtd,item.openInterval,item.startHms,item.endHms,item.openTime
    updateCurrent(
      strategyId,
      strategyName,
      startYtd,
      endYtd,
      openInterval,
      startHms,
      endHms,
      openTime
    ) {
      this.editCon = {
        strategyId: strategyId,
        strategyName: strategyName,
        startYtd: startYtd,
        endYtd: endYtd,
        openInterval: openInterval,
        startHms: startHms,
        endHms: endHms,
        openTime: openTime
      };
      this.editVisible = true;
    },
    editStrategy() {
      this.$axios({
        method: "POST",
        url: "/irrigation/strategy/update",
        data: {
          endHms: this.editCon.endHms,
          endYtd: this.editCon.endYtd,
          openInterval: this.editCon.openInterval,
          openTime: this.editCon.openTime,
          startHms: this.editCon.startHms,
          startYtd: this.editCon.startYtd,
          strategyId: this.editCon.strategyId,
          strategyName: this.editCon.strategyName,
          districtId: this.districtId
        }
      }).then(res => {
        this.getByDis(this.districtId);
        if (res.data.code == 0) {
          this.$message({
            message: "编辑成功",
            type: "success"
          });
          this.editVisible = false;
        }
        if (res.data.code == 1) {
          this.$message.error("编辑失败");
          this.editVisible = false;
        }
      });
    },
    // 开启策略
    openStrategy(strategyId) {
      this.$axios({
        method: "POST",
        url: "/irrigation/strategy/open",
        params: {
          strategyId
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.data,
            type: "success"
          });
          this.getByDis(this.districtId);
        }
        if (res.data.code == 1) {
          this.$message.error(res.data.data);
        }
      });
    },
    // 关闭策略
    closeStrategy(strategyId) {
      this.$axios({
        method: "POST",
        url: "/irrigation/strategy/close",
        params: {
          strategyId
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.data,
            type: "success"
          });
          this.getByDis(this.districtId);
        }
        if (res.data.code == 1) {
          this.$message.error(res.data.data);
        }
      });
    },
    // 获取结束时间
    changeTime() {
      this.$axios({
        method: "get",
        url: "/irrigation/strategy/getTime",
        params: {
          districtId: this.districtId,
          startH: this.startHms,
          openTime: this.openTime
        }
      }).then(res => {
        this.endHms = res.data.data.time + ":00";
      });
    },
    // 获取开始时间
    changeTime1() {
      this.$axios({
        method: "get",
        url: "/irrigation/strategy/getTime",
        params: {
          districtId: this.districtId,
          endH: this.endHms,
          openTime: this.openTime
        }
      }).then(res => {
        this.startHms = res.data.data.time + ":00";
      });
    },
    cancelEdit() {
      this.editVisible = !this.editVisible;
    },
    cancelAdd() {
      this.addVisible = !this.addVisible;
    },
    // 删除分组
    deleteGroup(districtId) {
      this.$axios({
        method: "delete",
        url: `/lighting/group/${districtId}`
      }).then(() => {
        // 获取所有分组
        this.getGroup();
      });
    },
    // 点击编辑按钮
    onEdit(index, districtId) {
      for (var i = 0; i < this.groupList.length; i++) {
        if (index == i) {
          this.groupList[i].inputshow = true;

          // 使原来文字变空
          this.groupList[i].groupName = "";
        } else {
          this.groupList[i].inputshow = false;
        }
      }

      this.districtId = districtId;
    },
    // 点击添加样式
    onColor(index, deviceId) {
      this.current_1 = index;
      this.deviceId = deviceId;
      this.current_2 = 999;
    },
    onColor1(index) {
      this.current_2 = index;
      this.current_1 = 999;
    }
    // 分组添加路灯
    // addLamp() {
    //   this.$axios({
    //     method: "post",
    //     url: "/irrigation/group/setWater",
    //     params: {
    //       districtId: this.districtId,
    //       deviceId: this.deviceId
    //     }
    //   }).then(() => {});
    // }
  },
  created() {
    console.log(1111);
    // 获取所有路灯
    // this.getLamp();
    // 获取所有分组
    this.getGroup();
  }
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
// 状态颜色
.color {
  color: #15f6f3 !important;
}
// 点击添加的样式
.active {
  background: url("../../../assets/img/左侧选中框.png") no-repeat;
  background-size: 100%;
  color: #ff9000 !important;
}
.partition {
  display: flex;
  color: #fff;
  font-size: 14px;
  position: relative;
  height: 490px;

  p {
    margin: 0;
  }
  i {
    font-style: normal;
  }
  // 新建分区
  .add {
    position: absolute;
    left: 0;
    line-height: 30px;
    width: 100%;
  }

  // 左侧分区
  .name {
    margin-top: 30px;
    margin-right: 5px;
    padding-top: 8px;
    width: 290px;
    text-align: center;
    background: url("../../../assets/img/框2.png") no-repeat;
    background-size: 100%;

    .data {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      input {
        width: 70px;
        height: 15px;
        outline-style: none;
        border: 0px;
        background: url("../../../assets/img/搜索框.png") no-repeat;
        background-size: 100% 100%;
        color: #ccc;
        margin-right: 15px;
      }
      span {
        height: 30px;
        line-height: 30px;
        color: #15f6f3;
        position: relative;
        border-bottom: 1px solid #000;

        .el-icon-delete,
        .el-icon-edit-outline {
          position: absolute;
          top: 8px;
          right: 10px;
          color: #ff9000;
        }

        .el-icon-edit-outline {
          position: absolute;
          top: 8px;
          right: 40px;
        }
      }
    }
  }

  // 右侧设备
  .facility {
    flex: 1;
    margin-top: 30px;
    padding-top: 8px;
    background: url("../../../assets/img/框3.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    position: relative;

    // .data {
    //   display: flex;
    //   flex-wrap: wrap;
    //   margin-top: 15px;
    //   padding: 0 15px 0 25px;

    //   span {
    //     width: 70px;
    //     height: 30px;
    //     line-height: 30px;
    //     margin-right: 5px;
    //     color: #cccccc;
    //     border-bottom: 1px solid #000;
    //   }
    // }
    .box-card {
      width: 96%;
      height: 85%;
      margin-top: 2%;
      padding: 2%;
      overflow-y: scroll;
    }
    .el-card {
      border: 0;
      color: #15f6f3;
    }
    .box-card::-webkit-scrollbar {
      display: none;
    }
    .el-card /deep/ .el-card__body {
      padding: 10px;
    }
    .select {
      width: 150px;
      display: flex;
      justify-content: space-between;
      left: 215px;
      bottom: 35px;
      float: right;
      text-align: center;

      .confirm {
        width: 60px;
        height: 20px;
        line-height: 20px;
        color: #0bb5b9;
        background: url("../../../assets/img/sure.png") no-repeat;
        background-size: 100% 100%;
      }

      .cancel {
        width: 60px;
        height: 20px;
        line-height: 20px;
        color: #f00;
        background: url("../../../assets/img/quxiao.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
.addModel {
  width: 40%;
  height: 30%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  margin-left: 30%;
  display: flex;
  background-color: #000000;
  margin-top: 15%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .close {
    right: 10px;
    position: absolute;
    top: 10px;
    font-size: 20px;
  }
  .addInput {
    border: 0;
    padding: 3px;
    position: absolute;
    left: 10%;
  }
  .addSure {
    position: absolute;
    right: 10%;
    width: 15%;
    background: #ffffff;
    border-radius: 4px;
  }
}
/deep/.el-dialog {
  width: 26%;
  margin-top: 26vh !important;
}
.el-form-item {
  margin-bottom: 10px;
}

/deep/.el-input--suffix .el-input__inner {
  background: #1e1e1e;
  border: none;
  // padding: 0 5px;
}
/deep/.el-input__inner {
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
}
/deep/.timePicker {
  width: 14.6% !important;
  margin-right: 5px;
}
.el-button {
  padding: 6px 10px;
}
/deep/.el-input__icon {
  line-height: 25px;
}
/deep/.el-popper {
  background: #1e1e1e;
  border: none;
}
/deep/.el-select-dropdown__item.hover {
  background: #1e1e1e;
}
/deep/.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
/deep/.el-dialog,
.el-pager li {
  background: #000000;
}
/deep/.el-dialog {
  width: 26%;
  margin-top: 32vh !important;
}
/deep/.el-input__inner {
  background-color: #1e1e1e;
  border: none;
  color: #ffffff;
}
/deep/.el-picker-panel {
  color: #606266;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #1e1e1e;
  border-radius: 4px;
  line-height: 30px;
  margin: 5px 0;
}
/deep/.el-time-panel {
  background-color: #1e1e1e !important;
  color: #606266;
  border: none;
}
/deep/.el-button--primary {
  color: #fff;
  background-color: #1e1e1e;
  border: none;
}
</style>
