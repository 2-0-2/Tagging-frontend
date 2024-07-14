import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import Heart from "../../assets/Heart.svg";
import { typingData } from "../../data/word";
import Word, { WordType } from "../../components/Word";
import GameStartModal from "../GameStartModal";
import enterblue from "../../assets/enterblue.svg";

interface GameProps {
  setGameScore: React.Dispatch<React.SetStateAction<number>>;
}

const Game = ({ setGameScore }: GameProps) => {
  const [words, setWords] = useState<WordType[]>([]);
  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [fallSpeed, setFallSpeed] = useState<number>(20);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const sectionHeight = 500;
  const navigate = useNavigate();

  // 새로운 단어 추가
  useEffect(() => {
    const interval = setInterval(() => {
      const newWord = typingData[wordIndex];
      const updatedWord: WordType = {
        id: `${newWord.english}-${Date.now()}`,
        topPosition: 0,
        leftPosition: Math.random() * 80 + 10,
        english: newWord.english,
        korean: newWord.korean,
        color: newWord.color,
      };
      setWords((prevWords) => [...prevWords, updatedWord]);
      setWordIndex((prevIndex) => (prevIndex + 1) % typingData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [wordIndex]);

  // 게임 시작 처리
  const startGame = () => {
    setGameStarted(true);
  };

  // 생명 소진 감지 및 게임 결과 표시
  useEffect(() => {
    if (lives === 0) {
      setIsGameEnded(true);
      setGameScore(score); // Update game score
      navigate("/game-result"); // Navigate to GameResult page
    }
  }, [lives, navigate, score, setGameScore]);

  // 단어의 낙하 처리 및 충돌 감지
  useEffect(() => {
    const handleCollision = () => {
      if (!gameStarted || isGameEnded) return;

      setWords((prevWords) => {
        const updatedWords = prevWords.map((word) => ({
          ...word,
          topPosition: (word.topPosition ?? 0) + 1,
        }));
        const filteredWords = updatedWords.filter(
          (word) => word.topPosition < sectionHeight,
        );
        if (filteredWords.length < updatedWords.length) {
          setLives((prevLives) => prevLives - 1);
        }
        return filteredWords;
      });
    };

    const collisionInterval = setInterval(() => {
      handleCollision();
    }, fallSpeed * 100);

    return () => clearInterval(collisionInterval);
  }, [fallSpeed, gameStarted, isGameEnded, lives, sectionHeight]);

  // 입력 처리
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const matchingWord = words.find(
        (word) => word.english === input || word.korean === input,
      );
      if (matchingWord) {
        if (matchingWord.english === input && matchingWord.korean !== "") {
          setWords((prevWords) =>
            prevWords.filter((word) => word.id !== matchingWord.id),
          );
          setScore((prevScore) => prevScore + 10);
        } else if (
          matchingWord.korean === input &&
          matchingWord.english !== ""
        ) {
          setWords((prevWords) =>
            prevWords.filter((word) => word.id !== matchingWord.id),
          );
          setScore((prevScore) => prevScore + 10);
        }
      }
      setInput("");
    }
  };

  return (
    <S.LayoutContainer>
      {!gameStarted && <GameStartModal onStartGame={startGame} />}
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
                word={word.english}
                translation={word.korean}
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
            <img src={enterblue} alt="enter icon" />
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
