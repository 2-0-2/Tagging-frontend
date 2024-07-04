import React, { useState } from 'react';
import * as s from '../../pages/Typing/style';
import enterarrow from '../../assets/enter.svg';
import enterbluearrow from '../../assets/enterblue.svg';

interface SentenceInputProps {
  sentence: string;
  onInputChange: (value: string) => void;
  onEnterPress: () => void;
  inputValue: string; // inputValue 추가
}

const SentenceInput = ({
  sentence,
  onInputChange,
  onEnterPress,
  inputValue // inputValue 추가
}: SentenceInputProps) => {
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false); // 포커스 상태 관리

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange(value);

    const newWrongIndices: number[] = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== sentence[i]) {
        newWrongIndices.push(i);
      }
    }
    setWrongIndices(newWrongIndices);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterPress();
    }
  };

  return (
    <s.Typing_enter_sentence isFocused={isFocused}>
      <s.Typing_enter_icon src={isFocused ? enterbluearrow : enterarrow} />
      <s.Typing_input
        placeholder="위 문장을 타이핑하세요!"
        value={inputValue} // 입력 값 사용
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        onFocus={() => setIsFocused(true)} // 포커스 시 상태 변경
        onBlur={() => setIsFocused(false)} // 포커스 해제 시 상태 변경
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
