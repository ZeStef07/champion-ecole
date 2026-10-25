import { configData } from '../config.js';
import { shuffleArray, removeAccents } from '../utils.js';
import { launchConfetti } from '../confettis.js';

export function initFrancais(subType = 'orthographe') {
  const container = document.getElementById('francais-container');
  const scoreBox = document.getElementById('francais-score');
  container.innerHTML = '';
  scoreBox.innerHTML = '';
  container.classList.remove('problems-layout');

  const cleanType = subType.toLowerCase();
  const count = 5;
  let items = [];

  if (cleanType === 'orthographe') {
    items = shuffleArray([...configData.francais.motsS_SS]).slice(0, count);
  } else if (cleanType === 'conjugaison') {
    items = shuffleArray([...configData.francais.conjugaison]).slice(0, count);
  }

  items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'math-card';
    card.dataset.type = cleanType;
    card.dataset.answer = removeAccents(item.answer.toLowerCase());

    let questionText = '';
    if (cleanType === 'orthographe') {
      questionText = `<strong>${index + 1}.</strong> ${item.question}`;
    } else {
      questionText = `<strong>${index + 1}.</strong> Conjugue <strong>${item.verbe}</strong> au <strong>${item.temps}</strong> (${item.pronom}) :`;
    }

    card.innerHTML = `
      <div class="fraction-question-box math-operation-box" style="text-align: left; padding: 10px; width: 100%;">
        <span class="card-title">${questionText}</span>
        <div class="input-wrapper" style="margin-top: 15px;">
          <input type="text" class="math-input" autocomplete="off" style="width: 180px;" placeholder="Ta réponse...">
        </div>
        <span class="feedback-icon feedback-spacing" style="text-align: center;"></span>
      </div>
    `;

    container.appendChild(card);
  });

  document.getElementById('btn-validate-francais').onclick = () => {
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

    scoreBox.textContent = `Score : ${correctCount} / ${count}`;

    if (correctCount === count && count > 0) {
      launchConfetti();
    }
  };

  const restartBtn = document.getElementById('btn-restart-francais');
  if (restartBtn) {
    restartBtn.onclick = () => initFrancais(cleanType);
  }
}