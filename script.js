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
const descriptionBox = document.getElementById('descriptionBox'); // 🔸 설명 영역 연결

// 🔸 언어별 설명 텍스트
const descriptions = {
  ko: "사상체질은 한국 전통 의학의 체질 분류입니다. 4가지 유형(태양인, 태음인, 소양인, 소음인)으로 사람의 성향과 건강 상태를 분류합니다.",
  pt: "Sasang é um sistema tradicional coreano que classifica as pessoas em quatro tipos com base na personalidade e saúde.",
  en: "Sasang is a traditional Korean classification that divides people into four types based on personality and health traits.",
  es: "Sasang es una clasificación tradicional coreana que divide a las personas en cuatro tipos según su personalidad y salud."
};

// 🔸 언어별 시작화면 타이틀
const titles = {
  ko: "📋 나의 사상체질 알아보기",
  pt: "📋 Descubra seu tipo de Sasang",
  en: "📋 Discover Your Sasang Type",
  es: "📋 Descubre tu tipo Sasang"
};

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
    // 질문 노드일 경우
    questionText.innerText = node.text[language];
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    startBtn.classList.add('hidden'); // ✅ 시작 버튼 숨기기
  } else if (node.type === 'result') {
    // 결과 노드일 경우
    resultTitle.innerText = node.result[language];
    resultDesc.innerText = node.description[language];

    const resultDetails = document.getElementById('resultDetails');

    // 🔸 details 필드가 존재하는지 확인 후 출력
    if (node.details && node.details[language]) {
      resultDetails.innerText = node.details[language];
      resultDetails.classList.remove('hidden');
    } else {
      resultDetails.innerText = '';
      resultDetails.classList.add('hidden');
    }

    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
  }
}


// 시작 버튼 클릭
startBtn.addEventListener('click', () => {
  language = langSelect.value;
  showQuestion('q1');
});

// 예 버튼 클릭
yesBtn.addEventListener('click', () => {
  if (currentNode && currentNode.yes) {
    showQuestion(currentNode.yes);
  }
});

// 아니오 버튼 클릭
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
  startBtn.classList.remove('hidden'); // ✅ 시작 버튼 다시 보이기
});

// 🔸 언어 선택 시 설명도 업데이트
langSelect.addEventListener('change', () => {
  descriptionBox.innerText = descriptions[langSelect.value];
  document.getElementById('startTitle').innerText = titles[langSelect.value];
  // 🔸 타이틀 변경
});

// 🔸 페이지 로딩 시 설명과 타이틀 표시
window.addEventListener("DOMContentLoaded", () => {
  descriptionBox.innerText = descriptions[langSelect.value];
  document.getElementById('startTitle').innerText = titles[langSelect.value];  // ✅ 올바른 ID로 수정
});

