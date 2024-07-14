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
  padding: 40px 96px 60px 96px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Title = styled.div`
  font-family: "GmarketSansMedium";
  font-size: 40px;
`;
export const GameScore = styled.div`
  padding: 114px 0;
  font-family: "GmarketSansMedium";
  font-size: 96px;
`;

export const Esc_Component = styled.div`
  display: flex;
  align-items: center;
  padding-top: 35px;
  gap: 16px;
`;
export const Esc_text_Component = styled.div`
  font-size: 1.25rem;
  font-family: "GmarketSansMedium";
`;
