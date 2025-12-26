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

function recommendMusic(emotion) {
  const songs = musicDB[emotion];
  const randomSong = songs[Math.floor(Math.random() * songs.length)];

  document.body.style.backgroundColor = emotionColor(emotion);

  document.getElementById("music").innerHTML = `
    <h2>${randomSong.title}</h2>
    <p>${randomSong.artist}</p>
    <audio controls src="${randomSong.url}"></audio>
  `;
}

function emotionColor(emotion) {
  switch(emotion) {
    case 'happy': return '#FFFACD';
    case 'sad': return '#ADD8E6';
    case 'relaxed': return '#98FB98';
    default: return '#FFFFFF';
  }
}
