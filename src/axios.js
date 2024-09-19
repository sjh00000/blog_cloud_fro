import { createApp } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from './router';
import store from './store';

axios.defaults.baseURL = "http://localhost:8080";

// 前置拦截
axios.interceptors.request.use(config => {
  return config;
});

axios.interceptors.response.use(
  response => {
    let res = response.data;

    console.log("=================");
    console.log(res);
    console.log("=================");

    if (res.code === 200) {
      return response;
    } else {
      ElMessage.error({
        message: '这是一条错误消息',
        duration: 3 * 1000
      });

      return Promise.reject(response.data.msg);
    }
  },
  error => {
    console.log(error);
    if (error.response.data) {
      error.message = error.response.data.msg;
    }

    if (error.response.status === 401) {
      store.commit("REMOVE_INFO");
      router.push("/login");
    }

    ElMessage.error({
      message: error.message,
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);

const app = createApp({});
app.config.globalProperties.$axios = axios;

app.use(router).use(store).mount('#app');