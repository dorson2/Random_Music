document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEYS = { jazzy: 'videos_jazzy', minimal: 'videos_minimal' };

  const videoIdInput = document.getElementById('videoId');
  const videoTitleInput = document.getElementById('videoTitle');
  const videoGenreSelect = document.getElementById('videoGenre');
  const addVideoBtn = document.getElementById('addVideoBtn');
  const goViewerBtn = document.getElementById('goViewerBtn');
  const videoListDiv = document.getElementById('videoList');

  function getVideos(genre) {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
  }

  function saveVideos(genre, videos) {
    localStorage.setItem(STORAGE_KEYS[genre], JSON.stringify(videos));
  }

  function renderVideoList() {
    videoListDiv.innerHTML = '';
    Object.keys(STORAGE_KEYS).forEach((genre) => {
      const videos = getVideos(genre);
      videos.forEach((v, index) => {
        const btn = document.createElement('button');
        btn.textContent = `[${genre}] ${v.title}`;
        btn.addEventListener('click', () => {
          // 삭제
          videos.splice(index, 1);
          saveVideos(genre, videos);
          renderVideoList();
        });
        videoListDiv.appendChild(btn);
      });
    });
  }

  addVideoBtn.addEventListener('click', () => {
    const id = videoIdInput.value.trim();
    const title = videoTitleInput.value.trim();
    const genre = videoGenreSelect.value;

    if (!id || !title) {
      alert('Video ID와 Title을 모두 입력하세요.');
      return;
    }

    const videos = getVideos(genre);
    videos.push({ id, title });
    saveVideos(genre, videos);

    videoIdInput.value = '';
    videoTitleInput.value = '';
    renderVideoList();
  });

  goViewerBtn.addEventListener('click', () => {
    window.location.href = 'viewer.html';
  });

  renderVideoList();
});
