import React, { useState, useEffect } from 'react';
import * as s from './style';
import logo from '../../assets/로고.svg';
import returnicon from '../../assets/return.svg';
import rightarrow from '../../assets/rightarrow.svg';
import { fetchSentence } from '../../apis/sentenceAPI';
import TypingStatsBox from '../../components/StatsDisplay';
import SentenceInput from '../../components/SentenceInput';

const TypingPage = () => {
  const [sentence, setSentence] = useState<string>('');
  const [nextSentence, setNextSentence] = useState<string>('');
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [highSpeed, setHighSpeed] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0); // 정확도 초기값을 100으로 설정
  const [barWidth, setBarWidth] = useState<string>('0%');
  
  useEffect(() => {
    const getSentence = async () => {
      try {
        const data = await fetchSentence();
        setSentence(data.sentence);
        const nextData = await fetchSentence();
        setNextSentence(nextData.sentence);
      } catch (error) {
        console.error('문장 가져오기 실패:', error);
      }
    };
    getSentence();
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (!startTime) {
      setStartTime(Date.now());
      setCurrentSpeed(0); // 시작 시 초기 타수를 0으로 설정
    }

    if (value.trim() === '') {
      setCurrentSpeed(0); // 입력이 없으면 타수를 0으로 설정
      setAccuracy(0); // 입력이 없으면 정확도를 초기값 100으로 설정
      setBarWidth('0%'); 
      return;
    }
    
    const correctChars = value.split('').filter((char, idx) => char === sentence[idx]).length;
    const accuracyValue = Math.floor((correctChars / value.length) * 100);
    setAccuracy(accuracyValue);

    const endTime = Date.now();
    const timeDiffInSeconds = (endTime - startTime!) / 1000; // milliseconds to seconds
    const wordsPerMinute = Math.round((value.split(' ').length / timeDiffInSeconds) * 60);
    setCurrentSpeed(Math.max(wordsPerMinute, 0));
    
    // 최고 타수 업데이트
    if (wordsPerMinute > highSpeed) {
      setHighSpeed(wordsPerMinute);
      setBarWidth('100%'); 
    }
    
    // 문장 입력이 완료되면 다음 문장 가져오기
    if (value === sentence) {
      getNextSentence();
    }
  };

  const getNextSentence = async () => {
    try {
      const data = await fetchSentence();
      setNextSentence(data.sentence);
    } catch (error) {
      console.error('다음 문장 가져오기 실패:', error);
    }
  };

  const getBarWidth = (current: number, max: number) => {
    return `${(current / max) * 100}%`;
  };

  const accuracyBarWidth = `${accuracy}%`;

  return (
    <s.Typing_container>
      <s.Typing_layout>
        <s.LogoImage src={logo} />
        <s.Typing_box>
          <s.Typing_section_one>
            <TypingStatsBox label="현재 타수 :" value={currentSpeed} color="#7280FB" barWidth={getBarWidth(currentSpeed, highSpeed)} />
            <TypingStatsBox label="최고 타수 :" value={highSpeed} color="black" barWidth={barWidth} />
            <TypingStatsBox label="정확도 :" value={`${accuracy}%`} barWidth={accuracyBarWidth} />
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
            <SentenceInput sentence={sentence} onInputChange={handleInputChange} onEnterPress={() => {}} />
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
