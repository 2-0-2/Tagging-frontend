import axios from "axios";

export const fetchSentence = () => {
  return axios
    .get("http://211.112.175.88:5050/")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API 호출 중 오류 발생:", error);
    });
};
