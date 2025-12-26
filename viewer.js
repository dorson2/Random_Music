document.addEventListener('DOMContentLoaded', () => {
  // 로컬 스토리지 키 설정
  const STORAGE_KEYS = { jazzy: 'videos_jazzy', minimal: 'videos_minimal' };
  const playlistDiv = document.getElementById('playlist');
  const playerDiv = document.getElementById('player');

  // 유튜브 영상 로드 함수 (보안 정책 준수)
  function loadVideo(videoId) {
    playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }

  // 플레이리스트를 화면에 그리는 함수
  function renderPlaylist(genre) {
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
    playlistDiv.innerHTML = '';
    
    videos.forEach((v) => {
      const btn = document.createElement('button');
      btn.textContent = v.title;
      btn.onclick = () => loadVideo(v.id);
      playlistDiv.appendChild(btn);
    });

    // 장르 변경 시 첫 번째 영상 자동 로드
    if (videos.length > 0) loadVideo(videos[0].id);
  }

  // 장르 선택 이벤트
  document.getElementById('btnJazzy').onclick = () => renderPlaylist('jazzy');
  document.getElementById('btnMinimal').onclick = () => renderPlaylist('minimal');

  // 관리자 페이지 이동 시 비밀번호 팝업 로직
  document.getElementById('goAdmin').onclick = () => {
    const password = prompt("Admin Password를 입력하세요:");
    
    if (password === "JINWOO") {
      location.href = 'admin.html';
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  // 초기 실행 시 Jazzy 장르 먼저 로드
  renderPlaylist('jazzy');
});