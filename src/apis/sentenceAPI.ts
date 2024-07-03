import axios from "axios";

interface SentenceResponse {
  sentence: string;
}

export const fetchSentence = async (): Promise<SentenceResponse> => {
  try {
    const res = await axios.get("http://211.112.175.88:5050/ko");
    return res.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return { sentence: "" }; // 기본값 반환
  }
};
