<script setup>
import { onMounted, ref } from "vue";
import Login from "../login/login.vue";
import router from "@/router";
import { LogoutApi } from "@/api/user";
import RedButton from "@/components/button/RedButton.vue";
import BlackButton from "@/components/button/GrayButton.vue";
import GrayButton from "@/components/button/GrayButton.vue";
import NotAdmin from "@/components/container/NotAdmin.vue";

// 변수
const getUserInfo = ref(null);

// 유저 정보 가져오기
const getData = () => {
  getUserInfo.value = JSON.parse(localStorage.getItem("userInfo"));
};

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

onMounted(() => {
  getData();
});
</script>
<template>
  <div class="w-full bg-gray-50 flex flex-col justify-center items-center">
    <Login v-if="getUserInfo == null" />
    <div v-else>
      <div v-if="getUserInfo.role == 'admin'">
        <h2>관리자 {{ getUserInfo.email }} 님 환영합니다.</h2>
        <button @click="logout">로그아웃</button>
      </div>
      <NotAdmin v-else :logout="logout" />
    </div>
  </div>
</template>
