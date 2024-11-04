<template>
  <Header></Header>
  <div>
    <div class="m-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row class="el-row">
          <el-col>
            <el-form-item label="标题" prop="title" class="form-item-label-1">
              <input v-model="ruleForm.title" class="input-title"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="摘要" prop="description" class="form-item-label-1">
              <input v-model="ruleForm.description" class="input-description"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="标签" prop="tags" class="form-item-label-1">
          <div v-for="(tag, index) in tags" :key="index" class="tag-button">
            <el-button :type="selectedTag === tag ? 'primary' : 'default'"
                       @click="selectTag(tag)">
              {{ tag }}
            </el-button>
          </div>
        </el-form-item>

        <el-form-item label="内容" prop="content" class="form-item-label">
          <v-md-editor v-model="ruleForm.content" class="input-content"></v-md-editor>
        </el-form-item>


      </el-form>
    </div>
  </div>
  <el-col class="fixed-buttons">
    <el-button type="primary" @click="submitForm('ruleForm')" class="el-button-2">完成</el-button>
    <el-button @click="resetForm('ruleForm')" class="el-button-3">重置</el-button>
  </el-col>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "BlogEdit.vue",
  components: {Header},
  data() {
    return {
      ruleForm: {
        id: '',
        title: '',
        description: '',
        content: '',
        userId:'',
        username:''
      },
      tags: [], // 所有标签数组
      selectedTag: null ,// 已选择的标签
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post('/blog/edit', {
            ...this.ruleForm,
            tag: this.selectedTag || ''
          }, {
            headers: {
              "authorization_access": localStorage.getItem("accessToken")
            }
          }).then(res => {
            console.log(res);
            if (res != null && res.data.code === 200) {
              _this.$alert('操作成功', '提示', {
                confirmButtonText: '确定'
              });
              _this.$router.push(`/blog/${this.ruleForm.id}`)
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.selectedTag = null;
    },
    selectTag(tag) {
      this.selectedTag = this.selectedTag === tag ? null : tag;
    },
    fetchTags() {
      this.$axios.get('/blog/tags').then((res) => {
        // 过滤掉 "全部" 标签
        this.tags = res.data.data.filter(tag => tag !== '全部');
      });
    }
  },
  created() {
    const blogId = this.$route.params.blogId;
    console.log(blogId);
    this.fetchTags(); // 获取所有标签
    if (blogId) {
      this.$axios.get('/blog/detail/?blogId=' + blogId).then(res => {
        const blog = res.data.data;
        this.ruleForm.id = blog.id;
        this.ruleForm.title = blog.title;
        this.ruleForm.description = blog.description;
        this.ruleForm.content = blog.content;
        this.selectedTag = blog.tag.split(',').filter(tag => tag !== '全部')[0]; // 加载已选择的标签
      });
    }
    this.ruleForm.userId=this.$store.getters.getUser.id
    this.ruleForm.username=this.$store.getters.getUser.username
  }
};
</script>

<style scoped>
.m-content {
  text-align: center;
}

.form-item-label-1 {
  width: 60%;
  padding: 10px;
}

.el-row {
  margin-top: 7%; /* 减小间隔 */
  margin-right: 45%;
}

.input-title, .input-description {
  width: 33%;
  margin-left: 2%;
  padding: 15px;
  border: 1px solid mediumpurple;
  border-radius: 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-description {
  width: 100%;
}

.form-item-label {
  margin-top: 1%;
  width: 84%;
  margin-left: 0.5%;
}

.tag-button {
  margin-bottom: 10px;
  margin-right: 20px; /* 增加标签按钮的间隔 */
}

/* 让标签按钮也圆滑 */
.tag-button .el-button {
  border-radius: 10px; /* 圆角 */
}

/* 固定按钮样式 */
.fixed-buttons {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translateY(-50%); /* 垂直居中 */
  right: 60px;
  gap: 20px;
}

.el-button-2, .el-button-3 {
  width: 80px;
  height: 80px; /* 高度与宽度相同，形成圆形 */
  border-radius: 50%; /* 圆形 */
  font-size: 16px; /* 调整字体大小 */
  line-height: 80px; /* 文字垂直居中 */
}

.el-button-2 {
  margin-left: 10%;
}

</style>
