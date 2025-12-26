const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // 여기에 본인 API 키
const playlistId = 'PLwOTNSbCnP6tNK02AIed3KYt7UGcCe4T_'; // Minimal Techno

const playerDiv = document.getElementById('player');
const playlistDiv = document.getElementById('playlist');
const loadButton = document.getElementById('loadTechno');

// iframe으로 영상 재생
function loadVideo(videoId) {
  playerDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

// 플레이리스트 영상 가져오기
async function fetchPlaylistVideos() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
  );
  const data = await res.json();

  return data.items.map(item => ({
    videoId: item.snippet.resourceId.videoId,
    title: item.snippet.title
  }));
}

// 버튼 클릭 시 리스트 생성
loadButton.addEventListener('click', async () => {
  playlistDiv.innerHTML = 'Loading...';
  const videos = await fetchPlaylistVideos();

  playlistDiv.innerHTML = ''; // 초기화

  videos.forEach(video => {
    const btn = document.createElement('button');
    btn.textContent = video.title;
    btn.addEventListener('click', () => loadVideo(video.videoId));
    playlistDiv.appendChild(btn);
  });

  // 첫 영상 자동 재생
  if (videos[0]) loadVideo(videos[0].videoId);
});
