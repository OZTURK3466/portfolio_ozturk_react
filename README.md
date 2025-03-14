# Portfolio Développeur Web

Un portfolio moderne et interactif pour développeurs web, avec des animations avancées, support multilingue, et une interface utilisateur intuitive.

![Portfolio Preview](preview.png)

## 🚀 Fonctionnalités

- ✨ Design moderne avec animations et transitions fluides
- 🎨 Mode sombre/clair avec persistance des préférences
- 🌐 Support multilingue (français, anglais)
- 📱 Responsive design pour tous les appareils
- 📊 Visualisation des compétences et projets
- 🤖 Chatbot interactif pour engager les visiteurs
- 🖱️ Curseur personnalisé et micro-interactions
- 🔍 Études de cas détaillées sur les projets
- 🔄 Mode de performance adaptative

## 🛠️ Technologies utilisées

- **Frontend**: React, CSS3
- **Animations**: CSS Animations, Three.js (fond interactif)
- **Internationalisation**: i18next
- **Performance**: Context API, performance optimizations
- **Accessibilité**: WAI-ARIA, navigation au clavier

## 📋 Prérequis

- Node.js (v14.0.0 ou plus récent)
- npm (v6.0.0 ou plus récent) ou yarn (v1.22.0 ou plus récent)

## ⚙️ Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/votre-nom/portfolio.git
cd portfolio
```

2. Installez les dépendances :

```bash
# Avec npm
npm install

# Avec yarn
yarn
```

3. Créez un fichier `.env` à la racine du projet (si nécessaire) :

```
REACT_APP_API_URL=votre_url_api
```

## 🚀 Lancement du projet

### Mode développement

Pour lancer le projet en mode développement avec rechargement à chaud :

```bash
# Avec npm
npm start

# Avec yarn
yarn start
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

### Mode production

Pour créer une version optimisée pour la production :

```bash
# Avec npm
npm run build

# Avec yarn
yarn build
```

Pour servir localement la build de production :

```bash
# Avec npm
npm install -g serve
serve -s build

# Avec yarn
yarn global add serve
serve -s build
```

## 🧪 Tests

Pour lancer les tests :

```bash
# Avec npm
npm test

# Avec yarn
yarn test
```

## 📁 Structure du projet

```
src/
├── components/     # Composants React
├── context/        # Contextes React (thème, langue, performance)
├── hooks/          # Hooks personnalisés
├── locales/        # Fichiers de traduction
├── utils/          # Utilitaires et fonctions d'aide
├── App.js          # Composant principal
└── index.js        # Point d'entrée
```

## 🌐 Internationalisation

Le projet prend en charge plusieurs langues. Pour ajouter une nouvelle langue :

1. Créez un nouveau fichier de traduction dans `src/locales/<code-langue>/translation.json`
2. Ajoutez la nouvelle langue dans `src/i18n.js`
3. Ajoutez l'option dans le sélecteur de langue (`src/components/LanguageSwitcher.js`)

## 🎨 Personnalisation

### Couleurs et thèmes

Modifiez les variables CSS dans `src/App.css` pour changer les couleurs principales :

```css
:root {
  --primary-color: #6c63ff;
  --secondary-color: #2a2a72;
  /* autres variables */
}
```

### Contenu

Mettez à jour les informations personnelles et le contenu du portfolio dans les fichiers de composants correspondants, comme `src/components/About.js`, `src/components/Projects.js`, etc.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter :

- **Site web** : [votre-site.com](https://votre-site.com)
- **Email** : votre.email@exemple.com
- **LinkedIn** : [votre-profil](https://linkedin.com/in/votre-profil)
- **GitHub** : [votre-username](https://github.com/votre-username)

---

Développé avec ❤️ par [Votre Nom]