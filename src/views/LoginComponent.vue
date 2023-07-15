<template>
  <div class="login">
    <h1>登 录</h1>
    <p style="font-size: 12px">请使用用户中心账户登录</p>
    <el-form :rules="rules" ref="login" :model="login">
      <el-form-item prop="account">
        <el-input
            v-model="login.account"
            type="text"
            maxlength="256"
            minlength="6"
            placeholder="用户账号: "
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="login.password"
            type="password"
            maxlength="512"
            minlength="8"
            placeholder="用户密码: "
            autocomplete="off"
            show-password
            @keydown.enter.native="loginAction"
        />
      </el-form-item>
    </el-form>
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
    const account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入登录账号"))
      } else {
        if (value.length < 6) {
          callback(new Error("登录账号的长度不能小于6位"))
        } else if (value[0] >= '0' && value[0] <= '9') {
          callback(new Error("登录账号不能以数字开头"))
        } else {
          callback()
        }
      }
    }
    const password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入登录密码"))
      } else {
        if (value.length < 8) {
          callback(new Error("登录密码不能小于8位"))
        }
        callback()
      }
    }
    return {
      login: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          {validator: account, trigger: 'blur'}
        ],
        password: [
          {validator: password, trigger: 'blur'}
        ]
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
              return
            } else {
              alert("登录成功 将进入ToDoList页面")
              window.location.href = '/todolist'
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
  width: 640px;
  height: 800px;
  padding: 32px;
}

@media screen and (max-width: 768px) {
  .login {
    width: 320px;
    height: 500px;
    padding: 16px;
  }
}

.login h1 {
  color: #eee;
}

.login p {
  color: #bbb;
}

.login .el-input {
  margin-top: 8%;
}

.login .el-button {
  margin-top: 10%;
}
</style>