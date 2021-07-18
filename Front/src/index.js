// == Import : npm
import React from 'react';
// import ReactDom from 'react-dom';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import App from 'src/containers/App';
import { BrowserRouter } from 'react-router-dom';

// == Import : local
// Composants
import App from 'src/components/App';
// import store from 'src/store'; // Vient de redux

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
//   <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
// </Provider>
);
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
