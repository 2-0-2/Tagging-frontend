import React, { useState, useEffect } from "react";
import * as s from "./style";
import logo from "../../assets/로고.svg";
import returnicon from "../../assets/return.svg";
import rightarrow from "../../assets/rightarrow.svg";
import { K_sentences, E_sentences } from "../../data/sentence"; // 한국어 문장 데이터 가져오기
import TypingStatsBox from "../../components/StatsDisplay";
import SentenceInput from "../../components/SentenceInput";
import Modal from "../Modal";

interface TypingData {
  currentSpeed: number;
  highSpeed: number;
  accuracy: number;
}

const Typing = () => {
  const [sentence, setSentence] = useState<string>("");
  const [nextSentence, setNextSentence] = useState<string>("");
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [highSpeed, setHighSpeed] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [isEnglishMode, setIsEnglishMode] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sentenceCount, setSentenceCount] = useState<number>(0);
  const [speeds, setSpeeds] = useState<number[]>([]);
  const [accuracies, setAccuracies] = useState<number[]>([]);
  const [averageSpeed, setAverageSpeed] = useState<number>(0);

  useEffect(() => {
    setSentence(getRandomSentence());
    setNextSentence(getRandomSentence());
  }, [isEnglishMode]);

  const getRandomSentence = (): string => {
    const sentences = isEnglishMode ? E_sentences : K_sentences;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex][1];
  };

  const saveToLocalStorage = (key: string, value: TypingData) => {
    const existingData = getFromLocalStorage(key) || [];
    const newData = [...existingData, value];
    localStorage.setItem(key, JSON.stringify(newData));
  };

  const getFromLocalStorage = (key: string): TypingData[] => {
    const data = localStorage.getItem(key);
    try {
      const parsedData = JSON.parse(data || "[]");
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error(
        "localStorage에서 데이터를 파싱하는 데 실패했습니다:",
        error,
      );
      return [];
    }
  };

  const handleEnterPress = () => {
    setAccuracies((prevAccuracies) => [...prevAccuracies, accuracy]); // 현재 문장의 정확도를 accuracies 배열에 추가
    setSpeeds((prevSpeeds) => [...prevSpeeds, currentSpeed]); // 현재 문장의 타수를 speeds 배열에 추가
    setSentenceCount((prevCount) => prevCount + 1);
    updateHighSpeed(currentSpeed); // 최고 타수 업데이트
    getNextSentence();
    setInputValue("");
    setStartTime(null);
    setCurrentSpeed(0);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (!startTime && value.trim() !== "") {
      setStartTime(Date.now());
    }

    if (value.trim() === "") {
      setAccuracy(0);
      setCurrentSpeed(0); // 입력값이 비었을 때 현재 타수를 0으로 설정
      return;
    }

    const minLength = Math.min(value.length, sentence.length); // 입력된 문자열과 문장의 최소 길이
    const correctChars = value
      .slice(2) // 두 번째 글자부터 비교 (첫번째 글자부터 계산하면 타수가 너무 높게 나오기 때문)
      .split("")
      .filter((char, idx) => char === sentence[idx + 2]).length; // 문장의 두 번째 글자부터 비교
    const accuracyValue = Math.floor((correctChars / (minLength - 2)) * 100); // 정확도 계산
    setAccuracy(accuracyValue);

    const endTime = Date.now();
    const timeDiffInSeconds = (endTime - startTime!) / 1000;

    const charactersTyped = value.length;
    const wordsPerMinute =
      Math.round((charactersTyped / ((5 * timeDiffInSeconds) / 60)) * 10) / 10;
    const roundedWpm = Math.min(Math.round(wordsPerMinute * 10), 1000);

    setCurrentSpeed(roundedWpm);

    if (roundedWpm > highSpeed) {
      setHighSpeed(roundedWpm);
    }

    if (value.length >= sentence.length) {
      handleEnterPress();
    }
  };

  useEffect(() => {
    if (sentenceCount === 3) {
      // 평균 정확도 계산
      const averageAccuracy =
        accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
      setAccuracy(Math.round(averageAccuracy));

      // 평균 타수 계산
      const averageSpeed =
        speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length;
      setAverageSpeed(Math.round(averageSpeed)); // 평균 타수 설정

      // 모달을 열기 전에 상태 업데이트
      setShowModal(true);
    }
  }, [sentenceCount]);

  const getNextSentence = () => {
    setSentence(nextSentence);
    setNextSentence(getRandomSentence());
  };

  const toggleLanguageMode = () => {
    setIsEnglishMode((prev) => !prev);
  };

  const closeModal = () => {
    setShowModal(false);
    setSentenceCount(0);
    setAccuracies([]);
    setSpeeds([]);
    setAccuracy(0);
    setAverageSpeed(0);
  };

  const calculateAverage = (): { avgSpeed: number; avgAccuracy: number } => {
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

  const updateHighSpeed = (speed: number) => {
    if (speed > highSpeed) {
      setHighSpeed(speed);
    }
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
              barWidth={`${(currentSpeed / highSpeed) * 100}%`}
            />
            <TypingStatsBox
              label="최고 타수 :"
              value={highSpeed}
              color="black"
              barWidth="100%"
            />
            <TypingStatsBox
              label="평균 타수 :"
              value={averageSpeed}
              color="#0d6efd"
              barWidth={`${(averageSpeed / highSpeed) * 100}%`}
            />
            <TypingStatsBox
              label="정확도 :"
              value={`${accuracy}%`}
              barWidth={`${accuracy}%`}
            />
            <s.Typing_english_mode>
              <p>{isEnglishMode ? "English" : "한국어"}</p>
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
              onEnterPress={handleEnterPress}
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
          avgSpeed={averageSpeed}
          highSpeed={highSpeed}
          avgAccuracy={accuracy}
        />
      </s.Typing_layout>
    </s.Typing_container>
  );
};

export default Typing;
