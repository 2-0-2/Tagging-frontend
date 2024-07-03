import React from "react";
import * as s from "../../pages/Typing/style";

interface AccuracyDisplayProps {
  accuracy: number;
}

const calculateAccuracy = (correctSentence: string, typedSentence: string): number => {
  const correctWords = correctSentence.split(" ");
  const typedWords = typedSentence.split(" ");

  let correctWordCount = 0;

  correctWords.forEach((word, index) => {
    if (typedWords[index] && typedWords[index] === word) {
      correctWordCount++;
    }
  });

  const totalWords = correctWords.length;
  const calculatedAccuracy = (correctWordCount / totalWords) * 100;

  return calculatedAccuracy;
};

const AccuracyDisplay = ({ accuracy }:AccuracyDisplayProps) => {
  return (
    <s.Typing_stats_display width={`${accuracy}%`}>
      <s.ColoredSpan>{accuracy.toFixed(0)}%</s.ColoredSpan>
    </s.Typing_stats_display>
  );
};

export default AccuracyDisplay;
