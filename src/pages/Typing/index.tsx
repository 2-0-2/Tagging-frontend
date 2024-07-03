import React, { useState, useEffect } from 'react';
import * as s from './style';
import logo from '../../assets/로고.svg';
import returnicon from '../../assets/return.svg';
import rightarrow from '../../assets/rightarrow.svg';
import { fetchSentence } from '../../apis/sentenceAPI';
import { englishSentence } from '../../apis/EsentenceAPI';
import TypingStatsBox from '../../components/StatsDisplay';
import SentenceInput from '../../components/SentenceInput';
import Modal from '../../page/Modal';

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
  const [showModal, setShowModal] = useState<boolean>(false); // 모달 상태
  const [sentenceCount, setSentenceCount] = useState<number>(0); // 입력된 문장 수
  const [isDecreasing, setIsDecreasing] = useState<boolean>(false); // 타수 감소 애니메이션 상태

  useEffect(() => {
    if (isEnglishMode) {
      getEnglishSentence(); // 초기 영어 문장 가져오기
    } else {
      getSentence(); // 초기 한국어 문장 가져오기
    }
  }, [isEnglishMode]);

  useEffect(() => {
    if (sentence) {
      saveToLocalStorage('typingData', {
        currentSpeed,
        highSpeed,
        accuracy
      });
    }
  }, [sentence, currentSpeed, highSpeed, accuracy]);

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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isDecreasing) {
      interval = setInterval(() => {
        setCurrentSpeed(prevSpeed => {
          const elapsedTimeInSeconds = (Date.now() - startTime!) / 1000;
          const decreaseRate = 15; // 초당 타수 감소 비율
          const decreasedSpeed = Math.max(prevSpeed - decreaseRate * (elapsedTimeInSeconds / 10), 0);
          return decreasedSpeed;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isDecreasing, startTime]);

  // 로컬스토리지 함수 !!!
  const saveToLocalStorage = (key: string, value: object) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const getFromLocalStorage = (key: string): any[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };
  
  
  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (!startTime) {
      setStartTime(Date.now());
      setCurrentSpeed(0); // 시작 시 초기 타수를 0으로 설정
    }

    if (value.trim() === '') {
      // 입력이 없을 때는 이전 타수를 점진적으로 감소시킴
      setIsDecreasing(true);
      setAccuracy(0);
      setBarWidth('0%');
      return;
    } else {
      setIsDecreasing(false);
    }

    // 정확도 계산
    const correctChars = value.split('').filter((char, idx) => char === sentence[idx]).length;
    const accuracyValue = Math.floor((correctChars / value.length) * 100);
    setAccuracy(accuracyValue);

    const endTime = Date.now();
    const timeDiffInSeconds = (endTime - startTime!) / 1000;

    // 타자수 계산
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
      setSentenceCount(prevCount => prevCount + 1);
      getNextSentence();
      setInputValue(''); // 입력 값 초기화
      setCurrentSpeed(0); // 현재 타수 초기화
    }
  };

  useEffect(() => {
    if (sentenceCount === 5) {
      setShowModal(true); // 5번째 문장이 입력되면 모달 띄우기
    }
  }, [sentenceCount]);

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

  const closeModal = () => {
    setShowModal(false);
    setSentenceCount(0); // 문장 수 초기화
  };

  const calculateAverage = () => {
    const data = getFromLocalStorage('typingData'); // 데이터 가져오기
    if (!data) return { avgSpeed: 0, avgAccuracy: 0 }; // 데이터없을경우
    
    const totalEntries = data.length;
    const totalSpeed = data.reduce((sum, entry) => sum + entry.currentSpeed, 0);
    const totalAccuracy = data.reduce((sum, entry) => sum + entry.accuracy, 0);
    
    return {
      avgSpeed: totalSpeed / totalEntries,
      avgAccuracy: totalAccuracy / totalEntries
    };
  };

  const { avgSpeed, avgAccuracy } = calculateAverage();
  <Modal
  isOpen={showModal}
  onClose={closeModal}
  avgSpeed={avgSpeed}
  highSpeed={highSpeed}
  avgAccuracy={avgAccuracy}
/>


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
