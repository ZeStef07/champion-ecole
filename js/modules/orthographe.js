import { shuffleArray, removeAccents } from '../utils.js';
import { launchConfetti } from '../confettis.js';

const orthographeList = [
  { question: "Complète avec 's' ou 'ss' : une mai___on", answer: "s" },
  { question: "Complète avec 's' ou 'ss' : un poi___on", answer: "ss" },
  { question: "Complète avec 's' ou 'ss' : une trou___e", answer: "ss" },
  { question: "Complète avec 's' ou 'ss' : un va___e", answer: "s" },
  { question: "Complète avec 's' ou 'ss' : une ela___tique", answer: "s" },
  { question: "Complète avec 's' ou 'ss' : un cou___in", answer: "ss" },
  { question: "Complète le pluriel : Un cheval ➔ Des...", answer: "chevaux" },
  { question: "Complète le pluriel : Un journal ➔ Des...", answer: "journaux" },
  { question: "Conjugaison : Nous (chanter) ➔ Nous...", answer: "chantons" },
  { question: "Conjugaison : Vous (jouer) ➔ Vous...", answer: "jouez" }
];

export function initOrthographe() {
  const container = document.getElementById('orthographe-container');
  const scoreBox = document.getElementById('orthographe-score');
  container.innerHTML = '';
  scoreBox.innerHTML = '';
  container.classList.remove('problems-layout');

  const count = 5;
  const selectedItems = shuffleArray([...orthographeList]).slice(0, count);

  selectedItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'math-card';
    card.dataset.type = 'orthographe-item';
    card.dataset.answer = removeAccents(item.answer.toLowerCase());

    card.innerHTML = `
      <div class="fraction-question-box math-operation-box" style="text-align: left; padding: 10px;">
        <span class="card-title"><strong>${index + 1}.</strong> ${item.question}</span>
        <div class="input-wrapper" style="margin-top: 15px;">
          <input type="text" class="math-input" autocomplete="off" style="width: 180px;" placeholder="Ta réponse...">
        </div>
        <span class="feedback-icon feedback-spacing" style="text-align: center;"></span>
      </div>
    `;

    container.appendChild(card);
  });

  document.getElementById('btn-validate-orthographe').onclick = () => {
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

  const restartBtn = document.getElementById('btn-restart-orthographe');
  if (restartBtn) {
    restartBtn.onclick = () => initOrthographe();
  }
}
