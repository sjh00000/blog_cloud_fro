import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      accessToken: '',
      refreshToken: '',
      userInfo: JSON.parse(localStorage.getItem("userInfo")) || {}
    };
  },
  mutations: {
    SET_TOKEN(state, [accessToken, refreshToken]) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    REMOVE_INFO(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.userInfo = {};
      localStorage.setItem("accessToken", '');
      localStorage.setItem("refreshToken", '');
      localStorage.setItem("userInfo", JSON.stringify(''));
    }
  },
  getters: {
    getUser(state) {
      return state.userInfo;
    }
  },
  actions: {
  },
  modules: {
  }
});

export default store;