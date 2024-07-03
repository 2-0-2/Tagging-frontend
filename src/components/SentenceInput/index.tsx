import React, { useState } from 'react';
import * as s from '../../pages/Typing/style';
import enterarrow from '../../assets/enter.svg';

interface SentenceInputProps {
  sentence: string;
  onInputChange: (value: string) => void;
  onEnterPress: () => void;
}

const SentenceInput = ({ sentence, onInputChange, onEnterPress }:SentenceInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const newWrongIndices: number[] = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== sentence[i]) {
        newWrongIndices.push(i);
      }
    }
    setWrongIndices(newWrongIndices);
    onInputChange(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterPress();
      setInputValue('');
    }
  };

  return (
    <s.Typing_enter_sentence>
      <s.Typing_enter_icon src={enterarrow} />
      <s.Typing_input
        placeholder="위 문장을 타이핑하세요!"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        spellCheck={false}
      />
      <s.Typing_input_check>
        {inputValue.split('').map((char, index) => (
          <span
            key={index}
            style={{
              borderBottom: wrongIndices.includes(index) ? '2.3px solid red' : 'none',
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
