import axios from "axios";
import { backendUrl } from "@/constants/envName";

const totalUrl = backendUrl + "/auth";

// 지역 리스트 가져오기
export const GetUserListApi = async () => {
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
