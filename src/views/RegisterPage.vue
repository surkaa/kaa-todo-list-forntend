<template>
  <div class="register">
    <random-tree live-ratio="0.65"/>
    <div class="register-body">
      <h1>注 册</h1>
      <el-form :rules="rules" :model="register" ref="register">
        <el-form-item prop="account">
          <el-input
              v-model="register.account"
              type="text"
              maxlength="256"
              minlength="6"
              placeholder="用户账号: "
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="register.password"
              type="password"
              maxlength="512"
              minlength="8"
              placeholder="用户密码: "
              show-password
          />
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input
              v-model="register.checkPassword"
              type="password"
              maxlength="512"
              minlength="8"
              placeholder="确认密码: "
              show-password
              @keydown.enter.native="registerAction"
          />
        </el-form-item>
      </el-form>
      <el-button
          type="primary"
          round
          style="width: 60%;"
          @click="registerAction"
      >注 册
      </el-button>
      <p style="margin-top: 15px;"
      >已有账号? 点
        <router-link to="login"
                     style="text-decoration: none; color:#eee; font-weight: 700"
        >这里登录
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import RandomTree from "@/components/RandomTree.vue";
export default {
  name: "RegisterPage",
  components: {
    RandomTree
  },
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入注册账号"))
      } else {
        if (value.length < 6) {
          callback(new Error("注册账号的长度不能小于6位"))
        } else if (value[0] >= '0' && value[0] <= '9') {
          callback(new Error("注册账号不能以数字开头"))
        } else {
          callback()
        }
      }
    }
    const validatorPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入注册密码"))
      } else {
        if (value.length < 8) {
          callback(new Error("注册密码不能小于8位"))
        }
        callback()
      }
    }
    const validatorCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入注册密码"))
      } else {
        if (value.length < 8) {
          callback(new Error("注册密码不能小于8位"))
        } else if (value !== this.register.password) {
          callback(new Error("两次输入的密码不相同"))
        }
        callback()
      }
    }
    return {
      register: {
        account: "",
        password: "",
        checkPassword: "",
      },
      rules: {
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ],
        password: [
          {validator: validatorPassword, trigger: 'blur'}
        ],
        checkPassword: [
          {validator: validatorCheckPassword, trigger: 'blur'}
        ],
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
  display: flex;
  flex-direction: row;
}

.register-body {
  width: 400px;
  padding: 64px;
}

@media screen and (max-width: 768px) {
  .register {
    padding: 16px;
    flex-direction: column;
  }

  .register-body {
    width: 300px;
    padding: 32px;
  }
}

.register .register-body h1 {
  color: #eee;
}

.register .register-body p {
  color: #bbb;
}

.register .register-body .el-input {
  margin-top: 8%;
}

.register .register-body .el-button {
  margin-top: 10%;
}
</style>