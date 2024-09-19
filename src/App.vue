<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  min-height: 100vh;
  background-image: url('./assets/all.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: auto;
}
</style>