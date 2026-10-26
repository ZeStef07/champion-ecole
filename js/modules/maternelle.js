import { launchConfetti } from '../confettis.js';
import { initPaniersExercise } from './maternelle/paniers.js';
import { initIntrusExercise } from './maternelle/intrus.js';
import { initTrouveExercise } from './maternelle/trouve.js';

export function initMaternelle(subType = 'paniers') {
  const container = document.getElementById('maternelle-container');
  const scoreBox = document.getElementById('maternelle-score');
  container.innerHTML = '';
  scoreBox.innerHTML = '';

  const cleanType = subType.toLowerCase();

  document.querySelectorAll('#tab-maternelle .sub-tab-btn').forEach(btn => {
    if (btn.dataset.sub === cleanType) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
    
    btn.onclick = () => {
      initMaternelle(btn.dataset.sub);
    };
  });

  if (cleanType === 'paniers') {
    initPaniersExercise(container);
  } else if (cleanType === 'intrus') {
    initIntrusExercise(container);
  } else if (cleanType === 'trouve') {
    initTrouveExercise(container);
  }

  document.getElementById('btn-validate-maternelle').onclick = () => {
    let isCorrect = false;

    if (cleanType === 'paniers') {
      isCorrect = window.checkPaniers ? window.checkPaniers() : false;
    } else if (cleanType === 'intrus') {
      isCorrect = window.checkIntrus ? window.checkIntrus() : false;
    } else if (cleanType === 'trouve') {
      isCorrect = window.checktrouve ? window.checktrouve() : false;
    }

    if (isCorrect) {
      scoreBox.textContent = `Bravo ! 🎉`;
      launchConfetti();
    } else {
      scoreBox.textContent = `Essaie encore ! 💪`;
    }
  };

  const restartBtn = document.getElementById('btn-restart-maternelle');
  if (restartBtn) {
    restartBtn.onclick = () => initMaternelle(cleanType);
  }
}
