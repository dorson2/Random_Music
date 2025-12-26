// 랜덤 배경 키워드 배열
const keywords = ["aesthetic", "pastel", "Pinterest", "trendy", "minimal"];

// 페이지 로드 시 랜덤 배경 적용
window.onload = () => {
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  const randomBgUrl = `https://source.unsplash.com/1600x900/?${randomKeyword}`;
  document.body.style.backgroundImage = `url('${randomBgUrl}')`;
};

// 감정별 음악 DB
const musicDB = {
  happy: [
    {title: "Happy Song 1", artist: "Artist A", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"},
    {title: "Happy Song 2", artist: "Artist B", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"}
  ],
  sad: [
    {title: "Sad Song 1", artist: "Artist C", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"},
    {title: "Sad Song 2", artist: "Artist D", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"}
  ],
  relaxed: [
    {title: "Relaxed Song 1", artist: "Artist E", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"},
    {title: "Relaxed Song 2", artist: "Artist F", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"}
  ]
};

// 감정 버튼 클릭 시 음악 추천
function recommendMusic(emotion) {
  const songs = musicDB[emotion];
  const randomSong = songs[Math.floor(Math.random() * songs.length)];

  // 배경 색상 변화
  document.body.style.backgroundColor = emotionColor(emotion);

  // 음악 출력
  document.getElementById("music").innerHTML = `
    <h2>${randomSong.title}</h2>
    <p>${randomSong.artist}</p>
    <audio controls src="${randomSong.url}"></audio>
  `;
}

// 감정별 배경 색상
function emotionColor(emotion) {
  switch(emotion) {
    case 'happy': return '#FFFACD';
    case 'sad': return '#ADD8E6';
    case 'relaxed': return '#98FB98';
    default: return '#FFFFFF';
  }
}
