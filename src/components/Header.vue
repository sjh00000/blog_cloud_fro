<template>
  <div class="m-content">
    <div class="header">
      <div class="header-right">
        <el-avatar :size="50" :src="user.avatar"></el-avatar>
        <div class="username">{{ user.username }}</div>
        <div class="links">
          <el-link href="/blogs">主页</el-link>
          <el-link type="success" v-show="hasLogin" href="/blog/add">发表博客</el-link>
          <el-link type="primary" v-show="!hasLogin" href="/login">登录</el-link>
          <el-link type="primary" v-show="!hasLogin" href="/register">注册</el-link>
          <el-link type="danger" v-show="hasLogin" @click="logout">退出</el-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Header",
  data() {
    return {
      user: {
        username: '请先登录',
        avatar: ''
      },
      hasLogin: false,
    }
  },
  methods: {
    logout() {
      const _this = this;
      _this.$store.commit("REMOVE_INFO");
      _this.hasLogin = false;
      _this.user.avatar=''
      _this.user.username='请先登录'
      _this.$router.push('/login')
    }
  },
  created() {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username;
      this.user.avatar = this.$store.getters.getUser.avatar;
      this.hasLogin = true;
    }
  }
};
</script>


<style scoped>
.m-content {
  position: relative;
  margin-left: 75%;
  margin-top: 2%;
  margin-bottom: -5%;
}


.header-right {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.username {
  color: mediumpurple;
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px; /* 增加右侧间距 */
}

.links {
  display: flex;
  align-items: center;
}

.links .el-link {
  color: dodgerblue;
  margin: 0 10px; /* 左右间距 */
  font-size: 20px;
}

.links .el-link :hover {
  color: mediumpurple;
}

.slide-enter-active, .slide-leave-active {
  transition: all 1.5s;
}


</style>