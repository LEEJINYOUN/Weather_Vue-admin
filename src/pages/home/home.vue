<script setup>
import { onMounted, ref } from "vue";
import Login from "../login/login.vue";
import NotAdmin from "@/components/container/NotAdmin.vue";
import Dashboard from "../master/dashboard.vue";

// 변수
const getUserInfo = ref(null);

// 유저 정보 가져오기
const getData = () => {
  getUserInfo.value = JSON.parse(localStorage.getItem("userInfo"));
};

onMounted(() => {
  getData();
});
</script>
<template>
  <div class="w-full bg-gray-50 flex flex-col justify-center items-center">
    <Login v-if="getUserInfo == null" />
    <div v-else>
      <Dashboard v-if="getUserInfo.role == 'admin'" />
      <NotAdmin v-else />
    </div>
  </div>
</template>
