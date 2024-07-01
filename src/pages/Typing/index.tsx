import React, { useState, useEffect } from "react";
import * as s from "./style";
import logo from "../../assets/로고.svg";
import returnicon from "../../assets/return.svg";
import rightarrow from "../../assets/rightarrow.svg";
import enterarrow from "../../assets/enter.svg";
import { fetchSentence } from "../../apis/sentenceAPI";
import TypingStatsBox from "../../components/StatsDisplay";

const TypingPage = () => {
  const [sentence, setSentence] = useState("");
  const [nextSentence, setNextSentence] = useState("");
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [highSpeed, setHighSpeed] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);

  useEffect(() => {
    const getSentence = () => {
      fetchSentence()
        .then((data) => {
          setSentence(data.sentence);
          setNextSentence(data.sentence);
        })
        .catch((error) => {
          console.error("문장 가져오기 실패:", error);
        });
    };
    getSentence();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 입력값과 문장 비교하여 틀린 위치의 인덱스 배열 생성
    const newWrongIndices: number[] = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== sentence[i]) {
        newWrongIndices.push(i);
      }
    }
    setWrongIndices(newWrongIndices);
  };

  return (
    <s.Typing_container>
      <s.Typing_layout>
        <s.LogoImage src={logo} />
        <s.Typing_box>
          <s.Typing_section_one>
            <TypingStatsBox
              label="현재 타수:"
              value={currentSpeed}
              color="#7280FB"
            />
            <TypingStatsBox
              label="최고 타수:"
              value={highSpeed}
              color="black"
            />
            <TypingStatsBox
              label="정확도:"
              value={`${accuracy}%`}
              color="black"
            />
            <s.Typing_english_mode>
              <p>English</p>
              <s.Typing_return src={returnicon} />
            </s.Typing_english_mode>
          </s.Typing_section_one>
          <s.Typing_section_two>
            <s.Typing_display_sentence>
              <s.Typing_display_icon src={rightarrow} />
              <p>{sentence}</p>
            </s.Typing_display_sentence>
            <s.Typing_enter_sentence>
              <s.Typing_enter_icon src={enterarrow} />
                <s.Typing_input
                  placeholder="위 문장을 타이핑하세요!"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <s.Typing_input_check>
                  {inputValue.split("").map((char, index) => (
                    <span
                      key={index}
                      style={{
                        textDecoration: wrongIndices.includes(index)
                          ? "red wavy underline"
                          : "none",
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </s.Typing_input_check>
            </s.Typing_enter_sentence>
          </s.Typing_section_two>
          <s.Typing_section_three>
            <p>NEXT: {nextSentence}</p>
          </s.Typing_section_three>
        </s.Typing_box>
      </s.Typing_layout>
    </s.Typing_container>
  );
};

export default TypingPage;
