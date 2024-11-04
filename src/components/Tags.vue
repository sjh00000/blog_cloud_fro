<template>
  <div class="tags-container">
    <h3>Tags</h3>
    <ul>
      <li v-for="tag in tags" :key="tag" @click="filterByTag(tag)">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tags.vue",
  data() {
    return {
      tags: []
    };
  },
  methods: {
    fetchTags() {
      const _this = this;
      _this.$axios.get('/blog/tags').then((res) => {
        _this.tags = res.data.data;
      });
    },
    filterByTag(tag) {
      this.$emit('filterByLabel', tag);
    }
  },
  created() {
    this.fetchTags();
  }
};
</script>

<style scoped>
.tags-container {
  padding: 10px;
  background: #e0f2ff; /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 内容背景模糊效果 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: inline-block; /* 使容器根据内容自动扩展 */
  height: 100%;
}

.tags-container h3 {
  color: mediumpurple;
  text-align: center;
  margin-bottom: 10px;
}

.tags-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tags-container li {
  cursor: pointer;
  margin-bottom: 8px;
  color: mediumpurple; /* 标签字体颜色为蓝色 */
  padding: 5px;
  transition: background 0.3s, color 0.3s;
  display: block; /* 确保每个标签占据一行 */
  white-space: nowrap; /* 防止标签换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}


.tags-container li:hover {
  background: #e0f2ff;
  color: blue; /* 悬浮时字体颜色为白色 */
  border-radius: 5px;
  transform: scale(1.05); /* 悬浮时放大效果 */
}
</style>