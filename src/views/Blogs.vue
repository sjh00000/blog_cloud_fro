<template>
  <Header></Header>
  <div class="mcontainer">


    <div class="search-container">
      <input v-model="searchKeyword" placeholder="Search blogs..." @keyup.enter="searchBlogs" />
      <button @click="searchBlogs">Search</button>
    </div>

    <div class="main-content">
      <div class="block">
        <div class="blog-list">
          <router-link :to="{ name: 'BlogDetail', params: { blogId: blog.id }}" class="blog-card" v-for="blog in blogs" :key="blog.id">
            <el-card class="inner-card">
              <h4 class="blue-title">{{ blog.title }}</h4>
              <p>{{ blog.description }}</p>
              <div class="created-date">{{ blog.created }}</div>
            </el-card>
          </router-link>
        </div>

        <el-pagination
            class="mpage"
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            @current-change="page"
        ></el-pagination>
      </div>

      <Tags @filterByLabel="filterBlogsByLabel" class="tags-sidebar"></Tags>
    </div>
  </div>
</template>


<script>
import Header from "../components/Header.vue";
import Tags from "../components/Tags.vue"; // 引入Tags组件

export default {
  name: "Blogs.vue",
  components: { Header, Tags },
  data() {
    return {
      blogs: null,
      currentPage: 1,
      total: 0,
      pageSize: 5,
      searchKeyword: '', // 搜索关键词
    };
  },
  methods: {
    page(currentPage) {
      this.fetchBlogs(currentPage);
    },
    fetchBlogs(currentPage) {
      const _this = this;
      _this.$axios.get(`/blog/list?currentPage=${currentPage}`).then((res) => {
        _this.blogs = res.data.data.records;
        console.log(res.data.data.records.length);
        _this.currentPage = res.data.data.current;
        _this.total = res.data.data.total;
        _this.pageSize = res.data.data.size;
      });
    },
    searchBlogs() {
      const _this = this;
      _this.currentPage = 1; // 重置当前页面为第一页
      _this.$axios.post(`/blog/search?keyword=${_this.searchKeyword}&currentPage=${_this.currentPage}`).then((res) => {
        _this.blogs = res.data.data.records;
        _this.currentPage = res.data.data.current;
        _this.total = res.data.data.total;
        _this.pageSize = res.data.data.size;
      });
    },
    filterBlogsByLabel(tag) {
      const _this = this;
      _this.currentPage = 1; // 重置当前页面为第一页
      _this.$axios.post(`/blog/queryByTag/?tag=${tag}&currentPage=${_this.currentPage}`).then((res) => {
        _this.blogs = res.data.data.records;
        _this.currentPage = res.data.data.current;
        _this.total = res.data.data.total;
        _this.pageSize = res.data.data.size;
      });
    }
  },
  created() {
    this.page(1);
  },
};
</script>


<style scoped>
.mcontainer {
  max-width: 97.5%;
  width: 100%;
  padding: 20px;
}

.search-container {
  display: flex;
  justify-content: center;
  margin: 2% 0 10px 5%;
}

.search-container input {
  width: 33%;
  margin-left: -8%;
  padding: 15px;
  border: 2px solid mediumpurple;
  border-radius: 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-container input:focus {
  border-color: #0056b3;
  outline: none;
}

.search-container button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: mediumpurple;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.search-container button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}


.main-content {
  margin-top: 5%;
  display: flex;
  width: 100%;
}

.block {
  flex: 1;
  margin-right: 10px; /* 缩小与标签页的间距 */
}

.blog-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.blog-card {
  width: 70%; /* 宽度稍微长一些 */
  margin-left: 10%;
  padding: 5px;
  text-align: left;
  text-decoration: none;
  display: block;
}

.inner-card {
  width: 100%;
  background: #e0f2ff; /* 淡蓝色背景 */
  color: #333;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.inner-card h4, .inner-card p {
  color: #333;
}

.inner-card .blue-title {
  color: mediumpurple; /* 设置标题文本颜色为蓝色 */
  text-decoration: none; /* 移除默认下划线 */
}

.blue-title:hover {
  color: #0056b3;
}

.created-date {
  font-size: 0.8em;
  color: #666;
}

.mpage {
  margin: 20px auto;
  text-align: center;
  width: 5%;
}

.tags-sidebar {
  width: 15%; /* 缩小标签页宽度 */
}
</style>
