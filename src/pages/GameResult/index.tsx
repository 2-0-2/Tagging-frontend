import { useNavigate } from "react-router-dom";
import ESC from "../../assets/ESC";
import * as S from "./style";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameResult = ({ isOpen, onClose }: ModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate("/typing");
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  if (!isOpen) return null;
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.Layout>
        <S.Title>게임결과</S.Title>
        <S.GameScore>000점</S.GameScore>
        <S.Esc_Component>
          <ESC />
          <S.Esc_text_Component onClick={onClose}>
            <div>정말 잘했어요 :)</div>
            <div>ESC 키를 눌러 다시 시작해요!....</div>
          </S.Esc_text_Component>
        </S.Esc_Component>
      </S.Layout>
    </S.ModalOverlay>
  );
};

export default GameResult;
