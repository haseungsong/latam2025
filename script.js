let currentNode = null;
let language = 'ko';
let data = [];

// 요소 연결
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const langSelect = document.getElementById('lang');
const questionScreen = document.getElementById('questionScreen');
const startScreen = document.getElementById('startScreen');
const resultScreen = document.getElementById('resultScreen');
const questionText = document.getElementById('questionText');
const resultTitle = document.getElementById('resultTitle');
const resultDesc = document.getElementById('resultDesc');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// JSON 로드
fetch('sasang_questions_multilang.json')
  .then(res => res.json())
  .then(json => {
    data = json;
  });

function showQuestion(nodeId) {
  const node = data.find(item => item.id === nodeId);
  currentNode = node;

  if (!node) return;

  if (node.type === 'question') {
    questionText.innerText = node.text[language];
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
  } else if (node.type === 'result') {
    resultTitle.innerText = node.result[language];
    resultDesc.innerText = node.description[language];
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
  }
}

// 시작 버튼
startBtn.addEventListener('click', () => {
  language = langSelect.value;
  showQuestion('q1');
});

// 예 버튼
yesBtn.addEventListener('click', () => {
  if (currentNode && currentNode.yes) {
    showQuestion(currentNode.yes);
  }
});

// 아니오 버튼
noBtn.addEventListener('click', () => {
  if (currentNode && currentNode.no) {
    showQuestion(currentNode.no);
  }
});

// 다시 시작
restartBtn.addEventListener('click', () => {
  startScreen.classList.remove('hidden');
  resultScreen.classList.add('hidden');
  questionScreen.classList.add('hidden');
});
