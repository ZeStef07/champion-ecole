import { getRandomInt } from '../../utils.js';

function generateProblemActors() {
  const garcons = ['Jean', 'Lucas', 'Thomas', 'Léo', 'Hugo', 'Nathan', 'Maxime', 'Antoine'];
  const filles = ['Emma', 'Chloé', 'Manon', 'Alice', 'Léa', 'Zoé', 'Sarah', 'Camille'];

  const isGirl1 = Math.random() > 0.5;
  const p1 = isGirl1 ? filles[getRandomInt(0, filles.length - 1)] : garcons[getRandomInt(0, garcons.length - 1)];
  const pron = isGirl1 ? "Elle" : "Il";
  const pronL = isGirl1 ? "elle" : "il";

  const isGirl2 = Math.random() > 0.5;
  const p2 = isGirl2 ? filles[getRandomInt(0, filles.length - 1)] : garcons[getRandomInt(0, garcons.length - 1)];
  const detCamarade = isGirl2 ? "Sa camarade" : "Son camarade";

  return { p1, p2, pron, pronL, detCamarade };
}

export function generateProblemCard(card, index, assignedType) {
  const actors = generateProblemActors();

  if (assignedType === 'billes') generateBillesProblem(card, index, actors);
  else if (assignedType === 'decomposition') generateDecompositionProblem(card, index, actors);
  else if (assignedType === 'argent') generateArgentProblem(card, index, actors);
  else if (assignedType === 'multiple') generateMultipleProblem(card, index, actors);
  else if (assignedType === 'temps') generateTempsProblem(card, index, actors);
  else if (assignedType === 'partage') generatePartageProblem(card, index, actors);
  else generateLongueurProblem(card, index, actors);
}

