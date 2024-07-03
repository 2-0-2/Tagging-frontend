import styled from "styled-components";
import "../../App.css";

export const Typing_container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f6f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Typing_layout = styled.div``;

export const LogoImage = styled.img`
  width: 9.5rem;
  height: auto;
  position: absolute;
  top: 8vh;
  left: 200px;
`;

export const Typing_box = styled.div`
  width: 64vw;
  height: 52vh;
  background: #ffffff;
  box-shadow: 0px 0px 30px rgba(70, 70, 70, 0.1);
  border-radius: 1.25rem;
  font-family: "GmarketSansMedium";
  z-index:-1;
  `;

export const Typing_section_one = styled.div`
  display: flex;
  margin: 0 auto;
  width: 90%;
  height: 25%;
  border-bottom: 1px solid #d8d8d8;
  align-items: center;
  `;

export const Typing_stats_box = styled.div`
  width: 25%;
  height: 60%;
  box-sizing: border-box;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 30px 30px 30px;
  border-right: 1.5px solid #d8d8d8;
  
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    gap: 8px;
    height: 6vh;
  }
  `;

export const ColoredSpan = styled.span`
  color: ${(props) => props.color || "black"};
  `;

export const Typing_stats_bar = styled.div`
  width: 9vw;
  background: #e8e8e8;
  border-radius: 5px;
  `;

interface TypingStatsDisplayProps {
  width?: string;
}

export const Typing_stats_display = styled.div<TypingStatsDisplayProps>`
  width: ${(props) => props.width || "0%"};
  height: 8px;
  background: #7280fb;
  border-radius: 5px;
  `;

export const Typing_english_mode = styled.div`
  width: 25%;
  box-sizing: border-box;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  `;

export const Typing_return = styled.img`
  width: 24px;
  height: auto;
  color: #666666;
  `;

export const Typing_section_two = styled.div`
  margin: 0 auto;
  width: 90%;
  `;

export const Typing_display_sentence = styled.div`
  display: flex;
  padding: 10px 0px;
  align-items: center;
  font-size: 24px;
  gap: 10px;
  `;

export const Typing_enter_sentence = styled.div`
  display: flex;
  margin: 0;
  align-items: center;
  font-size: 24px;
  border-bottom: ${(props) => props.color || "5px solid #f6f7fa"};
  border-radius: 2px;
  gap: 10px;
  padding: 0px 0px 15px 0px;
  `;

export const Typing_display_icon = styled.img`
  width: 44px;
  `;

export const Typing_input = styled.input`
  font-size: 24px;
  border-style: none;
  font-family: "GmarketSansMedium";
  outline: none;
  color: transparent;
  caret-color: #7280fb;
  z-index: 1;
  width: 100%;
  ::selection {
    background: transparent;
  }
  ::placeholder {
    color: #d8d8d8;
  }
  &:focus::placeholder {
    color: #d8d8d8;
  }
  `
export const Typing_input_check = styled.div`
  position: absolute;
  overflow: hidden;
  margin-left: 54px;
  height: 33px;
  width: 55%;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  `;

export const Typing_enter_icon = styled.img`
padding: 0 0 5px 0;
width: 44px;
height: auto;
`;

export const Typing_section_three = styled.div`
  margin: 0 auto;
  width: 90%;
  color: #8c8c8c;
  font-size: 1.125rem;
  & > p {
  }
  `;

