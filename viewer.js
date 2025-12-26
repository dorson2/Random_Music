const STORAGE_KEYS = {
  minimal: 'videos_minimal',
  jazzy: 'videos_jazzy'
};

const genreSelect = document.getElementById('genre');
const playlistDiv = document.getElementById('playlist');
const playerDiv = document.getElementById('player');

// 영상 가져오기
function getVideos(genre) {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
}

// 영상 재생
function loadVideo(videoId) {
  playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

// 플레이리스트 렌더
function renderPlaylist() {
  const genre = genreSelect.value;
  const videos = getVideos(genre);
  playlistDiv.innerHTML = '';

  videos.forEach((v, i) => {
    const btn = document.createElement('button');
    btn.textContent = v.title || `Video ${i + 1}`;
    btn.addEventListener('click', () => loadVideo(v.id));
    playlistDiv.appendChild(btn);
  });

  if (videos[0]) loadVideo(videos[0].id);
}

// 장르 변경 시 갱신
genreSelect.addEventListener('change', renderPlaylist);
renderPlaylist();

// Viewer → Admin 이동 (비밀번호 팝업)
const goAdminBtn = document.getElementById('goAdmin');
goAdminBtn.addEventListener('click', () => {
  const password = prompt("관리자 비밀번호를 입력하세요:");
  if(password === "JINWOO") {
    window.location.href = 'admin.html';
  } else if(password !== null) {
    alert("비밀번호가 올바르지 않습니다!");
  }
});
