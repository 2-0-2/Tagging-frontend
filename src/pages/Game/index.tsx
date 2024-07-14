// Game.tsx

import React, { useState, useEffect } from "react";
import * as S from "./style"; // Adjust the import path as per your project structure
import Heart from "../../assets/Heart.svg";
import { typingData } from "../../data";
import Word from "../../components/Word";
import { WordType } from "../../data";
import enterblue from "../../assets/enterblue.svg";

const Game = () => {
  const [words, setWords] = useState<WordType[]>([]);
  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const sectionHeight = 500; // Height of the Section

  useEffect(() => {
    setWords(
      typingData
        .slice(wordIndex, wordIndex + 2)
        .map((word, index) => ({ ...word, topPosition: index * 50 }))
    );

    const interval = setInterval(() => {
      setWordIndex((prevIndex) => prevIndex + 2);
    }, 2000);

    return () => clearInterval(interval);
  }, [wordIndex]);

  useEffect(() => {
    const handleCollision = () => {
      const updatedWords = words.filter(
        (word) => (word.topPosition ?? 0) < sectionHeight
      );
      if (updatedWords.length < words.length) {
        setLives((prevLives) => prevLives - 1);
        // Implement modal logic when lives run out
      }
      setWords(updatedWords);
    };

    handleCollision();
  }, [words, lives]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const matchingWord = words.find((word) => word.english === input);
      if (matchingWord) {
        setScore((prevScore) => prevScore + 10);
        setWords((prevWords) =>
          prevWords.filter((word) => word.english !== input)
        );
        setInput("");
      }
    }
  };

  return (
    <S.LayoutContainer>
        <S.GameLayout>
          <S.Header>
            <S.Score>점수 : {score}</S.Score>
            <S.Life>
              <div>
              생명 :{" "}
              </div>
              {[...Array(lives)].map((_, index) => (
                <S.Heart src={Heart} key={index} />
              ))}
            </S.Life>
          </S.Header>
          <S.Main>
            <S.Section>
              {words.map((word, index) => (
                <Word
                  key={index}
                  word={word.english}
                  color={word.color}
                  topPosition={word.topPosition ?? 0}
                  onAnimationEnd={() => setLives((prevLives) => prevLives - 1)}
                />
              ))}
            </S.Section>
            <S.Line />
            <S.InputContainer>
              <img src={enterblue} />
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
