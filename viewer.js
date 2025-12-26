document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEYS = { jazzy: 'videos_jazzy', minimal: 'videos_minimal' };
  const playlistDiv = document.getElementById('playlist');
  const playerDiv = document.getElementById('player');

  // 영상 재생 함수 (자동재생 정책상 mute 권장)
  function loadVideo(videoId) {
    playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }

  // 플레이리스트 출력
  function renderPlaylist(genre) {
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
    playlistDiv.innerHTML = '';
    
    videos.forEach((v) => {
      const btn = document.createElement('button');
      btn.textContent = v.title;
      btn.onclick = () => loadVideo(v.id);
      playlistDiv.appendChild(btn);
    });

    if (videos.length > 0) loadVideo(videos[0].id);
    else playerDiv.innerHTML = '<div class="placeholder">No videos registered</div>';
  }

  // 버튼 클릭 핸들러
  document.getElementById('btnJazzy').onclick = () => renderPlaylist('jazzy');
  document.getElementById('btnMinimal').onclick = () => renderPlaylist('minimal');

  // 관리자 이동 (비밀번호: JINWOO)
  document.getElementById('goAdmin').onclick = () => {
    const password = prompt("Admin Password를 입력하세요:");
    if (password === "JINWOO") {
      location.href = 'admin.html';
    } else if (password !== null) {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  renderPlaylist('jazzy');
});