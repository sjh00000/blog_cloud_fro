<template>
  <Header></Header>
  <div>

    <el-container>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item>
            <el-image :src="require('@/assets/logo.png')" style="border-radius: 50%;width: 150px; height: 150px;"
                      class="el-image"
            ></el-image>
          </el-form-item>
          <el-form-item label="用户名" prop="username" class="el-form-1">
            <input v-model="ruleForm.username" class="input-title">
          </el-form-item>
          <el-form-item label="密码" prop="password" class="el-form-1">
            <input type="password" v-model="ruleForm.password" class="input-title">
          </el-form-item>

          <el-form-item class="el-form-button">
            <el-button type="primary" @click="submitForm('ruleForm')" class="click-button">登录</el-button>
            <el-button @click="resetForm('ruleForm')" class="click-button">重置</el-button>
          </el-form-item>
        </el-form>

      </el-main>
    </el-container>

  </div>
</template>

<script>
  import Header from "@/components/Header.vue";

  export default {
    name: "Login",
    components: { Header },
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this
            this.$axios.post('/account/login', this.ruleForm).then(res => {

              console.log(res)
              const accessToken = res.headers['authorization_access']
              const refreshToken = res.headers['authorization_refresh']
              const userInfo = res.data.data

              // 把数据共享出去
              _this.$store.commit("SET_TOKEN", [accessToken,refreshToken])
              _this.$store.commit("SET_USERINFO", userInfo)

              // 获取
              console.log(_this.$store.getters.getUser)

              _this.$router.push("/blogs")
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
  }
</script>

<style scoped>

  .input-title{
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

  .el-form-1{
    margin-bottom: 10%;
  }

  .el-form-button{
    margin-left: 10%;
  }

  .click-button{
    width: 33%;
    margin-left: -8%;
    margin-right: 40px;
    padding: 15px;
    border: 2px solid mediumpurple;
    border-radius: 15px;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .el-image{
    position: fixed;
    top: 10%;
    left: 46%;
  }

</style>