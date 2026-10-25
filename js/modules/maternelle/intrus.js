import { configData } from '../../config.js';
import { getRandomInt, shuffleArray } from '../../utils.js';

export function initIntrusExercise(container) {
  const colors = configData.maternelle.colors;
  const shapes = configData.maternelle.shapes;

  container.innerHTML = `
    <div class="maternelle-wrapper">
      <p class="maternelle-instruction">Trouve l'intrus (celui qui est différent des autres) ! 🔍</p>
      <div class="maternelle-grid" id="intrus-grid"></div>
      <div id="intrus-explanation" class="maternelle-explanation" style="display: none;"></div>
      <span class="feedback-icon feedback-spacing" id="intrus-feedback"></span>
    </div>
  `;

  const grid = container.querySelector('#intrus-grid');
  const explanationBox = container.querySelector('#intrus-explanation');
  const feedback = container.querySelector('#intrus-feedback');

  const baseColor = colors[getRandomInt(0, colors.length - 1)];
  const shapeMode = Math.random() > 0.5; // Intrus sur la forme ou sur la couleur

  let elements = [];
  let explanationText = '';

  if (shapeMode) {
    // Intrus basé sur la forme
    const baseShape = shapes[0] === 'cercle' ? 'circle' : 'square';
    const intruderShape = (shapes[1] || shapes[0]) === 'cercle' ? 'circle' : 'square';
    const baseShapeLabel = shapes[0];
    const intruderShapeLabel = shapes[1] || shapes[0];

    explanationText = `L'intrus est le <strong>${intruderShapeLabel}</strong> car tous les autres sont des <strong>${baseShapeLabel}s</strong> !`;

    elements = [
      { shape: baseShape, color: baseColor.code, isIntruder: false, label: baseShapeLabel },
      { shape: baseShape, color: baseColor.code, isIntruder: false, label: baseShapeLabel },
      { shape: intruderShape, color: baseColor.code, isIntruder: true, label: intruderShapeLabel },
      { shape: baseShape, color: baseColor.code, isIntruder: false, label: baseShapeLabel }
    ];
  } else {
    // Intrus basé sur la couleur
    const otherColor = colors.filter(c => c.name !== baseColor.name)[0] || baseColor;
    const baseShape = 'circle';

    explanationText = `L'intrus est l'objet de couleur <strong>${otherColor.name}</strong> car tous les autres sont de couleur <strong>${baseColor.name}</strong> !`;

    elements = [
      { shape: baseShape, color: baseColor.code, isIntruder: false, label: baseColor.name },
      { shape: baseShape, color: baseColor.code, isIntruder: false, label: baseColor.name },
      { shape: baseShape, color: otherColor.code, isIntruder: true, label: otherColor.name },
      { shape: baseShape, color: baseColor.code, isIntruder: false, label: baseColor.name }
    ];
  }

  let selectedElement = null;

  shuffleArray(elements).forEach((el) => {
    const card = document.createElement('div');
    card.className = `intruder-card ${el.shape}`;
    card.style.backgroundColor = el.color;
    card.textContent = el.label;

    card.onclick = () => {
      grid.querySelectorAll('.intruder-card').forEach(d => d.classList.remove('selected-intruder'));
      card.classList.add('selected-intruder');
      selectedElement = el;
    };
    grid.appendChild(card);
  });

  window.checkIntrus = () => {
    explanationBox.style.display = 'block';

    if (!selectedElement) {
      explanationBox.style.color = '#eab308';
      explanationBox.innerHTML = `⚠️ Clique d'abord sur un objet pour choisir l'intrus !`;
      feedback.textContent = '❌';
      return false;
    }

    const correct = selectedElement.isIntruder === true;
    if (correct) {
      explanationBox.style.color = '#16a34a';
      explanationBox.innerHTML = `🎉 Exact ! ${explanationText}`;
      feedback.textContent = '✅';
    } else {
      explanationBox.style.color = '#dc2626';
      explanationBox.innerHTML = `❌ Ce n'est pas le bon intrus !<br>💡 ${explanationText}`;
      feedback.textContent = '❌';
    }

    return correct;
  };
}
