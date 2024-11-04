import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Blogs from '../views/Blogs.vue';
import BlogEdit from '../views/BlogEdit.vue';
import BlogDetail from '../views/BlogDetail.vue';
import Register from "@/views/Register.vue";

const routes = [
  //   主页面(跳转到博客概览页面)
  {
    path: '/',
    name: 'Index',
    redirect: { name: "Blogs" }
  },
  //   博客概览页面
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  //   登录页面
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;