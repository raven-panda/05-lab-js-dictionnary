/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\n\n// INTÉGRATION DE L'API\n// Fonction pour récupérer la page cible\nfunction constructAPIEndpoint(word, language) {\n  let version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'v2';\n  return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;\n}\n\n// Fonction pour traiter et afficher les données récupéré.\nfunction getAPIResponse(word, language) {\n  let version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'v2';\n  let endpoint = constructAPIEndpoint(word, language, version);\n  fetch(endpoint)\n\n  // Extrait et parse les données JSON de la réponse HTTP\n  .then(response => {\n    return response.json();\n  })\n\n  // Traitement des données pour les afficher\n  .then(data => {\n    // Récupérations des éléments\n    const wordElement = document.querySelector('#response #word');\n    const audioElement = document.querySelector('#response #audio');\n    const definitionElement = document.querySelector('#response #def');\n    const synonymsElement = document.querySelector('#response #synonyms');\n    const antonymsElement = document.querySelector('#response #antonyms');\n\n    // Ajout titre comportant le mot\n    let wordHTML = `<h2>${data[0].word}</h2>`;\n    wordElement.innerHTML = wordHTML;\n\n    // Ajout de l'audio si il y en a un\n    const audioData = data[0].phonetics.find(item => item.audio !== '');\n    if (audioData) {\n      audioElement.innerHTML = `<h2></h2><audio controls src=\\\"${audioData.audio}\\\"></audio>`;\n    }\n\n    // Ajout des définitions\n    let definitionHTML = \"\";\n    for (let meaning of data[0].meanings) {\n      definitionHTML += `<h3 class=\\\"meaning\\\">${meaning.partOfSpeech}</h3>`;\n      definitionHTML += \"<div>\";\n      let defs = meaning.definitions;\n      /*let i = 0;*/\n      for (let def of defs) {\n        /*if (i <= 3) {*/\n        definitionHTML += `<p class=\\\"definitions\\\">${def.definition}</p>`;\n        /*}\r\n        if (i == 2) {\r\n             let more = defs.length - i;\r\n             definitionHTML += `<p id=\\\"show-more\\\">Show ${more} more...</p>`;\r\n        };\r\n        if (i > 2) {\r\n             definitionHTML += `<p class=\\\"definitions invisible\\\">${def.definition}</p>`\r\n        };*/\n      }\n\n      definitionHTML += \"</div>\";\n    }\n    if (definitionHTML.length == 0) {\n      antonymsHTML = '';\n    }\n    definitionElement.innerHTML = definitionHTML;\n    /*const showMoreP = document.querySelector('#show-more');\r\n    showMoreP.addEventListener('click', function () {\r\n        let defPs = document.querySelectorAll('.invisible');\r\n        for (let defP of defPs) {\r\n             defP.classList.remove('invisible');\r\n        }\r\n        showMoreP.remove();\r\n    })*/\n\n    // Ajout des synonymes si il y en a\n    let synonymsHTML = `<h2>Synonymes</h2>`;\n    let synonymsList = [];\n    for (let meaning of data[0].meanings) {\n      if (meaning.synonyms && meaning.synonyms.length > 0) {\n        synonymsList.push(`<p>${meaning.synonyms.join(', ')}</p>`);\n      }\n    }\n    if (synonymsList.length > 0) {\n      synonymsHTML += `<div>${synonymsList.join('')}</div>`;\n    }\n    if (synonymsList.length == 0) {\n      antonymsHTML = '';\n    }\n    synonymsElement.innerHTML = synonymsHTML;\n\n    // Ajout des antonymes si il y en a\n    let antonymsHTML = `<h2>Antonymes</h2>`;\n    let antonymsList = [];\n    for (let meaning of data[0].meanings) {\n      if (meaning.antonyms && meaning.antonyms.length > 0) {\n        antonymsList.push(`<p>${meaning.antonyms.join(', ')}</p>`);\n      }\n    }\n    if (antonymsList.length > 0) {\n      antonymsHTML += `<div>${antonymsList.join('')}</div>`;\n    }\n    if (antonymsList.length == 0) {\n      antonymsHTML = '';\n    }\n    antonymsElement.innerHTML = antonymsHTML;\n  })\n\n  // Si aucune definition n'est trouvée : affiche un message d'erreur et fait revenir la page principale.\n  .catch(e => {\n    alert('Cannot find your word, please try again.');\n    window.location.reload();\n  });\n}\n\n// BOUTON MODE CLAIR OU SOMBRE\nconst switchMode = document.querySelector('#switch');\nconst container = document.querySelector('#container');\nconst body = document.querySelector('body');\nswitchMode.addEventListener('click', function () {\n  container.classList.toggle('theme-b');\n  body.classList.toggle('theme-b');\n});\n\n// ENVOI DU FORMULAIRE\n// Récupération des éléments\nconst title = document.querySelector('h1');\nconst desc = document.querySelector('#desc');\nconst app = document.querySelector('#app');\nconst responseBlock = document.querySelector('#response');\n\n// Évennement de l'envoi\nconst form = document.querySelector('#app form');\nform.addEventListener('submit', function (e) {\n  e.preventDefault();\n\n  // Récupérer le mot entré dans l'input par l'utilisateur\n  const word = document.querySelector('input').value;\n\n  // Ajout des classes aux éléments qui doivent disparaître\n  title.classList.add('submitted');\n  desc.classList.add('submitted');\n  form.classList.add('submitted');\n\n  // Mise invisible du contenu de la première page et requête de l'API retardée pour que ça se fasse après l'animation\n  setTimeout(function () {\n    title.classList.add('invisible');\n    desc.classList.add('invisible');\n    app.classList.add('submitted');\n    form.classList.add('invisible');\n    getAPIResponse(word, 'en');\n    responseBlock.classList.add('active');\n    document.title = `${word} - Dictionary`;\n  }, 600);\n\n  // Affichage temporisé du message 'Want to search for another definition ?'\n  const timedMsg = document.querySelector('a p');\n  setTimeout(function () {\n    timedMsg.classList.add('timed');\n  }, 10000);\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-webpack-project/./src/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;