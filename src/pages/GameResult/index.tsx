import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ESC from "../../assets/ESC";
import * as S from "./style";

interface GameResultProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
}

const GameResult = ({ isOpen, onClose, score }: GameResultProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restartGame(); // ESC 키를 누를 때 게임 다시 시작
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const restartGame = () => {
    onClose(); // 모달 닫기
    navigate("/"); // 게임 다시 시작 페이지로 이동
  };

  if (!isOpen) return null;
  return (
    <S.ModalOverlay>
      <S.Layout>
        <S.Title>게임 결과</S.Title>
        <S.GameScore>{score}점</S.GameScore>
        <S.Esc_Component>
          <ESC onClick={restartGame} />
          <S.Esc_text_Component onClick={restartGame}>
            <div>정말 잘했어요 :)</div>
            <div>ESC 키를 눌러 다시 시작해요!....</div>
          </S.Esc_text_Component>
        </S.Esc_Component>
      </S.Layout>
    </S.ModalOverlay>
  );
};

export default GameResult;
