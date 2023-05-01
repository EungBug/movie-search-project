# 영화 검색 사이트

<p align="center">
  <img src='public/logo.png' alt="LOGO">
</p>

<p align="center">
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FEungBug%2Fmovie-search-project&count_bg=%236A60AF&title_bg=%231C1A29&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a>
</p>

<br>

## 프로젝트 설명

OMDB API를 연동하여 영화 검색 사이트를 구현했습니다.

<!-- TODO : 메뉴 설명 추가 -->

### 🏠 Home

`영화 제목`을 `키워드`로 검색하면, 키워드에 해당하는 영화를 목록으로 노출합니다.

검색 시 총 검색 결과 건수와 함께 목록에는 `영화 포스터`와 `개봉 연도`, `영화 제목`의 정보를 포함하고 있으며, 자세히보기 클릭 시 `상세 화면`으로 이동합니다.

검색 결과가 없는 경우 `검색 결과 없음 UI`를 노출합니다.

검색 결과 오류 또는 네트워크 오류 발생 시 `에러 팝업`이 노출되고, 확인 버튼을 클릭하면 Home 화면으로 돌아갑니다.

#### 🎞️ 영화 상세화면

영화 ID 값으로 영화 상세 조회 API를 호출하여 상세 정보를 화면에 노출합니다.  
영화 상세 정보를 불러올 때 스켈레톤 UI를 적용하여 로딩 UI를 구현했습니다.

### ⭐️ My Movies

영화 상세 정보 화면의 우측 상단 별모양 버튼을 클릭 시 My Movies에 저장되고, My Movies 메뉴에서는 사용자가 저장한 영화 목록을 노출합니다.
⭐️ 버튼 `토글` 시 영화를 `저장`하거나, `삭제`하는 기능을 하며 저장은 `Local Storage`에 저장합니다.

### 👩🏻‍💻 About

영화 검색 사이트 만든이에 대한 정보를 노출하는 페이지입니다.

<br>

## 요구사항 Check

### 필수 요구사항

- [x] 영화 제목으로 검색이 가능해야 합니다!
- [x] 검색된 결과의 영화 목록이 출력돼야 합니다!
- [x] 단일 영화의 상세정보(제목, 개봉연도, 평점, 장르, 감독, 배우, 줄거리, 포스터 등)를 볼 수 있어야 합니다!
- [ ] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### 선택 요구사항

- [x] 한 번의 검색으로 영화 목록이 20개 이상 검색되도록 만들어보세요.
- [x] 영화 개봉연도로 검색할 수 있도록 만들어보세요.
- [x] 영화 목록을 검색하는 동안 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 무한 스크롤 기능을 추가해서 추가 영화 목록을 볼 수 있도록 만들어보세요.
- [x] 영화 포스터가 없을 경우 대체 이미지를 출력하도록 만들어보세요.
- [x] 영화 상세정보가 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 영화 상세정보 포스터를 고해상도로 출력해보세요. (실시간 이미지 리사이징)
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [x] 영화와 관련된 기타 기능도 고려해보세요.

<br>

## 기술 스택

### Environment

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

### Config

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### Development

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

## 어려웠던 점 & 아쉬웠던 점

1. useState를 통해 데이터와 상태 값을 관리하도록 구현했는데, useState(setState)가 비동기로 동작하는 부분때문에
   동기적으로 동작해야 할 부분들이 정상적으로 동작하지 않아 동기적으로 처리 하는 부분이 어려웠습니다.
2. Component별로 별도의 CSS 파일을 작성하고 스타일을 적용하는데 스타일과 클래스를 관리하는데 어려움을 느꼈으며,
   공통으로 사용할 수 있는 CSS를 Common CSS 파일로 관리하지 못한 점이 아쉬웠습니다.

## 재밌었던 점

1. 막무가내로 리액트를 배우자마자 과제에서 리액트를 활용했는데, 어려웠던 점도 많지만 Component를 만들고
   API에서 받은 데이터를 각각의 Component와 연결하여 화면에 노출시키며 완성해나가는 재미가 있었습니다.
2. 사용자 입장에서 예외처리 관련 UI를 추가하면서 원하는 동작이 결과로 나왔을 때 재밌었습니다.
