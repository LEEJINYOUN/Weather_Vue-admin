<script setup>
import { onMounted, ref } from "vue";
import Login from "../login/login.vue";
import router from "@/router";
import { LogoutApi } from "@/api/user";

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
  <div>
    <Login v-if="getUserInfo == null" />
    <div v-else>
      <div v-if="getUserInfo.role == 'admin'">
        <h2>관리자 {{ getUserInfo.email }} 님 환영합니다.</h2>
        <button @click="logout">로그아웃</button>
      </div>
      <div v-else>
        <h2 class="text-red-500">일반 유저는 접근 불가!!!</h2>
        <button @click="logout">로그아웃</button>
      </div>
    </div>
  </div>
</template>
