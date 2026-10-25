import { getRandomInt } from '../../utils.js';

export function generateFractionCard(card) {
  const mode = Math.random() > 0.5 ? 'lire' : 'ecrire';
  const den = getRandomInt(4, 8);
  const num = getRandomInt(1, den - 1);

  if (mode === 'lire') {
    card.dataset.type = 'fractions-lire';
    card.dataset.num = num;
    card.dataset.den = den;

    // Affichage visuel des parts coloriées (grille) sans afficher le résultat chiffré
    let cellsHtml = '';
    for (let i = 0; i < den; i++) {
      const isFilled = i < num;
      const bg = isFilled ? '#3b82f6' : '#ffffff';
      cellsHtml += `<div style="width: 28px; height: 28px; border: 2px solid #1e293b; background: ${bg}; border-radius: 4px;"></div>`;
    }

    card.innerHTML = `
      <div class="fraction-question-box math-operation-box">
        <span class="card-title">Écris la fraction correspondant aux parts colorées :</span>
        <div style="display: flex; justify-content: center; gap: 4px; margin: 12px 0;">
          ${cellsHtml}
        </div>
        <div class="fraction-vertical-input">
          <input type="text" class="num-input" autocomplete="off" placeholder="num">
          <div class="fraction-line"></div>
          <input type="text" class="den-input" autocomplete="off" placeholder="dén">
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
        <span class="card-title">Colorie les parts indiquées :</span>
        <div class="fraction-display-vertical" style="margin: 10px 0;">
          <span class="num-text">${num}</span>
          <div class="fraction-line"></div>
          <span class="den-text">${den}</span>
        </div>
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