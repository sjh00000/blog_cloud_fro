<template>
  <Header></Header>
  <div>
    <div class="mblog">
      <div class="title-container">
        <h2>{{ blog.title }}</h2>
        <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }" v-if="ownBlog" class="edit-button">
          <el-link class="el-link-1">
            编辑
          </el-link>
        </router-link>
        <el-link v-else class="edit-button" disabled >
          编辑
        </el-link>

      </div>
      <div class ="content">
        <el-divider></el-divider>
        <div class="markdown-body" v-html="blog.content"></div>
      </div>

    </div>
  </div>
</template>

<script>
import 'github-markdown-css'
import Header from "../components/Header.vue";

export default {
  name: "BlogDetail.vue",
  components: { Header },
  data() {
    return {
      blog: {
        id: "",
        title: "",
        content: ""
      },
      ownBlog: false
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    console.log(blogId)
    const _this = this
    this.$axios.get('/blog/detail/?blogId=' + blogId).then(res => {
      const blog = res.data.data
      _this.blog.id = blog.id
      _this.blog.title = blog.title

      const MarkdownIt = require("markdown-it");
      const md = new MarkdownIt();

      var result = md.render(blog.content)
      _this.blog.content = result
      _this.ownBlog = (blog.username === _this.$store.getters.getUser.username)
    })
  }
}
</script>

<style scoped>
.mblog {
  width: 100%;
}

.mblog h2 {
  margin-left: 0;
  font-size: 3em; /* 增大标题字体 */
  color: darkcyan;
  width: 30%;
}

.markdown-body {
  padding: 40px; /* 增加内容的内边距 */
  background: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 内容背景模糊效果 */
  border-radius: 15px; /* 调整内容的圆角 */
  width: 70%;
  margin-left: 10%;
}

.content {
  margin-top: 1%;
}

.title-container {
  display: flex;
  align-items: center;
  margin-left: 10%;
  margin-top: 8%;
  margin-bottom: -1%;
}

.edit-button {
  margin-left: 45%;
}

.el-link-1 {
  background-color: mediumpurple;
  color: white; /* 设置编辑按钮字体颜色为白色 */
  padding: 10px 15px; /* 调整按钮的内边距 */
  border-radius: 5px; /* 调整按钮的圆角 */
  transition: background-color 0.3s;
}

.el-link-1:hover {
  background-color: dodgerblue;
  color: white; /* 鼠标悬停时按钮颜色加深 */
}

.el-link {
  background-color: mediumpurple;
  color: white; /* 设置编辑按钮字体颜色为白色 */
  padding: 10px 15px; /* 调整按钮的内边距 */
  border-radius: 5px; /* 调整按钮的圆角 */
  transition: background-color 0.3s;
}
</style>
