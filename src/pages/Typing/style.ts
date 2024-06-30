import styled from "styled-components";
import '../../App.css';

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
  border-radius: 20px;
  font-family: 'GmarketSansMedium';
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
  align-items: center;
  padding: 10px 30px 20px 0px;
  border-right: 1.5px solid #D8D8D8;
  
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    gap: 9px;
  }
`;

export const ColoredSpan = styled.span`
  color: ${(props) => props.color || 'black'};
`;

export const Typing_stats_bar = styled.div`
  width: 8.5vw;
  height: 12px;
  background: #e8e8e8;
  border-radius: 5px;
`;

interface TypingStatsDisplayProps {
  width?: string;
}

export const Typing_stats_display = styled.div<TypingStatsDisplayProps>`
  width: ${(props) => props.width || '6vw'};
  height: 12px;
  background: #7280FB;
  border-radius: 5px;
`;