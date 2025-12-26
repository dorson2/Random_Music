/**
 * 🔥 랜덤 배경 이미지 설정 함수
 * 버튼을 누를 때마다 호출되어 새로운 이미지를 가져옵니다.
 */
function setRandomBackground() {
  const seed = Math.floor(Math.random() * 100000);
  document.body.style.backgroundImage =
    `url('https://picsum.photos/seed/${seed}/1600/900')`;
}

// 1. 처음 페이지 접속 시 랜덤 배경 설정
window.onload = setRandomBackground;

/**
 * 🎵 유튜브 검색 & 재생 함수
 * @param {string} genre - 음악 장르 키워드
 */
function playMusic(genre) {
  // 버튼 클릭 시 배경도 함께 변경하여 시각적 즐거움 추가
  setRandomBackground();

  // 검색 정확도를 위해 'music' 키워드 추가
  const query = encodeURIComponent(genre + " music");

  const iframeHTML = `
    <iframe
      src="https://www.youtube.com/embed/videoseries?listType=search&list=${query}&autoplay=1"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;

  const playerDiv = document.getElementById("player");
  playerDiv.innerHTML = iframeHTML;
}