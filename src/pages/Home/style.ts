import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Home_Layout = styled.div`
  display: flex;
  padding: 217px 244px;
  font-family: "TTLaundryGothicB";
  align-items: center;
  justify-content: center;
`;

export const Home_Container = styled.div`
  display: flex;
`;

export const Left_Logo_Container = styled.div`
  display: flex;
  gap: 150px;
  flex-direction: column;
`;

export const Main_Title_Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`;

export const Dot_Section = styled.div`
  display: flex;
  gap: 18px;
  padding: 0 0 3px 10px;
  margin-right: auto;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: #7280fb;
`;

export const Sub_Title = styled.div`
  font-size: 30px;
  margin-right: auto;
`;

export const Main_Title_Section = styled.div`
  display: flex;
  padding: 30px 0 60px 0;
  font-size: 200px;
`;

export const Pirple_Title = styled.div`
  color: #7280fb;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 25px 2px;
  background-color: #7280fb;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 30px;
  font-family: "TTLaundryGothicB";
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  justify-content: center;
`;

export const Right_Logo_Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  gap: 160px;
`;
