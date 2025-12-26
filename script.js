const playerDiv = document.getElementById('player');
const playlistDiv = document.getElementById('playlist');
const loadButton = document.getElementById('loadTechno');

// Minimal Techno 영상 리스트 (index 1~8)
const technoVideos = [
  'DMX1XCH3MsY', 'xExample2', 'xExample3', 'xExample4',
  'xExample5', 'xExample6', 'xExample7', 'xExample8'
];

const playlistId = 'PLwOTNSbCnP6tNK02AIed3KYt7UGcCe4T_';

// 영상 iframe 생성
function loadVideo(videoId) {
  playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

// 버튼 클릭 시 플레이리스트 생성
loadButton.addEventListener('click', () => {
  playlistDiv.innerHTML = ''; // 초기화

  technoVideos.forEach((videoId, idx) => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    item.textContent = `Video ${idx + 1}`;
    item.addEventListener('click', () => loadVideo(videoId));
    playlistDiv.appendChild(item);
  });

  // 첫 영상 자동 재생
  loadVideo(technoVideos[0]);
});
