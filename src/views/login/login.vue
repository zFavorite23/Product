<template>
  <div class="login">
    <div class="v">
      <video playsinline autoplay muted loop class="v1">
        <source src="http://file.dreamdeck.cn/app/icons/website/index1.mp4" type="video/mp4" />
      </video>
    </div>

    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form size="mini" ref="loginForm" :model="user" :rules="rules">
        <el-form-item>
          <div class="logoName">DreamDeck</div>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item prop="name" v-if="status==1">
          <el-input
            placeholder="用户名/手机号"
            clearable
            v-model="user.name"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile" v-if="status==2">
          <el-input
            placeholder="手机号"
            clearable
            v-model="user.mobile"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pass" v-if="status==1">
          <el-input
            placeholder="密码"
            clearable
            v-model="user.pass"
            show-password
            prefix-icon="el-icon-message-solid"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item v-if="status==2" prop="code">
          <el-input class="code" v-model="user.code" clearable placeholder="验证码"></el-input>
          <el-button class="code" type="text">发送验证码</el-button>
        </el-form-item>
        <!-- 记住我 -->
        <el-form-item>
          <el-checkbox label="记住密码" class="rememberMe" :disabled="status!=1"></el-checkbox>
          <el-checkbox label="自动登陆" class="rememberMe" :disabled="status!=1"></el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
        </el-form-item>
        <!-- 登录方式 -->
        <el-form-item>
          <div class="way">
            <el-button type="text" @click="status=1">用户名登陆</el-button>
            <el-button type="text" @click="status=2">手机号登陆</el-button>
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
        mobile: "",
        pass: "",
        code: ""
      },

      rules: {
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
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/auth/mobile/token/sms",
            headers: {
              Authorization: "Basic ZGQ6ZGQ"
            },
            params: {
              mobile: `SMS@${this.user.mobile}`,
              code: this.user.code,
              grant_type: "mobile"
            }
          })
            .then(res => {
              sessionStorage.setItem("token", res.data.access_token);
              this.$router.replace("/home");
            })
            .catch(() => {
              this.$message.error("登陆错误，请重试！");
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less' >
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
  height: 340px;
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