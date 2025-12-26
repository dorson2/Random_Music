document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEYS = { jazzy: 'videos_jazzy', minimal: 'videos_minimal' };
  const btnJazzy = document.getElementById('btnJazzy');
  const btnMinimal = document.getElementById('btnMinimal');
  const playlistDiv = document.getElementById('playlist');
  const playerDiv = document.getElementById('player');
  const goAdminBtn = document.getElementById('goAdmin');

  let currentGenre = 'jazzy';

  function getVideos(genre) {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
  }

  function loadVideo(videoId) {
    playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }

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

  btnJazzy.addEventListener('click', () => renderPlaylist('jazzy'));
  btnMinimal.addEventListener('click', () => renderPlaylist('minimal'));
  renderPlaylist(currentGenre);

  goAdminBtn.addEventListener('click', () => {
    window.location.href = 'admin.html';
  });
});
