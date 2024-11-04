<template>
  <div id="app">
    <router-view />
    <button @click="scrollToTop" class="back-to-top">回到顶部</button>
  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滚动
      });
    }
  }
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  min-height: 100vh;
  background-color: lightblue;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: auto;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: mediumpurple;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 1000;
}

.back-to-top:hover {
  background-color: dodgerblue;
}
</style>
