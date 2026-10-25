import { getRandomInt } from '../../utils.js';

export function generateNumerationCard(card, index) {
  const mode = Math.random() > 0.5 ? 'toCDU' : 'fromCDU';

  if (mode === 'toCDU') {
    const c = getRandomInt(1, 9);
    const d = getRandomInt(0, 9);
    const u = getRandomInt(0, 9);
    const nombre = c * 100 + d * 10 + u;

    card.dataset.type = 'numeration-to-cdu';
    card.dataset.ansC = c;
    card.dataset.ansD = d;
    card.dataset.ansU = u;

    card.innerHTML = `
      <div class="fraction-question-box math-operation-box">
        <span class="card-title"><strong>${index + 1}.</strong> Écris ${nombre} avec c, d et u :</span>
        <div class="numeration-box">
          <span>${nombre} =</span>
          <input type="text" class="c-input" autocomplete="off"><span>c</span>
          <input type="text" class="d-input" autocomplete="off"><span>d</span>
          <input type="text" class="u-input" autocomplete="off"><span>u</span>
        </div>
        <span class="feedback-icon feedback-spacing"></span>
      </div>
    `;
  } else {
    const typePiege = getRandomInt(0, 3);
    let displayText = '';
    let answer = 0;

    if (typePiege === 0) {
      const c = getRandomInt(1, 9);
      const d = getRandomInt(0, 9);
      const u = getRandomInt(0, 9);
      answer = c * 100 + d * 10 + u;
      displayText = `${c}c ${d}d ${u}u`;
    } else if (typePiege === 1) {
      const tens = getRandomInt(10, 89);
      const u2 = getRandomInt(0, 9);
      answer = tens * 10 + u2;
      displayText = `${tens}d ${u2}u`;
    } else if (typePiege === 2) {
      const subType = getRandomInt(0, 3);
      if (subType === 0) {
        const c = getRandomInt(1, 9);
        answer = c * 100;
        displayText = `${c}c`;
      } else if (subType === 1) {
        const d = getRandomInt(10, 90);
        answer = d * 10;
        displayText = `${d}d`;
      } else {
        const u = getRandomInt(1, 9);
        answer = u;
        displayText = `${u}u`;
      }
    } else {
      const c = getRandomInt(1, 9);
      const u = getRandomInt(1, 9);
      answer = c * 100 + u;
      displayText = `${c}c ${u}u`;
    }

    card.dataset.type = 'numeration-from-cdu';
    card.dataset.answer = answer;

    card.innerHTML = `
      <div class="fraction-question-box math-operation-box">
        <span class="card-title"><strong>${index + 1}.</strong> Quel est ce nombre ?</span>
        <div class="numeration-display">${displayText}</div>
        <div class="input-wrapper">
          <input type="text" class="num-ans-input" autocomplete="off">
        </div>
        <span class="feedback-icon feedback-spacing"></span>
      </div>
    `;
  }
}
