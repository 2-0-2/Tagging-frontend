import AsteriskBlue from "../../assets/AsteriskBlue";
import AsteriskPink from "../../assets/AsteriskPink";
import Clover from "../../assets/Clover";
import Star from "../../assets/Star";
import * as S from "./style";

const Home = () => {
  return (
    <S.Home_Layout>
      <S.Home_Container>
        <S.Left_Logo_Container>
          <Clover />
          <Star style={{ marginLeft: "50px" }} />
        </S.Left_Logo_Container>
        <S.Main_Title_Container>
          <S.Dot_Section>
            <S.Dot />
            <S.Dot />
          </S.Dot_Section>
          <S.Sub_Title>손끝에서 펼쳐지는 속도의 마법!</S.Sub_Title>
          <S.Main_Title_Section>
            <S.Pirple_Title>타</S.Pirple_Title>
            <>깅</>
            <S.Pirple_Title>타</S.Pirple_Title>
            <>깅</>
          </S.Main_Title_Section>
          <S.Button_Section>

          <S.StyledNavLink to="/typing">타자치러가기 {">"}</S.StyledNavLink>
          <S.StyledNavLink to="/typing">타자게임하기 {">"}</S.StyledNavLink>
          </S.Button_Section>
        </S.Main_Title_Container>
        <S.Right_Logo_Container>
          <AsteriskPink style={{ marginLeft: "70px" }} />
          <AsteriskBlue style={{ marginLeft: "30px" }} />
        </S.Right_Logo_Container>
      </S.Home_Container>
    </S.Home_Layout>
  );
};

export default Home;
