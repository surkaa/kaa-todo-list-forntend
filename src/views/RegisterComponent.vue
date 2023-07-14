<template>
  <div class="register">
    <h1>注 册</h1>
    <el-input
        v-model="register.account"
        type="text"
        maxlength="256"
        minlength="6"
        placeholder="用户账号: "
    />
    <el-input
        v-model="register.password"
        type="password"
        maxlength="512"
        minlength="8"
        placeholder="用户密码: "
        show-password
    />
    <el-input
        v-model="register.checkPassword"
        type="password"
        maxlength="512"
        minlength="8"
        placeholder="确认密码: "
        show-password
        @keydown.enter.native="registerAction"
    />
    <el-button
        type="primary"
        round
        style="width: 60%;"
        @click="registerAction"
    >注 册
    </el-button>
    <p>已有账号? 点
      <router-link to="login"
                   style="text-decoration: none; color:#eee; font-weight: 700"
      >这里登录
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      register: {
        account: "",
        password: "",
        checkPassword: "",
      }
    }
  },
  methods: {
    registerAction() {
      this.$axios.post(
          'http://localhost:8000/users/register',
          this.register
      ).then(
          function (res) {
            if (res.data.code > 0) {
              alert("注册错误: " + res.data.description)
              return
            } else {
              alert("注册成功 即将跳转登陆页面")
              window.location.href = '/todolist/login'
            }
          }
      ).catch(function (error) {
        console.log(error)
        alert("注册发生错误, 请稍后重试")
      })
    }
  }
}
</script>

<style scoped>
.register {
  width: 320px;
  height: 500px;
  padding: 16px;
}

.register h1 {
  color: #eee;
}

.register p {
  color: #bbb;
}

.register .el-input {
  width: 80%;
  margin-top: 8%;
}

.register .el-button {
  margin-top: 10%;
}
</style>