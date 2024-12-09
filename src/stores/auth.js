
export const authStore = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    token: "",
  }),
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, userToken) {
      commit("SET_AUTHENTICATED", true);
      commit("SET_TOKEN", userToken);
      localStorage.setItem("authToken", userToken);
    },
    logout({ commit }) {
      commit("SET_AUTHENTICATED", false);
      commit("SET_TOKEN", "");
      localStorage.removeItem("authToken");
    },
    checkAuth({ commit }) {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        commit("SET_AUTHENTICATED", true);
        commit("SET_TOKEN", storedToken);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    token: (state) => state.token,
  },
};
