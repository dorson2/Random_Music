document.addEventListener('DOMContentLoaded', () => {
  const FB_URL = "https://jinuuumix-default-rtdb.europe-west1.firebasedatabase.app/videos.json";
  const playlistDiv = document.getElementById('playlist');
  const playerDiv = document.getElementById('player');
  
  const btnJazzy = document.getElementById('btnJazzy');
  const btnMinimal = document.getElementById('btnMinimal');

  function loadVideo(videoId) {
    // controls=1 (컨트롤바 표시), rel=0 (관련영상 제한), modestbranding=0 (로고 표시하여 공간 확보)
    playerDiv.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1&showinfo=1&modestbranding=0" 
        allow="autoplay; encrypted-media" 
        allowfullscreen>
      </iframe>`;
  }

  function updateActiveButton(genre) {
    btnJazzy.classList.remove('active');
    btnMinimal.classList.remove('active');

    if (genre === 'jazzy') {
      btnJazzy.classList.add('active');
    } else if (genre === 'minimal') {
      btnMinimal.classList.add('active');
    }
  }

  async function renderPlaylist(genre) {
    updateActiveButton(genre);
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
      
      const firstKey = Object.keys(allData[genre])[0];
      loadVideo(allData[genre][firstKey].id);
    }
  }

  btnJazzy.onclick = () => renderPlaylist('jazzy');
  btnMinimal.onclick = () => renderPlaylist('minimal');

  document.getElementById('goAdmin').onclick = () => {
    if(prompt("Password:") === "JINWOO") location.href = 'admin.html';
  };

  renderPlaylist('jazzy');
});