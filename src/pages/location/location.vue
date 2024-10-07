<script setup>
import {
  GetLocationListApi,
  LocationDeleteApi,
  LocationSaveApi,
  LocationUpdateApi,
} from "@/api/location";
import { onMounted } from "vue";
import { ref } from "vue";
import InputItem from "../../components/form/InputItem.vue";
import blueButton from "@/components/button/blueButton.vue";

// 변수
const locationList = ref([]);
const locationKr = ref("");
const locationEn = ref("");
const isLoading = ref(false);
const isEdit = ref(false);
const editId = ref(0);

// 지역 리스트 가져오기
const getLocationList = async () => {
  try {
    const result = await GetLocationListApi();

    if (result.status == 200) {
      isLoading.value = true;
      locationList.value = result.data;
      locationList.value.reverse();
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 지역 저장
const submit = async () => {
  try {
    let value = {
      location_kr: locationKr.value,
      location_en: locationEn.value,
    };

    const result = await LocationSaveApi(value);

    if (result.status == 201) {
      getLocationList();
      locationKr.value = "";
      locationEn.value = "";
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 지역 수정 모드
const locationUpdateMode = (data) => {
  isEdit.value = true;
  locationKr.value = data.location_kr;
  locationEn.value = data.location_en;
  editId.value = data.id;
};

// 지역 수정
const locationUpdate = async () => {
  try {
    let value = {
      location_kr: locationKr.value,
      location_en: locationEn.value,
    };

    const result = await LocationUpdateApi(value, editId.value);

    if (result.status == 200) {
      getLocationList();
      isEdit.value = false;
      editId.value = 0;
      locationKr.value = "";
      locationEn.value = "";
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 지역 삭제
const locationDelete = async (id) => {
  try {
    const result = await LocationDeleteApi(id);

    if (result.status == 200) {
      getLocationList();
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getLocationList();
});
</script>
<template>
  <div>
    <!-- 저장 폼 -->
    <form
      class="flex justify-center gap-10"
      @submit.prevent="isEdit == false ? submit() : locationUpdate()"
    >
      <InputItem type="text" placeholder="한글명" v-model="locationKr" />
      <InputItem type="text" placeholder="영문명" v-model="locationEn" />
      <blueButton
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
            <th scope="col" class="px-6 py-3">한글명</th>
            <th scope="col" class="px-6 py-3">영문명</th>
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
            <td class="px-6 py-4">{{ item.location_kr }}</td>
            <td class="px-6 py-4">{{ item.location_en }}</td>
            <td class="px-6 py-4 flex gap-5">
              <button @click="locationUpdateMode(item)">수정</button>
              <button @click="locationDelete(item.id)">삭제</button>
            </td>
          </tr>
          <!-- <tr
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td class="px-6 py-4">White</td>
            <td class="px-6 py-4">Laptop PC</td>
            <td class="px-6 py-4">$1999</td>
            <td class="px-6 py-4">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Edit</a
              >
            </td>
          </tr>
          <tr
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td class="px-6 py-4">Black</td>
            <td class="px-6 py-4">Accessories</td>
            <td class="px-6 py-4">$99</td>
            <td class="px-6 py-4">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Edit</a
              >
            </td>
          </tr>
          <tr
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Google Pixel Phone
            </th>
            <td class="px-6 py-4">Gray</td>
            <td class="px-6 py-4">Phone</td>
            <td class="px-6 py-4">$799</td>
            <td class="px-6 py-4">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Edit</a
              >
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple Watch 5
            </th>
            <td class="px-6 py-4">Red</td>
            <td class="px-6 py-4">Wearables</td>
            <td class="px-6 py-4">$999</td>
            <td class="px-6 py-4">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Edit</a
              >
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>
