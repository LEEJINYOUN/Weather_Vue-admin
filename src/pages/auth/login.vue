<script setup>
import { ref } from "vue";
import RedButton from "@/components/button/RedButton.vue";
import InputItem from "@/components/form/InputItem.vue";

// 변수
const email = ref("");
const password = ref("");

// 로그인
const submit = () => {
  try {
    let value = {
      email: email.value,
      password: password.value,
    };

    console.log(value);
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div
    class="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0"
  >
    <div class="w-full sm:max-w-md p-5 mx-auto">
      <h2 class="mb-12 text-center text-3xl font-extrabold">
        날씨앱 관리자 로그인
      </h2>
      <form @submit.prevent="submit()">
        <div class="mb-4">
          <label class="block mb-1" for="email">이메일</label>
          <InputItem
            type="email"
            placeholder="이메일"
            v-model="email"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-1" for="password">비밀번호</label>
          <InputItem
            type="password"
            placeholder="비밀번호"
            v-model="password"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
          />
        </div>
        <div class="mt-6">
          <RedButton value="submit" text="로그인" />
        </div>
        <div class="mt-6 text-center">
          <a href="/register" class="underline">회원가입하기</a>
        </div>
      </form>
    </div>
  </div>
</template>
