export interface WordType {
  topPosition: number;
  english: string;
  korean: string;
  color: string;
  position?: number; // Adding position as optional since it will be added dynamically
}

export const typingData = [
  { english: "apple", korean: "사과", color: "#00A3FF" },
  { english: "banana", korean: "바나나", color: "#51D600" },
  { english: "cherry", korean: "체리", color: "#FF9900" },
  { english: "date", korean: "대추", color: "#FF6DB3" },
  { english: "elephant", korean: "코끼리", color: "#00A3FF" },
  { english: "flower", korean: "꽃", color: "#51D600" },
  { english: "grape", korean: "포도", color: "#FF9900" },
  { english: "house", korean: "집", color: "#FF6DB3" },
  { english: "ice", korean: "얼음", color: "#00A3FF" },
  { english: "juice", korean: "주스", color: "#51D600" },
  { english: "kangaroo", korean: "캥거루", color: "#FF9900" },
  { english: "lemon", korean: "레몬", color: "#FF6DB3" },
  { english: "monkey", korean: "원숭이", color: "#00A3FF" },
  { english: "notebook", korean: "공책", color: "#51D600" },
  { english: "orange", korean: "오렌지", color: "#FF9900" },
  { english: "pencil", korean: "연필", color: "#FF6DB3" },
  { english: "queen", korean: "여왕", color: "#00A3FF" },
  { english: "rabbit", korean: "토끼", color: "#51D600" },
  { english: "sun", korean: "태양", color: "#FF9900" },
  { english: "tiger", korean: "호랑이", color: "#FF6DB3" },
  { english: "umbrella", korean: "우산", color: "#00A3FF" },
  { english: "violin", korean: "바이올린", color: "#51D600" },
  { english: "water", korean: "물", color: "#FF9900" },
  { english: "xylophone", korean: "실로폰", color: "#FF6DB3" },
  { english: "yacht", korean: "요트", color: "#00A3FF" },
  { english: "zebra", korean: "얼룩말", color: "#51D600" },
  { english: "airplane", korean: "비행기", color: "#FF9900" },
  { english: "bicycle", korean: "자전거", color: "#FF6DB3" },
  { english: "candle", korean: "양초", color: "#00A3FF" },
  { english: "dog", korean: "개", color: "#51D600" },
  { english: "egg", korean: "계란", color: "#FF9900" },
];
