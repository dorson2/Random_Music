document.addEventListener('DOMContentLoaded', () => {
  const FB_BASE_URL = "https://jinuuumix-default-rtdb.europe-west1.firebasedatabase.app/videos";
  const modal = document.getElementById('editModal');
  let currentEditData = null;

  async function renderAdminList() {
    const response = await fetch(`${FB_BASE_URL}.json`);
    const allData = await response.json();
    const listDiv = document.getElementById('videoList');
    listDiv.innerHTML = '';
    if (!allData) return;

    ['jazzy', 'minimal'].forEach(genre => {
      if (allData[genre]) {
        Object.keys(allData[genre]).forEach(key => {
          const v = allData[genre][key];
          const item = document.createElement('div');
          item.className = 'admin-item';
          item.innerHTML = `
            <div class="info" onclick="window.openEdit('${genre}', '${key}', '${v.title}', '${v.id}')">
              <span class="genre-tag">[${genre.toUpperCase()}]</span> ${v.title}
            </div>
            <button class="del-btn" onclick="window.delVideo('${genre}', '${key}')">×</button>
          `;
          listDiv.appendChild(item);
        });
      }
    });
  }

  window.openEdit = (genre, key, title, id) => {
    currentEditData = { genre, key };
    document.getElementById('editTitle').value = title;
    document.getElementById('editId').value = id;
    modal.style.display = 'flex';
  };

  document.getElementById('saveBtn').onclick = async () => {
    const { genre, key } = currentEditData;
    await fetch(`${FB_BASE_URL}/${genre}/${key}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ title: document.getElementById('editTitle').value, id: document.getElementById('editId').value })
    });
    modal.style.display = 'none';
    renderAdminList();
  };

  document.getElementById('cancelBtn').onclick = () => modal.style.display = 'none';

  window.delVideo = async (genre, key) => {
    if (confirm("Delete?")) {
      await fetch(`${FB_BASE_URL}/${genre}/${key}.json`, { method: 'DELETE' });
      renderAdminList();
    }
  };

  document.getElementById('addVideoBtn').onclick = async () => {
    const title = document.getElementById('videoTitle').value;
    const id = document.getElementById('videoId').value;
    const genre = document.getElementById('videoGenre').value;
    await fetch(`${FB_BASE_URL}/${genre}.json`, { method: 'POST', body: JSON.stringify({ title, id }) });
    renderAdminList();
  };

  document.getElementById('goViewerBtn').onclick = () => {
    location.href = 'viewer.html';
};

  renderAdminList();
});