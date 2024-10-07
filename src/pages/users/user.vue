<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { GetUserListApi } from "@/api/user";
import TitleItem from "@/components/text/TitleItem.vue";

// 변수
const userList = ref([]);
const isLoading = ref(false);

// 지역 리스트 가져오기
const getUserList = async () => {
  try {
    const result = await GetUserListApi();

    if (result.status == 200) {
      isLoading.value = true;
      userList.value = result.data;
      userList.value.reverse();
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getUserList();
});
</script>
<template>
  <div>
    <!-- 타이틀 -->
    <TitleItem title="유저 리스트" />
    <!-- 리스트 테이블 -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <!-- 테이블 제목 -->
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">번호</th>
            <th scope="col" class="px-6 py-3">이메일</th>
            <th scope="col" class="px-6 py-3">이름</th>
            <th scope="col" class="px-6 py-3">생성일</th>
            <th scope="col" class="px-6 py-3">이미지</th>
          </tr>
        </thead>

        <!-- 테이블 값 -->
        <tbody v-if="isLoading == true">
          <tr
            v-for="(item, key) in userList"
            :key="key"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.id }}
            </th>
            <td class="px-6 py-4">{{ item.email }}</td>
            <td class="px-6 py-4">{{ item.name }}</td>
            <td class="px-6 py-4">{{ item.created_at }}</td>
            <td class="px-6 py-4">{{ item.image ?? "Null" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
