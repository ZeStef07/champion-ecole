import { configData } from '../../config.js';
import { getRandomInt, shuffleArray } from '../../utils.js';

export function initOuestExercise(container) {
  const colors = configData.maternelle.colors;
  const shapes = configData.maternelle.shapes;

  // 1. Sélection aléatoire stricte de la cible
  const targetColor = colors[getRandomInt(0, colors.length - 1)];
  const targetShape = shapes[getRandomInt(0, shapes.length - 1)];

  // 2. Construction de la consigne textuelle et vocale parfaitement synchronisée
  const phrase = `Clique sur le ${targetShape} ${targetColor.name.toLowerCase()}`;

  container.innerHTML = `
    <div class="maternelle-wrapper">
      <p class="maternelle-instruction">Écoute la consigne et clique sur le bon objet ! 👂</p>
      <button id="btn-play-audio" class="btn-secondary" style="margin-bottom: 25px; padding: 12px 24px; font-size: 1.1rem;">🔊 Écouter la consigne</button>
      <div class="maternelle-grid" id="ouest-grid" style="display: flex; justify-content: center; gap: 30px; align-items: center; min-height: 140px; flex-wrap: wrap;"></div>
      <div id="ouest-explanation" class="maternelle-explanation" style="display: none;"></div>
      <span class="feedback-icon feedback-spacing" id="ouest-feedback"></span>
    </div>
  `;

  // Fonction de synthèse vocale sécurisée pour mobile (iOS / Android) et desktop
  const speakInstruction = () => {
    if (!('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    if (synth.paused) {
      synth.resume();
    }

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.85;

    // Référence globale anti-garbage collector sur iOS
    window._currentUtterance = utterance;

    const voices = synth.getVoices();
    if (voices && voices.length > 0) {
      const frVoice = voices.find(v => v.lang.startsWith('fr'));
      if (frVoice) utterance.voice = frVoice;
    }

    synth.speak(utterance);
  };

  // Le clic utilisateur obligatoire débloque l'audio sur mobile (Chrome/Safari iOS)
  const audioBtn = container.querySelector('#btn-play-audio');
  audioBtn.onclick = (e) => {
    e.preventDefault();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    speakInstruction();
  };

  const grid = container.querySelector('#ouest-grid');
  const explanationBox = container.querySelector('#ouest-explanation');
  const feedback = container.querySelector('#ouest-feedback');

  // 3. Génération des options (1 bonne réponse + 2 distracteurs garantis sans doublon)
  const options = [{ shape: targetShape, color: targetColor, correct: true }];

  while (options.length < 3) {
    const randColor = colors[getRandomInt(0, colors.length - 1)];
    const randShape = shapes[getRandomInt(0, shapes.length - 1)];
    if (!options.some(o => o.shape === randShape && o.color.name === randColor.name)) {
      options.push({ shape: randShape, color: randColor, correct: false });
    }
  }

  const shuffledOptions = shuffleArray(options);
  let selectedOption = null;

  // 4. Rendu visuel robuste des formes avec dimensions explicites en dur
  shuffledOptions.forEach(item => {
    const el = document.createElement('div');
    el.style.cursor = 'pointer';
    el.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    el.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.15)';
    el.style.display = 'inline-block';

    if (item.shape === 'rond') {
      el.style.width = '90px';
      el.style.height = '90px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = item.color.code;
    } else if (item.shape === 'carré') {
      el.style.width = '90px';
      el.style.height = '90px';
      el.style.borderRadius = '16px';
      el.style.backgroundColor = item.color.code;
    } else if (item.shape === 'triangle') {
      el.style.width = '0';
      el.style.height = '0';
      el.style.borderLeft = '50px solid transparent';
      el.style.borderRight = '50px solid transparent';
      el.style.borderBottom = `95px solid ${item.color.code}`;
      el.style.boxShadow = 'none';
    }

    el.onmouseover = () => el.style.transform = 'scale(1.08)';
    el.onmouseout = () => el.style.transform = 'scale(1)';

    el.onclick = () => {
      grid.querySelectorAll('div > div, .grid-shape').forEach(d => {
        d.style.outline = 'none';
        d.style.transform = 'scale(1)';
      });
      el.style.outline = '5px solid #0284c7';
      el.style.outlineOffset = '6px';
      selectedOption = item;
    };

    const wrapper = document.createElement('div');
    wrapper.style.padding = '10px';
    wrapper.appendChild(el);
    grid.appendChild(wrapper);
  });

  window.checkOuest = () => {
    explanationBox.style.display = 'block';

    if (!selectedOption) {
      explanationBox.style.color = '#eab308';
      explanationBox.innerHTML = "⚠️ N'oublie pas de cliquer sur une forme !";
      feedback.textContent = '❌';
      return false;
    }

    const correct = selectedOption.correct === true;
    if (correct) {
      explanationBox.style.color = '#16a34a';
      explanationBox.innerHTML = `🎉 Félicitations ! C'est bien le <strong>${targetShape} ${targetColor.name.toLowerCase()}</strong> !`;
      feedback.textContent = '✅';
    } else {
      explanationBox.style.color = '#dc2626';
      explanationBox.innerHTML = `❌ Tu as cliqué sur un <strong>${selectedOption.shape} ${selectedOption.color.name.toLowerCase()}</strong>.<br>💡 La consigne audio était : <em>"${phrase}"</em>.`;
      feedback.textContent = '❌';
    }

    return correct;
  };
}