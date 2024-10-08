<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import TitleItem from "@/components/text/TitleItem.vue";
import InputItem from "../../components/form/InputItem.vue";
import BlueButton from "@/components/button/BlueButton.vue";
import {
  ClothesDeleteApi,
  ClothesSaveApi,
  ClothesUpdateApi,
  GetClothesListApi,
} from "@/api/clothes";

// 변수
const clothesList = ref([]);
const clothesCategory = ref("");
const clothesName = ref("");
const clothesStartTemp = ref();
const clothesEndTemp = ref();
const clothesImage = ref("");
const isLoading = ref(false);
const isEdit = ref(false);
const editId = ref(0);

// 옷 리스트 가져오기
const getClothesList = async () => {
  try {
    const result = await GetClothesListApi();

    if (result.status == 200) {
      isLoading.value = true;
      clothesList.value = result.data;
      clothesList.value.reverse();
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 옷 저장
const submit = async () => {
  try {
    let value = {
      category: clothesCategory.value,
      name: clothesName.value,
      startTemp: clothesStartTemp.value,
      endTemp: clothesEndTemp.value,
      image: clothesImage.value,
    };

    const result = await ClothesSaveApi(value);

    if (result.status == 201) {
      getClothesList();
      clothesCategory.value = "";
      clothesName.value = "";
      clothesStartTemp.value = "";
      clothesEndTemp.value = "";
      clothesImage.value = "";
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 옷 수정 모드
const clothesUpdateMode = (data) => {
  isEdit.value = true;
  (clothesCategory.value = data.category), (clothesName.value = data.name);
  clothesStartTemp.value = data.startTemp;
  clothesEndTemp.value = data.endTemp;
  clothesImage.value = data.image;

  editId.value = data.id;
};

// 옷 수정
const clothesUpdate = async () => {
  try {
    let value = {
      category: clothesCategory.value,
      name: clothesName.value,
      startTemp: clothesStartTemp.value,
      endTemp: clothesEndTemp.value,
      image: clothesImage.value,
    };
    const result = await ClothesUpdateApi(value, editId.value);
    if (result.status == 200) {
      getClothesList();
      isEdit.value = false;
      editId.value = 0;
      clothesCategory.value = "";
      clothesName.value = "";
      clothesStartTemp.value = "";
      clothesEndTemp.value = "";
      clothesImage.value = "";
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 옷 삭제
const clothesDelete = async (id) => {
  try {
    const result = await ClothesDeleteApi(id);
    if (result.status == 200) {
      getClothesList();
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getClothesList();
});
</script>
<template>
  <div>
    <!-- 타이틀 -->
    <TitleItem title="옷 리스트" />
    <!-- 저장 폼 -->
    <form
      class="flex justify-center gap-10"
      @submit.prevent="isEdit == false ? submit() : clothesUpdate()"
    >
      <select
        id="category"
        required
        v-model="clothesCategory"
        class="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" selected>카테고리 선택</option>
        <option value="머리">머리</option>
        <option value="상의">상의</option>
        <option value="하의">하의</option>
        <option value="손">손</option>
        <option value="발">발</option>
        <option value="액세서리">액세서리</option>
      </select>
      <InputItem type="text" placeholder="옷 이름" v-model="clothesName" />
      <InputItem
        type="number"
        placeholder="최저기온"
        v-model="clothesStartTemp"
      />
      <InputItem
        type="number"
        placeholder="최고기온"
        v-model="clothesEndTemp"
      />

      <InputItem type="text" placeholder="이미지" v-model="clothesImage" />
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
            <th scope="col" class="px-6 py-3">카테고리</th>
            <th scope="col" class="px-6 py-3">이름</th>
            <th scope="col" class="px-6 py-3">최저</th>
            <th scope="col" class="px-6 py-3">최고</th>
            <th scope="col" class="px-6 py-3">이미지</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>

        <!-- 테이블 값 -->
        <tbody v-if="isLoading == true">
          <tr
            v-for="(item, key) in clothesList"
            :key="key"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.id }}
            </th>
            <td class="px-6 py-4">{{ item.category }}</td>
            <td class="px-6 py-4">{{ item.name }}</td>
            <td class="px-6 py-4">{{ item.startTemp }}</td>
            <td class="px-6 py-4">{{ item.endTemp }}</td>
            <td class="px-6 py-4">{{ item.image }}</td>
            <td class="px-6 py-4 flex gap-5">
              <button @click="clothesUpdateMode(item)">수정</button>
              <button @click="clothesDelete(item)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
