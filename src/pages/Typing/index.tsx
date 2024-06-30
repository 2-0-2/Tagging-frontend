import React, { useState, useEffect } from 'react';
import * as s from "./style";
import logo from "../../assets/로고.svg";
import { fetchSentence } from '../../apis/sentenceAPI';

const TypingPage = () => {
  const [sentence, setSentence] = useState('');

  useEffect(() => {
    const getSentence = () => {
      fetchSentence()
        .then(data => {
          setSentence(data.sentence);
        })
        .catch(error => {
          console.error('문장 가져오기 실패:', error);
        });
    };

    getSentence();
  }, []);

  return (
    <s.Typing_container>
      <s.Typing_layout>
        <s.LogoImage src={logo} style={{ width: "150px", height: "auto" }} />
        <s.Typing_box>
          <s.Typing_section_one>
            <s.Typing_stats_box>
              <div>
              <p>현재 타수 : </p>
              <span>267</span>
              </div>
              <s.Typing_stats_bar>

              </s.Typing_stats_bar>
            </s.Typing_stats_box>
            <s.Typing_stats_box>
              <div>
              <p>최고 타수 : </p>
              <span>600</span>
              </div>
              <s.Typing_stats_bar>

              </s.Typing_stats_bar>
            </s.Typing_stats_box>
            <s.Typing_stats_box>
              <div>
              <p>정확도 : </p>
              <span>99%</span>
              </div>
              <s.Typing_stats_bar>
                
              </s.Typing_stats_bar>
            </s.Typing_stats_box>
          </s.Typing_section_one>
        </s.Typing_box>
      </s.Typing_layout>
    </s.Typing_container>
  );
};

export default TypingPage;
