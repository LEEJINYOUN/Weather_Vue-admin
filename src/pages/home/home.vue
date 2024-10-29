<script setup>
import { ref } from "vue";
import Login from "../auth/login.vue";

const isLogin = ref(false);
</script>
<template>
  <div>
    <Login v-if="!isLogin" />
    <div v-if="isLogin">로그인 함</div>
  </div>
</template>
