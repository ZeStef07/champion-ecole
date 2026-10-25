import { configData } from '../../config.js';

export function initPeintureExercise(container) {
  const colors = configData.maternelle.colors;

  container.innerHTML = `
    <div class="maternelle-wrapper">
      <p class="maternelle-instruction">Choisis une couleur et colorie le dessin !</p>
      <div class="palette-container" id="palette"></div>
      <div class="dessin-wrapper">
        <svg class="dessin-svg" width="180" height="140" viewBox="0 0 180 140">
          <rect id="zone-toit" x="30" y="30" width="120" height="50" fill="#ffffff" stroke="#1e293b" stroke-width="3" style="cursor: pointer;"/>
          <rect id="zone-porte" x="75" y="80" width="30" height="50" fill="#ffffff" stroke="#1e293b" stroke-width="3" style="cursor: pointer;"/>
        </svg>
      </div>
      <span class="feedback-icon feedback-spacing" id="peinture-feedback"></span>
    </div>
  `;

  let currentColor = colors[0].code;
  const palette = container.querySelector('#palette');
  const feedback = container.querySelector('#peinture-feedback');

  colors.forEach(col => {
    const btn = document.createElement('div');
    btn.className = 'palette-btn';
    btn.style.backgroundColor = col.code;
    btn.onclick = () => { currentColor = col.code; };
    palette.appendChild(btn);
  });

  const zones = container.querySelectorAll('svg rect');
  zones.forEach(zone => {
    zone.onclick = () => {
      zone.setAttribute('fill', currentColor);
      zone.dataset.painted = 'true';
    };
  });

  window.checkPeinture = () => {
    let allPainted = true;
    zones.forEach(zone => {
      if (!zone.dataset.painted) allPainted = false;
    });
    feedback.textContent = allPainted ? '✅' : '❌';
    return allPainted;
  };
}
