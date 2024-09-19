<template>
  <div class="m-content">
    <div class="header">
      <div class="header-content">
        <h3>欢迎来到孙佳豪的博客</h3>
        <el-avatar :size="50" :src="user.avatar"></el-avatar>
        <div>{{ user.username }}</div>
      </div>
    </div>

    <div class="side-trigger" @mouseover="showSidebar = true"></div>

    <transition name="slide">
      <div class="sidebar" v-if="showSidebar" @mouseleave="showSidebar = false">
        <el-link href="/blogs">主页</el-link>
        <el-link type="success" href="/blog/add">发表博客</el-link>
        <el-link type="primary" v-show="!hasLogin" href="/login">登录</el-link>
        <el-link type="danger" v-show="hasLogin" @click="logout">退出</el-link>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        user: {
          username: '请先登录',
          avatar: 'https://himg.bdimg.com/sys/portraitn/item/58cd7877383531303030cac9'
        },
        hasLogin: false,
        showSidebar: false
      }
    },
    methods: {
      logout() {
        const _this = this
        _this.$axios.get("/logout", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          _this.$store.commit("REMOVE_INFO")
          _this.$router.push("/login")
        })
      }
    },
    created() {
      if(this.$store.getters.getUser.username) {
        this.user.username = this.$store.getters.getUser.username
        this.user.avatar = this.$store.getters.getUser.avatar
        this.hasLogin = true
      }
    }
  }
</script>

<style scoped>
  .m-content {
    position: relative;
  }
  .header {
    width: 100%;
    height: 200px;
    background-image: url('../assets/background.jpg');
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }
  .header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .side-trigger {
    position: fixed;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    z-index: 1000;
    cursor: pointer;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background: linear-gradient(to bottom right, blue, purple);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 999;
  }
  .sidebar a {
    color: white;
    margin: 10px 0;
    font-size: 20px;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 1.5s;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(-100%);
  }
</style>