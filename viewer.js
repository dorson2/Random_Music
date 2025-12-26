document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEYS = { jazzy: 'videos_jazzy', minimal: 'videos_minimal' };
  const playlistDiv = document.getElementById('playlist');
  const playerDiv = document.getElementById('player');

  function loadVideo(videoId) {
    // autoplay 차단 방지를 위해 mute=1 권장
    playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }

  function renderPlaylist(genre) {
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
    playlistDiv.innerHTML = '';
    videos.forEach((v) => {
      const btn = document.createElement('button');
      btn.textContent = v.title;
      btn.onclick = () => loadVideo(v.id);
      playlistDiv.appendChild(btn);
    });
    if (videos[0]) loadVideo(videos[0].id);
  }

  document.getElementById('btnJazzy').onclick = () => renderPlaylist('jazzy');
  document.getElementById('btnMinimal').onclick = () => renderPlaylist('minimal');
  document.getElementById('goAdmin').onclick = () => location.href = 'admin.html';

  renderPlaylist('jazzy');
});