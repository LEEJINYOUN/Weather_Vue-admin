import { backendUrl } from "@/constants/envName";
import axios from "axios";

const totalUrl = backendUrl + "/location";

// 모든 지역 조회
export const GetAllLocationApi = async () => {
  try {
    const result = await axios.get(totalUrl + `/all`);

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 나라별 지역 조회
export const GetAllLocationByCountryApi = async (countryId) => {
  try {
    const result = await axios.get(totalUrl + `/${countryId}`);

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 지역 등록
export const CreateLocationApi = async (value) => {
  try {
    const { locationName, countryId } = value;

    const result = await axios.post(totalUrl + `/create/${countryId}`, {
      locationName,
    });

    if (result.status == 201) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 특정 지역 수정
export const UpdateLocationApi = async (value, id) => {
  try {
    const { countryId, locationName } = value;

    console.log(countryId, locationName, id);

    // const result = await axios.patch(totalUrl + `/${id}`, {
    //   locationName,
    // });

    // if (result.status == 200) {
    //   return result;
    // } else {
    //   console.log("api 호출 에러 : " + result);
    // }
  } catch (e) {
    console.log(e);
  }
};

// 특정 지역 삭제
export const DeleteLocationApi = async (id) => {
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
