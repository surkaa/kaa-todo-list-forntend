<template>
  <div class="login">
    <h1>登 录</h1>
    <p style="font-size: 12px">请使用用户中心账户登录</p>
    <el-input
        v-model="login.account"
        type="text"
        maxlength="256"
        minlength="6"
        placeholder="用户账号: "
    />
    <el-input
        v-model="login.password"
        type="password"
        maxlength="512"
        minlength="8"
        placeholder="用户密码: "
        show-password
        @keydown.enter.native="loginAction"
    />
    <el-button
        type="primary"
        round
        style="width: 60%;"
        @click="loginAction"
    >登 录
    </el-button>
    <p>没有账号? 点
      <router-link to="register"
                   style="text-decoration: none; color:#eee; font-weight: 700"
      >这里注册
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        account: "",
        password: ""
      }
    }
  },
  methods: {
    loginAction() {
      this.$axios.post(
          'http://localhost:8000/users/login',
          this.login
      ).then(
          function (res) {
            if (res.data.code > 0) {
              alert("登录错误: " + res.data.description)
            }
          }
      ).catch(function (error) {
        console.log(error)
        alert("登录发生错误, 请稍后重试")
      })
    }
  }
}
</script>

<style scoped>
.login {
  width: 320px;
  height: 500px;
  padding: 16px;
}

.login h1 {
  color: #eee;
}

.login p {
  color: #bbb;
}

.login .el-input {
  width: 80%;
  margin-top: 8%;
}

.login .el-button {
  margin-top: 10%;
}
</style>