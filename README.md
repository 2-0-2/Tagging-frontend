# Tagging (타깅이) 🌱 - 프로젝트 설명
## 🗓️ 개발기간 
- **2024/06/30 ~ 2024/07/03 (4일간)**
<br />

## 👧🏻 팀 구성

### Frontend
- 김시연(+ 기획)
- 강민지(+ 디자인)
- 기술스택 : react, typescript, axios

### Backend
- 안예성
- 기술스택 : python
<br />
<br />

## ❓ 작품을 제작한 이유
- 타자연습을 즐기는 편이었지만, 기존의 타자연습 서비스들은 UI가 복잡하고 사용하기 어려웠습니다. 또한, 이해하기 어려운 기능들이 많아서 불편함을 느끼게 되었습니다. 이러한 경험을 바탕으로 우리만의 독창적이고, 사용자가 진심으로 즐기며 타자를 연습할 수 있는 서비스를 개발하고자 결심하게 되었습니다.

<br />
<br />

## 💬 기능설명
### 1. 시작 페이지
<img width="912" alt="스크린샷 2024-07-14 오후 10 45 57" src="https://github.com/user-attachments/assets/f319cefe-9992-4a14-9bd5-b5052f338e54" /> <br />
- `타자치러가기` 버튼을 누르면 타자연습 페이지로 이동합니다.
- `타자게임하기` 버튼을 누르면 게임 설명 모달로 이동합니다.

<br />

### 2. 타자연습 페이지
![Frame 19](https://github.com/2-0-2/Tagging-frontend/assets/128461588/f7fb24df-8382-4e54-9a43-fa19060124a4)
- 정확도/최고타수/현재타수/다음문장을 확인할 수 있고, 영문전환을 할 수 있습니다. 
- 문장을 불러오기(랜덤으로 문장들을 불러오게 했습니다.)
- 엔터를 누르면 다음 문장이 불러옵니다.
- 5문장을 치면 결과 모달창이 뜹니다.
<br />

### 3. 결과 모달창
![Frame 17](https://github.com/2-0-2/Tagging-frontend/assets/128461588/eb148ec8-6519-4e1d-9c7a-c2210c8cacf0)
- 평균타수/최고타수/정확도 결과 보여줍니다.
- `esc`키를 누르면 시작 페이지로 이동합니다.
<br />

### 4. 게임 설명 모달
<img width="912" alt="스크린샷 2024-07-14 오후 10 41 03" src="https://github.com/user-attachments/assets/89bcee7b-d53c-4dc1-aa50-1b98328181f1">
<br />

- 게임에 대한 설명이 있습니다.
- `게임시작하기` 버튼을 누르면 모달이 사라지고 게임이 시작됩니다.
<br />

### 5. 게임 페이지
<img width="913" alt="스크린샷 2024-07-14 오후 10 42 52" src="https://github.com/user-attachments/assets/1e3e7c1d-e2b3-4a6a-a610-d668be5b1665"> <br />

- 같은 색의 영어 단어와 뜻 중 하나를 입력하면 10점이 추가됩니다.
- 단어가 땅에 닿게되면 생명이 하나씩 줄어들게 됩니다.
- 생명이 모두 없어지면 게임이 종료되고 게임 결과 페이지로 이동합니다.

<br />

### 6. 게임 결과
<img width="915" alt="스크린샷 2024-07-14 오후 10 44 55" src="https://github.com/user-attachments/assets/c5c4dc57-0264-4131-b4f2-834b959ad951"> <br />
- 자신의 게임 점수를 알 수 있습니다.
- `esc`키를 누르면 시작 페이지로 이동합니다

<br />
<br />

## 아쉬웠던 점
- 제한된 시간에 급하게 개발을 하다 보니 기능 개발에 한계가 있어 다른 서비스들과의 차별점을 크게 두지 못한 점이 아쉽습니다. 추후 타깅이만의 기능들을 추가해, 다른 서비스들과의 차별점을 명확히 하고 사용자에게 재미와 흥미를 줄 수 있는 서비스로 발전시킬 예정입니다.
- 코드의 효율성을 고려하지 않고 개발한 것이 아쉬움으로 남습니다. 추후 리팩토링을 통해 코드의 효율성을 높이기 위해 노력할 것입니다.
<br />
<br />

## 향후 계획
- 로그인 및 회원가입 기능을 추가하여 사용자의 행동 패턴을 분석하고, 이를 통해 사용자의 선호도를 파악하여 그에 맞춘 기능들을 더욱 개발할 예정입니다.
- 타자 게임 기능을 추가하여 타깅이 서비스에 대한 사용자의 재미와 흥미를 높일 예정입니다.
- 다른 서비스들과 차별화를 두기 위해 독창적인 타자 게임을 기획할 예정입니다.
- 타자연습을 할 수 있는 문장의 개수를 사용자가 선택할 수 있게 할 예정입니다.
- Redux에 대해 더 공부하여 이를 도입할 예정입니다.
- 코드의 효율성을 높이기 위해 리팩토링 기간을 가질 예정입니다.
