document.addEventListener("DOMContentLoaded", () => {
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
  const descriptionBox = document.getElementById('descriptionBox');
  const sendResultBtn = document.getElementById('sendResultBtn');
  const sendModal = document.getElementById('sendModal');
  const cancelSendBtn = document.getElementById('cancelSendBtn');
  const submitSendBtn = document.getElementById('submitSendBtn');
  const inputAffiliation = document.getElementById('inputAffiliation');
  const inputName = document.getElementById('inputName');
  const resultDetails = document.getElementById('resultDetails');

  // 🔸 언어별 설명 텍스트
  const descriptions = {
    ko: "사상체질은 한국 전통 의학의 체질 분류입니다. 4가지 유형(태양인, 태음인, 소양인, 소음인)으로 사람의 성향과 건강 상태를 분류합니다.",
    pt: "Sasang é um sistema tradicional coreano que classifica as pessoas em quatro tipos com base na personalidade e saúde.",
    en: "Sasang is a traditional Korean classification that divides people into four types based on personality and health traits.",
    es: "Sasang es una clasificación tradicional coreana que divide a las personas en cuatro tipos según su personalidad y salud."
  };

  // 🔸 언어별 타이틀
  const titles = {
    ko: "📋 나의 사상체질 알아보기",
    pt: "📋 Descubra seu tipo de Sasang",
    en: "📋 Discover Your Sasang Type",
    es: "📋 Descubre tu tipo Sasang"
  };

  // 🔹 JSON 데이터 로드
  fetch('sasang_questions_multilang.json')
    .then(res => res.json())
    .then(json => {
      data = json;
    });

  // 🔹 질문 표시
  function showQuestion(nodeId) {
    const node = data.find(item => item.id === nodeId);
    currentNode = node;

    if (!node) return;

    if (node.type === 'question') {
      questionText.innerText = node.text[language];
      startScreen.classList.add('hidden');
      resultScreen.classList.add('hidden');
      questionScreen.classList.remove('hidden');
      startBtn.classList.add('hidden');
      document.getElementById('languageSelect').classList.add('hidden');
    } else if (node.type === 'result') {
      resultTitle.innerText = node.result[language];
      resultDesc.innerText = node.description[language];

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

  // 🔹 시작 버튼
  startBtn.addEventListener('click', () => {
    language = langSelect.value;
    showQuestion('q1');
  });

  // 🔹 예 / 아니오 버튼
  yesBtn.addEventListener('click', () => {
    if (currentNode && currentNode.yes) {
      showQuestion(currentNode.yes);
    }
  });

  noBtn.addEventListener('click', () => {
    if (currentNode && currentNode.no) {
      showQuestion(currentNode.no);
    }
  });

  // 🔹 다시 시작
  restartBtn.addEventListener('click', () => {
    startScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    questionScreen.classList.add('hidden');
    startBtn.classList.remove('hidden');
    document.getElementById('languageSelect').classList.remove('hidden');
  });

  // 🔹 언어 선택 시 설명 업데이트
  langSelect.addEventListener('change', () => {
    descriptionBox.innerText = descriptions[langSelect.value];
    document.getElementById('startTitle').innerText = titles[langSelect.value];
  });

  // 🔹 시작 시 설명과 타이틀 표시
  descriptionBox.innerText = descriptions[langSelect.value];
  document.getElementById('startTitle').innerText = titles[langSelect.value];

  // 🔹 결과 전송 버튼 → 모달 열기
  sendResultBtn.addEventListener('click', () => {
    sendModal.classList.remove('hidden');
  });

  // 🔹 모달 취소 버튼
  cancelSendBtn.addEventListener('click', () => {
    sendModal.classList.add('hidden');
  });

  // 🔹 모달 전송 버튼
  submitSendBtn.addEventListener('click', () => {
    const affiliation = inputAffiliation.value.trim();
    const name = inputName.value.trim();
    const result = resultTitle.innerText;

    if (!affiliation || !name) {
      alert("이름과 소속을 입력해 주세요.");
      return;
    }

    const payload = {
      affiliation,
      name,
      result,
      timestamp: new Date().toISOString()
    };

    fetch("https://script.google.com/macros/s/★_여기에_Apps_Script_URL/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(() => {
      alert("✅ 결과가 전송되었습니다!");
      sendModal.classList.add('hidden');
    }).catch(() => {
      alert("❌ 전송 실패. 인터넷 상태를 확인해주세요.");
    });
  });
});
