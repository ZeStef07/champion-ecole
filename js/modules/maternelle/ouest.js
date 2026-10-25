import { configData } from '../../config.js';
import { getRandomInt, shuffleArray } from '../../utils.js';

export function initOuestExercise(container) {
  const colors = configData.maternelle.colors;
  const shapes = configData.maternelle.shapes;

  // Garantir le choix d'une cible valide présente dans les options
  const targetColor = colors[getRandomInt(0, colors.length - 1)];
  const targetShape = shapes[getRandomInt(0, shapes.length - 1)];

  container.innerHTML = `
    <div class="maternelle-wrapper">
      <p class="maternelle-instruction">Écoute la consigne et clique sur le bon objet ! 👂</p>
      <button id="btn-play-audio" class="btn-secondary" style="margin-bottom: 20px;">🔊 Écouter la consigne</button>
      <div class="maternelle-grid" id="ouest-grid"></div>
      <div id="ouest-explanation" class="maternelle-explanation" style="display: none;"></div>
      <span class="feedback-icon feedback-spacing" id="ouest-feedback"></span>
    </div>
  `;

  const phrase = `Clique sur le ${targetShape} ${targetColor.name.toLowerCase()}`;

  const speakInstruction = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  setTimeout(speakInstruction, 200);
  container.querySelector('#btn-play-audio').onclick = speakInstruction;

  const grid = container.querySelector('#ouest-grid');
  const explanationBox = container.querySelector('#ouest-explanation');
  const feedback = container.querySelector('#ouest-feedback');

  // Option 1 : Toujours la bonne réponse
  const options = [{ shape: targetShape, color: targetColor, correct: true }];

  // Générer 2 distracteurs uniques
  while (options.length < 3) {
    const randColor = colors[getRandomInt(0, colors.length - 1)];
    const randShape = shapes[getRandomInt(0, shapes.length - 1)];
    if (!options.some(o => o.shape === randShape && o.color.name === randColor.name)) {
      options.push({ shape: randShape, color: randColor, correct: false });
    }
  }

  const shuffledOptions = shuffleArray(options);
  let selectedOption = null;

  shuffledOptions.forEach(item => {
    const el = document.createElement('div');
    const cssShapeClass = item.shape === 'cercle' ? 'circle' : (item.shape === 'carré' ? 'square' : 'triangle');
    el.className = `grid-shape ${cssShapeClass}`;

    if (item.shape === 'triangle') {
      // Pour le triangle CSS, appliquer la couleur sur borderBottom
      el.style.borderBottom = `85px solid ${item.color.code}`;
    } else {
      el.style.backgroundColor = item.color.code;
    }

    el.onclick = () => {
      grid.querySelectorAll('.grid-shape').forEach(d => d.classList.remove('selected-shape'));
      el.classList.add('selected-shape');
      selectedOption = item;
    };

    grid.appendChild(el);
  });

  window.checkOuest = () => {
    explanationBox.style.display = 'block';

    if (!selectedOption) {
      explanationBox.style.color = '#eab308';
      explanationBox.innerHTML = `⚠️ N'oublie pas de cliquer sur une forme !`;
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
      explanationBox.innerHTML = `❌ Tu as cliqué sur un <strong>${selectedOption.shape} ${selectedOption.color.name.toLowerCase()}</strong>.<br>💡 La consigne était : <em>"${phrase}"</em>.`;
      feedback.textContent = '❌';
    }

    return correct;
  };
}
