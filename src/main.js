import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

// 导入 Element Plus 组件库
import ElementPlus from 'element-plus';
// 导入 Element Plus 的样式
import 'element-plus/theme-chalk/index.css';

// 导入 v-md-editor 组件库

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';


import './axios.js';
import './permission.js';

const app = createApp(App);
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  config: {
      toc: {
        includeLevel: [3, 4],
      },
    },

});

// 使用 Element Plus 和 v-md-editor 组件库
app.use(ElementPlus);
app.use(VueMarkdownEditor);

// 挂载 axios 库
app.config.globalProperties.$axios = axios;

app.use(router).use(store).mount('#app');