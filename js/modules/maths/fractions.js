import { getRandomInt } from '../../utils.js';

export function generateFractionCard(card) {
  const mode = Math.random() > 0.5 ? 'lire' : 'ecrire';
  const den = getRandomInt(4, 8);
  const num = getRandomInt(1, den - 1);

  if (mode === 'lire') {
    card.dataset.type = 'fractions-lire';
    card.dataset.num = num;
    card.dataset.den = den;

    card.innerHTML = `
      <div class="fraction-question-box math-operation-box">
        <span class="card-title">Écris la fraction correspondant aux parts :</span>
        <div class="numeration-display">${num} / ${den}</div>
        <div class="input-wrapper">
          <input type="text" class="num-input" style="width: 40px; text-align: center;" autocomplete="off">
          <span>/</span>
          <input type="text" class="den-input" style="width: 40px; text-align: center;" autocomplete="off">
        </div>
        <span class="feedback-icon feedback-spacing"></span>
      </div>
    `;
  } else {
    card.dataset.type = 'fractions-ecrire';
    card.dataset.expectedNum = num;
    card.dataset.den = den;

    let cellsHtml = '';
    for (let i = 0; i < den; i++) {
      cellsHtml += `<div class="square-cell" data-index="${i}" style="width: 30px; height: 30px; border: 2px solid #1e293b; background: #fff; border-radius: 4px; cursor: pointer;"></div>`;
    }

    card.innerHTML = `
      <div class="fraction-question-box math-operation-box">
        <span class="card-title">Colorie ${num} part(s) sur ${den} :</span>
        <div style="display: flex; justify-content: center; gap: 5px; margin: 10px 0;">
          ${cellsHtml}
        </div>
        <span class="feedback-icon feedback-spacing"></span>
      </div>
    `;

    setTimeout(() => {
      card.querySelectorAll('.square-cell').forEach(cell => {
        cell.onclick = () => {
          cell.classList.toggle('filled');
          cell.style.backgroundColor = cell.classList.contains('filled') ? '#3b82f6' : '#fff';
        };
      });
    }, 0);
  }
}
