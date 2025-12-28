document.addEventListener('DOMContentLoaded', () => {
  const FB_URL = "https://jinuuumix-default-rtdb.europe-west1.firebasedatabase.app/videos.json";
  const playlistDiv = document.getElementById('playlist');
  const playerDiv = document.getElementById('player');
  
  const btnJazzy = document.getElementById('btnJazzy');
  const btnMinimal = document.getElementById('btnMinimal');

  function loadVideo(videoId) {
    // 모바일 컨트롤바 최적화 파라미터 적용
    playerDiv.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1&showinfo=1&modestbranding=0" 
        allow="autoplay; encrypted-media" 
        allowfullscreen>
      </iframe>`;
  }

  // 상단 장르 버튼 하이라이트 함수
  function updateActiveGenre(genre) {
    btnJazzy.classList.remove('active');
    btnMinimal.classList.remove('active');
    if (genre === 'jazzy') btnJazzy.classList.add('active');
    else if (genre === 'minimal') btnMinimal.classList.add('active');
  }

  // 플레이리스트 내부 곡 버튼 하이라이트 함수
  function updateActivePlaylistItem(targetBtn) {
    const allBtns = playlistDiv.querySelectorAll('button');
    allBtns.forEach(btn => btn.classList.remove('active'));
    targetBtn.classList.add('active');
  }

  async function renderPlaylist(genre) {
    updateActiveGenre(genre);
    const response = await fetch(FB_URL);
    const allData = await response.json();
    playlistDiv.innerHTML = '';
    
    if (allData && allData[genre]) {
      const keys = Object.keys(allData[genre]);
      keys.forEach((key, index) => {
        const v = allData[genre][key];
        const btn = document.createElement('button');
        btn.textContent = v.title;
        
        btn.onclick = () => {
          loadVideo(v.id);
          updateActivePlaylistItem(btn); // 클릭 시 하이라이트
        };
        
        playlistDiv.appendChild(btn);

        // 첫 번째 곡 자동 재생 및 하이라이트 설정
        if (index === 0) {
          loadVideo(v.id);
          btn.classList.add('active');
        }
      });
    }
  }

  btnJazzy.onclick = () => renderPlaylist('jazzy');
  btnMinimal.onclick = () => renderPlaylist('minimal');

  document.getElementById('goAdmin').onclick = () => {
    if(prompt("Password:") === "JINWOO") location.href = 'admin.html';
  };

  renderPlaylist('jazzy');
});