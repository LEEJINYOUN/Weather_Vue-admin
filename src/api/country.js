import { backendUrl } from "@/constants/envName";
import axios from "axios";

const totalUrl = backendUrl + "/country";

// 모든 나라 조회
export const GetAllCountryApi = async () => {
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

// 나라 등록
export const CreateCountryApi = async (value) => {
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

// 특정 나라 수정
export const UpdateCountryApi = async (value, id) => {
  try {
    const result = await axios.put(totalUrl + `/${id}`, value);

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 특정 나라 삭제
export const DeleteCountryApi = async (id) => {
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
