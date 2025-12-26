document.addEventListener('DOMContentLoaded', async () => {
  const FB_URL = "https://jinuuumix-default-rtdb.europe-west1.firebasedatabase.app/videos.json";
  const playlistDiv = document.getElementById('playlist');
  const playerDiv = document.getElementById('player');

  function loadVideo(videoId) {
    playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }

  async function renderPlaylist(genre) {
    try {
      const response = await fetch(FB_URL);
      const allData = await response.json();
      playlistDiv.innerHTML = '';
      
      if (allData && allData[genre]) {
        const videos = allData[genre];
        Object.keys(videos).forEach(key => {
          const v = videos[key];
          const btn = document.createElement('button');
          btn.textContent = v.title;
          btn.onclick = () => loadVideo(v.id);
          playlistDiv.appendChild(btn);
        });
        const firstKey = Object.keys(videos)[0];
        loadVideo(videos[firstKey].id);
      } else {
        playlistDiv.innerHTML = '<div style="padding:20px; color:#555; text-align:center;">No videos found.</div>';
      }
    } catch (e) { console.error("Error loading videos:", e); }
  }

  document.getElementById('btnJazzy').onclick = () => renderPlaylist('jazzy');
  document.getElementById('btnMinimal').onclick = () => renderPlaylist('minimal');
  document.getElementById('goAdmin').onclick = () => {
    const pw = prompt("Admin Password:");
    if (pw === "JINWOO") location.href = 'admin.html';
  };

  renderPlaylist('jazzy');
});