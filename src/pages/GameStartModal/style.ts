import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Layout = styled.div`
  padding: 50px 53px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 20px;
`;

export const Title = styled.div`
  font-family: "GmarketSansMedium";
  font-size: 40px;
  padding-bottom: 32px;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubTitle = styled.div`
  font-family: "GmarketSansMedium";
  font-size: 28px;
  padding-bottom: 30px;
`;

export const GameStartBtn = styled.button`
  width: fit-content;
  padding-top: 2px;
  font-family: "GmarketSansMedium";
  color: white;
  background-color: #7280fb;
  cursor: pointer;
  font-size: 28px;
  padding: 20px 25px;
  border: none;
  border-radius: 10px;
`;
