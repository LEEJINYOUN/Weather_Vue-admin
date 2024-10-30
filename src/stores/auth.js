import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
  }),
  actions: {
    // 유저 정보 저장
    async setUserInfo(result) {
      this.user = result.data;
      localStorage.setItem("userInfo", JSON.stringify(this.user));
    },
  },
});
