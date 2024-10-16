<script setup>
import {
  CreateCountryApi,
  DeleteCountryApi,
  GetAllCountryApi,
  UpdateCountryApi,
} from "@/api/country";
import BlueButton from "@/components/button/BlueButton.vue";
import InputItem from "@/components/form/InputItem.vue";
import TitleItem from "@/components/text/TitleItem.vue";
import { onMounted } from "vue";
import { ref } from "vue";

// 변수
const countryList = ref([]);
const countryName = ref("");
const isLoading = ref(false);
const isEdit = ref(false);
const editId = ref(0);

// 모든 나라 조회
const getCountryList = async () => {
  try {
    const result = await GetAllCountryApi();

    if (result.status == 200) {
      isLoading.value = true;
      countryList.value = result.data;
      countryList.value.reverse();
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 나라 등록
const submit = async () => {
  try {
    let value = {
      name: countryName.value,
    };

    const result = await CreateCountryApi(value);

    if (result.status == 201) {
      getCountryList();
      countryName.value = "";
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 특정 나라 수정 모드
const countryUpdateMode = (data) => {
  isEdit.value = true;
  countryName.value = data.name;

  editId.value = data.id;
};

// 특정 나라 수정
const countryUpdate = async () => {
  try {
    let value = {
      name: countryName.value,
    };
    const result = await UpdateCountryApi(value, editId.value);
    if (result.status == 200) {
      getCountryList();
      isEdit.value = false;
      editId.value = 0;
      countryName.value = "";
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 특정 나라 삭제
const countryDelete = async (id) => {
  try {
    const result = await DeleteCountryApi(id);
    if (result.status == 200) {
      getCountryList();
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getCountryList();
});
</script>

<template>
  <div>
    <!-- 타이틀 -->
    <TitleItem title="나라 리스트" />

    <!-- 저장 폼 -->
    <form
      class="flex justify-center gap-10"
      @submit.prevent="isEdit == false ? submit() : countryUpdate()"
    >
      <InputItem type="text" placeholder="나라 이름" v-model="countryName" />
      <BlueButton
        value="submit"
        :text="isEdit == false ? '저장하기' : '수정하기'"
      />
    </form>

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
            <th scope="col" class="px-6 py-3">이름</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>

        <!-- 테이블 값 -->
        <tbody v-if="isLoading == true">
          <tr
            v-for="(item, key) in countryList"
            :key="key"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.id }}
            </th>
            <td class="px-6 py-4">{{ item.name }}</td>
            <td class="px-6 py-4 flex gap-5">
              <button @click="countryUpdateMode(item)">수정</button>
              <button @click="countryDelete(item.id)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
