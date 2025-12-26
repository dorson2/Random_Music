// 배경 랜덤
function updateBg() {
  const seed = Math.floor(Math.random() * 10000);
  const url = `https://picsum.photos/seed/${seed}/1920/1080`;
  const img = new Image();
  img.src = url;
  img.onload = () => document.body.style.backgroundImage = `url('${url}')`;
}

// 플레이리스트 URL
const PLAYLISTS = {
  'HOUSE': 'PLwOTNSbCnP6tikjuYRoUWxWj9JTUelM0_',
  'TECHNO': 'PLwOTNSbCnP6tNK02AIed3KYt7UGcCe4T_'
};

// 버튼 클릭 이벤트
document.querySelectorAll('.buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const genre = btn.getAttribute('data-playlist');
    updateBg();

    const playerDiv = document.getElementById('player');
    playerDiv.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/videoseries?list=${PLAYLISTS[genre]}&autoplay=1&rel=0" 
        allow="autoplay; encrypted-media" 
        allowfullscreen>
      </iframe>
    `;
  });
});

// 초기 배경
window.onload = updateBg;
