import React, { useState, useEffect } from "react";
import * as s from "./style";
import logo from "../../assets/로고.svg";
import returnicon from "../../assets/return.svg";
import rightarrow from "../../assets/rightarrow.svg";
import { fetchSentence } from "../../apis/sentenceAPI";
import { englishSentence } from "../../apis/EsentenceAPI";
import TypingStatsBox from "../../components/StatsDisplay";
import SentenceInput from "../../components/SentenceInput";
import Modal from "../Modal";

const TypingPage = () => {
  const [sentence, setSentence] = useState<string>("");
  const [nextSentence, setNextSentence] = useState<string>("");
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [highSpeed, setHighSpeed] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [barWidth, setBarWidth] = useState<string>("0%");
  const [isEnglishMode, setIsEnglishMode] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sentenceCount, setSentenceCount] = useState<number>(0);
  const [isDecreasing, setIsDecreasing] = useState<boolean>(false);

  useEffect(() => {
    if (isEnglishMode) {
      getEnglishSentence();
    } else {
      getSentence();
    }
  }, [isEnglishMode]);

  useEffect(() => {
    if (sentence) {
      saveToLocalStorage("typingData", {
        currentSpeed: Math.round(currentSpeed), // 반올림 처리
        highSpeed: Math.round(highSpeed), // 반올림 처리
        accuracy: Math.round(accuracy), // 반올림 처리
      });
    }
  }, [sentence, currentSpeed, highSpeed, accuracy]);

  const getSentence = async () => {
    try {
      const data = await fetchSentence();
      setSentence(data.sentence || "");
      const nextData = await fetchSentence();
      setNextSentence(nextData.sentence || "");
    } catch (error) {
      console.error("문장 가져오기 실패:", error);
    }
  };

  const getEnglishSentence = async () => {
    try {
      const data = await englishSentence();
      setSentence(data.sentence || "");
      const nextData = await englishSentence();
      setNextSentence(nextData.sentence || "");
    } catch (error) {
      console.error("영어 문장 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

if (isDecreasing && startTime !== null) {
  interval = setInterval(() => {
    setCurrentSpeed((prevSpeed) => {
      const elapsedTimeInSeconds = (Date.now() - startTime!) / 1000;
      const decreaseRate = 5;
      const decreasedSpeed = Math.max(
        prevSpeed - (decreaseRate * elapsedTimeInSeconds) / 10,
        0,
      );
      return Math.floor(decreasedSpeed); // 소수점을 버린 후 반환
    });
  }, 100);
}

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isDecreasing, startTime]);

  const saveToLocalStorage = (key: string, value: object) => {
    const existingData = getFromLocalStorage(key);
    const newData = [...existingData, value];
    localStorage.setItem(key, JSON.stringify(newData));
  };

  const getFromLocalStorage = (key: string): any[] => {
    const data = localStorage.getItem(key);
    try {
      const parsedData = JSON.parse(data || "[]");
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error("Failed to parse data from localStorage:", error);
      return [];
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (!startTime) {
      setStartTime(Date.now());
      setCurrentSpeed(0);
    }

    if (value.trim() === "") {
      setIsDecreasing(true);
      setAccuracy(0);
      setBarWidth("0%");
      return;
    } else {
      setIsDecreasing(false);
    }

    const correctChars = value
      .split("")
      .filter((char, idx) => char === sentence[idx]).length;
    const accuracyValue = Math.floor((correctChars / value.length) * 100);
    setAccuracy(accuracyValue);

    const endTime = Date.now();
    const timeDiffInSeconds = (endTime - startTime!) / 1000;

    const charactersTyped = value.length;
    const wordsPerMinute =
      Math.round((charactersTyped / ((5 * timeDiffInSeconds) / 60)) * 10) / 10;
    const roundedWpm = Math.max(Math.round(wordsPerMinute * 10), 10);

    setCurrentSpeed(roundedWpm);

    // 현재 타수가 최고 타수보다 크면 최고 타수를 업데이트
    if (roundedWpm > highSpeed) {
      setHighSpeed(roundedWpm);
    }

    if (value === sentence) {
      setSentenceCount((prevCount) => prevCount + 1);
      getNextSentence();
      setInputValue("");
      setStartTime(null); // 다음 문장으로 넘어갈 때 startTime 초기화
      setCurrentSpeed(0); // 다음 문장으로 넘어갈 때 currentSpeed 초기화
    }
  };

  useEffect(() => {
    if (sentenceCount === 3) {
      setShowModal(true);
    }
  }, [sentenceCount]);

  const getNextSentence = async () => {
    try {
      if (isEnglishMode) {
        const data = await englishSentence();
        setSentence(nextSentence);
        setNextSentence(data.sentence);
      } else {
        const data = await fetchSentence();
        setSentence(nextSentence);
        setNextSentence(data.sentence);
      }
    } catch (error) {
      console.error("다음 문장 가져오기 실패:", error);
    }
  };

  const getBarWidth = (current: number, max: number) => {
    return max === 0 ? "0%" : `${(current / max) * 100}%`;
  };

  const accuracyBarWidth = `${accuracy}%`;

  const toggleLanguageMode = () => {
    setIsEnglishMode((prev) => !prev);
  };

  const closeModal = () => {
    setShowModal(false);
    setSentenceCount(0);
  };

  const calculateAverage = () => {
    const data = getFromLocalStorage("typingData");
    if (!data || data.length === 0) return { avgSpeed: 0, avgAccuracy: 0 };

    const totalEntries = data.length;
    const totalSpeed = data.reduce((sum, entry) => sum + entry.currentSpeed, 0);
    const totalAccuracy = data.reduce((sum, entry) => sum + entry.accuracy, 0);

    return {
      avgSpeed: totalSpeed / totalEntries,
      avgAccuracy: totalAccuracy / totalEntries,
    };
  };

  const { avgSpeed, avgAccuracy } = calculateAverage();

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
              barWidth="100%"
            />
            <TypingStatsBox
              label="정확도 :"
              value={`${accuracy}%`}
              barWidth={accuracyBarWidth}
            />
            <s.Typing_english_mode>
              <p>{isEnglishMode ? "한국어" : "English"}</p>
              <s.Typing_return src={returnicon} onClick={toggleLanguageMode} />
            </s.Typing_english_mode>
          </s.Typing_section_one>
          <s.Typing_section_two>
            <s.Typing_display_sentence>
              <s.Typing_display_icon
                src={rightarrow}
                onClick={getNextSentence}
              />
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
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          avgSpeed={Math.round(avgSpeed)} // 반올림 처리
          highSpeed={Math.round(highSpeed)} // 반올림 처리
          avgAccuracy={Math.round(avgAccuracy)} // 반올림 처리
        />
      </s.Typing_layout>
    </s.Typing_container>
  );
};

export default TypingPage;