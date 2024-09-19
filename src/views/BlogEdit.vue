<template>
  <div>
    <Header></Header>

    <div class="m-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title" class="form-item-label">
          <el-input v-model="ruleForm.title" class="input-title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description" class="form-item-label">
          <el-input type="textarea" v-model="ruleForm.description" class="input-description"></el-input>
        </el-form-item>

        <el-form-item label="标签" prop="tags" class="form-item-label">
          <el-input v-model="ruleForm.label" class="input-label"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content" class="form-item-label">
          <v-md-editor v-model="ruleForm.content" class="input-content"></v-md-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "BlogEdit.vue",
  components: { Header },
  data() {
    return {
      ruleForm: {
        id: '',
        title: '',
        description: '',
        label: '', // 新增标签字段
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请输入标签', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post('/blog/edit', this.ruleForm, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            console.log(res);
            _this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/blogs");
              }
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    const blogId = this.$route.params.blogId;
    console.log(blogId);
    const _this = this;
    if (blogId) {
      this.$axios.get('/blog/' + blogId).then(res => {
        const blog = res.data.data;
        _this.ruleForm.id = blog.id;
        _this.ruleForm.title = blog.title;
        _this.ruleForm.description = blog.description;
        _this.ruleForm.tags = blog.label; // 加载标签数据
        _this.ruleForm.content = blog.content;
      });
    }
  }
};
</script>

<style scoped>
.m-content {
  text-align: center;
}

.form-item-label .el-form-item__label {
  color: black; /* 设置表单标签字体颜色为黑色 */
}

.input-title, .input-description, .input-label, .input-content {
  width: 70%;
}

.input-content .v-md-editor {
  min-height: 300px; /* 设置内容文本框的最小高度，使其更长 */
}
</style>