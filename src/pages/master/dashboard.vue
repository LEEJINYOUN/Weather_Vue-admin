<script setup></script>

<template>
  <div class="w-screen h-screen flex">
    <!-- 사이드바 -->
    <div class="w-[400px] h-full bg-gray-200 text-white">
      <div class="h-[50px] bg-gray-900 flex justify-start items-center">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">관리자 대시보드</h3>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
        <div
          class="flex flex-col justify-between h-full px-[20px] space-y-[10px]"
        >
          <div class="px-[20px] flex flex-col justify-between space-y-[10px]">
            <!-- <div class="h-[calc(100%-50px)]"> -->
            <router-link to="/home">홈</router-link>
            <router-link to="/users">유저</router-link>
            <router-link to="/locations">위치</router-link>
            <router-link to="/clothes">옷</router-link>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full bg-gray-400">
      <div
        class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b"
      >
        <!-- 햄버거 메뉴 -->
        <!-- Header sidebar -->
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- Main -->
  </div>
</template>
