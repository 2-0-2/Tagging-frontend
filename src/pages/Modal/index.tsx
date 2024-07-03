import * as S from "./style";
import Logo from "../../assets/Logo";
import ESC from "../../assets/ESC";

const Modal = () => {
  const avg_detail = [
    { id: 1, title: "평균 타수(w/m)", achievement: 300, sub_detail: "타" },
    { id: 2, title: "최고 타수(max)", achievement: 700, sub_detail: "타" },
    { id: 3, title: "정확도(%)", achievement: 93, sub_detail: "%" },
  ];
  return (
    <S.Modal_Layout>
      <S.Title>
        <Logo />
      </S.Title>
      <S.Typing_Component>
        {avg_detail.map((item) => (
          <S.Achievement_Component key={item.id}>
            <>{item.title}</>
            <S.Achievement_Details>
              <S.Bar>
                <S.Achievement_Bar />
              </S.Bar>
              <S.Detail_Text>
                {item.achievement}
                {item.sub_detail}
              </S.Detail_Text>
            </S.Achievement_Details>
          </S.Achievement_Component>
        ))}
      </S.Typing_Component>
      <S.Esc_Component>
        <ESC />
        <S.Esc_text_Component>
          <div>정말 잘했어요 :)</div>
          <div>ESC 키를 눌러 다시 시작해요!....</div>
        </S.Esc_text_Component>
      </S.Esc_Component>
    </S.Modal_Layout>
  );
};

export default Modal;
