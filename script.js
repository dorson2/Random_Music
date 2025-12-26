let player;
let playlistVideos = [];
let currentIndex = 0;

// 플레이리스트 설정
const playlists = {
  'HOUSE': { id: 'PLwOTNSbCnP6tikjuYRoUWxWj9JTUelM0_', total: 20 },
  'TECHNO': { id: 'PLwOTNSbCnP6tNK02AIed3KYt7UGcCe4T_', total: 20 }
};

// 랜덤 배경
function updateBg() {
  const seed = Math.floor(Math.random() * 10000);
  const imageUrl = `https://picsum.photos/seed/${seed}/1920/1080`;
  const img = new Image();
  img.src = imageUrl;
  img.onload = () => { document.body.style.backgroundImage = `url('${imageUrl}')`; }
}

// YouTube IFrame API 로드 후 플레이어 생성
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    events: { 'onStateChange': onPlayerStateChange }
  });
}

// 영상 끝나면 다음 곡 재생
function onPlayerStateChange(event) {
  if(event.data === YT.PlayerState.ENDED) {
    currentIndex++;
    if(currentIndex < playlistVideos.length) {
      player.loadVideoById(playlistVideos[currentIndex]);
    }
  }
}

// 버튼 클릭 시 랜덤 10곡 재생
function startPlaylist(genre) {
  updateBg();
  const pl = playlists[genre];

  // 10곡 랜덤 선택
  playlistVideos = [];
  for(let i=0; i<10; i++){
    const rand = Math.floor(Math.random() * pl.total) + 1;
    playlistVideos.push(`${pl.id}&index=${rand}`);
  }

  currentIndex = 0;

  // player가 생성되었는지 확인
  if(player && typeof player.loadVideoById === 'function'){
    player.loadVideoById(playlistVideos[currentIndex]);
  } else {
    // player 아직 없으면 iframe 직접 생성 (fallback)
    document.getElementById('player').innerHTML = `
      <iframe src="https://www.youtube.com/embed/videoseries?list=${pl.id}&autoplay=1" 
