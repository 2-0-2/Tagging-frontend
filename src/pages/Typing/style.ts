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

export const Typing_layout = styled.div`
  padding: 5% 10% 10% 10%;
  `;

export const LogoImage = styled.img`
  width: 150px;
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
  width: ${(props) => props.width || "3vw"};
  height: 8px;
  background: #7280fb;
  border-radius: 5px;
`;

export const Typing_engilsh_mode = styled.div `
  width: 25%;
  height: 60%;
  box-sizing: border-box;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;

`

export const Typing_return = styled.img`
  width: 24px;
  height: auto;
  color: #666666;
`;

export const Typing_section_two = styled.div `
  margin: 0 auto;
  width: 90%;
  height: 40%;
  
  `

export const Typing_display_sentence = styled.div `
    display: flex;
    margin-top: 20px;
    align-items: center;
    font-size: 24px;
    gap: 10px;
    
    `
  
  export const Typing_enter_sentence = styled.div `
    display: flex;
    margin: 0;
    height: 40%;
    align-items: center;
    font-size: 24px;
    border-bottom: 5px solid #F6F7FA;
    gap: 10px;
    `
  


export const Typing_display_icon = styled.img`
      width: 44px;
      height: auto;
    `;

export const Typing_input = styled.input`
  width: 100%;
  height: 5vh;
  font-size: 24px;
  border-style: none;
  font-family: "GmarketSansMedium";
  outline: none;
`

export const Typing_enter_icon = styled.img`
      width: 44px;
      height: auto;
    `;

export const Typing_section_three = styled.div`
        margin: 0 auto;
  width: 90%;
  height: 40%;
  color: #8C8C8C;
  font-size: 16px;
  & > p {

  }
    `;

