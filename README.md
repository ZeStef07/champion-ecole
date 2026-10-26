# 🎈 Champion École 🌟

Application web éducative interactive, moderne et colorée, spécialement conçue pour accompagner les enfants en **Maternelle** et en **CE2** dans leurs apprentissages scolaires.

---

## 🚀 Fonctionnalités principales

L'application est divisée en 4 grandes matières dotées d'une architecture modulaire et d'un design pensé pour les enfants (police Fredoka, dégradés pastels, boutons bulles et animations fluides) :

### 📝 1. Français (Niveau CE2)
* **Orthographe** : Exercices ciblés d'orthographe lexicale et grammaticale.
* **Conjugaison** : Entraînement sur tous les pronoms, les verbes du 1er groupe, ainsi que les auxiliaires *être* et *avoir* (présent, imparfait, futur).
* **Mode d'évaluation** : Tirage aléatoire de séries de 5 questions dynamiques.

### 🔢 2. Mathématiques (Niveau CE2)
* **Opérations** : Posage et calcul d'opérations rigoureusement alignées.
* **Numération** : Exercices sur les grands nombres et leur décomposition.
* **Fractions** : Manipulation de fractions avec affichage vertical.
* **Périmètres** : Calculs de contours de figures géométriques.
* **Problèmes** : Grande banque de problèmes aux scénarios variés et renouvelés.

### 🇬🇧 3. Anglais
* **Vocabulaire** : Apprentissage des nombres de 1 à 20 et des mois de l'année.
* **Question dynamique** : Module interactif *"What's the day today?"* basé automatiquement sur la date courante du jour.

### 🎨 4. Maternelle
* **Paniers** : Trier et classer des objets selon leur catégorie.
* **Intrus** : Identifier l'élément qui ne correspond pas dans un groupe.
* **Trouve** : Exercice visuel et auditif d'association de formes (rond, carré, triangle) et de couleurs, guidé par une synthèse vocale.

---

## 💡 Points techniques & Optimisations

* **Architecture Modulaire** : Séparation claire du code par matière et par sous-module JavaScript (`config.js`, `main.js`, modules spécifiques).
* **Routage par URL** : Persistance de l'onglet et du sous-onglet actifs via les fragments d'URL (ex: `#francais/conjugaison`, `#maths/fractions`, `#maternelle/trouve`) pour supporter le rechargement (`F5`) et l'historique du navigateur.
* **Synthèse Vocale Audio (Text-to-Speech)** : Intégration robuste de `SpeechSynthesisUtterance` avec contournement des blocages de sécurité sur mobiles (iOS Safari & Google Chrome mobile) grâce à une référence globale anti-garbage collection et un déverrouillage tactile.
* **Design Responsive** : Optimisé pour ordinateurs, tablettes et smartphones avec une grille fluide et adaptée aux jeunes enfants.

---

## 📂 Structure du projet

```text
champion-ecole/
├── index.html                 # Point d'entrée principal
├── styles.css                 # Feuille de style globale (Thème moderne & enfantin)
└── assets/
    └──img/
        ├──favicon.ico                # Icône du site
└── js/
    ├── config.js              # Données de configuration (couleurs, formes, etc.)
    ├── main.js                # Routage principal et gestion des onglets
    ├── utils.js               # Fonctions utilitaires (aléatoire, mélange)
    ├── confettis.js           # Animation de réussite
    └── modules/
        ├── francais.js        # Module Français
        ├── orthographe.js     # Sous-module Orthographe
        ├── maths.js           # Module Mathématiques
        ├── anglais.js         # Module Anglais
        ├── maternelle.js      # Module Maternelle global
        └── maternelle/
            ├── paniers.js     # Exercice Paniers
            ├── intrus.js      # Exercice Intrus
            └── trouve.js      # Exercice Trouve (Formes et couleurs)
        └── maths/
            ├── fractions.js   # Exercice Fractions
            ├── numeration.js  # Exercice Numérations
            ├── operations.js  # Exercice Opérations
            ├── perimetres.js  # Exercice Périmètres
            └── problemes.js   # Exercice Problèmes