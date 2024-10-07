<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import TitleItem from "@/components/text/TitleItem.vue";
import InputItem from "../../components/form/InputItem.vue";
import BlueButton from "@/components/button/BlueButton.vue";

// 변수
const clothesList = ref([]);
const clothesName = ref("");
const isLoading = ref(false);
const isEdit = ref(false);
const editId = ref(0);

// 옷 리스트 가져오기
const getClothesList = async () => {
  try {
    // const result = await GetLocationListApi();
    // if (result.status == 200) {
    //   isLoading.value = true;
    //   locationList.value = result.data;
    //   locationList.value.reverse();
    // } else {
    //   console.log(result);
    // }
  } catch (e) {
    console.log(e);
  }
};

// 옷 저장
const submit = async () => {
  try {
    // let value = {
    //   location_kr: locationKr.value,
    //   location_en: locationEn.value,
    // };
    // const result = await LocationSaveApi(value);
    // if (result.status == 201) {
    //   getLocationList();
    //   locationKr.value = "";
    //   locationEn.value = "";
    // } else {
    //   console.log(result);
    // }
  } catch (e) {
    console.log(e);
  }
};

// 옷 수정 모드
const clothesUpdateMode = (data) => {
  // isEdit.value = true;
  // locationKr.value = data.location_kr;
  // locationEn.value = data.location_en;
  // editId.value = data.id;
};

// 옷 수정
const clothesUpdate = async () => {
  try {
    // let value = {
    //   location_kr: locationKr.value,
    //   location_en: locationEn.value,
    // };
    // const result = await LocationUpdateApi(value, editId.value);
    // if (result.status == 200) {
    //   getLocationList();
    //   isEdit.value = false;
    //   editId.value = 0;
    //   locationKr.value = "";
    //   locationEn.value = "";
    // } else {
    //   console.log(result);
    // }
  } catch (e) {
    console.log(e);
  }
};

// 옷 삭제
const clothesDelete = async (id) => {
  try {
    // const result = await LocationDeleteApi(id);
    // if (result.status == 200) {
    //   getLocationList();
    // } else {
    //   console.log(result);
    // }
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
      @submit.prevent="isEdit == false ? submit() : locationUpdate()"
    >
      <div>계절 select</div>
      <div>카테고리 select</div>
      <InputItem type="text" placeholder="옷 이름" v-model="clothesName" />
      <div>이미지</div>

      <!-- <InputItem type="text" placeholder="한글명" v-model="locationKr" />
      <InputItem type="text" placeholder="영문명" v-model="locationEn" /> -->
      <blueButton
        value="submit"
        :text="isEdit == false ? '저장하기' : '수정하기'"
      />
    </form>
  </div>
</template>
