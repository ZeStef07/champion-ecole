import { initFrancais } from './modules/francais.js';
import { initMaths } from './modules/maths.js';
import { initAnglais } from './modules/anglais.js';
import { initMaternelle } from './modules/maternelle.js';

document.addEventListener('DOMContentLoaded', () => {
  const mainTabButtons = document.querySelectorAll('.main-nav .tab-btn');
  mainTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.dataset.tab;

      mainTabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
      });
      const targetSection = document.getElementById(`tab-${tabName}`);
      if (targetSection) {
        targetSection.classList.add('active');
      }

      if (tabName === 'francais') {
        const activeSubFrancais = document.querySelector('#tab-francais .sub-tab-btn.active');
        initFrancais(activeSubFrancais ? activeSubFrancais.dataset.sub : 'orthographe');
      } else if (tabName === 'maths') {
        const activeSubMath = document.querySelector('#tab-maths .sub-tab-btn.active');
        initMaths(activeSubMath ? activeSubMath.dataset.sub : 'operations');
      } else if (tabName === 'anglais') {
        initAnglais();
      } else if (tabName === 'maternelle') {
        const activeSubMat = document.querySelector('#tab-maternelle .sub-tab-btn.active');
        initMaternelle(activeSubMat ? activeSubMat.dataset.sub : 'paniers');
      }
    });
  });

  const francaisSubButtons = document.querySelectorAll('#tab-francais .sub-tab-btn');
  francaisSubButtons.forEach(button => {
    button.addEventListener('click', () => {
      francaisSubButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      initFrancais(button.dataset.sub);
    });
  });

  const mathSubButtons = document.querySelectorAll('#tab-maths .sub-tab-btn');
  mathSubButtons.forEach(button => {
    button.addEventListener('click', () => {
      mathSubButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      initMaths(button.dataset.sub);
    });
  });

  const maternelleSubButtons = document.querySelectorAll('#tab-maternelle .sub-tab-btn');
  maternelleSubButtons.forEach(button => {
    button.addEventListener('click', () => {
      maternelleSubButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      initMaternelle(button.dataset.sub);
    });
  });

  initFrancais();
});