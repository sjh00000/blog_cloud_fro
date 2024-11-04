<template>
  <Header></Header>
  <div>
    <el-container>
      <el-main>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
          <el-form-item>
            <el-image :src="require('@/assets/logo.png')" style="border-radius: 50%; width: 150px; height: 150px;"
                      class="el-image"></el-image>
          </el-form-item>
          <el-form-item label="用户名" prop="username" class="el-form-1">
            <input v-model="registerForm.username" class="input-title">
          </el-form-item>
          <el-form-item label="密码" prop="password" class="el-form-1">
            <input type="password" v-model="registerForm.password" class="input-title">
          </el-form-item>
          <el-form-item label="邮箱" prop="email" class="el-form-1">
            <input v-model="registerForm.email" class="input-title">
          </el-form-item>
          <el-form-item class="el-form-button">
            <el-button type="primary" @click="submitForm('registerForm')" class="click-button">注册</el-button>
            <el-button @click="resetForm('registerForm')" class="click-button">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Register",
  components: {Header},

  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        email: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post('/account/register', this.registerForm).then(res => {
            console.log(res)
            if (res != null && res.data.code === 200) {
              this.$message.success('注册成功');
              _this.$router.push('/login'); // 注册成功后跳转到登录页面
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.input-title {
  width: 70%;
  margin-left: 2%;
  padding: 15px;
  border: 1px solid mediumpurple;
  border-radius: 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.demo-ruleForm {
  max-width: 500px;
  margin: 15% auto 0;
}

.el-form-1 {
  margin-bottom: 10%;
}

.el-form-button {
  margin-left: 10%;
}

.click-button {
  width: 33%;
  margin-left: -8%;
  margin-right: 40px;
  padding: 15px;
  border: 2px solid mediumpurple;
  border-radius: 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.el-image {
  position: fixed;
  top: 10%;
  left: 46%;
}
</style>
