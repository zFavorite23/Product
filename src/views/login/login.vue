<template>
  <div class="login">
    <div class="v">
      <video playsinline autoplay muted loop class="v1">
        <source
          src="http://file.dreamdeck.cn/app/icons/website/index1.mp4"
          type="video/mp4"
        />
      </video>
    </div>

    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form size="mini" ref="loginForm" :model="user" :rules="rules">
        <el-form-item>
          <div class="logoName">DreamDeck</div>
        </el-form-item>
        <el-form-item prop="itemId">
          <el-select
            v-model="user.itemId"
            placeholder="请选择项目"
            style="width:100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item prop="name" v-if="status == 1">
          <el-input
            placeholder="用户名/手机号"
            clearable
            v-model="user.name"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile" v-if="status == 2">
          <el-input
            placeholder="手机号"
            clearable
            v-model="user.mobile"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pass" v-if="status == 1">
          <el-input
            placeholder="密码"
            clearable
            v-model="user.pass"
            show-password
            prefix-icon="el-icon-message-solid"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item v-if="status == 2" prop="code">
          <div class="code">
            <el-input
              class="wid"
              v-model="user.code"
              clearable
              placeholder="验证码"
            ></el-input>
            <el-button
              class="wid"
              type="primary"
              @click="getVerify"
              :disabled="(disabled = !show)"
            >
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{ count }} s</span>
            </el-button>
          </div>
        </el-form-item>
        <!-- 记住我 -->
        <el-form-item>
          <el-checkbox
            label="记住密码"
            class="rememberMe"
            v-model="checked"
            :disabled="status != 1"
          ></el-checkbox>
          <el-checkbox
            label="自动登陆"
            class="rememberMe"
            :disabled="status != 1"
          ></el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
        </el-form-item>
        <!-- 登录方式 -->
        <el-form-item>
          <div class="way">
            <el-button type="text" @click="status = 1">用户名登陆</el-button>
            <el-button type="text" @click="status = 2">手机号登陆</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 1,
      user: {
        name: "",
        mobile: "13331157116",
        pass: "",
        code: "1234",
        itemId: ""
      },
      checked: true,
      rules: {
        itemId: [{ required: true, message: "请选择项目", trigger: "blur" }],
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        pass: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4位",
            trigger: "blur"
          }
        ]
      },
      options: [
        {
          value: "0",
          label: "项目0"
        },
        {
          value: "1",
          label: "项目1"
        },
        {
          value: "2",
          label: "项目2"
        },
        {
          value: "7",
          label: "项目7"
        }
      ],
      show: true,
      count: "", // 初始化次数
      timer: null
    };
  },
  methods: {
    // 登陆
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/auth/mobile/token/sms",
            headers: {
              // "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Basic ZGQ6ZGQ"
            },
            params: {
              mobile: `SMS@${this.user.mobile}`,
              code: this.user.code,
              grant_type: "mobile"
            }
          })
            .then(res => {
              //判断复选框是否被勾选 勾选则调用配置cookie方法
              if (this.checked == true) {
                //传入账号名，密码，和保存天数3个参数
                this.setCookie(this.user.name, this.user.pass, 3);
              }
              sessionStorage.setItem("itemId", this.user.itemId);
              sessionStorage.setItem("token", res.data.access_token);
              sessionStorage.setItem(
                "userInfo",
                JSON.stringify(res.data.user_info)
              );
              this.$router.replace("/home");
            })
            .catch(() => {
              this.$message.error("用户不存在！");
              this.clearCookie();
            });
        } else {
          return false;
        }
      });
    },

    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },

    // 读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.user.name = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.user.pass = arr2[1];
          }
        }
      }
    },

    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },

    // 获取验证码
    getVerify() {
      // 验证手机号
      if (this.checkPhone() == false) {
        return false;
      } else {
        const TIME_COUNT = 60; //更改倒计时时间
        this.$message.success("验证码发送成功");
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer); // 清除定时器
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    checkPhone() {
      let phone = this.user.mobile;
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.$message.error("请填写正确的手机号");
        return false;
      }
    }
  },
  mounted() {
    this.getCookie();
  }
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
}
.logoName {
  color: #fff;
  font-size: 18px;
  margin-left: 28%;
}
.way {
  display: flex;
  justify-content: space-around;
  color: #66b1ff;
}

.login_box {
  width: 290px;
  height: 386px;
  //    background-color: #fff;
  background-color: #30363bb3;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 47%;
  transform: translate(-50%, -47%);
}
.el-form {
  padding: 30px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}
.el-button {
  width: 100%;
}
.code {
  display: flex;
  justify-content: space-between;
}
.wid {
  width: 45% !important;
}

img {
  /* style="width: 100px; height: 30px; margin-left:5px;vertical-align: middle;" */
  display: line-inline;
  width: 45%;
  height: 28px;
  margin-left: 10px;
  vertical-align: middle;
  border-radius: 3px;
}
.rememberMe {
  color: #fff;
}

.v {
  overflow: hidden;
  height: 100vh;

  .v1 {
    width: 100%;
    display: inline-block;
  }
}
</style>
