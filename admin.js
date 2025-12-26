document.addEventListener('DOMContentLoaded', () => {
  const FB_BASE_URL = "https://jinuuumix-default-rtdb.europe-west1.firebasedatabase.app/videos";

  const videoIdInput = document.getElementById('videoId');
  const videoTitleInput = document.getElementById('videoTitle');
  const videoGenreSelect = document.getElementById('videoGenre');
  const videoListDiv = document.getElementById('videoList');

  // 1. 영상 추가 함수
  async function addVideo() {
    const id = videoIdInput.value.trim();
    const title = videoTitleInput.value.trim();
    const genre = videoGenreSelect.value;
    if (!id || !title) return alert("내용을 입력하세요.");

    await fetch(`${FB_BASE_URL}/${genre}.json`, {
      method: 'POST',
      body: JSON.stringify({ id, title })
    });
    videoIdInput.value = ''; videoTitleInput.value = '';
    renderAdminList();
  }

  // 2. 영상 수정 함수 (Prompt 창 이용)
  async function editVideo(genre, key, currentTitle, currentId) {
    const newTitle = prompt("수정할 제목을 입력하세요:", currentTitle);
    const newId = prompt("수정할 유튜브 ID를 입력하세요:", currentId);

    if (newTitle && newId) {
      await fetch(`${FB_BASE_URL}/${genre}/${key}.json`, {
        method: 'PATCH', // 데이터 일부만 수정할 때 PATCH 사용
        body: JSON.stringify({ title: newTitle, id: newId })
      });
      alert("수정되었습니다.");
      renderAdminList();
    }
  }

  // 3. 관리 목록 렌더링
  async function renderAdminList() {
    const response = await fetch(`${FB_BASE_URL}.json`);
    const allData = await response.json();
    videoListDiv.innerHTML = '';

    if (allData) {
      ['jazzy', 'minimal'].forEach(genre => {
        if (allData[genre]) {
          Object.keys(allData[genre]).forEach(key => {
            const v = allData[genre][key];
            
            // 리스트 아이템 컨테이너 생성
            const item = document.createElement('div');
            item.className = 'admin-item';
            item.innerHTML = `
              <div class="info" onclick="window.editFunc('${genre}', '${key}', '${v.title}', '${v.id}')">
                <span class="genre-tag">${genre.toUpperCase()}</span>
                <span class="title">${v.title}</span>
              </div>
              <button class="del-btn" onclick="window.delFunc('${genre}', '${key}')">×</button>
            `;
            videoListDiv.appendChild(item);
          });
        }
      });
    }
  }

  // 전역 함수로 연결 (HTML 내 onclick에서 접근 가능하도록)
  window.editFunc = editVideo;
  window.delFunc = async (genre, key) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await fetch(`${FB_BASE_URL}/${genre}/${key}.json`, { method: 'DELETE' });
      renderAdminList();
    }
  };

  document.getElementById('addVideoBtn').onclick = addVideo;
  document.getElementById('goViewerBtn').onclick = () => location.href = 'viewer.html';
  renderAdminList();
});