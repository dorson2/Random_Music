// 🔥 랜덤 배경 (GitHub Pages 안정)
window.onload = () => {
  const seed = Math.floor(Math.random() * 100000);
  document.body.style.backgroundImage =
    `url('https://picsum.photos/seed/${seed}/1600/900')`;
};

// 🎵 유튜브 검색 & 재생 (정식 embed 방식)
function playMusic(keyword) {
  const query = encodeURIComponent(keyword);

  const iframeHTML = `
    <iframe
      src="https://www.youtube.com/embed/videoseries?listType=search&list=${query}&autoplay=1"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;

  document.getElementById("player").innerHTML = iframeHTML;
}
