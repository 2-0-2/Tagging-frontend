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
  const [accuracy, setAccuracy] = useState<number>(100); // 정확도 초기값을 100으로 설정

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

    if (value.length === 0) {
      // 입력이 없는 경우 타자수 서서히 감소
      const interval = setInterval(() => {
        setCurrentSpeed((prevSpeed) => Math.max(prevSpeed - 1, 0)); // 1초마다 1씩 감소
      }, 1000);

      return () => clearInterval(interval); // 컴포넌트가 언마운트되면 clearInterval
    }

    if (!startTime) {
      setStartTime(Date.now());
      setCurrentSpeed(0); // 시작 시 초기 타자수를 0으로 설정
      return; // startTime이 설정되지 않았을 때 함수 종료
    }

    const endTime = Date.now();
    const timeDiff = (endTime - startTime) / 800; // seconds

    // 타수 계산 - 단어 당 평균 글자 수 (5로 가정)
    const wordsTyped = value.trim().split(/\s+/).length;
    const wpm = Math.round((wordsTyped / (timeDiff / 60)) * 10) / 10; // 소수점 첫째 자리까지 반올림
    const roundedWpm = Math.max(Math.round(wpm * 10), 10); // 최소 타자수는 10으로 설정
    setCurrentSpeed(roundedWpm);

    // 최고 타수 업데이트
    if (roundedWpm > highSpeed) {
      setHighSpeed(roundedWpm);
    }

    // 정확도 계산
    const correctWords = value.trim().split(/\s+/).filter((word, i) => word === sentence.split(/\s+/)[i]).length;
    const accuracyValue = Math.round((correctWords / sentence.split(/\s+/).length) * 100);

    if (value.trim() === sentence.trim()) {
      setAccuracy(100);
      setInputValue('');
      setStartTime(null);
      setSentence(nextSentence);
      setNextSentence('');
      getNextSentence();
    } else {
      setAccuracy(accuracyValue);
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

  // 정확도 바 너비 계산
  const accuracyBarWidth = `${accuracy}%`;

  return (
    <s.Typing_container>
      <s.Typing_layout>
        <s.LogoImage src={logo} />
        <s.Typing_box>
          <s.Typing_section_one>
            <TypingStatsBox label="현재 타수 :" value={currentSpeed} color="#7280FB" barWidth={`${(currentSpeed / 100) * 100}%`} />
            <TypingStatsBox label="최고 타수 :" value={highSpeed} color="black" barWidth={`${(highSpeed / 100) * 100}%`} />
            <TypingStatsBox label="정확도 :" value={accuracy} barWidth={accuracyBarWidth} />
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
