import { backendUrl } from "@/constants/envName";
import axios from "axios";

// 옷 리스트 가져오기
export const GetClothesListApi = async () => {
  try {
    const result = await axios.get(backendUrl + "/clothes/all");

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 옷 저장
export const ClothesSaveApi = async (value) => {
  try {
    const result = await axios.post(backendUrl + "/clothes/create", value);

    if (result.status == 201) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 옷 수정
export const ClothesUpdateApi = async (value, id) => {
  try {
    const result = await axios.put(backendUrl + `/clothes/${id}`, value);

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 옷 삭제
export const ClothesDeleteApi = async (id) => {
  try {
    const result = await axios.delete(backendUrl + `/Clothes/${id}`);

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};
