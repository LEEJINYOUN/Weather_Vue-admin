<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { GetUserListApi } from "@/api/user";
import TitleItem from "@/components/text/TitleItem.vue";
import ListTableLayout from "@/components/layout/ListTableLayout.vue";
import MainLayout from "@/components/layout/MainLayout.vue";
import TableHeader from "@/components/table/TableHeader.vue";
import TableBody from "@/components/table/TableBody.vue";
import TableContent from "@/components/table/TableContent.vue";

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

// 날짜 포맷
const dateFormat = (date) => {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const hour = date.substring(11, 13);
  const minute = date.substring(14, 16);
  return `${year}.${month}.${day} ${hour}:${minute}`;
};

onMounted(() => {
  getUserList();
});
</script>
<template>
  <MainLayout>
    <!-- 타이틀 -->
    <TitleItem title="유저 리스트" />

    <!-- 리스트 테이블 -->
    <ListTableLayout>
      <!-- 테이블 제목 -->
      <TableHeader>
        <tr>
          <TableContent type="title">번호</TableContent>
          <TableContent type="title">이메일</TableContent>
          <TableContent type="title">이름</TableContent>
          <TableContent type="title">생성일</TableContent>
        </tr>
      </TableHeader>

      <!-- 테이블 값 -->
      <TableBody v-if="isLoading == true">
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
          <TableContent type="content">{{ item.email }}</TableContent>
          <TableContent type="content">{{ item.name }}</TableContent>
          <TableContent type="content">{{
            dateFormat(item.created_at)
          }}</TableContent>
        </tr>
      </TableBody>
    </ListTableLayout>
  </MainLayout>
</template>
