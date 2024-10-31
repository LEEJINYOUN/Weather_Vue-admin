<script setup>
import { GetAllCountryApi } from "@/api/country";
import {
  GetAllLocationByCountryApi,
  CreateLocationApi,
  DeleteLocationApi,
  GetAllLocationApi,
} from "@/api/location";
import BlueButton from "@/components/button/BlueButton.vue";
import InputItem from "@/components/form/InputItem.vue";
import FormLayout from "@/components/layout/FormLayout.vue";
import ListTableLayout from "@/components/layout/ListTableLayout.vue";
import MainLayout from "@/components/layout/MainLayout.vue";
import TableBody from "@/components/table/TableBody.vue";
import TableContent from "@/components/table/TableContent.vue";
import TableHeader from "@/components/table/TableHeader.vue";
import TitleItem from "@/components/text/TitleItem.vue";
import { onMounted } from "vue";
import { ref } from "vue";

// 저장 변수
const countryId = ref("");
const createFilterItems = ref([]);
const locationName = ref("");

// 리스트 테이블 변수
const listFilter = ref("all");
const listFilterItems = ref([]);
const filteredList = ref([]);

// 기타 변수
const isLoading = ref(false);

// 리스트 필터 변경
const filterChangeSelect = () => {
  getLocationList(listFilter.value);
};

// 리스트 새로고침
const listRefresh = () => {
  if (listFilter.value == "all") {
    getAllLocationList();
  } else {
    getLocationList(listFilter.value);
  }
};

// 모든 나라 조회
const getCountryList = async () => {
  try {
    const result = await GetAllCountryApi();

    if (result.status == 200) {
      isLoading.value = true;
      createFilterItems.value = result.data;
      listFilterItems.value = result.data;
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 모든 지역 조회
const getAllLocationList = async () => {
  try {
    const result = await GetAllLocationApi();

    if (result.status == 200) {
      isLoading.value = true;
      filteredList.value = result.data;
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 나라별 모든 지역 조회
const getLocationList = async (countryId) => {
  try {
    const result = await GetAllLocationByCountryApi(countryId);

    if (result.status == 200) {
      isLoading.value = true;
      filteredList.value = result.data.sort((a, b) =>
        a.locationName > b.locationName ? 1 : -1
      );
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 지역 등록
const submit = async () => {
  try {
    let value = {
      locationName: locationName.value,
      countryId: countryId.value,
    };

    const result = await CreateLocationApi(value);

    if (result.status == 201) {
      listRefresh();
      locationName.value = "";
      countryId.value = "";
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
      listRefresh();
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getCountryList();
  listRefresh();
});
</script>
<template>
  <MainLayout>
    <!-- 타이틀 -->
    <TitleItem title="지역 리스트" />

    <!-- 저장 폼 -->
    <FormLayout add-class="xl:w-2/4" @submit.prevent="submit()">
      <select
        id="countryId"
        required
        v-model="countryId"
        class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" selected>나라 선택</option>
        <option
          v-for="(item, key) in createFilterItems"
          :key="key"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>
      <InputItem type="text" placeholder="지역 이름" v-model="locationName" />
      <BlueButton value="submit" text="저장하기" />
    </FormLayout>

    <!-- 리스트 필터 -->
    <div class="flex justify-center my-5">
      <select
        id="listFilter"
        required
        v-model="listFilter"
        @change="filterChangeSelect"
        class="w-1/2 lg:w-1/3 xl:w-2/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="all" selected>모두</option>
        <option
          v-for="(item, key) in listFilterItems"
          :key="key"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>
    </div>

    <!-- 리스트 테이블 -->
    <ListTableLayout>
      <!-- 테이블 제목 -->
      <TableHeader>
        <tr>
          <TableContent type="title">번호</TableContent>
          <TableContent type="title">지역 이름</TableContent>
          <TableContent type="title">Action</TableContent>
        </tr>
      </TableHeader>

      <!-- 테이블 값 -->
      <TableBody v-if="isLoading == true">
        <tr
          v-for="(item, key) in filteredList"
          :key="key"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ item.id }}
          </th>
          <TableContent type="content">{{ item.locationName }}</TableContent>
          <TableContent type="content">
            <button @click="locationDelete(item.id)">삭제</button>
          </TableContent>
        </tr>
      </TableBody>
    </ListTableLayout>
  </MainLayout>
</template>
