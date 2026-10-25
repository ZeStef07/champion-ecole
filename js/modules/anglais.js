import { shuffleArray } from '../utils.js';
import { launchConfetti } from '../confettis.js';

const vocabularyList = [
  { en: 'Cat', fr: 'Chat' },
  { en: 'Dog', fr: 'Chien' },
  { en: 'Red', fr: 'Rouge' },
  { en: 'Blue', fr: 'Bleu' },
  { en: 'School', fr: 'École' },
  { en: 'Book', fr: 'Livre' },
  { en: 'Apple', fr: 'Pomme' },
  { en: 'Sun', fr: 'Soleil' },
  { en: 'Water', fr: 'Eau' },
  { en: 'House', fr: 'Maison' }
];

export function initAnglais() {
  const container = document.getElementById('anglais-container');
  const scoreBox = document.getElementById('anglais-score');
  container.innerHTML = '';
  scoreBox.innerHTML = '';
  container.classList.remove('problems-layout');

  const count = 5;
  const selectedVocab = shuffleArray([...vocabularyList]).slice(0, count);

  selectedVocab.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'math-card';
    card.dataset.type = 'anglais-item';
    card.dataset.answer = item.fr.toLowerCase();

    card.innerHTML = `
      <div class="fraction-question-box math-operation-box">
        <span class="card-title"><strong>${index + 1}.</strong> Traduis en français :</span>
        <div class="numeration-display" style="color: #3b82f6; font-size: 1.5rem; margin: 10px 0;">${item.en}</div>
        <div class="input-wrapper">
          <input type="text" class="math-input" autocomplete="off" placeholder="Votre réponse...">
        </div>
        <span class="feedback-icon feedback-spacing"></span>
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
      const userVal = input.value.trim().toLowerCase();

      if (userVal === expected) {
        correctCount++;
        card.className = 'math-card correct';
        icon.textContent = '✅';
      } else {
        card.className = 'math-card incorrect';
        icon.textContent = `❌ (${card.dataset.answer})`;
      }
    });

    scoreBox.textContent = `Score : ${correctCount} / ${count}`;

    if (correctCount === count && count > 0) {
      launchConfetti();
    }
  };

  const restartBtn = document.getElementById('btn-restart-anglais');
  if (restartBtn) {
    restartBtn.onclick = () => initAnglais();
  }
}
