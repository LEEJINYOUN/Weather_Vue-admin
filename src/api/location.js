import axios from "axios";
import { backendUrl } from "@/constants/envName";

// 지역 리스트 가져오기
export const GetLocationListApi = async () => {
  try {
    const result = await axios.get(backendUrl + "/location/all");

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 지역 저장
export const LocationSaveApi = async (value) => {
  try {
    const result = await axios.post(backendUrl + "/location/create", value);

    if (result.status == 201) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 지역 수정
export const LocationUpdateApi = async (value, id) => {
  try {
    const result = await axios.put(backendUrl + `/location/${id}`, value);

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 지역 삭제
export const LocationDeleteApi = async (id) => {
  try {
    const result = await axios.delete(backendUrl + `/location/${id}`);

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};
