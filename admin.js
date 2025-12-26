const genreSelect = document.getElementById('genre');
const videoUrlInput = document.getElementById('videoUrl');
const videoTitleInput = document.getElementById('videoTitle');
const addButton = document.getElementById('addVideo');
const videoListDiv = document.getElementById('videoList');

const STORAGE_KEYS = {
  minimal: 'videos_minimal',
  jazzy: 'videos_jazzy'
};

function getVideos(genre) {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
}

function saveVideos(genre, videos) {
  localStorage.setItem(STORAGE_KEYS[genre], JSON.stringify(videos));
}

function extractVideoId(url) {
  const match = url.match(/v=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function renderList() {
  const genre = genreSelect.value;
  const videos = getVideos(genre);
  videoListDiv.innerHTML = '';

  videos.forEach((v, i) => {
    const div = document.createElement('div');
    div.textContent = v.title || `Video ${i+1}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.style.marginTop = '5px';
    delBtn.addEventListener('click', () => {
      videos.splice(i,1);
      saveVideos(genre, videos);
      renderList();
    });

    div.appendChild(delBtn);
    videoListDiv.appendChild(div);
  });
}

// 영상 등록
addButton.addEventListener('click', () => {
  const url = videoUrlInput.value.trim();
  const title = videoTitleInput.value.trim() || "Untitled";
  const videoId = extractVideoId(url);
  if (!videoId) return alert('올바른 YouTube URL을 입력하세요');

  const genre = genreSelect.value;
  const videos = getVideos(genre);
  videos.push({ id: videoId, title: title });
  saveVideos(genre, videos);
  renderList();
  videoUrlInput.value = '';
  videoTitleInput.value = '';
});

// 장르 변경
genreSelect.addEventListener('change', renderList);
renderList();

// Viewer Page 이동
const goViewerBtn = document.getElementById('goViewer');
goViewerBtn.addEventListener('click', () => {
  window.location.href = 'viewer.html';
});
