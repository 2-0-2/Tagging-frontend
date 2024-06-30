import React, { useState, useEffect } from "react";
import * as s from "./style";
import logo from "../../assets/로고.svg";
import returnicon from "../../assets/return.svg";
import rightarrow from "../../assets/rightarrow.svg";
import enterarrow from "../../assets/enter.svg";
import { fetchSentence } from "../../apis/sentenceAPI";

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
            <s.Typing_stats_box>
              <div>
                <p>현재 타수 : </p>
                <s.ColoredSpan color="#7280FB">267</s.ColoredSpan>
              </div>
              <s.Typing_stats_bar>
                <s.Typing_stats_display></s.Typing_stats_display>
              </s.Typing_stats_bar>
            </s.Typing_stats_box>
            <s.Typing_stats_box>
              <div>
                <p>최고 타수 : </p>
                <span>600</span>
              </div>
              <s.Typing_stats_bar>
                <s.Typing_stats_display></s.Typing_stats_display>
              </s.Typing_stats_bar>
              <s.Typing_stats_bar></s.Typing_stats_bar>
            </s.Typing_stats_box>
            <s.Typing_stats_box>
              <div>
                <p>정확도 : </p>
                <span>100%</span>
              </div>
              <s.Typing_stats_bar>
                <s.Typing_stats_display></s.Typing_stats_display>
              </s.Typing_stats_bar>
              <s.Typing_stats_bar></s.Typing_stats_bar>
            </s.Typing_stats_box>
            <s.Typing_engilsh_mode>
              <p>Engilsh</p>
              <s.Typing_return src={returnicon} />
            </s.Typing_engilsh_mode>
          </s.Typing_section_one>
          <s.Typing_section_two>
            <s.Typing_display_sentence>
              <s.Typing_display_icon src={rightarrow} />
              <p>{sentence}</p>
              
            </s.Typing_display_sentence>
            <s.Typing_enter_sentence>
              <s.Typing_enter_icon src={enterarrow}/>
              <s.Typing_input/>
            </s.Typing_enter_sentence>
          </s.Typing_section_two>
          <s.Typing_section_three>
            <p>NEXT : {nextSentence}</p>
          </s.Typing_section_three>
        </s.Typing_box>
      </s.Typing_layout>
    </s.Typing_container>
  );
};

export default TypingPage;
