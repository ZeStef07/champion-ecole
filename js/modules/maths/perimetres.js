import { getRandomInt } from '../../utils.js';

export function generatePerimetreCard(card, index) {
  const type = Math.random() > 0.5 ? 'rectangle' : 'carre';
  let answer = 0;
  let description = '';

  if (type === 'rectangle') {
    const longueur = getRandomInt(5, 15);
    const largeur = getRandomInt(3, longueur - 1);
    answer = (longueur + largeur) * 2;
    description = `Un rectangle de longueur ${longueur} cm et de largeur ${largeur} cm.`;
  } else {
    const cote = getRandomInt(4, 12);
    answer = cote * 4;
    description = `Un carré de côté ${cote} cm.`;
  }

  card.dataset.type = 'perimetre';
  card.dataset.answer = answer;

  card.innerHTML = `
    <div class="fraction-question-box math-operation-box">
      <span class="card-title"><strong>${index + 1}.</strong> Calcule le périmètre de :</span>
      <p style="font-weight: bold; margin: 8px 0; font-size: 1.05rem;">${description}</p>
      <div class="input-wrapper">
        <input type="text" class="math-input" autocomplete="off">
        <span>cm</span>
      </div>
      <span class="feedback-icon feedback-spacing"></span>
    </div>
  `;
}
