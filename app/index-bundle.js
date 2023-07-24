/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\n\n// INTÉGRATION DE L'API\n// Fonction pour récupérer la page cible\nfunction constructAPIEndpoint(word, language) {\n  let version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'v2';\n  return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;\n}\n\n// Fonction pour traiter et afficher les données récupéré.\nfunction getAPIResponse(word, language) {\n  let version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'v2';\n  let api = constructAPIEndpoint(word, language, version);\n  fetch(api)\n\n  // Extrait et parse les données JSON de la réponse HTTP\n  .then(response => {\n    return response.json();\n  })\n  // Traitement des données pour les afficher\n  .then(data => {\n    // Récupérations des éléments\n\n    // Ajout titre comportant le mot\n    const wordElement = document.querySelector('#response #word-title');\n    wordElement.innerHTML = `<h2>${data[0].word}</h2>`;\n\n    // Audio\n    const audioElement = document.querySelector('#response #word-audio');\n    const audioData = data[0].phonetics.find(item => item.audio !== '');\n    const audioSource = document.querySelector('#response #audio-source');\n\n    // Ajoute la source à l'audio si il y a un audio.\n    audioSource.src = '';\n    if (audioData) {\n      audioElement.classList.remove('unavailable');\n      audioSource.src = audioData.audio;\n    } else if (!audioData) {\n      audioElement.classList.add('unavailable');\n    }\n    // Évènnement au clique sur le bouton pour jouer l'audio si il y en a un.\n    audioElement.addEventListener('click', function () {\n      audioSource.play().catch(e => {\n        return console.log(e);\n      });\n    });\n\n    // Ajout de la phonétique\n    const phoneticElement = document.querySelector('#response #phonetic');\n    let phoneticHTML = '';\n    for (let phoneticsObject of data[0].phonetics) {\n      const phoneticData = phoneticsObject.text;\n      if (phoneticData) phoneticHTML += `<p>${phoneticData}</p>`;\n      if (phoneticHTML != '') break;\n    }\n    if (phoneticHTML == '') phoneticHTML = '<p class=\"no-phonetics\">No phonetics available.</p>';\n    phoneticElement.innerHTML = phoneticHTML;\n\n    // Ajout des définitions\n    const definitionElement = document.querySelector('#response #def');\n    let definitionHTML = \"\";\n    for (let meaning of data[0].meanings) {\n      definitionHTML += `<h3 class=\\\"meaning\\\">${meaning.partOfSpeech}</h3>`;\n      definitionHTML += \"<ul>\";\n      let defs = meaning.definitions;\n      let i = 0;\n      for (let def of defs) {\n        if (i <= 2) {\n          definitionHTML += `<li class=\\\"definitions\\\">${def.definition}</li>`;\n        }\n        if (i > 2) {\n          break;\n        }\n        ;\n        i += 1;\n      }\n      definitionHTML += \"</ul>\";\n    }\n    definitionElement.innerHTML = definitionHTML;\n\n    // Ajout des synonymes si il y en a\n    const synonymsElement = document.querySelector('#response #synonyms');\n    let synonymsHTML = `<h2>Synonyms</h2>`;\n    let synonymsList = [];\n    for (let meaning of data[0].meanings) {\n      if (meaning.synonyms && meaning.synonyms.length > 0) {\n        synonymsList.push(`<p>${meaning.synonyms.join(', ')}</p>`);\n      }\n    }\n    if (synonymsList.length > 0) {\n      synonymsHTML += `<div>${synonymsList.join('')}</div>`;\n    }\n    if (synonymsList.length == 0) {\n      synonymsHTML = '';\n    }\n    synonymsElement.innerHTML = synonymsHTML;\n    document.querySelector('#before').hidden = true;\n    document.querySelector('#app').classList.replace('before', 'after');\n  })\n\n  // Si aucune definition n'est trouvée : affiche un message d'erreur et fait revenir la page principale\n  .catch(e => {\n    form.querySelector('label').hidden = false;\n  });\n}\nconst input = document.querySelector('input');\nfunction submitForm(e) {\n  // Récupérer le mot entré dans l'input par l'utilisateur\n  const word = input.value;\n  getAPIResponse(word, 'en');\n  document.title = `${word} - Dictionary`;\n}\n\n// Évennement de l'envoi\nconst form = document.querySelector('form');\nconst docBody = document.querySelector('body');\nform.addEventListener('submit', function (e) {\n  e.preventDefault();\n  if (window.matchMedia(\"(max-width: 412px)\").matches && docBody.classList.contains('initial412')) {\n    docBody.classList.replace('initial412', 'active412');\n    return;\n  }\n  if (!this.checkValidity()) {\n    input.placeholder = \"Please enter a word.\";\n    form.classList.add('invalid');\n    return;\n  }\n  form.classList.remove('invalid');\n  input.placeholder = \"Search your word here...\";\n  submitForm(this);\n  docBody.classList.replace('active412', 'initial412');\n});\n\n// Bouton pour le mode sombre/clair\n\ndocument.querySelector('#mode-switch').onclick = function () {\n  docBody.classList.toggle('theme-b');\n};\n\n// Basculer de police\nconst fontSelection = document.querySelector('#font-selection');\nconst initOpt = document.querySelector('.init-opt');\nfontSelection.onclick = () => {\n  if (initOpt) initOpt.remove();\n};\nfontSelection.addEventListener('change', function () {\n  if (initOpt) {\n    initOpt.remove();\n  }\n  if (this.value == 'sans') {\n    docBody.classList.remove('serif', 'mono');\n  }\n  ;\n  if (this.value == 'serif') {\n    docBody.classList.remove('mono');\n    docBody.classList.add('serif');\n  }\n  ;\n  if (this.value == 'mono') {\n    docBody.classList.remove('serif');\n    docBody.classList.add('mono');\n  }\n  ;\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
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