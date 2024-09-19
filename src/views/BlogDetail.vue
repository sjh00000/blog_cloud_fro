<template>
  <div>
    <Header></Header>

    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }" v-if="ownBlog" class="edit-button">
        <el-link icon="el-icon-edit">
        编辑
        </el-link>
      </router-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
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
    this.$axios.get('/blog/' + blogId).then(res => {
      const blog = res.data.data
      _this.blog.id = blog.id
      _this.blog.title = blog.title

      var MarkdownIt = require("markdown-it")
      var md = new MarkdownIt()

      var result = md.render(blog.content)
      _this.blog.content = result
      _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)
    })
  }
}
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
  position: relative;
  z-index: 1;
}

.mblog h2 {
  font-size: 2.5em; /* 增大标题字体 */
  margin-bottom: 20px; /* 增加底部间距 */
}

.markdown-body {
  padding: 20px; /* 增加内容的内边距 */
  background: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 内容背景模糊效果 */
  border-radius: 10px; /* 调整内容的圆角 */
}

.edit-button {
  display: inline-block;
  margin-bottom: 10px;
}

.edit-button .el-link {
  color: white; /* 修改链接字体颜色为白色 */
}

.el-link {
  background-color: red; /* 设置编辑按钮背景颜色为红色 */
  color: white; /* 设置编辑按钮字体颜色为白色 */
  padding: 10px 15px; /* 调整按钮的内边距 */
  border-radius: 5px; /* 调整按钮的圆角 */
  transition: background-color 0.3s;
}

.el-link:hover {
  background-color: darkred; /* 鼠标悬停时按钮颜色加深 */
}
</style>