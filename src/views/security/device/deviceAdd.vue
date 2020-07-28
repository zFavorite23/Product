<template>
  <div class="deviceAdd">
    <div class="form">
      <div>
        <span>
          相机编号：
          <input type="text" v-model="form.brandId" />
        </span>
        <span>
          相机名：
          <input type="text" v-model="form.name" />
        </span>
      </div>
      <div>
        <span>
          相机IP：
          <input type="text" v-model="form.ip" />
        </span>
        <span>
          相机URL：
          <input type="text" v-model="form.rtmpUrl" />
        </span>
      </div>
      <div>
        <span>
          用户名：
          <input type="text" v-model="form.username" />
        </span>
        <span>
          经度：
          <input type="text" v-model="form.longitude" />
        </span>
      </div>
      <div>
        <span>
          用户密码：
          <input type="text" v-model="form.password" />
        </span>
        <span>
          纬度：
          <input type="text" v-model="form.latitude" />
        </span>
      </div>
      <div>
        <span>
          摄像类型：
          <select v-model="form.type">
            <option
              v-for="(item, index) in types"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></option>
          </select>
        </span>
      </div>
    </div>

    <div class="select">
      <div class="confirm" @click="confirm">确定</div>
      <div class="cancel" @click="cancel">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        brandId: "",
        ip: "",
        latitude: "",
        longitude: "",
        name: "",
        password: "",
        rtmpUrl: "",
        rtspUrl: "",
        type: "",
        username: ""
      },
      types: [
        {
          value: "1",
          label: "球机"
        },
        {
          value: "2",
          label: "枪机"
        },
        {
          value: "3",
          label: "半球"
        }
      ]
    };
  },
  methods: {
    // 确定
    confirm() {
      console.log(this.form);
    },

    // 取消
    cancel() {
      this.form = {
        brandId: "",
        ip: "",
        latitude: "",
        longitude: "",
        name: "",
        password: "",
        rtmpUrl: "",
        rtspUrl: "",
        type: "",
        username: ""
      };
    }
  }
};
</script>

<style scoped>
.deviceAdd {
  background: url("../../../assets/img/框3.png") no-repeat;
  background-size: 100% 100%;
  height: 420px;
}

.deviceAdd .form {
  padding: 70px 70px 0;
}
.deviceAdd .form div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
input {
  outline-style: none;
  border: 0px;
  background: url("../../../assets/img/search.png") no-repeat;
  background-size: 100% 100%;
  color: #fff;
  margin-right: 15px;
}
select {
  border: none;
  background: url("../../../assets/img/dayBg.png") no-repeat;
  background-size: 100% 100%;
  width: 169px;
  color: #fff;
  background: #030d14;
  outline: none;
  text-align-last: center;
}

.select {
  width: 150px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 40%;
  margin-top: 15px;
}
.select .confirm {
  width: 60px;
  height: 20px;
  line-height: 20px;
  color: #0bb5b9;
  background: url("../../../assets/img/Yes.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
.select .cancel {
  width: 60px;
  height: 20px;
  line-height: 20px;
  color: #f00;
  background: url("../../../assets/img/No.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
</style>
