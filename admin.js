const PASSWORD = 'jinwookim';

const loginDiv = document.getElementById('loginDiv');
const adminContent = document.getElementById('adminContent');
const loginBtn = document.getElementById('loginBtn');
const adminPass = document.getElementById('adminPass');

loginBtn.addEventListener('click', () => {
  if(adminPass.value === PASSWORD){
    loginDiv.style.display = 'none';
    adminContent.style.display = 'block';
    renderList();
  } else {
    alert('Incorrect password');
  }
});

const genreSelect = document.getElementById('genre');
const videoUrlInput = document.getElementById('videoUrl');
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
    div.textContent = v.title || v.id;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', () => {
      videos.splice(i,1);
      saveVideos(genre, videos);
      renderList();
    });

    div.appendChild(delBtn);
    videoListDiv.appendChild(div);
  });
}

addButton.addEventListener('click', () => {
  const url = videoUrlInput.value.trim();
  const videoId = extractVideoId(url);
  if (!videoId) return alert('올바른 YouTube URL을 입력하세요');

  const genre = genreSelect.value;
  const videos = getVideos(genre);
  videos.push({ id: videoId, title: '' }); // 제목은 ID로 표시
  saveVideos(genre, videos);
  renderList();
  videoUrlInput.value = '';
});

genreSelect.addEventListener('change', renderList);
