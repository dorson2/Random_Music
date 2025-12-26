const STORAGE_KEYS = {
  minimal: 'videos_minimal',
  jazzy: 'videos_jazzy'
};

const genreSelect = document.getElementById('genre');
const playlistDiv = document.getElementById('playlist');
const playerDiv = document.getElementById('player');

function getVideos(genre) {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
}

function loadVideo(videoId) {
  playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

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

genreSelect.addEventListener('change', renderPlaylist);
renderPlaylist();
