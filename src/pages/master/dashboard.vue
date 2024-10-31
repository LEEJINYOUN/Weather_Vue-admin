<script setup>
import "primeicons/primeicons.css";
import { ref } from "vue";
import router from "@/router";
import { LogoutApi } from "@/api/user";

// 변수
const isToggle = ref(false);

// 사이드바 메뉴 리스트
const menuList = [
  {
    title: "대시보드",
    to: "/dashboard",
    icon: "pi pi-table",
  },
  {
    title: "유저",
    to: "/users",
    icon: "pi pi-user",
  },
  {
    title: "나라",
    to: "/country",
    icon: "pi pi-map",
  },
  {
    title: "지역",
    to: "/location",
    icon: "pi pi-sitemap",
  },
  {
    title: "옷",
    to: "/clothes",
    icon: "pi pi-shop",
  },
];

// 토글바 전환
const sidebarToggle = () => {
  isToggle.value = !isToggle.value;
};

// 로그아웃
const logout = async () => {
  try {
    const result = await LogoutApi();
    if (result.status == 201) {
      localStorage.clear();
      router.replace("/");
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <!-- 상단 타이틀 -->
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end gap-5">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            @click="sidebarToggle"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <i class="pi pi-bars" style="font-size: 1.5rem"></i>
          </button>
          <h1 class="font-bold text-2xl">관리자 페이지</h1>
        </div>
      </div>
    </div>
  </nav>

  <!-- 사이드바 -->
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    :class="isToggle ? '' : '-translate-x-full'"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="(item, key) in menuList" :key="key">
          <a
            :href="item.to"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <i :class="item.icon" style="font-size: 1.5rem"></i>
            <span class="ms-3">{{ item.title }}</span>
          </a>
        </li>
        <li>
          <button
            @click="logout"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
          >
            <i class="pi pi-sign-out" style="font-size: 1.5rem"></i>
            <span class="ms-3">로그아웃</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>

  <!-- 메인 -->
  <div class="p-4 sm:ml-64">
    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <router-view />
    </div>
  </div>
</template>
