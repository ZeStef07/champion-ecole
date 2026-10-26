import { configData } from '../../config.js';
import { getRandomInt, shuffleArray } from '../../utils.js';

export function initTrouveExercise(container) {
  const colors = configData.maternelle.colors;
  const shapes = configData.maternelle.shapes;

  // 1. Sélection aléatoire stricte de la cible
  const targetColor = colors[getRandomInt(0, colors.length - 1)];
  const targetShape = shapes[getRandomInt(0, shapes.length - 1)];

  const phrase = `Clique sur le ${targetShape} ${targetColor.name.toLowerCase()}`;

  container.innerHTML = `
    <div class="maternelle-wrapper">
      <p class="maternelle-instruction">Écoute la consigne et trouve le bon objet parmi les choix ! 👂</p>
      <button id="btn-play-audio" class="btn-secondary" style="margin-bottom: 20px; padding: 10px 20px; font-size: 1rem;">🔊 Écouter la consigne</button>
      <div class="maternelle-grid" id="trouve-grid" style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; align-items: center; width: 100%; max-width: 500px; margin: 0 auto 20px auto;"></div>
      <div id="trouve-explanation" class="maternelle-explanation" style="display: none;"></div>
      <span class="feedback-icon feedback-spacing" id="trouve-feedback"></span>
    </div>
  `;

  const speakInstruction = () => {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    if (synth.paused) synth.resume();

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.85;
    window._currentUtterance = utterance;

    const voices = synth.getVoices();
    if (voices && voices.length > 0) {
      const frVoice = voices.find(v => v.lang.startsWith('fr'));
      if (frVoice) utterance.voice = frVoice;
    }
    synth.speak(utterance);
  };

  const audioBtn = container.querySelector('#btn-play-audio');
  audioBtn.onclick = (e) => {
    e.preventDefault();
    if ('speechSynthesis' in window) window.speechSynthesis.resume();
    speakInstruction();
  };

  setTimeout(speakInstruction, 400);

  const grid = container.querySelector('#trouve-grid');
  const explanationBox = container.querySelector('#trouve-explanation');
  const feedback = container.querySelector('#trouve-feedback');

  // 4 choix au total pour plus de défi (1 bonne réponse + 3 distracteurs)
  const options = [{ shape: targetShape, color: targetColor, correct: true }];

  while (options.length < 4) {
    const randColor = colors[getRandomInt(0, colors.length - 1)];
    const randShape = shapes[getRandomInt(0, shapes.length - 1)];
    if (!options.some(o => o.shape === randShape && o.color.name === randColor.name)) {
      options.push({ shape: randShape, color: randColor, correct: false });
    }
  }

  const shuffledOptions = shuffleArray(options);
  let selectedOption = null;

  shuffledOptions.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.className = 'grid-shape-wrapper';
    wrapper.style.padding = '8px';

    const el = document.createElement('div');
    el.style.cursor = 'pointer';
    el.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    el.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.12)';
    el.style.display = 'inline-block';

    if (item.shape === 'rond') {
      el.style.width = '70px';
      el.style.height = '70px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = item.color.code;
    } else if (item.shape === 'carré') {
      el.style.width = '70px';
      el.style.height = '70px';
      el.style.borderRadius = '14px';
      el.style.backgroundColor = item.color.code;
    } else if (item.shape === 'triangle') {
      el.style.width = '0';
      el.style.height = '0';
      el.style.borderLeft = '38px solid transparent';
      el.style.borderRight = '38px solid transparent';
      el.style.borderBottom = `75px solid ${item.color.code}`;
      el.style.boxShadow = 'none';
    }

    el.onmouseover = () => el.style.transform = 'scale(1.08)';
    el.onmouseout = () => el.style.transform = 'scale(1)';

    el.onclick = () => {
      grid.querySelectorAll('.grid-shape-wrapper > div').forEach(d => {
        d.style.outline = 'none';
        d.style.transform = 'scale(1)';
      });
      el.style.outline = '4px solid #0284c7';
      el.style.outlineOffset = '4px';
      selectedOption = item;
    };

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