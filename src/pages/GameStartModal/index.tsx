import * as S from "./style";

interface GameStartModalProps {
  onStartGame: () => void;
}

const GameStartModal = ({ onStartGame }: GameStartModalProps) => {
  return (
    <S.ModalOverlay>
      <S.Layout>
        <S.Title>게임설명</S.Title>
        <S.SubTitleContainer>
          <S.SubTitle>
            1. 같은 색의 영어 단어와 뜻을 입력<div> 하면 +10</div>
          </S.SubTitle>
          <S.SubTitle>2. 단어가 땅에 닿으면 생명 -1</S.SubTitle>
          <S.SubTitle>3. 생명이 모두 없어지면 게임 종료</S.SubTitle>
        </S.SubTitleContainer>
        <S.GameStartBtn onClick={onStartGame}>게임시작하기</S.GameStartBtn>{" "}
      </S.Layout>
    </S.ModalOverlay>
  );
};

export default GameStartModal;
