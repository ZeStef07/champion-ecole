import { initFrancais } from './modules/francais.js';
import { initMaths } from './modules/maths.js';
import { initAnglais } from './modules/anglais.js';
import { initMaternelle } from './modules/maternelle.js';

function switchTab(tabName, subType = null, updateHistory = true) {
  const mainTabButtons = document.querySelectorAll('.main-nav .tab-btn');
  const targetBtn = document.querySelector(`.main-nav .tab-btn[data-tab="${tabName}"]`);
  
  if (!targetBtn) return;

  mainTabButtons.forEach(btn => btn.classList.remove('active'));
  targetBtn.classList.add('active');

  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.remove('active');
  });
  const targetSection = document.getElementById(`tab-${tabName}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  let finalSub = subType;

  if (tabName === 'francais') {
    const subBtns = document.querySelectorAll('#tab-francais .sub-tab-btn');
    if (!finalSub || !document.querySelector(`#tab-francais .sub-tab-btn[data-sub="${finalSub}"]`)) {
      finalSub = 'orthographe';
    }
    subBtns.forEach(btn => {
      if (btn.dataset.sub === finalSub) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    initFrancais(finalSub);
  } else if (tabName === 'maths') {
    const subBtns = document.querySelectorAll('#tab-maths .sub-tab-btn');
    if (!finalSub || !document.querySelector(`#tab-maths .sub-tab-btn[data-sub="${finalSub}"]`)) {
      finalSub = 'operations';
    }
    subBtns.forEach(btn => {
      if (btn.dataset.sub === finalSub) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    initMaths(finalSub);
  } else if (tabName === 'anglais') {
    finalSub = null;
    initAnglais();
  } else if (tabName === 'maternelle') {
    const subBtns = document.querySelectorAll('#tab-maternelle .sub-tab-btn');
    if (!finalSub || !document.querySelector(`#tab-maternelle .sub-tab-btn[data-sub="${finalSub}"]`)) {
      finalSub = 'paniers';
    }
    subBtns.forEach(btn => {
      if (btn.dataset.sub === finalSub) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    initMaternelle(finalSub);
  }

  if (updateHistory) {
    let hash = `#${tabName}`;
    if (finalSub) {
      hash += `/${finalSub}`;
    }
    history.pushState({ tab: tabName, sub: finalSub }, '', hash);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const mainTabButtons = document.querySelectorAll('.main-nav .tab-btn');
  mainTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.dataset.tab;
      let defaultSub = null;
      if (tabName === 'francais') defaultSub = 'orthographe';
      else if (tabName === 'maths') defaultSub = 'operations';
      else if (tabName === 'maternelle') defaultSub = 'paniers';
      switchTab(tabName, defaultSub, true);
    });
  });

  const francaisSubButtons = document.querySelectorAll('#tab-francais .sub-tab-btn');
  francaisSubButtons.forEach(button => {
    button.addEventListener('click', () => {
      switchTab('francais', button.dataset.sub, true);
    });
  });

  const mathSubButtons = document.querySelectorAll('#tab-maths .sub-tab-btn');
  mathSubButtons.forEach(button => {
    button.addEventListener('click', () => {
      switchTab('maths', button.dataset.sub, true);
    });
  });

  const maternelleSubButtons = document.querySelectorAll('#tab-maternelle .sub-tab-btn');
  maternelleSubButtons.forEach(button => {
    button.addEventListener('click', () => {
      switchTab('maternelle', button.dataset.sub, true);
    });
  });

  // Gestion initiale au chargement ou rechargement selon le hash URL (#tab/sub ou #tab)
  const handleHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      switchTab('francais', 'orthographe', false);
      return;
    }

    const parts = hash.split('/');
    const tab = parts[0];
    const sub = parts[1] || null;

    const validTabs = ['francais', 'maths', 'anglais', 'maternelle'];
    if (validTabs.includes(tab)) {
      switchTab(tab, sub, false);
    } else {
      switchTab('francais', 'orthographe', false);
    }
  };

  window.addEventListener('popstate', () => {
    handleHash();
  });

  handleHash();
});