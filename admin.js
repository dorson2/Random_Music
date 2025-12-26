document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEYS = { jazzy: 'videos_jazzy', minimal: 'videos_minimal' };
  
  const videoIdInput = document.getElementById('videoId');
  const videoTitleInput = document.getElementById('videoTitle');
  const videoGenreSelect = document.getElementById('videoGenre');
  const videoListDiv = document.getElementById('videoList');
  const addVideoBtn = document.getElementById('addVideoBtn');
  const goViewerBtn = document.getElementById('goViewerBtn');

  // 영상 저장 함수
  function addVideo() {
    const id = videoIdInput.value.trim();
    const title = videoTitleInput.value.trim();
    const genre = videoGenreSelect.value;

    if (!id || !title) {
      alert("Video ID와 제목을 모두 입력하세요.");
      return;
    }

    const videos = JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
    videos.push({ id, title });
    localStorage.setItem(STORAGE_KEYS[genre], JSON.stringify(videos));

    renderAdminList();
    videoIdInput.value = '';
    videoTitleInput.value = '';
    alert("등록되었습니다!");
  }

  // 관리 리스트 출력
  function renderAdminList() {
    videoListDiv.innerHTML = '';
    ['jazzy', 'minimal'].forEach(genre => {
      const videos = JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
      videos.forEach((v, index) => {
        const btn = document.createElement('button');
        btn.textContent = `[${genre.toUpperCase()}] ${v.title} (삭제)`;
        btn.style.marginBottom = "5px";
        
        btn.onclick = () => {
          if(confirm("이 영상을 삭제하시겠습니까?")) {
            videos.splice(index, 1);
            localStorage.setItem(STORAGE_KEYS[genre], JSON.stringify(videos));
            renderAdminList();
          }
        };
        videoListDiv.appendChild(btn);
      });
    });
  }

  // 이벤트 리스너 연결
  addVideoBtn.addEventListener('click', addVideo);
  goViewerBtn.addEventListener('click', () => {
    location.href = 'viewer.html';
  });

  renderAdminList();
});