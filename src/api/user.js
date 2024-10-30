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

// 토큰 정보 가져오기
const getToken = async (token) => {
  try {
    const result = await axios.post(
      totalUrl + "/getUser",
      {
        accessToken: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return result;
  } catch (e) {
    return e;
  }
};

// 유저 정보 가져오기
export const GetUserApi = async (value) => {
  try {
    const { accessToken, refreshToken } = value;

    let result = await getToken(accessToken);

    if (result.status == 201) {
      // 토큰 유효
      return result;
    } else if (result.status == 401) {
      // 토큰 만료
      result = await getToken(refreshToken);
      return result;
    }
  } catch (e) {
    return e;
  }
};

// 로그아웃
export const LogoutApi = async () => {
  try {
    const result = await axios.post(totalUrl + "/logout");

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
