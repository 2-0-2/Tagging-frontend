import React, { useState, useEffect } from 'react';
import * as s from './style';
import logo from '../../assets/로고.svg';
import returnicon from '../../assets/return.svg';
import rightarrow from '../../assets/rightarrow.svg';
import { fetchSentence } from '../../apis/sentenceAPI';
import { englishSentence } from '../../apis/EsentenceAPI';
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
  const [isEnglishMode, setIsEnglishMode] = useState<boolean>(false); // 영어 모드 여부 상태

  useEffect(() => {
    if (isEnglishMode) {
      getEnglishSentence(); // 초기 영어 문장 가져오기
    } else {
      getSentence(); // 초기 한국어 문장 가져오기
    }
  }, [isEnglishMode]);

  // 한국어 문장 가져오기
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

  // 영어 문장 가져오기
  const getEnglishSentence = async () => {
    try {
      const data = await englishSentence();
      setSentence(data.sentence);
      const nextData = await englishSentence();
      setNextSentence(nextData.sentence);
    } catch (error) {
      console.error('영어 문장 가져오기 실패:', error);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (!startTime) {
      setStartTime(Date.now());
      setCurrentSpeed(0); // 시작 시 초기 타수를 0으로 설정
    }

    if (value.trim() === '') {
      const elapsedTimeInSeconds = (Date.now() - startTime!) / 1000;
      const decreaseRate = 15;
      const decreasedSpeed = Math.max(currentSpeed - decreaseRate * elapsedTimeInSeconds, 0);
      setCurrentSpeed(decreasedSpeed);

      setAccuracy(0);
      setBarWidth('0%');
      return;
    }

    // 정확도 계산
    const correctChars = value.split('').filter((char, idx) => char === sentence[idx]).length;
    const accuracyValue = Math.floor((correctChars / value.length) * 100);
    setAccuracy(accuracyValue);

    const endTime = Date.now();
    const timeDiffInSeconds = (endTime - startTime!) / 1000;

    // 타자수 계산 (단어 당 평균 글자 수 고려 안 함)
    const charactersTyped = value.length;
    const wordsPerMinute = Math.round((charactersTyped / (5 * timeDiffInSeconds / 60)) * 10) / 10; // 평균 단어 길이 5로 가정
    const roundedWpm = Math.max(Math.round(wordsPerMinute * 10), 10); // 최소 타자수는 10으로 설정

    setCurrentSpeed(roundedWpm);

    // 최고 타수 업데이트
    if (roundedWpm > highSpeed) {
      setHighSpeed(roundedWpm);
      setBarWidth('100%');
    }

    // 문장 입력이 완료되면 다음 문장 가져오기
    if (value === sentence) {
      getNextSentence();
      setInputValue(''); // 입력 값 초기화
    }
  };

  const getNextSentence = async () => {
    try {
      if (isEnglishMode) {
        const data = await englishSentence();
        setSentence(nextSentence);
        setNextSentence(data.sentence); // 다음 영어 문장 업데이트
      } else {
        const data = await fetchSentence();
        setSentence(nextSentence);
        setNextSentence(data.sentence); // 다음 한국어 문장 업데이트
      }
    } catch (error) {
      console.error('다음 문장 가져오기 실패:', error);
    }
  };

  const getBarWidth = (current: number, max: number) => {
    return `${(current / max) * 100}%`;
  };

  const accuracyBarWidth = `${accuracy}%`;

  const toggleLanguageMode = () => {
    setIsEnglishMode(prev => !prev); // 한국어 <-> 영어 모드 토글
  };

  return (
    <s.Typing_container>
      <s.Typing_layout>
        <s.LogoImage src={logo} />
        <s.Typing_box>
          <s.Typing_section_one>
            <TypingStatsBox
              label="현재 타수 :"
              value={currentSpeed}
              color="#7280FB"
              barWidth={getBarWidth(currentSpeed, highSpeed)}
            />
            <TypingStatsBox
              label="최고 타수 :"
              value={highSpeed}
              color="black"
              barWidth={barWidth}
            />
            <TypingStatsBox
              label="정확도 :"
              value={`${accuracy}%`}
              barWidth={accuracyBarWidth}
            />
            <s.Typing_english_mode>
              <p>{isEnglishMode ? '한국어' : 'English'}</p>
              <s.Typing_return src={returnicon} onClick={toggleLanguageMode} />
            </s.Typing_english_mode>
          </s.Typing_section_one>
          <s.Typing_section_two>
            <s.Typing_display_sentence>
              <s.Typing_display_icon src={rightarrow} onClick={getNextSentence} />
              <p>{sentence}</p> 
            </s.Typing_display_sentence>
            <SentenceInput
              sentence={sentence}
              onInputChange={handleInputChange}
              onEnterPress={getNextSentence}
              inputValue={inputValue}
            />
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
