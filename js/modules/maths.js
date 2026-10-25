import { configData } from '../config.js';
import { shuffleArray, removeAccents } from '../utils.js';
import { launchConfetti } from '../confettis.js';
import { generateOperationCard } from './maths/operations.js';
import { generatePerimetreCard } from './maths/perimetres.js';
import { generateFractionCard } from './maths/fractions.js';
import { generateProblemCard } from './maths/problemes.js';
import { generateNumerationCard } from './maths/numeration.js';

function getActiveProblemTypes() {
  const weights = configData.maths.poids_problemes;
  return Object.keys(weights).filter(type => weights[type] > 0);
}

export function initMaths(subType = 'operations') {
  const container = document.getElementById('maths-container');
  const scoreBox = document.getElementById('maths-score');
  container.innerHTML = '';
  scoreBox.innerHTML = '';

  const cleanType = subType.toLowerCase();

  let count = 10;
  if (cleanType === 'problemes') {
    count = 3;
    container.classList.add('problems-layout');
  } else if (cleanType === 'perimetres' || cleanType === 'fractions' || cleanType === 'numeration') {
    count = 5;
    container.classList.remove('problems-layout');
  } else if (cleanType === 'operations') {
    count = 10;
    container.classList.remove('problems-layout');
  }

  let problemTypesList = [];
  if (cleanType === 'problemes') {
    const activeTypes = getActiveProblemTypes();
    problemTypesList = shuffleArray([...activeTypes]);
  }

  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'math-card';

    if (cleanType === 'operations') {
      generateOperationCard(card);
    } else if (cleanType === 'perimetres') {
      generatePerimetreCard(card, i);
    } else if (cleanType === 'fractions') {
      generateFractionCard(card);
    } else if (cleanType === 'problemes') {
      const assignedType = problemTypesList[i % problemTypesList.length] || 'billes';
      generateProblemCard(card, i, assignedType);
    } else if (cleanType === 'numeration') {
      generateNumerationCard(card, i);
    }

    container.appendChild(card);
  }

  document.getElementById('btn-validate-maths').onclick = () => {
    let correctCount = 0;

    container.querySelectorAll('.math-card').forEach(card => {
      const icon = card.querySelector('.feedback-icon');
      let isCardCorrect = false;

      if (card.dataset.type === 'perimetre') {
        const input = card.querySelector('.math-input');
        const expected = parseInt(card.dataset.answer, 10);
        const userVal = parseInt(input.value.trim(), 10);

        if (!isNaN(userVal) && userVal === expected) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌ (${expected} cm)`;
        }
      } 
      else if (card.dataset.type === 'fractions-lire') {
        const numInput = card.querySelector('.num-input');
        const denInput = card.querySelector('.den-input');
        const expNum = parseInt(card.dataset.num, 10);
        const expDen = parseInt(card.dataset.den, 10);
        const userNum = parseInt(numInput.value.trim(), 10);
        const userDen = parseInt(denInput.value.trim(), 10);

        if (userNum === expNum && userDen === expDen) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌ (${expNum}/${expDen})`;
        }
      } 
      else if (card.dataset.type === 'fractions-ecrire') {
        const expectedNum = parseInt(card.dataset.expectedNum, 10);
        const totalCells = parseInt(card.dataset.den, 10);
        const filledCells = card.querySelectorAll('.square-cell.filled').length;

        if (filledCells === expectedNum) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌ (${expectedNum}/${totalCells})`;
        }
      } 
      else if (card.dataset.type === 'numeration-to-cdu') {
        const userC = parseInt(card.querySelector('.c-input').value.trim(), 10);
        const userD = parseInt(card.querySelector('.d-input').value.trim(), 10);
        const userU = parseInt(card.querySelector('.u-input').value.trim(), 10);
        const expC = parseInt(card.dataset.ansC, 10);
        const expD = parseInt(card.dataset.ansD, 10);
        const expU = parseInt(card.dataset.ansU, 10);

        if (userC === expC && userD === expD && userU === expU) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌ (${expC}c ${expD}d ${expU}u)`;
        }
      }
      else if (card.dataset.type === 'numeration-from-cdu') {
        const input = card.querySelector('.num-ans-input');
        const expected = parseInt(card.dataset.answer, 10);
        const userVal = parseInt(input.value.trim(), 10);

        if (!isNaN(userVal) && userVal === expected) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌ (${expected})`;
        }
      }
      else if (card.dataset.type && card.dataset.type.startsWith('prob-')) {
        let allSubCorrect = true;
        const input1 = card.querySelector('.p-ans-1');
        const userVal = input1 ? removeAccents(input1.value.trim().toLowerCase()) : '';
        if (userVal !== String(card.dataset.ans1)) {
          allSubCorrect = false;
        }

        if (allSubCorrect) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌`;
        }
      } 
      else {
        const input = card.querySelector('.math-input');
        const expected = parseInt(card.dataset.answer, 10);
        const userVal = parseInt(input.value.trim(), 10);

        if (!isNaN(userVal) && userVal === expected) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌ (${expected})`;
        }
      }

      if (isCardCorrect) correctCount++;
    });

    scoreBox.textContent = `Score : ${correctCount} / ${count}`;

    if (correctCount === count && count > 0) {
      launchConfetti();
    }
  };

  const restartBtn = document.getElementById('btn-restart-maths');
  if (restartBtn) {
    restartBtn.onclick = () => initMaths(cleanType);
  }
}
