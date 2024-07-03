import React, { useEffect } from "react";
import * as S from "./style";
import Logo from "../../assets/Logo";
import ESC from "../../assets/ESC";
import { useNavigate } from "react-router-dom"; // useNavigate를 import

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  avgSpeed: number;
  highSpeed: number;
  avgAccuracy: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  avgSpeed,
  highSpeed,
  avgAccuracy,
}) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate("/"); // ESC 키를 누르면 '/' 경로로 이동
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  if (!isOpen) return null;

  const avg_detail = [
    { id: 1, title: "평균 타수(w/m)", achievement: avgSpeed, sub_detail: "타" },
    {
      id: 2,
      title: "최고 타수(max)",
      achievement: highSpeed,
      sub_detail: "타",
    },
    { id: 3, title: "정확도(%)", achievement: avgAccuracy, sub_detail: "%" },
  ];

  return (
    <S.Modal_Overlay onClick={onClose}>
      <S.Modal_Layout onClick={(e) => e.stopPropagation()}>
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
        <S.Esc_Component onClick={onClose}>
          <ESC />
          <S.Esc_text_Component>
            <div>정말 잘했어요 :)</div>
            <div>ESC 키를 눌러 다시 시작해요!....</div>
          </S.Esc_text_Component>
        </S.Esc_Component>
      </S.Modal_Layout>
    </S.Modal_Overlay>
  );
};

export default Modal;
