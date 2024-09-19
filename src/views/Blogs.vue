<template>
  <div class="mcontainer">
    <Header></Header>
    
    <div class="search-container">
      <input v-model="searchKeyword" placeholder="Search blogs..." @keyup.enter="searchBlogs" />
      <button @click="searchBlogs">Search</button>
    </div>

    <div class="main-content">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            :timestamp="blog.created"
            :key="blog.id"
            placement="top"
            v-for="blog in blogs"
          >
            <el-card class="blog-card">
              <h4>
                <router-link
                  :to="{ name: 'BlogDetail', params: { blogId: blog.id } }">
                  {{ blog.title }}
                </router-link>
              </h4>
              <p>{{ blog.description }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>

        <el-pagination
          class="mpage"
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="page"
        >
        </el-pagination>
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
      blogs: [],
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
      _this.$axios.get(`/blogs?currentPage=${currentPage}`).then((res) => {
        _this.blogs = res.data.data.records;
        _this.currentPage = res.data.data.current;
        _this.total = res.data.data.total;
        _this.pageSize = res.data.data.size;
      });
    },
    searchBlogs() {
      const _this = this;
      _this.$axios.get(`/blogs/search?keyword=${_this.searchKeyword}&currentPage=${_this.currentPage}`).then((res) => {
        _this.blogs = res.data.data.records;
        _this.currentPage = res.data.data.current;
        _this.total = res.data.data.total;
        _this.pageSize = res.data.data.size;
      });
    },
    filterBlogsByLabel(label) {
      const _this = this;
      _this.$axios.get(`/blogs/label/${label}?currentPage=${_this.currentPage}`).then((res) => {
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
  margin: 20px 0;
}

.search-container input {
  width: 300px;
  padding: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-container input:focus {
  border-color: #0056b3;
  box-shadow: 0 0 8px rgba(0, 91, 187, 0.5);
  outline: none;
}

.search-container button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.search-container button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.main-content {
  display: flex;
  width: 100%;
}

.block {
  flex: 1;
  margin-right: 10px; /* 缩小与标签页的间距 */
}

.blog-card {
  width: 75%;
  background: linear-gradient(to right, rgb(0, 204, 255), blue);
  color: black;
  margin: 10px auto;
  padding: 20px;
  border-radius: 10px;
}

.blog-card h4, .blog-card p {
  color: black;
}

.mpage {
  margin: 20px auto;
  text-align: center;
  width: 5%;
}

.router-link,
.router-link:visited,
.router-link:hover,
.router-link:active {
  color: black;
}

.tags-sidebar {
  width: 15%; /* 缩小标签页宽度 */
}
</style>