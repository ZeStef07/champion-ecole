import { getRandomInt } from '../../utils.js';

export function generateOperationCard(card) {
  const opType = getRandomInt(0, 2);
  let num1, num2, answer, symbol;

  if (opType === 0) {
    num1 = getRandomInt(100, 899);
    num2 = getRandomInt(100, 899);
    answer = num1 + num2;
    symbol = '+';
  } else if (opType === 1) {
    num1 = getRandomInt(200, 999);
    num2 = getRandomInt(100, num1);
    answer = num1 - num2;
    symbol = '-';
  } else {
    num1 = getRandomInt(2, 9);
    num2 = getRandomInt(2, 9);
    answer = num1 * num2;
    symbol = '×';
  }

  card.dataset.type = 'operation';
  card.dataset.answer = answer;

  if (symbol === '×') {
    card.innerHTML = `
      <div class="fraction-question-box math-operation-box">
        <span class="operation-title">${num1} ${symbol} ${num2} =</span>
        <div class="input-wrapper">
          <input type="text" class="math-input" autocomplete="off">
          <span class="feedback-icon"></span>
        </div>
      </div>
    `;
  } else {
    // Décomposition en chiffres pour l'alignement strict Centaines, Dizaines, Unités
    const str1 = String(num1).padStart(3, ' ');
    const str2 = String(num2).padStart(3, ' ');

    const c1 = str1[0] === ' ' ? '&nbsp;' : str1[0];
    const d1 = str1[1] === ' ' ? '&nbsp;' : str1[1];
    const u1 = str1[2] === ' ' ? '&nbsp;' : str1[2];

    const c2 = str2[0] === ' ' ? '&nbsp;' : str2[0];
    const d2 = str2[1] === ' ' ? '&nbsp;' : str2[1];
    const u2 = str2[2] === ' ' ? '&nbsp;' : str2[2];

    card.innerHTML = `
      <div class="fraction-question-box math-operation-box">
        <div class="operation-vertical-grid">
          <div class="op-row">
            <span class="op-symbol"></span>
            <span class="digit">${c1}</span>
            <span class="digit">${d1}</span>
            <span class="digit">${u1}</span>
          </div>
          <div class="op-row">
            <span class="op-symbol">${symbol}</span>
            <span class="digit">${c2}</span>
            <span class="digit">${d2}</span>
            <span class="digit">${u2}</span>
          </div>
          <div class="op-separator-grid"></div>
        </div>
        <div class="input-wrapper">
          <input type="text" class="math-input" autocomplete="off" placeholder="Résultat...">
          <span class="feedback-icon"></span>
        </div>
      </div>
    `;
  }
}
