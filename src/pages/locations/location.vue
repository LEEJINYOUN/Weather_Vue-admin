<script setup>
import { GetAllCountryApi } from "@/api/country";
import {
  CreateLocationApi,
  DeleteLocationApi,
  GetAllLocationApi,
  UpdateLocationApi,
} from "@/api/location";
import BlueButton from "@/components/button/BlueButton.vue";
import InputItem from "@/components/form/InputItem.vue";
import TitleItem from "@/components/text/TitleItem.vue";
import { onMounted } from "vue";
import { ref } from "vue";

// 변수
const countryList = ref([]);
const countryListView = ref("");
const countrySelect = ref("");
const locationList = ref([]);
const countryId = ref("");
const locationName = ref("");
const isLoading = ref(false);
const isEdit = ref(false);
const editId = ref(0);

// 나라별 모든 지역 조회
const getCountryList = async () => {
  try {
    const result = await GetAllCountryApi();

    if (result.status == 200) {
      isLoading.value = true;
      countryList.value = result.data;
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 나라별 모든 지역 조회
const getAllLocation = async () => {
  try {
    if (countryListView.value !== "") {
      const result = await GetAllLocationApi(countryListView.value);

      if (result.status == 200) {
        locationList.value = result.data;
        console.log(result.data);
      } else {
        console.log(result);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

// 지역 등록
const submit = async () => {
  try {
    let value = {
      countryId: countryId.value,
      locationName: locationName.value,
    };

    const result = await CreateLocationApi(value);

    if (result.status == 201) {
      // getCountryList();
      countryId.value = "";
      locationName.value = "";
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 특정 지역 수정 모드
const locationUpdateMode = (data) => {
  isEdit.value = true;
  countryId.value = data.countryId;
  locationName.value = data.locationName;

  editId.value = data.id;
};

// 특정 지역 수정
const locationUpdate = async () => {
  try {
    let value = {
      countryId: countryId.value,
      locationName: locationName.value,
    };
    const result = await UpdateLocationApi(value, editId.value);
    if (result.status == 200) {
      getClothesList();
      isEdit.value = false;
      editId.value = 0;
      countryId.value = "";
      locationName.value = "";
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 특정 지역 삭제
const locationDelete = async (id) => {
  try {
    const result = await DeleteLocationApi(id);
    if (result.status == 200) {
      // getClothesList();
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
    <TitleItem title="지역 리스트" />

    <!-- 저장 폼 -->
    <form
      class="flex justify-center gap-10"
      @submit.prevent="isEdit == false ? submit() : locationUpdate()"
    >
      <select
        id="country"
        v-model="countryId"
        required
        class="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" selected>나라 선택</option>
        <option v-for="(item, key) in countryList" :key="key" :value="item.id">
          {{ item.name }}
        </option>
      </select>
      <InputItem type="text" placeholder="지역 이름" v-model="locationName" />
      <BlueButton
        value="submit"
        :text="isEdit == false ? '저장하기' : '수정하기'"
      />
    </form>

    <!-- 나라 선택 -->
    <div>
      <select
        id="listView"
        v-model="countryListView"
        required
        @click="getAllLocation"
        class="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" selected>나라 선택</option>
        <option v-for="(item, key) in countryList" :key="key" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
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
            <th scope="col" class="px-6 py-3">지역 이름</th>
            <th scope="col" class="px-6 py-3">나라 번호</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>

        <!-- 테이블 값 -->
        <tbody v-if="isLoading == true">
          <tr
            v-for="(item, key) in locationList"
            :key="key"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.id }}
            </th>
            <td class="px-6 py-4">{{ item.locationName }}</td>
            <td class="px-6 py-4">{{ item.countryId }}</td>
            <td class="px-6 py-4 flex gap-5">
              <button @click="locationUpdateMode(item)">수정</button>
              <button @click="locationDelete(item.id)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
