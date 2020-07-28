<template>
  <div class="partition">
    <div class="add">
      <span @click="addGroup">
        <i class="el-icon-plus"></i>
        添加分组
      </span>
      <span style="float:right;right:0">
        <span>搜索分组：</span>
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
      <span>分组名称 ( {{ total }} )</span>
      <div class="data">
        <span
          v-for="(item, index) in groupList"
          :key="index"
          @click="onselec(index, item.groupId)"
          :class="{ active: index == current }"
        >
          <i v-show="item.textshow" class="name1">{{ item.groupName }}</i>
          <i
            class="el-icon-delete"
            v-show="item.delShow"
            @click="deleteGroup(item.groupId, item.groupName)"
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
            @click="onEdit(index, item.groupId)"
          ></i>
        </span>
      </div>
    </div>
    <div class="facility">
      <span>所有设备</span>
      <div
        class="data"
        style="height: 317px;overflow-y: scroll;text-align: left"
      >
        <!-- 当前分组的水表 -->
        <div>
          <span
            v-for="(item, index) in lampList1"
            :key="item.index"
            style="color:#f78606"
            @click="onColor(index, item.deviceId, item.id)"
            :class="{ color: index == current_1 }"
            >{{ item.deviceName }}</span
          >
        </div>
        <!-- 已被分组的水表 -->
        <div>
          <span
            v-for="(item, index) in lampList2"
            :key="item.index"
            style="color:#15f6f3;margin-right:10px"
            @click="onColor1(index, item.deviceId)"
            :class="{ color: index == current_2 }"
            >{{ item.deviceName }}</span
          >
        </div>
        <!-- 未被分组的水表 -->
        <div>
          <span
            v-for="(item, index) in lampList3"
            :key="item.index"
            style="color:#666666"
            @click="onColor2(index, item.deviceId)"
            :class="{ color: index == current_3 }"
            >{{ item.deviceName }}</span
          >
        </div>
      </div>

      <div class="select">
        <div class="confirm" @click="addLamp()">增加</div>
        <div class="cancel" @click="deleteLamp()">删除</div>
      </div>
    </div>
    <div class="addModel" v-if="isSHow">
      <input
        type="text"
        placeholder="请输入分组名称"
        class="addInput"
        v-model="addGroupName"
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
      current: 999, // 分组默认样式
      current_1: 999, // 路灯默认样式
      current_2: 999,
      current_3: 999,
      groupList: [], // 分组列表
      total: "", // 分组数量
      newGroup: [], // 新建分组
      lampList: [], // 路灯列表
      message: "", // 输入框内容
      groupId: "", // 需要修改分组的ID
      deviceId: "", // 路灯ID
      groupName: "",
      isSHow: false,
      addGroupName: "",
      lampList3: [],
      lampList2: [],
      lampList1: [],
      devId: "",
      lampList4: [],
      searchName: "",
      irrList: [],
      irrDelList: []
    };
  },
  methods: {
    keyupInuptSearch() {
      console.log(this.searchName);
      var a = this.groupList.filter(ele => ele.groupName == this.searchName);
      console.log(a);
      if (a == [] || a == "") {
        console.log(111);
        this.$message.error("没有检测到当前内容");
      } else {
        this.groupList = a;
      }
    },
    sendMsg() {
      this.$emit("func", this.groupId);
    },
    // 获取所有水表
    getIrr() {
      this.$axios({
        method: "get",
        url: "/irrigation/water/all"
      }).then(res => {
        var data = res.data.data;
        this.lampList4 = data;
        // for (var i = 0; i < data.length; i++) {
        //   for (var j = 0; j < data1.length; j++) {
        //     if (data1[j].deviceId == data[i].deviceId) {
        //       // console.log(data.splice(i,1));
        //       console.log( data[i]);
        //     }
        //   }
        // }
        // 不在当前组的水表
        // this.lampList4 = data;
        // console.log(this.lampList4);
      });
    },
    // 点击添加样式
    onselec(index, groupId) {
      this.current = index;
      this.groupId = groupId;
      for (let i = 0; i < this.groupList.length; i++) {
        if (index == i) {
          this.groupList[i].delShow = true;
        } else {
          this.groupList[i].delShow = false;
          this.groupList[i].inputshow = false;
          this.groupList[i].textshow = true;
        }
      }
      this.getByGroup(groupId);
      this.getLamp();
      this.getLamp1();
    },
    // 当前分组的水表
    getByGroup(groupId) {
      this.$axios({
        method: "get",
        url: "/irrigation/group/ByGroup",
        params: {
          groupId
        }
      }).then(res => {
        this.lampList1 = res.data.data;
        this.getIrr();
      });
    },
    close() {
      this.isSHow = !this.isSHow;
    },
    // 获取已被分组的水表
    getLamp() {
      this.$axios({
        method: "get",
        url: "/irrigation/water/all",
        params: {
          type: 1
        }
      }).then(res => {
        this.lampList2 = res.data.data;
      });
    },
    // 获取未被分组的水表
    getLamp1() {
      this.$axios({
        method: "get",
        url: "/irrigation/water/all",
        params: {
          type: 2
        }
      }).then(res => {
        this.lampList3 = res.data.data;
      });
    },
    // 获取所有分组
    getGroup() {
      this.$axios({
        method: "get",
        url: "/irrigation/group/page"
      }).then(res => {
        this.groupList = res.data.data.records;
        // textshow
        this.groupList.forEach(item => {
          this.$set(item, "textshow", true);
        });
        this.total = res.data.data.total;
        this.groupList.reverse();
        this.onselec(0, res.data.data.records[0].groupId);
      });
    },
    // 添加分组
    addGroup() {
      this.isSHow = !this.isSHow;
    },
    // 添加分组
    addSure() {
      this.isSHow = !this.isSHow;
      this.$axios({
        method: "post",
        url: "/irrigation/group/add",
        params: {
          groupName: this.addGroupName
        }
      }).then(res => {
        if (res.data.code == 0) {
          // this.newGroup = res.config.data;
          // 将新分组添加
          // this.groupList.push(this.newGroup);
          // 重新获取列表
          this.getGroup();
        }
        if (res.data.code == 1) {
          this.$notify({
            title: "警告",
            message: res.data.msg,
            type: "warning"
          });
        }
      });
    },
    // 删除分组
    deleteGroup(groupId, groupName) {
      console.log(groupId);
      console.log(groupName);
      this.$confirm("是否删除" + groupName + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "POST",
            url: `/irrigation/group/del?groupId=` + groupId
          }).then(() => {
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
    editGroup(groupName, groupId) {
      this.$axios({
        method: "POST",
        url: "/irrigation/group/update",
        params: {
          groupId,
          groupName
        }
      }).then(() => {
        this.getGroup();
      });
    },
    // 点击编辑按钮
    onEdit(index, groupId) {
      for (var i = 0; i < this.groupList.length; i++) {
        if (index == i) {
          this.groupList[i].inputshow = true;
          // 使原来文字变空
          // this.groupList[i].groupName = "";
          this.groupList[i].textshow = false;
        } else {
          this.groupList[i].inputshow = false;
        }
      }
      this.groupId = groupId;
    },
    // input事件（按下回车）
    keyupInupt() {
      // 调用修改分组
      this.editGroup(this.message, this.groupId);
    },
    // 点击添加样式
    onColor(index, deviceId, id) {
      this.current_1 = index;
      this.deviceId = deviceId;
      this.devId = id;
      this.current_2 = 999;
      this.current_3 = 999;
      this.irrDelList.push({
        id
      });
    },
    onColor1(index, deviceId) {
      this.current_2 = index;
      this.deviceId = deviceId;
      this.current_1 = 999;
      this.current_3 = 999;
      this.irrList.push({
        deviceId
      });
    },
    onColor2(index, deviceId) {
      this.current_3 = index;
      this.deviceId = deviceId;
      this.current_1 = 999;
      this.current_2 = 999;
      this.irrList.push({
        deviceId
      });
    },
    // 分组添加水表
    addLamp() {
      console.log(this.irrList);
      for (var i = 0; i < this.irrList.length; i++) {
        console.log(this.irrList[i].deviceId);
        this.$axios({
          method: "post",
          url: "/irrigation/group/setWater",
          params: {
            groupId: this.groupId,
            deviceId: this.irrList[i].deviceId
            // deviceId: this.deviceId
          }
        }).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.getByGroup(this.groupId);
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
    // 分组删除水表
    deleteLamp() {
      console.log(this.irrDelList);
      for (var i = 0; i < this.irrDelList.length; i++) {
        this.$axios({
          method: "post",
          url: "/irrigation/group/delWater",
          params: {
            // id: this.devId
            id: this.irrDelList[i].id
          }
        }).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.getByGroup(this.groupId);
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
    }
  },
  created() {
    // 获取所有水表
    this.getLamp();
    this.getLamp1();
    // 获取所有分组
    this.getGroup();
  }
};
</script>

<style lang="less" scoped>
.name1 {
  width: 75%;
  display: inline-block;
  left: 10px;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: enter;
}
// 状态颜色
.color {
  // color: #15f6f3 !important;
  color: #ffffff !important;
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
      height: 315px;
      overflow-y: scroll;
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
    .data::-webkit-scrollbar {
      display: none;
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

    .data {
      // display: flex;
      // flex-wrap: wrap;
      margin-top: 15px;
      padding: 0 15px 0 25px;

      span {
        width: 80px;
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
}
</style>
