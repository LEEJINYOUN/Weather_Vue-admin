<script setup>
import { LogoutApi } from "@/api/user";
import GrayButton from "../button/GrayButton.vue";
import router from "@/router";

// 로그아웃
const logout = async () => {
  try {
    const result = await LogoutApi();
    if (result.status == 201) {
      localStorage.clear();
      router.go(0);
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div
      class="border-2 border-gray-500 rounded-xl flex gap-5 justify-center items-center flex-col w-3/4 md:w-2/4 lg:w-2/5 h-40 m-auto"
    >
      <span class="text-red-500 font-bold text-base"
        >일반 유저는 관리자 페이지에 접근할 수 없습니다.</span
      >
      <GrayButton value="button" text="로그아웃" :onclick="logout" />
    </div>
  </div>
</template>