function generateBillesProblem(card, index, actors) {
  const { p1, p2, pronL, detCamarade } = actors;
  const objets = [
    { nom: 'billes', type: 'de billes', typePluriel: 'des billes' },
    { nom: 'images', type: `d'images`, typePluriel: 'des images' },
    { nom: 'autocollants', type: `d'autocollants`, typePluriel: 'des autocollants' },
    { nom: 'bonbons', type: 'de bonbons', typePluriel: 'des bonbons' },
    { nom: 'cartes', type: 'de cartes', typePluriel: 'des cartes' },
    { nom: 'perles', type: 'de perles', typePluriel: 'des perles' }
  ];
  const obj = objets[getRandomInt(0, objets.length - 1)];

  const start = getRandomInt(8, 25);
  const val1 = getRandomInt(5, 15);
  const val2 = getRandomInt(2, 8);
  const val3 = getRandomInt(3, 10);

  const scenarios = [
    {
      text: `<strong>${index + 1}. ${p1}</strong> a <strong>${start}</strong> ${obj.nom} dans sa collection. Pour sa fête, ${detCamarade.toLowerCase()} <strong>${p2}</strong> lui en apporte <strong>${val1}</strong> de plus. Sa grand-mère lui en rajoute ensuite <strong>${val2}</strong>. Malheureusement, en jouant dans la cour, ${pronL} en perd <strong>${val3}</strong>.`,
      final: start + val1 + val2 - val3,
      diff: (start + val1 + val2 - val3) - start
    },
    {
      text: `<strong>${index + 1}. ${p1}</strong> possède <strong>${start}</strong> ${obj.nom} dans sa trousse. Pendant la récréation, ${pronL} en donne <strong>${val1}</strong> à <strong>${p2}</strong>. Plus tard, ${pronL} en gagne <strong>${val2}</strong> lors d'une partie passionnante. Enfin, ${pronL} en troque <strong>${val3}</strong> contre un petit jouet.`,
      final: start - val1 + val2 - val3,
      diff: (start - val1 + val2 - val3) - start
    },
    {
      text: `Dans son coffret, <strong>${p1}</strong> garde précieusement <strong>${start}</strong> ${obj.nom}. Son amie <strong>${p2}</strong> lui en prête <strong>${val1}</strong> de nouvelles. Mais ${p1} doit en rendre <strong>${val2}</strong> le lendemain et en oublie <strong>${val3}</strong> chez un copain.`,
      final: start + val1 - val2 - val3,
      diff: (start + val1 - val2 - val3) - start
    },
    {
      text: `<strong>${index + 1}. ${p1}</strong> part à l'école avec <strong>${start}</strong> ${obj.nom}. ${actors.pron} en distribue <strong>${val1}</strong> à ses camarades le matin et en oublie <strong>${val2}</strong> sur une table. Heureusement, l'après-midi, <strong>${p2}</strong> lui en offre <strong>${val3}</strong> pour le consoler.`,
      final: start - val1 - val2 + val3,
      diff: (start - val1 - val2 + val3) - start
    },
    {
      text: `<strong>${index + 1}. ${p1}</strong> range <strong>${start}</strong> ${obj.nom} dans un sac. ${actors.pron} en gagne <strong>${val1}</strong> à midi, puis en prête <strong>${val2}</strong> à <strong>${p2}</strong>. Sur le chemin du retour, ${pronL} en retrouve <strong>${val3}</strong> par terre.`,
      final: start + val1 - val2 + val3,
      diff: (start + val1 - val2 + val3) - start
    }
  ];

  const scenar = scenarios[getRandomInt(0, scenarios.length - 1)];

  card.dataset.type = 'prob-billes';
  card.dataset.ans1 = scenar.final;
  card.dataset.ans2 = scenar.diff >= 0 ? "gagné" : "perdu";
  card.dataset.ans3 = Math.abs(scenar.diff);

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">${scenar.text}</span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>1. Combien ${obj.type} lui reste-t-il ?</span> <input type="text" class="p-ans-1" style="width: 50px; text-align: center;" autocomplete="off"></div>
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>2. A la fin, a-t-${pronL} gagné ou perdu ${obj.typePluriel} ? (gagné/perdu)</span> <input type="text" class="p-ans-2" style="width: 75px; text-align: center;" autocomplete="off"></div>
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>3. Combien en a-t-${pronL} gagné/perdu ?</span> <input type="text" class="p-ans-3" style="width: 50px; text-align: center;" autocomplete="off"></div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generateDecompositionProblem(card, index, actors) {
  const { p1, pronL } = actors;
  const objets = [
    { nom: 'billes', type: 'ses billes', color1: 'rouges', color2: 'bleues', color3: 'vertes' },
    { nom: 'cartes', type: 'ses cartes', color1: 'dorées', color2: 'argentées', color3: 'normales' },
    { nom: 'perles', type: 'ses perles', color1: 'jaunes', color2: 'roses', color3: 'violettes' },
    { nom: 'autocollants', type: 'ses autocollants', color1: 'brillants', color2: 'noirs', color3: 'blancs' }
  ];
  const obj = objets[getRandomInt(0, objets.length - 1)];

  const part1 = getRandomInt(12, 30);
  const part2 = getRandomInt(10, 25);
  const total = part1 + part2 + getRandomInt(15, 35);
  const reponse = total - (part1 + part2);

  card.dataset.type = 'prob-decomposition';
  card.dataset.ans1 = reponse;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}.</strong> Pour son loisir créatif, <strong>${p1}</strong> possède au total <strong>${total}</strong> ${obj.nom}. 
        Parmi ceux-ci, ${pronL} compte <strong>${part1}</strong> ${obj.nom} ${obj.color1}, <strong>${part2}</strong> ${obj.nom} ${obj.color2}, et le reste est composé de ${obj.nom} ${obj.color3}.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>Combien de ${obj.nom} ${obj.color3} a-t-${pronL} ?</span> <input type="text" class="p-ans-1" style="width: 55px; text-align: center;" autocomplete="off"></div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generateArgentProblem(card, index, actors) {
  const { p1, pron } = actors;
  const depart = getRandomInt(15, 35);
  const article1 = ['un livre', 'une bande dessinée', 'un carnet', 'un stylo plume'][getRandomInt(0, 3)];
  const article2 = ['un jeu de société', 'un puzzle', 'une maquette', 'un petit ballon'][getRandomInt(0, 3)];
  const prix1 = getRandomInt(3, 8);
  const prix2 = getRandomInt(5, 12);
  const reste = depart - (prix1 + prix2);

  card.dataset.type = 'prob-argent';
  card.dataset.ans1 = reste >= 0 ? "oui" : "non";
  card.dataset.ans2 = Math.abs(reste);

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}.</strong> <strong>${p1}</strong> va à la librairie avec un billet de <strong>${depart} €</strong> en poche. 
        ${pron} achète ${article1} à <strong>${prix1} €</strong> et ${article2} à <strong>${prix2} €</strong>.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>1. A la fin, ${p1} a-t-${actors.pronL} assez d'argent ? (oui/non)</span> <input type="text" class="p-ans-1" style="width: 55px; text-align: center;" autocomplete="off"></div>
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>2. Montant exact restant (€) ou manquant (€) :</span> <input type="text" class="p-ans-2" style="width: 50px; text-align: center;" autocomplete="off"></div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generateMultipleProblem(card, index, actors) {
  const { p1, pronL } = actors;
  const articles = [
    { nom: 'paquets de cartes', unitaire: 'paquet' },
    { nom: 'boîtes de feutres', unitaire: 'boîte' },
    { nom: 'cahiers de dessin', unitaire: 'cahier' },
    { nom: 'sachets de bonbons', unitaire: 'sachet' }
  ];
  const art = articles[getRandomInt(0, articles.length - 1)];
  const quantite = getRandomInt(3, 9);
  const prixUnitaire = getRandomInt(2, 6);
  const totalPaye = quantite * prixUnitaire;

  card.dataset.type = 'prob-multiple';
  card.dataset.ans1 = totalPaye;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}. ${p1}</strong> achète <strong>${quantite}</strong> ${art.nom}. Chaque ${art.unitaire} coûte exactement <strong>${prixUnitaire} €</strong>.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>Combien ${p1} a-t-${pronL} payé au total (€) ?</span> <input type="text" class="p-ans-1" style="width: 50px; text-align: center;" autocomplete="off"></div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generateTempsProblem(card, index, actors) {
  const { p1 } = actors;
  const activites = ['son entraînement de football', 'sa leçon de piano', 'sa séance de natation', 'son cours de dessin'];
  const act = activites[getRandomInt(0, activites.length - 1)];

  const heureDepart = getRandomInt(8, 16);
  const minDepart = [0, 15, 30, 45][getRandomInt(0, 3)];
  const dureeMin = [30, 45, 60, 75, 90, 120][getRandomInt(0, 5)];
  let totalMin = heureDepart * 60 + minDepart + dureeMin;
  let heureFin = Math.floor(totalMin / 60) % 24;
  let minFin = totalMin % 60;

  card.dataset.type = 'prob-temps';
  card.dataset.ans1 = heureFin;
  card.dataset.ans2 = minFin === 0 ? "00" : minFin;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}. ${p1}</strong> commence ${act} à <strong>${heureDepart}h${minDepart === 0 ? '00' : minDepart}</strong>. L'activité dure exactement <strong>${dureeMin} minutes</strong>.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Heure de fin :</span>
          <span><input type="text" class="p-ans-1" style="width: 30px; text-align: center;" autocomplete="off"> h <input type="text" class="p-ans-2" style="width: 30px; text-align: center;" autocomplete="off"></span>
        </div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generatePartageProblem(card, index, actors) {
  const { p1 } = actors;
  const contextes = [
    { objet: 'photos', conteneur: `pages d'album` },
    { objet: 'gâteaux', conteneur: 'boîtes' },
    { objet: 'livres', conteneur: 'étagères' },
    { objet: 'fleurs', conteneur: 'vases' }
  ];
  const ctx = contextes[getRandomInt(0, contextes.length - 1)];

  const part = getRandomInt(4, 9);
  const multiplier = getRandomInt(4, 10);
  const totalObj = part * multiplier;

  card.dataset.type = 'prob-partage';
  card.dataset.ans1 = multiplier;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}. ${p1}</strong> possède <strong>${totalObj}</strong> ${ctx.objet} et souhaite en placer exactement <strong>${part}</strong> par ${ctx.conteneur.slice(0, -1)}.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>Nombre ${ctx.conteneur} remplies :</span> <input type="text" class="p-ans-1" style="width: 50px; text-align: center;" autocomplete="off"></div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generateLongueurProblem(card, index, actors) {
  const { p1, pronL } = actors;
  const trajets = [
    { action1: 'marche à pied', action2: 'prend le bus', unite: 'mètres' },
    { action1: 'roule à trottinette', action2: 'finit à pied', unite: 'mètres' },
    { action1: 'pédale à vélo', action2: 'marche sur un sentier', unite: 'mètres' }
  ];
  const traj = trajets[getRandomInt(0, trajets.length - 1)];

  const dist1 = getRandomInt(120, 450);
  const dist2 = getRandomInt(80, 350);

  card.dataset.type = 'prob-longueur';
  card.dataset.ans1 = dist1 + dist2;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}.</strong> Pour aller au collège, <strong>${p1}</strong> parcourt <strong>${dist1} m</strong> ${traj.action1} puis <strong>${dist2} m</strong> ${traj.action2}.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>Quelle distance totale ${pronL} parcourt-${pronL} ? :</span> <input type="text" class="p-ans-1" style="width: 55px; text-align: center;" autocomplete="off"> m</div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}