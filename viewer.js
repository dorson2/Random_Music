document.addEventListener('DOMContentLoaded', async () => {
  // 형님의 Firebase 데이터베이스 주소
  const FB_URL = "https://jinuuumix-default-rtdb.europe-west1.firebasedatabase.app/videos.json";
  
  const playlistDiv = document.getElementById('playlist');
  const playerDiv = document.getElementById('player');

  // 유튜브 영상 재생 함수
  function loadVideo(videoId) {
    playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }

  // Firebase에서 실시간으로 데이터 로드
  async function renderPlaylist(genre) {
    try {
      const response = await fetch(FB_URL);
      const allData = await response.json();
      
      playlistDiv.innerHTML = '';
      
      if (allData && allData[genre]) {
        const videos = allData[genre];
        const videoKeys = Object.keys(videos);
        
        videoKeys.forEach(key => {
          const v = videos[key];
          const btn = document.createElement('button');
          btn.textContent = v.title;
          btn.onclick = () => loadVideo(v.id);
          playlistDiv.appendChild(btn);
        });

        // 장르 선택 시 첫 번째 영상 자동 재생
        if (videoKeys.length > 0) {
          loadVideo(videos[videoKeys[0]].id);
        }
      } else {
        playlistDiv.innerHTML = '<div style="padding:20px; color:#555;">No videos in this genre yet.</div>';
        playerDiv.innerHTML = '<div class="placeholder">Select a mix to play</div>';
      }
    } catch (error) {
      console.error("데이터 로드 중 오류 발생:", error);
    }
  }

  // 버튼 이벤트 연결
  document.getElementById('btnJazzy').onclick = () => renderPlaylist('jazzy');
  document.getElementById('btnMinimal').onclick = () => renderPlaylist('minimal');

  // 관리자 비번 접속 로직
  document.getElementById('goAdmin').onclick = () => {
    const password = prompt("Admin Password를 입력하세요:");
    if (password === "JINWOO") {
      location.href = 'admin.html';
    } else if (password !== null) {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  // 초기 로드: Jazzy 장르 실행
  renderPlaylist('jazzy');
});