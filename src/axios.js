import {createApp} from 'vue';
import axios from 'axios';
import {ElMessage} from 'element-plus';
import router from './router';
import store from './store';

// 后端接口ip
// //生产
// axios.defaults.baseURL = "http://blog.sun-jh.top/";
axios.defaults.baseURL = "http://127.0.0.1:11111";
// 定义一个标识，避免多次刷新 token 请求
let isRefreshing = false;

// // 前置拦截：为每个请求添加 accessToken
// axios.interceptors.request.use(config => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//         config.headers.Authorization_Access = `${accessToken}`;
//     }
//     if(isRefreshing){
//         delete config.headers.Authorization_Access;
//         isRefreshing = false;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });


axios.interceptors.response.use(
    response => {
        let res = response.data;
        console.log(res)

        // 如果请求成功，直接返回响应
        if (res.code === 200) {
            if (response.headers['authorization_access'] !== undefined) {
                localStorage.setItem('accessToken', response.headers['authorization_access']);
            }
            return response;
        } else {
            ElMessage.error({
                message: res.msg,
                duration: 3 * 1000
            });
            return response;
        }
    },
    async error => {
        const originalRequest = error.config; // 保存原始请求
        console.log(originalRequest.url)
        const refreshToken = localStorage.getItem('refreshToken');

        // 如果返回 401 状态码，表示 accessToken 无效
        if (error.response.status === 401 && error.response.headers['dorefresh']==="1") {
            try {// 更新原始请求的 Authorization_Access 头
                originalRequest.headers['authorization_refresh'] = refreshToken;
                delete originalRequest.headers['authorization_access'];
                isRefreshing = true
                // 重新发送原始请求并返回结果
                return await axios(originalRequest)
            } catch (refreshError) {
                // 刷新 token 失败，清除信息并跳转到登录页面
                store.commit("REMOVE_INFO");
                await router.push("/login");
                ElMessage.error({
                    message: "Token 无效,请重新登录",
                    duration: 3 * 1000
                });
                // return Promise.reject(refreshError);
            }
        }

        // 如果返回 401 状态码，表示 refreshToken 也无效，重定向到登录页面
        else if (error.response.status === 401) {
            store.commit("REMOVE_INFO");
            await router.push("/login");
            ElMessage.error({
                message: "Token 失效，请重新登录",
                duration: 3 * 1000
            });
            // return Promise.reject("Token 失效");
        }

            // 其他错误直接返回
        // return Promise.reject(error);
        else {
            ElMessage.error({
                message: "网站异常",
                duration: 3 * 1000
            });
        }

    }
);

const app = createApp({});
app.config.globalProperties.$axios = axios;

app.use(router).use(store).mount('#app');
