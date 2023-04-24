<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="text" @click="showRegisterDialog">注册</el-button>
        <el-button type="text" @click="showForgetDialog">忘记密码</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="registerDialogVisible" title="注册" width="30%">
      <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="registerForm.confirmPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="registerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="forgetDialogVisible" title="忘记密码" width="30%">
      <el-form ref="forgetForm" :model="forgetForm" :rules="rules" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="forgetForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="forgetForm.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="forgetForm.confirmPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="forgetDialogVisible = false
">取 消
        </el-button>
        <el-button type="primary" @click="resetPassword">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      forgetForm: {
        username: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        username: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        confirmPassword: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value !== this.forgetForm.confirmPassword) {
                callback(new Error('两次输入密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },
      registerDialogVisible: false,
      forgetDialogVisible: false
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const data = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            remember: this.loginForm.remember
          };
          // 在登录成功后获取令牌，并将其存储在 localStorage 中
          axios.post('http://localhost:8080/login', data).then(res => {
            if (res.data.success) {
              // 存储令牌
              localStorage.setItem('token', res.data.token);
              // 登录成功，跳转到首页
              this.$router.push({path: '/home'});
            } else {
              // 登录失败，显示错误信息
              this.$message.error(res.data.message);
            }
          });

// 在 axios 请求中添加 Authorization 头
          axios.interceptors.request.use(config => {
            const token = {"username":"user","password":"123"};
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          });

        }
      });
    },
    resetForm() {
      this.$refs.loginForm.resetFields();
    },
    showRegisterDialog() {
      this.registerDialogVisible = true;
    },
    showForgetDialog() {
      this.forgetDialogVisible = true;
    },
    register() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          const data = {
            username: this.registerForm.username,
            password: this.registerForm.password
          };
          axios.post('/api/register', data).then(res => {
            if (res.data.success) {
              // 注册成功，关闭注册对话框
              this.registerDialogVisible = false;
              // 显示注册成功提示信息
              this.$message.success('注册成功，请登录');
            } else {
              // 注册失败，显示错误信息
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    resetPassword() {
      this.$refs.forgetForm.validate(valid => {
        if (valid) {
          const data = {
            username: this.forgetForm.username,
            newPassword: this.forgetForm.newPassword
          };
          axios.post('/api/resetPassword', data).then(res => {
            if (res.data.success) {
// 重置密码成功，关闭忘记密码对话框
              this.forgetDialogVisible = false;
// 显示重置密码成功提示信息
              this.$message.success('重置密码成功，请登录');
            } else {
// 重置密码失败，显示错误信息
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.form-item {
  margin-bottom: 20px;
}

.btn-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>