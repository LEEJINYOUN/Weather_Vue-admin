import { backendUrl } from "@/constants/envName";
import axios from "axios";

const totalUrl = backendUrl + "/clothes";

// 옷 리스트 가져오기
export const GetClothesListApi = async () => {
  try {
    const result = await axios.get(totalUrl + "/all");

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
    const result = await axios.post(totalUrl + "/create", value);

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
    const result = await axios.patch(totalUrl + `/${id}`, value);

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
    const result = await axios.delete(totalUrl + `/${id}`);

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};
