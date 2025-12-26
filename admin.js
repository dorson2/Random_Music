document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEYS = { jazzy: 'videos_jazzy', minimal: 'videos_minimal' };
  const videoIdInput = document.getElementById('videoId');
  const videoTitleInput = document.getElementById('videoTitle');
  const videoGenreSelect = document.getElementById('videoGenre');
  const videoListDiv = document.getElementById('videoList');

  // 영상 저장 함수
  window.addVideo = function() {
    const id = videoIdInput.value.trim();
    const title = videoTitleInput.value.trim();
    const genre = videoGenreSelect.value;

    if (!id || !title) return alert("내용을 모두 입력하세요.");

    const videos = JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
    videos.push({ id, title });
    localStorage.setItem(STORAGE_KEYS[genre], JSON.stringify(videos));

    renderAdminList();
    videoIdInput.value = '';
    videoTitleInput.value = '';
  };

  // 관리 리스트 출력 (클릭 시 삭제)
  function renderAdminList() {
    videoListDiv.innerHTML = '';
    ['jazzy', 'minimal'].forEach(genre => {
      const videos = JSON.parse(localStorage.getItem(STORAGE_KEYS[genre]) || '[]');
      videos.forEach((v, index) => {
        const btn = document.createElement('button');
        btn.textContent = `[${genre}] ${v.title} (삭제)`;
        btn.onclick = () => {
          videos.splice(index, 1);
          localStorage.setItem(STORAGE_KEYS[genre], JSON.stringify(videos));
          renderAdminList();
        };
        videoListDiv.appendChild(btn);
      });
    });
  }

  renderAdminList();
});