// 랜덤 배경 키워드
const keywords = ["aesthetic", "pastel", "minimal", "texture", "trendy"];

window.onload = () => {
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  const randomSeed = Math.floor(Math.random() * 100000);

  const randomBgUrl =
    `https://source.unsplash.com/1600x900/?${randomKeyword}&sig=${randomSeed}`;

  document.body.style.backgroundImage = `url('${randomBgUrl}')`;
};
