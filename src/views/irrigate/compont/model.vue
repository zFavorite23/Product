<template>
  <div class="partition">
    <div class="add">
      <span @click="addGroup">
        <i class="el-icon-plus"></i>
        添加分区
      </span>
      <span style="float:right;right:0">
        <span>搜索分区：</span>
        <input
          type="text"
          v-model="searchName"
          @keyup.enter="keyupInuptSearch()"
          placeholder="搜索分区"
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
          @click="onselec(index, item.districtId)"
          :class="{ active: index == current }"
        >
          <i v-show="item.textshow">{{ item.districtName }}</i>
          <i
            class="el-icon-delete"
            v-show="item.delShow"
            @click="deleteGroup(item.districtId, item.districtName)"
          ></i>
          <input
            type="text"
            v-show="item.inputshow"
            v-model="message"
            @keyup.enter="keyupInupt()"
          />
          <i
            class="el-icon-edit-outline"
            v-show="item.delShow"
            @click="onEdit(index, item.districtId)"
          ></i>
        </span>
      </div>
    </div>
    <div class="facility">
      <div style="width:100%;text-align:center;position:relative">
        <span>所有设备</span>
      </div>
      <div class="data" style="height: 320px;overflow-y: scroll;">
        <!-- 当前区下的组和水表 -->
        <div v-for="(item, index) in lampList1" :key="item.districtId">
          <span
            style="color:#f78606;display:inline-block;width:150px"
            @click="onColor(index, item.groupId, item.id)"
            :class="{ color: index == current_1 }"
            >{{ item.groupName }}({{ item.rank }})</span
          >
          <span style="color:#f78606;display: inline-block;" @click="editRank"
            >编辑序号</span
          >
          <span v-show="isRankShow">
            <span>输入序号 :</span>
            <input
              type="text"
              style="width: 30px;text-align: center"
              v-model="istrictRank"
            />
            <div class="editRankBtn" @click="rankBtn(item.id)">确定</div>
          </span>
          <div></div>
        </div>
        <!-- 已被分区下的组和水表 -->
        <div>
          <span
            v-for="(item, index) in lampList2"
            :key="item.groupId"
            style="color:#15f6f3"
            @click="onColor1(index, item.groupId)"
            :class="{ color: index == current_2 }"
            >{{ item.groupName }}</span
          >
        </div>
        <!-- 未被分区下的组和水表 -->
        <div>
          <span
            v-for="(item, index) in lampList3"
            :key="item.groupId"
            style="color:#666666"
            @click="onColor2(index, item.groupId)"
            :class="{ color: index == current_3 }"
            >{{ item.groupName }}</span
          >
        </div>
      </div>
      <div class="select">
        <div class="confirm" @click="addLamp">增加</div>
        <div class="cancel" @click="deleteLamp">删除</div>
      </div>
    </div>
    <div class="addModel" v-if="isSHow">
      <input
        type="text"
        placeholder="请输入分区名称"
        class="addInput"
        v-model="addDistrictName"
      />
      <button class="addSure" @click="addSure">确定</button>
      <div class="close" @click="close">
        <i class="el-icon-error"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_1: 999, // 分组默认样式
      current_2: 999, // 路灯默认样式
      current_3: 999,
      groupList: [], // 分组列表
      total: "", // 分组数量
      newGroup: [], // 新建分组
      lampList: [], // 路灯列表
      message: "", // 输入框内容
      districtId: "", // 需要修改分组的ID
      deviceId: "", // 路灯ID
      groupName: "",
      isSHow: false,
      addDistrictName: "",
      thisNum1: "",
      thisNum2: "",
      thisNum3: "",
      economize3: "",
      money3: "",
      groupId: "",
      lampList1: [],
      lampList2: [],
      lampList3: [],
      irrDeviceList1: [],
      irrDeviceList2: [],
      irrDeviceList3: [],
      istrictRank: "",
      isRankShow: false,
      devId: "",
      searchName: "",
      irrList: [],
      irrDelList: []
    };
  },
  methods: {
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
    onselec(index, districtId) {
      this.current = index;
      this.districtId = districtId;
      for (let i = 0; i < this.groupList.length; i++) {
        if (index == i) {
          this.groupList[i].delShow = true;
        } else {
          this.groupList[i].delShow = false;
          this.groupList[i].inputshow = false;
          this.groupList[i].textshow = true;
        }
      }
      this.getDistrict(districtId);
      this.getLamp();
      this.getLamp1();
    },
    // 获取当前分区的组 和 水表
    getDistrict(districtId) {
      this.$axios({
        method: "get",
        url: "/irrigation/district/getByDis",
        params: {
          districtId
        }
      }).then(res => {
        this.lampList1 = res.data.data;

        for (var i = 0; i < this.lampList1.length; i++) {
          this.istrictRank = this.lampList1[i].rank;
          this.$axios({
            method: "get",
            url: "/irrigation/group/ByGroup",
            params: {
              groupId: this.lampList1[i].groupId
            }
          }).then(res => {
            this.irrDeviceList1 = res.data.data;
          });
        }
      });
    },
    close() {
      this.isSHow = !this.isSHow;
    },
    // 获取已被分区的组
    getLamp() {
      this.$axios({
        method: "get",
        url: "/irrigation/group/all",
        params: {
          type: 1
        }
      }).then(res => {
        console.log(res);
        this.lampList2 = res.data.data;
        for (var i = 0; i < this.lampList2.length; i++) {
          this.$axios({
            method: "get",
            url: "/irrigation/group/ByGroup",
            params: {
              groupId: this.lampList2[i].groupId
            }
          }).then(res => {
            console.log(res);
            this.irrDeviceList2 = res.data.data;
          });
        }
      });
    },
    // 获取未被分区的组
    getLamp1() {
      this.$axios({
        method: "get",
        url: "/irrigation/group/all",
        params: {
          type: 2
        }
      }).then(res => {
        console.log(res);
        this.lampList3 = res.data.data;
        for (var i = 0; i < this.lampList3.length; i++) {
          this.$axios({
            method: "get",
            url: "/irrigation/group/ByGroup",
            params: {
              groupId: this.lampList3[i].groupId
            }
          }).then(res => {
            console.log(res);
            this.irrDeviceList3 = res.data.data;
          });
        }
      });
    },
    // 获取所有分区
    getGroup() {
      this.$axios({
        method: "get",
        url: "/irrigation/district/all"
      }).then(res => {
        this.groupList = res.data.data;
        this.groupList.forEach(item => {
          this.$set(item, "textshow", true);
        });
        this.total = res.data.data.length;
        this.groupList.reverse();
        this.onselec(0, res.data.data[0].districtId);
      });
    },
    // 添加分区
    addGroup() {
      this.isSHow = !this.isSHow;
    },
    // 分区下添加组
    addSure() {
      this.isSHow = !this.isSHow;
      this.$axios({
        method: "post",
        url: "/irrigation/district/save",
        params: {
          districtName: this.addDistrictName
        }
      }).then(res => {
        if (res.data.code == 0) {
          // this.newGroup = res.config.data;
          // this.groupList.push(this.newGroup);
          this.getGroup();
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    // 删除分组
    deleteGroup(districtId, districtName) {
      this.$confirm("是否删除" + districtName + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "POST",
            url: `/irrigation/district/del?districtId=${districtId}`
          }).then(() => {
            // 获取所有分组
            this.getGroup();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改分组
    editGroup(districtName, districtId) {
      console.log(districtName);

      console.log(districtId);

      this.$axios({
        method: "POST",
        url: "/irrigation/district/update",
        params: {
          districtId,
          districtName
        }
      }).then(res => {
        console.log(res);
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
          // this.groupList[i].districtName = "";
          this.groupList[i].textshow = false;
        } else {
          this.groupList[i].inputshow = false;
        }
      }
      this.districtId = districtId;
    },
    // input事件（按下回车）
    keyupInupt() {
      // 调用修改分区
      this.editGroup(this.message, this.districtId);
    },
    // 点击路灯添加样式
    onColor(index, groupId, id) {
      this.current_1 = index;
      this.deviceId = groupId;
      this.devId = id;
      this.current_2 = 999;
      this.current_3 = 999;
      this.irrDelList.push({
        id
      });
    },
    onColor1(index, groupId) {
      this.current_2 = index;
      this.groupId = groupId;
      this.current_1 = 999;
      this.current_3 = 999;
      this.irrList.push({
        groupId
      });
    },
    onColor2(index, groupId) {
      this.current_3 = index;
      this.groupId = groupId;
      this.current_1 = 999;
      this.current_2 = 999;
      this.irrList.push({
        groupId
      });
    },
    // 向分区添加组
    addLamp() {
      console.log(this.irrList);
      for (var i = 0; i < this.irrList.length; i++) {
        this.$axios({
          method: "post",
          url: "/irrigation/district/setGroup",
          params: {
            districtId: this.districtId,
            groupId: this.irrList[i].groupId
            // groupId: this.groupId
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.getDistrict(this.districtId);
            this.getLamp();
            this.getLamp1();
            this.irrList = [];
            console.log(this.irrList);
          } else {
            this.$message(res.data.msg);
            this.irrList = [];
            console.log(this.irrList);
          }
        });
      }
    },
    // 分区删除组
    deleteLamp() {
      console.log(this.irrDelList);
      for (var i = 0; i < this.irrDelList.length; i++) {
        this.$axios({
          method: "post",
          url: "/irrigation/district/delGroup",
          params: {
            ID: this.irrDelList[i].id
            // districtId: this.districtId,
            // groupId: this.groupId
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message("删除成功");
            this.getDistrict();
            this.getLamp();
            this.getLamp1();
            this.irrDelList = [];
            console.log(this.irrDelList);
          } else {
            this.$message(res.data.msg);
            this.irrDelList = [];
            console.log(this.irrDelList);
          }
        });
      }
    },
    editRank() {
      this.isRankShow = true;
    },
    rankBtn(id) {
      this.isRankShow = false;
      this.$axios({
        method: "post",
        url: "/irrigation/district/setRank",
        params: {
          ID: id,
          rank: this.istrictRank
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.onselec(this.current, this.districtId);
        }
      });
    }
  },
  created() {
    // 获取所有路灯
    this.getLamp();

    // 获取所有分区
    this.getGroup();
  }
};
</script>

<style lang="less" scoped>
// 状态颜色
.color {
  color: #ffffff !important;
}

// 点击添加的样式
.active {
  background: url("../../../assets/img/左侧选中框.png") no-repeat;
  background-size: 100% 100%;
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
    text-align: left;
    position: relative;

    .data {
      // display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      padding: 0 15px 0 25px;

      .editRankBtn {
        width: 60px;
        height: 20px;
        line-height: 20px;
        color: #0bb5b9;
        background-image: url("../../../assets/img/sure.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-align: center;
        display: inline-block;
        margin-left: 10px;
      }
      span {
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin-right: 10px;
        color: #cccccc;
        border-bottom: 1px solid #000;
      }
    }
    .data::-webkit-scrollbar {
      display: none;
    }
    .select {
      width: 150px;
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 215px;
      bottom: 16px;

      .confirm {
        width: 60px;
        height: 20px;
        line-height: 20px;
        color: #0bb5b9;
        background: url("../../../assets/img/sure.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
      }

      .cancel {
        width: 60px;
        height: 20px;
        line-height: 20px;
        color: #f00;
        background: url("../../../assets/img/quxiao.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
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
</style>
