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
      _this.$axios.get('/tags').then((res) => {
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
  width: 200px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 内容背景模糊效果 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tags-container h3 {
  color: purple;
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
  color: blue; /* 标签字体颜色为蓝色 */
  padding: 5px;
  transition: background 0.3s, color 0.3s;
}

.tags-container li:hover {
  background: purple;
  color: white; /* 悬浮时字体颜色为白色 */
  border-radius: 5px;
  transform: scale(1.05); /* 悬浮时放大效果 */
}
</style>