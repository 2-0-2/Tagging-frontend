import styled from "styled-components";

export const Modal_Layout = styled.div`
  width: 420px;
  height: 470px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  border-radius: 20px;
  gap: 33px;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const Pirple_Title = styled.div`
  color: #7280fb;
`;

export const Typing_Component = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-family: "GmarketSansMedium";
  font-size: 1.125rem;
`;

export const Achievement_Component = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Achievement_Details = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const Bar = styled.div`
  position: relative;
  width: 75%;
  height: 2rem;
  background-color: #e8e8e8;
  border-radius: 5px;
`;

export const Achievement_Bar = styled.div`
  position: absolute;
  width: 30%;
  height: 100%;
  background-color: #7280fb;
  border-radius: 5px;
`;

export const Detail_Text = styled.div`
  margin-left: auto;
  font-size: 1.5rem;
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
