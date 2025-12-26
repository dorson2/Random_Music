const STORAGE_KEYS = {
  jazzy: 'videos_jazzy',
  minimal: 'videos_minimal'
};

const btnJazzy = document.getElementById('btnJazzy');
const btnMinimal = document.getElementById('btnMinimal');
const playlistDiv = document.getElementById('playlist');
const playerDiv = document.getElementById('player');
const goAdminBtn = document.getElementById('goAdmin');

let currentGenre = 'jazzy';

// 로컬스토리지에서 영상 가져오기
function getVideos(genre) {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
}

// 영상 재생
function loadVideo(videoId) {
  playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

// 재생 리스트 렌더
function renderPlaylist(genre) {
  currentGenre = genre;
  const videos = getVideos(genre);
  playlistDiv.innerHTML = '';

  videos.forEach((v) => {
    const btn = document.createElement('button');
    btn.textContent = v.title || 'Untitled';
    btn.addEventListener('click', () => loadVideo(v.id));
    playlistDiv.appendChild(btn);
  });

  if (videos[0]) loadVideo(videos[0].id);
}

// 장르 버튼 이벤트
btnJazzy.addEventListener('click', () => renderPlaylist('jazzy'));
btnMinimal.addEventListener('click', () => renderPlaylist('minimal'));

// 초기 로드
renderPlaylist(currentGenre);

// Admin 페이지 이동
goAdminBtn.addEventListener('click', () => {
  window.location.href = 'admin.html';
});
