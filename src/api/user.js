import axios from "axios";
import { backendUrl } from "@/constants/envName";

// 지역 리스트 가져오기
export const GetUserListApi = async () => {
  try {
    const result = await axios.get(backendUrl + "/auth/users");

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};
