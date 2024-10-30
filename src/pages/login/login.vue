<script setup>
import { ref } from "vue";
import router from "@/router";
import { GetUserApi, LoginApi } from "@/api/user";
import { useAuthStore } from "@/stores/auth";
import RedButton from "@/components/button/RedButton.vue";
import InputItem from "@/components/form/InputItem.vue";
import ErrorMessage from "@/components/text/ErrorMessage.vue";

// storage
const authStore = useAuthStore();

// 변수
const email = ref("");
const password = ref("");
const emailErrorMessage = ref("");
const passwordErrorMessage = ref("");

// 에러 메세지 처리
const errorMessageHandling = (data) => {
  const { objectOrError, descriptionOrOptions } = data;

  if (objectOrError == "이메일 오류") {
    emailErrorMessage.value = descriptionOrOptions;
    passwordErrorMessage.value = "";
  } else if (objectOrError == "비밀번호 오류") {
    emailErrorMessage.value = "";
    passwordErrorMessage.value = descriptionOrOptions;
  }
};

// 로그인
const submit = async () => {
  try {
    let value = {
      email: email.value,
      password: password.value,
    };
    const result = await LoginApi(value);

    if (result.status == 201) {
      // 유저 정보 가져오기
      const getUserInfo = await GetUserApi(result.data.result);

      // 유저정보 저장
      authStore.setUserInfo(getUserInfo);

      let getUser = JSON.parse(localStorage.getItem("userInfo"));

      // 경로 이동
      if (getUser.role == "admin") {
        router.replace("/dashboard");
      } else {
        router.go(0);
      }
    } else if (result.status == 422) {
      // 에러 처리
      errorMessageHandling(result.response.data);
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div
    class="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center pt-6 sm:pt-0"
  >
    <div class="w-full sm:w-2/3 md:w-3/4 lg:w-2/5 xl:w-1/3 p-5 mx-auto">
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
          <ErrorMessage :message="emailErrorMessage" />
        </div>
        <div class="mb-4">
          <label class="block mb-1" for="password">비밀번호</label>
          <InputItem
            type="password"
            placeholder="비밀번호"
            v-model="password"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
          />
          <ErrorMessage :message="passwordErrorMessage" />
        </div>
        <div class="mt-6">
          <RedButton value="submit" text="로그인" />
        </div>
      </form>
    </div>
  </div>
</template>
