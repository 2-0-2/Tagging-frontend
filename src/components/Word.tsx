// Word 컴포넌트
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

export interface WordType {
  id: string; // id 속성 추가
  topPosition: number;
  english: string;
  korean: string;
  color: string;
  position?: number;
  leftPosition?: number;
}

interface StyledWordProps {
  topPosition: number;
  leftPosition: number;
  color: string;
  fallSpeed: number;
}

const fallAnimation = keyframes`
  from {
    top: ${(props: StyledWordProps) => props.topPosition}px;
  }
  to {
    top: 500px;
  }
`;

const StyledWord = styled.div<StyledWordProps>`
  position: absolute;
  left: ${(props) => props.leftPosition}%;
  top: ${(props) => props.topPosition}px;
  width: auto;
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 24px;
  font-family: "GmarketSansMedium";
  animation: ${fallAnimation} ${(props) => props.fallSpeed}s linear forwards;
`;

interface WordProps {
  word: string;
  translation: string;
  color: string;
  topPosition: number;
  leftPosition: number;
  fallSpeed: number;
  onAnimationEnd?: () => void;
}

const Word = ({ word, translation, color, topPosition, leftPosition, fallSpeed, onAnimationEnd }: WordProps) => {
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (onAnimationEnd) onAnimationEnd();
    };
    const wordElement = wordRef.current;
    if (wordElement) {
      wordElement.addEventListener("animationend", handleAnimationEnd);
      return () => {
        wordElement.removeEventListener("animationend", handleAnimationEnd);
      };
    }
  }, [onAnimationEnd]);

  return (
    <StyledWord ref={wordRef} topPosition={topPosition} leftPosition={leftPosition} color={color} fallSpeed={fallSpeed}>
      {word}
    </StyledWord>
  );
};

export default Word;
