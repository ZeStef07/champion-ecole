import { getRandomInt } from '../../utils.js';

export function generateProblemCard(card, index, problemType) {
  card.dataset.type = `prob-${problemType}`;

  let html = '';
  if (problemType === 'billes') {
    const start = getRandomInt(20, 50);
    const lost = getRandomInt(5, 15);
    const won = getRandomInt(10, 25);
    const ans = start - lost + won;
    card.dataset.ans1 = ans;

    html = `
      <p class="card-title"><strong>Problème ${index + 1} :</strong> Thomas a ${start} billes. Il en perd ${lost} à la récréation, puis il en gagne ${won}. Combien a-t-il de billes en tout ?</p>
      <div class="input-wrapper">
        <input type="text" class="math-input p-ans-1" autocomplete="off">
        <span>billes</span>
      </div>
    `;
  } else if (problemType === 'argent') {
    const prix = getRandomInt(15, 45);
    const donne = 50;
    const ans = donne - prix;
    card.dataset.ans1 = ans;

    html = `
      <p class="card-title"><strong>Problème ${index + 1} :</strong> Léa achète un livre à ${prix} €. Elle paie avec un billet de ${donne} €. Combien le libraire doit-il lui rendre ?</p>
      <div class="input-wrapper">
        <input type="text" class="math-input p-ans-1" autocomplete="off">
        <span>€</span>
      </div>
    `;
  } else {
    const a = getRandomInt(10, 30);
    const b = getRandomInt(5, 20);
    const ans = a + b;
    card.dataset.ans1 = ans;

    html = `
      <p class="card-title"><strong>Problème ${index + 1} :</strong> Un jardinier a planté ${a} rosiers le matin et ${b} l'après-midi. Combien en a-t-il plantés en tout ?</p>
      <div class="input-wrapper">
        <input type="text" class="math-input p-ans-1" autocomplete="off">
        <span>rosiers</span>
      </div>
    `;
  }

  card.innerHTML = `
    <div class="fraction-question-box math-operation-box" style="text-align: left; padding: 5px;">
      ${html}
      <span class="feedback-icon feedback-spacing" style="text-align: center;"></span>
    </div>
  `;
}
