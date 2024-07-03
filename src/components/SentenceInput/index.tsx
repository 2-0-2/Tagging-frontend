import React, { useState } from "react";
import * as s from "../../pages/Typing/style";
import enterarrow from "../../assets/enter.svg";

interface SentenceInputProps {
  sentence: string;
  onInputChange: (value: string) => void;
}

const SentenceInput = ({ sentence, onInputChange }: SentenceInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);
  const [isComposing, setIsComposing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!isComposing) {
      updateWrongIndices(value);
    }
    onInputChange(value);
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    const value = (e.target as HTMLInputElement).value; // 타입 캐스팅
    setInputValue(value);
    updateWrongIndices(value);
    onInputChange(value);
  };

  const updateWrongIndices = (value: string) => {
    const newWrongIndices: number[] = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== sentence[i]) {
        newWrongIndices.push(i);
      }
    }
    setWrongIndices(newWrongIndices);
  };

  return (
    <s.Typing_enter_sentence>
      <s.Typing_enter_icon src={enterarrow} />
      <s.Typing_input
        placeholder="위 문장을 타이핑하세요!"
        value={inputValue}
        onChange={handleInputChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        spellCheck={false}
      />
      <s.Typing_input_check>
        {inputValue.split("").map((char, index) => (
          <span
            key={index}
            style={{
              borderBottom: wrongIndices.includes(index) ? "2.5px solid red" : "none",
            }}
          >
            {char}
          </span>
        ))}
      </s.Typing_input_check>
    </s.Typing_enter_sentence>
  );
};

export default SentenceInput;
