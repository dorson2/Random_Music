document.addEventListener('DOMContentLoaded', () => {
  const FB_URL = "https://jinuuumix-default-rtdb.europe-west1.firebasedatabase.app/videos.json";
  const playlistDiv = document.getElementById('playlist');
  const playerDiv = document.getElementById('player');

  function loadVideo(videoId) {
    // mute를 제거하여 클릭 시 바로 소리 나게 설정
    playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }

  async function renderPlaylist(genre) {
    const response = await fetch(FB_URL);
    const allData = await response.json();
    playlistDiv.innerHTML = '';
    
    if (allData && allData[genre]) {
      Object.keys(allData[genre]).forEach(key => {
        const v = allData[genre][key];
        const btn = document.createElement('button');
        btn.textContent = v.title;
        btn.onclick = () => loadVideo(v.id);
        playlistDiv.appendChild(btn);
      });
      // 첫 번째 영상 로드 (브라우저 정책상 정지 상태로 시작될 수 있음)
      const firstKey = Object.keys(allData[genre])[0];
      loadVideo(allData[genre][firstKey].id);
    }
  }

  document.getElementById('btnJazzy').onclick = () => renderPlaylist('jazzy');
  document.getElementById('btnMinimal').onclick = () => renderPlaylist('minimal');
  document.getElementById('goAdmin').onclick = () => {
    if(prompt("Password:") === "JINWOO") location.href = 'admin.html';
  };

  renderPlaylist('jazzy');
});