// Word.tsx

import React from "react";
import styled, { keyframes } from "styled-components";

interface WordProps {
  word: string;
  color: string;
  topPosition: number;
  onAnimationEnd: () => void;
}

// Define the keyframes animation
const fallAnimation = keyframes<{ topPosition: number }>`
  from {
    transform: translateY(${(props) => props.topPosition}px);
  }
  to {
    transform: translateY(500px);
  }
`;

// Styled component using the animation
const StyledWord = styled.div<{ topPosition: number; color: string }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: ${(props) => props.topPosition}px;
  font-size: 24px;
  font-family: "GmarketSansMedium";
  color: ${(props) => props.color};
  animation: ${fallAnimation} 5s linear forwards;
`;

const Word = ({ word, color, topPosition, onAnimationEnd }: WordProps) => {
  return (
    <StyledWord
      topPosition={topPosition}
      color={color}
      onAnimationEnd={onAnimationEnd}
    >
      {word}
    </StyledWord>
  );
};

export default Word;
