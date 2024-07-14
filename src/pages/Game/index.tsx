import React, { useState, useEffect } from "react";
import * as S from "./style";
import Heart from "../../assets/Heart.svg";
import { typingData } from "../../data";
import Word, { WordType } from "../../components/Word";

const Game = () => {
  const [words, setWords] = useState<WordType[]>([]);
  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(10);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [fallSpeed, setFallSpeed] = useState<number>(10); // 초기 속도(10초)
  const sectionHeight = 500;

  // 새로운 단어 추가
  useEffect(() => {
    const interval = setInterval(() => {
      const newWord = typingData[wordIndex];
      const updatedWord: WordType = {
        id: `${newWord.english}-${Date.now()}`,
        topPosition: 0,
        leftPosition: Math.random() * 80 + 10, // 랜덤한 좌표 설정
        english: newWord.english,
        korean: newWord.korean,
        color: newWord.color,
      };
      setWords((prevWords) => [...prevWords, updatedWord]);
      setWordIndex((prevIndex) => (prevIndex + 1) % typingData.length);
    }, 3000); // 3초마다 새로운 단어 추가

    return () => clearInterval(interval);
  }, [wordIndex]);

  // 단어의 낙하 처리 및 충돌 감지
  useEffect(() => {
    const handleCollision = () => {
      setWords((prevWords) => {
        const updatedWords = prevWords.map((word) => ({
          ...word,
          topPosition: (word.topPosition ?? 0) + 1,
        }));
        const filteredWords = updatedWords.filter(
          (word) => word.topPosition < sectionHeight
        );
        // 생명 감소 처리
        if (filteredWords.length < updatedWords.length) {
          setLives((prevLives) => prevLives - 1);
        }
        return filteredWords;
      });
    };

    const collisionInterval = setInterval(() => {
      handleCollision();
    }, fallSpeed * 100); // 속도에 따라 단어 떨어지는 간격 조정

    return () => clearInterval(collisionInterval);
  }, [fallSpeed]);

  // 입력 처리
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const matchingWord = words.find(
        (word) => word.english === input || word.korean === input
      );
      if (matchingWord) {
        if (matchingWord.english === input && matchingWord.korean !== "") {
          setWords((prevWords) =>
            prevWords.filter(
              (word) => word.id !== matchingWord.id
            )
          );
          setScore((prevScore) => prevScore + 10); // 영어와 한글 모두 입력했을 때 점수 증가
        } else if (matchingWord.korean === input && matchingWord.english !== "") {
          setWords((prevWords) =>
            prevWords.filter(
              (word) => word.id !== matchingWord.id
            )
          );
          setScore((prevScore) => prevScore + 10); // 영어와 한글 모두 입력했을 때 점수 증가
        }
      }
      setInput(""); // Enter 후 입력 필드 비움
    }
  };

  return (
    <S.LayoutContainer>
      <S.GameLayout>
        <S.Header>
          <S.Score>점수 : {score}</S.Score>
          <S.Life>
            <div>생명 : </div>
            {[...Array(lives)].map((_, index) => (
              <S.Heart src={Heart} key={index} />
            ))}
          </S.Life>
        </S.Header>
        <S.Main>
          <S.Section>
            {words.map((word) => (
              <Word
                key={word.id}
                word={word.english} // 영어 단어 출력
                translation={word.korean} // 한글 번역 출력
                color={word.color}
                topPosition={word.topPosition ?? 0}
                leftPosition={word.leftPosition ?? 50}
                fallSpeed={fallSpeed}
                onAnimationEnd={() => {
                  setLives((prevLives) => prevLives - 1);
                }}
              />
            ))}
          </S.Section>
          <S.Line />
          <S.InputContainer>
            <S.Input
              placeholder="위 단어를 입력하세요!"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </S.InputContainer>
        </S.Main>
      </S.GameLayout>
    </S.LayoutContainer>
  );
};

export default Game;
