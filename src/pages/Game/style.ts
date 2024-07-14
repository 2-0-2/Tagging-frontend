import styled from "styled-components";

export const LayoutContainer = styled.div `
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  `



export const GameLayout = styled.div`
  width:70vw;
  height: 70vh;
  padding: 60px 96px 70px 70px;
  border: 5px solid #7280fb;
  border-radius: 30px;
`;

export const Header = styled.header`
  font-family: "GmarketSansMedium";
  font-size: 36px;
  display: flex;
  align-items: center;
  gap: 50px;
`;

export const Score = styled.div``;

export const Life = styled.div`
  display: flex;
  align-items: center;
  gap : 2px;
  & > div {
    margin-right: 10px;
  }
  `;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 46px;
  `;

export const Heart = styled.img`

`;


export const Section = styled.section`
  width: 100%;
  height: 400px;
  background-color: aliceblue;
  position: relative;
  overflow: hidden;
`;

export const Line = styled.div`
  border-top: 5px solid #7280fb;
  border-radius: 20px;
  margin-top: 20px;
`;

export const InputContainer = styled.div`
  margin-top: 30px;
  border: 5px solid #7280fb;
  border-radius: 20px;
  padding: 20px 40px;
  display: flex;
`;

export const Typing_enter_icon = styled.img``;

export const Input = styled.input`
  width: 100%;
  border: none;
  color: #505050;
  font-family: "GmarketSansMedium";
  font-size: 30px;
  &:focus {
    outline: none;
  }
`;

export const Word = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  transition: top 1s linear;
`;
