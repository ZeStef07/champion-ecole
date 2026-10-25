import { configData } from '../config.js';
import { shuffleArray, removeAccents } from '../utils.js';
import { launchConfetti } from '../confettis.js';

export function initAnglais() {
  const container = document.getElementById('anglais-container');
  const scoreBox = document.getElementById('anglais-score');
  container.innerHTML = '';
  scoreBox.innerHTML = '';
  container.classList.remove('problems-layout');

  const totalCount = 5;

  // Calcul du jour actuel en anglais
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayIndex = new Date().getDay();
  const currentDayEnglish = daysOfWeek[todayIndex];

  // Construction du pool de questions
  const pool = [];

  // Question du jour
  pool.push({
    question: "What's the day today? (Écris le jour en anglais)",
    answer: currentDayEnglish,
    isDayQuestion: true
  });

  // Nombres (ex: 1 -> one)
  configData.anglais.numbers.forEach(item => {
    pool.push({
      question: `Comment dit-on <strong>${item.fr}</strong> en anglais ?`,
      answer: item.en
    });
  });

  // Mois (ex: Janvier -> january)
  configData.anglais.months.forEach(item => {
    pool.push({
      question: `Traduis le mois <strong>${item.fr}</strong> en anglais :`,
      answer: item.en
    });
  });

  // Tirage aléatoire de 5 questions
  const selectedQuestions = shuffleArray([...pool]).slice(0, totalCount);

  selectedQuestions.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'math-card';
    card.dataset.type = 'anglais-item';
    card.dataset.answer = removeAccents(item.answer.toLowerCase());

    card.innerHTML = `
      <div class="fraction-question-box math-operation-box" style="text-align: left; padding: 10px; width: 100%;">
        <span class="card-title"><strong>${index + 1}.</strong> ${item.question}</span>
        <div class="input-wrapper" style="margin-top: 15px;">
          <input type="text" class="math-input" autocomplete="off" style="width: 180px;" placeholder="Ta réponse...">
        </div>
        <span class="feedback-icon feedback-spacing" style="text-align: center;"></span>
      </div>
    `;

    container.appendChild(card);
  });

  document.getElementById('btn-validate-anglais').onclick = () => {
    let correctCount = 0;

    container.querySelectorAll('.math-card').forEach(card => {
      const icon = card.querySelector('.feedback-icon');
      const input = card.querySelector('.math-input');
      const expected = card.dataset.answer;
      const userVal = removeAccents(input.value.trim().toLowerCase());

      if (userVal === expected) {
        correctCount++;
        card.className = 'math-card correct';
        icon.textContent = '✅';
      } else {
        card.className = 'math-card incorrect';
        icon.textContent = `❌ (${expected})`;
      }
    });

    scoreBox.textContent = `Score : ${correctCount} / ${totalCount}`;

    if (correctCount === totalCount && totalCount > 0) {
      launchConfetti();
    }
  };

  const restartBtn = document.getElementById('btn-restart-anglais');
  if (restartBtn) {
    restartBtn.onclick = () => initAnglais();
  }
}