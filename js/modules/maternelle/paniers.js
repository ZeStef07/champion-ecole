import { configData } from '../../config.js';
import { shuffleArray } from '../../utils.js';

export function initPaniersExercise(container) {
  const colors = configData.maternelle.colors;
  const shapes = configData.maternelle.shapes;

  container.innerHTML = `
    <div class="maternelle-wrapper">
      <p class="maternelle-instruction">Range chaque objet dans le panier de sa couleur ! 🧺</p>
      <div class="paniers-zone" id="paniers-zone"></div>
      <div class="objets-zone" id="objets-zone"></div>
      <div id="paniers-explanation" class="maternelle-explanation" style="display: none;"></div>
      <span class="feedback-icon feedback-spacing" id="paniers-feedback"></span>
    </div>
  `;

  let selectedObject = null;
  const basketsZone = container.querySelector('#paniers-zone');
  const itemsZone = container.querySelector('#objets-zone');
  const explanationBox = container.querySelector('#paniers-explanation');
  const feedback = container.querySelector('#paniers-feedback');

  const itemAssignments = {};
  // 4 paniers de couleurs différentes
  const activeColors = shuffleArray([...colors]).slice(0, 4);

  // Génération de 5 à 6 objets mélangés avec des formes différentes
  const items = [];
  for (let i = 0; i < 6; i++) {
    const assignedCol = activeColors[i % activeColors.length];
    const shape = shapes[i % shapes.length];
    items.push({
      id: i + 1,
      color: assignedCol.name,
      code: assignedCol.code,
      shape: shape === 'cercle' ? 'circle' : 'square'
    });
  }

  activeColors.forEach(col => {
    const basket = document.createElement('div');
    basket.className = 'basket';
    basket.dataset.colorName = col.name;
    basket.style.borderColor = col.code;

    const title = document.createElement('span');
    title.className = 'basket-title';
    title.style.color = col.code;
    title.textContent = col.name;
    basket.appendChild(title);

    const basketItemsContainer = document.createElement('div');
    basketItemsContainer.className = 'basket-items-container';
    basket.appendChild(basketItemsContainer);

    basket.onclick = () => {
      if (selectedObject) {
        basketItemsContainer.appendChild(selectedObject);
        itemAssignments[selectedObject.dataset.id] = {
          placedInColor: col.name,
          expectedColor: selectedObject.dataset.expectedColor,
          element: selectedObject,
          basketElement: basket
        };
        selectedObject.classList.remove('selected');
        selectedObject = null;
      }
    };
    basketsZone.appendChild(basket);
  });

  shuffleArray(items).forEach(item => {
    const el = document.createElement('div');
    el.className = `maternelle-item ${item.shape}`;
    el.dataset.id = item.id;
    el.dataset.expectedColor = item.color;
    el.style.backgroundColor = item.code;

    el.onclick = (e) => {
      e.stopPropagation();
      itemsZone.querySelectorAll('.maternelle-item').forEach(i => i.classList.remove('selected'));
      basketsZone.querySelectorAll('.maternelle-item').forEach(i => i.classList.remove('selected'));
      el.classList.add('selected');
      selectedObject = el;
    };
    itemsZone.appendChild(el);
  });

  window.checkPaniers = () => {
    let allCorrect = true;
    let errorsCount = 0;
    const errorDetails = [];

    // Réinitialiser les styles d'erreur
    basketsZone.querySelectorAll('.basket').forEach(b => b.classList.remove('basket-error'));
    container.querySelectorAll('.maternelle-item').forEach(i => i.classList.remove('item-error'));

    if (Object.keys(itemAssignments).length < items.length) {
      explanationBox.style.display = 'block';
      explanationBox.style.color = '#eab308';
      explanationBox.innerHTML = '⚠️ Il reste des objets qui ne sont pas rangés !';
      feedback.textContent = '❌';
      return false;
    }

    items.forEach(item => {
      const assignment = itemAssignments[item.id];
      if (!assignment || assignment.placedInColor !== item.color) {
        allCorrect = false;
        errorsCount++;
        if (assignment) {
          assignment.element.classList.add('item-error');
          assignment.basketElement.classList.add('basket-error');
          errorDetails.push(`L'objet <strong>${item.color}</strong> a été placé dans le panier <strong>${assignment.placedInColor}</strong>.`);
        }
      }
    });

    explanationBox.style.display = 'block';
    if (allCorrect) {
      explanationBox.style.color = '#16a34a';
      explanationBox.innerHTML = '🌟 Bravo ! Tous les objets sont parfaitement bien rangés dans leurs paniers !';
      feedback.textContent = '✅';
    } else {
      explanationBox.style.color = '#dc2626';
      explanationBox.innerHTML = `❌ Oups, ${errorsCount} objet(s) mal rangé(s) (entouré(s) en rouge) :<br>` + errorDetails.join('<br>');
      feedback.textContent = '❌';
    }

    return allCorrect;
  };
}
