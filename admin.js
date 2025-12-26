document.addEventListener('DOMContentLoaded', () => {
  // 형님의 Firebase 주소 기초 URL
  const FB_BASE_URL = "https://jinuuumix-default-rtdb.europe-west1.firebasedatabase.app/videos";

  const videoIdInput = document.getElementById('videoId');
  const videoTitleInput = document.getElementById('videoTitle');
  const videoGenreSelect = document.getElementById('videoGenre');
  const videoListDiv = document.getElementById('videoList');
  const addVideoBtn = document.getElementById('addVideoBtn');
  const goViewerBtn = document.getElementById('goViewerBtn');

  // 영상 추가 함수 (온라인 서버 POST)
  async function addVideo() {
    const id = videoIdInput.value.trim();
    const title = videoTitleInput.value.trim();
    const genre = videoGenreSelect.value;

    if (!id || !title) {
      alert("내용을 입력하세요.");
      return;
    }

    try {
      await fetch(`${FB_BASE_URL}/${genre}.json`, {
        method: 'POST',
        body: JSON.stringify({ id, title })
      });
      alert("온라인 저장 성공!");
      videoIdInput.value = '';
      videoTitleInput.value = '';
      renderAdminList();
    } catch (e) {
      alert("저장 실패!");
    }
  }

  // 관리 목록 불러오기 및 삭제 기능
  async function renderAdminList() {
    try {
      const response = await fetch(`${FB_BASE_URL}.json`);
      const allData = await response.json();
      videoListDiv.innerHTML = '';

      if (allData) {
        ['jazzy', 'minimal'].forEach(genre => {
          if (allData[genre]) {
            Object.keys(allData[genre]).forEach(key => {
              const v = allData[genre][key];
              const btn = document.createElement('button');
              btn.textContent = `[${genre.toUpperCase()}] ${v.title} (삭제)`;
              btn.style.width = "100%";
              btn.style.textAlign = "left";
              btn.style.margin = "5px 0";
              
              btn.onclick = async () => {
                if (confirm("서버에서 이 영상을 영구 삭제하시겠습니까?")) {
                  await fetch(`${FB_BASE_URL}/${genre}/${key}.json`, { method: 'DELETE' });
                  renderAdminList();
                }
              };
              videoListDiv.appendChild(btn);
            });
          }
        });
      }
    } catch (e) {
      console.error("로드 오류:", e);
    }
  }

  addVideoBtn.onclick = addVideo;
  goViewerBtn.onclick = () => location.href = 'viewer.html';
  renderAdminList();
});