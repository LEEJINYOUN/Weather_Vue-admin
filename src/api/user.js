import axios from "axios";
import { backendUrl } from "@/constants/envName";

const totalUrl = backendUrl + "/auth";

// 모든 유저 정보 조회
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

// 로그인
export const LoginApi = async (value) => {
  try {
    const { email, password } = value;

    const result = await axios.post(totalUrl + "/login", {
      email,
      password,
    });

    if (result.status == 201) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};
