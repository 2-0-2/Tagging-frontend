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

  useEffect(() => {
    const getSentence = () => {
      fetchSentence()
        .then((data) => {
          setSentence(data.sentence);
        })
        fetchSentence()
        .then((data) => {
          setNextSentence(data.sentence);
        })
        .catch((error) => {
          console.error("문장 가져오기 실패:", error);
        });
    };

    getSentence();
  }, []);

  return (
    <s.Typing_container>
      <s.Typing_layout>
        <s.LogoImage src={logo} />
        <s.Typing_box>
          <s.Typing_section_one>
            <TypingStatsBox label="현재 타수:" value="267" color="#7280FB" />
            <TypingStatsBox label="최고 타수:" value="600" color="black" />
            <TypingStatsBox label="정확도:" value="100%" color="black" />
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
              <s.Typing_input placeholder="위 문장을 타이핑하세요!" />
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
