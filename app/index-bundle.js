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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ \"./src/index.html\");\n\n\nconst form = document.querySelector('form');\nconst label = document.querySelector('label');\nconst input = document.querySelector('input');\n\n// INTÉGRATION DE L'API\n// Fonction pour récupérer la page cible\nfunction constructAPIEndpoint(word, language) {\n  let version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'v2';\n  return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;\n}\n\n// Fonction pour traiter et afficher les données récupéré.\nfunction getAPIResponse(word, language) {\n  let version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'v2';\n  let api = constructAPIEndpoint(word, language, version);\n  fetch(api)\n\n  // Extrait et parse les données JSON de la réponse HTTP\n  .then(response => {\n    return response.json();\n  })\n  // Traitement des données pour les afficher\n  .then(data => {\n    // Récupérations des éléments\n\n    // Ajout titre comportant le mot\n    const wordElement = document.querySelector('#response #word-title');\n    wordElement.innerHTML = `<h2>${data[0].word}</h2>`;\n\n    // Audio\n    const audioElement = document.querySelector('#response #word-audio');\n    const audioData = data[0].phonetics.find(item => item.audio !== '');\n    const audioSource = document.querySelector('#response #audio-source');\n\n    // Ajoute la source à l'audio si il y a un audio.\n    audioSource.src = '';\n    if (audioData) {\n      audioElement.classList.remove('unavailable');\n      audioSource.src = audioData.audio;\n    } else if (!audioData) {\n      audioElement.classList.add('unavailable');\n    }\n    // Évènnement au clique sur le bouton pour jouer l'audio si il y en a un.\n    audioElement.addEventListener('click', function () {\n      audioSource.play().catch(e => {\n        return console.log(e);\n      });\n    });\n\n    // Ajout de la phonétique\n    const phoneticElement = document.querySelector('#response #phonetic');\n    let phoneticHTML = '';\n    for (let phoneticsObject of data[0].phonetics) {\n      const phoneticData = phoneticsObject.text;\n      if (phoneticData) phoneticHTML += `<p>${phoneticData}</p>`;\n      if (phoneticHTML != '') break;\n    }\n    if (phoneticHTML == '') phoneticHTML = '<p class=\"no-phonetics\">No phonetics available.</p>';\n    phoneticElement.innerHTML = phoneticHTML;\n\n    // Ajout des définitions\n    const definitionElement = document.querySelector('#response #def');\n    let definitionHTML = \"\";\n    for (let meaning of data[0].meanings) {\n      definitionHTML += `<h3 class=\\\"meaning\\\">${meaning.partOfSpeech}</h3>`;\n      definitionHTML += \"<ul>\";\n      let defs = meaning.definitions;\n      let i = 0;\n      for (let def of defs) {\n        if (i <= 2) {\n          definitionHTML += `<li class=\\\"definitions\\\">${def.definition}</li>`;\n        }\n        if (i > 2) {\n          break;\n        }\n        ;\n        i += 1;\n      }\n      definitionHTML += \"</ul>\";\n    }\n    definitionElement.innerHTML = definitionHTML;\n\n    // Ajout des synonymes si il y en a\n    const synonymsElement = document.querySelector('#response #synonyms');\n    let synonymsHTML = `<h2>Synonyms</h2>`;\n    let synonymsList = [];\n    for (let meaning of data[0].meanings) {\n      if (meaning.synonyms && meaning.synonyms.length > 0) {\n        synonymsList.push(`<p>${meaning.synonyms.join(', ')}</p>`);\n      }\n    }\n    if (synonymsList.length > 0) {\n      synonymsHTML += `<div>${synonymsList.join('')}</div>`;\n    }\n    if (synonymsList.length == 0) {\n      synonymsHTML = '';\n    }\n    synonymsElement.innerHTML = synonymsHTML;\n    document.querySelector('#before').hidden = true;\n    document.querySelector('#app').classList.replace('before', 'after');\n  })\n\n  // Si aucune definition n'est trouvée : affiche un message d'erreur et fait revenir la page principale\n  .catch(e => {\n    label.hidden = false;\n    docBody.classList.replace('initial412', 'active412');\n    form.classList.add('invalid');\n    input.value = '';\n  });\n}\nfunction submitForm(e) {\n  // Récupérer le mot entré dans l'input par l'utilisateur\n  const word = input.value;\n  getAPIResponse(word, 'en');\n  document.title = `${word} - Dictionary`;\n}\n\n// Évennement de l'envoi\nconst docBody = document.querySelector('body');\nform.addEventListener('submit', function (e) {\n  e.preventDefault();\n  if (window.matchMedia(\"(max-width: 412px)\").matches && docBody.classList.contains('initial412')) {\n    docBody.classList.replace('initial412', 'active412');\n    return;\n  }\n  if (!this.checkValidity()) {\n    input.placeholder = \"Please enter a word.\";\n    form.classList.add('invalid');\n    return;\n  }\n  form.classList.remove('invalid');\n  input.placeholder = \"Search your word here...\";\n  submitForm(this);\n  docBody.classList.replace('active412', 'initial412');\n  label.hidden = true;\n});\n\n// Bouton pour le mode sombre/clair\ndocument.querySelector('#mode-switch').onclick = function () {\n  docBody.classList.toggle('theme-b');\n};\n\n// Basculer de police\nconst fontSelection = document.querySelector('#font-selection');\nconst initOpt = document.querySelector('.init-opt');\nfontSelection.onclick = () => {\n  if (initOpt) initOpt.remove();\n};\nfontSelection.addEventListener('change', function () {\n  if (initOpt) {\n    initOpt.remove();\n  }\n  if (this.value == 'sans') {\n    docBody.classList.remove('serif', 'mono');\n  }\n  ;\n  if (this.value == 'serif') {\n    docBody.classList.remove('mono');\n    docBody.classList.add('serif');\n  }\n  ;\n  if (this.value == 'mono') {\n    docBody.classList.remove('serif');\n    docBody.classList.add('mono');\n  }\n  ;\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ \"./node_modules/html-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/dictionary_favicon.ico */ \"./src/assets/dictionary_favicon.ico\"), __webpack_require__.b);\n// Module\nvar ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);\nvar code = \"<!DOCTYPE html>\\r\\n<html lang=\\\"en\\\">\\r\\n    <head>\\r\\n        <meta charset=\\\"utf-8\\\">\\r\\n        <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\r\\n        <link rel=\\\"shortcut icon\\\" href=\\\"\" + ___HTML_LOADER_REPLACEMENT_0___ + \"\\\" type=\\\"image/x-icon\\\">\\r\\n        <title>Dictionary</title>\\r\\n    </head>\\r\\n    <body class=\\\"preload theme initial412 sans\\\">\\r\\n        <header>\\r\\n            <a id=\\\"header-title\\\" href=\\\"index.html\\\">\\r\\n                <img src=\\\"\" + ___HTML_LOADER_REPLACEMENT_0___ + \"\\\" alt=\\\"Book with a A writen on\\\" width=\\\"45\\\" height=\\\"45\\\">\\r\\n                <h1>Dictionary</h1>\\r\\n            </a>\\r\\n            <div>\\r\\n                <form action=\\\"#\\\" novalidate>\\r\\n                    <input id=\\\"input\\\" aria-label=\\\"Input\\\" autocapitalize=\\\"off\\\" type=\\\"text\\\" placeholder=\\\"Search your word here...\\\" autocomplete=\\\"off\\\" required>\\r\\n                    <button id=\\\"search\\\" aria-label=\\\"Search button\\\" type=\\\"submit\\\" title=\\\"Search\\\"><svg id=\\\"svg\\\" viewBox=\\\"0 0 26 26\\\" width=\\\"26px\\\" height=\\\"26px\\\"><path d=\\\"M 10 0.1875 C 4.578125 0.1875 0.1875 4.578125 0.1875 10 C 0.1875 15.421875 4.578125 19.8125 10 19.8125 C 12.289063 19.8125 14.394531 19.003906 16.0625 17.6875 L 16.9375 18.5625 C 16.570313 19.253906 16.699219 20.136719 17.28125 20.71875 L 21.875 25.34375 C 22.589844 26.058594 23.753906 26.058594 24.46875 25.34375 L 25.34375 24.46875 C 26.058594 23.753906 26.058594 22.589844 25.34375 21.875 L 20.71875 17.28125 C 20.132813 16.695313 19.253906 16.59375 18.5625 16.96875 L 17.6875 16.09375 C 19.011719 14.421875 19.8125 12.300781 19.8125 10 C 19.8125 4.578125 15.421875 0.1875 10 0.1875 Z M 10 2 C 14.417969 2 18 5.582031 18 10 C 18 14.417969 14.417969 18 10 18 C 5.582031 18 2 14.417969 2 10 C 2 5.582031 5.582031 2 10 2 Z M 4.9375 7.46875 C 4.421875 8.304688 4.125 9.289063 4.125 10.34375 C 4.125 13.371094 6.566406 15.8125 9.59375 15.8125 C 10.761719 15.8125 11.859375 15.433594 12.75 14.8125 C 12.511719 14.839844 12.246094 14.84375 12 14.84375 C 8.085938 14.84375 4.9375 11.695313 4.9375 7.78125 C 4.9375 7.675781 4.933594 7.574219 4.9375 7.46875 Z\\\"/></svg></button>\\r\\n                </form>\\r\\n                <label id=\\\"error-text\\\" for=\\\"input\\\" hidden>Word not found. Please try again.</label>\\r\\n            </div>\\r\\n            <div id=\\\"mode-box\\\">\\r\\n                <div id=\\\"mode-switch\\\"></div>\\r\\n            </div>\\r\\n        </header>\\r\\n        <main id=\\\"container\\\">\\r\\n            <div id=\\\"app\\\" class=\\\"before\\\">\\r\\n                <div id=\\\"before\\\">\\r\\n                    <h2>Welcome to THE dictionary !</h2>\\r\\n                    <p>Are you looking for a word's definition ? You can do it here in a few seconds !</p>\\r\\n                    <p>Just type the word you want to look for and press the button.</p>\\r\\n                    <p>Website made with <a href=\\\"https://dictionaryapi.dev/\\\" target=\\\"_blank\\\">Free Dictionary API</a>.</p>\\r\\n                </div>\\r\\n                <div id=\\\"response\\\">\\r\\n                    <div id=\\\"word\\\">\\r\\n                        <div id=\\\"word-audio\\\">\\r\\n                            <svg width='50px' height='50px' fill='#000000' version='1.1' viewBox='0 0 522.23 522.23' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'><path d='m346.35 41.163c-10.855-10.367-25.076-16.078-40.045-16.078-10.832 0-21.445 3.063-30.689 8.857l-159.16 99.761h-58.101c-31.9 0-57.854 25.952-57.854 57.853v138.92c0 31.9 25.953 57.854 57.854 57.854h57.773l159.49 99.965c9.244 5.795 19.857 8.857 30.691 8.857 14.969 0 29.189-5.71 40.047-16.078 5.543-5.293 9.908-11.525 12.979-18.523 3.227-7.353 4.861-15.184 4.861-23.275v-356.31c0-8.094-1.635-15.925-4.861-23.278-3.071-6.996-7.438-13.228-12.981-18.522zm-24.996 219.85v178.26c0 8.803-7.227 15.037-15.049 15.037-2.664 0-5.398-0.724-7.939-2.316l-161.14-101c-5.736-3.595-12.368-5.502-19.138-5.502h-59.73c-8.292 0-15.014-6.722-15.014-15.014v-138.92c0-8.291 6.722-15.013 15.014-15.013h60.059c6.77 0 13.4-1.907 19.137-5.502l160.82-100.8c2.541-1.593 5.273-2.316 7.939-2.316 7.822 0 15.049 6.236 15.049 15.038v178.05z'/><path d='m306.3 497.65c-10.929 0-21.634-3.089-30.957-8.934l-159.36-99.889h-57.629c-32.177 1e-3 -58.354-26.177-58.354-58.352v-138.92c0-32.176 26.177-58.353 58.354-58.353h57.958l159.04-99.684c9.325-5.844 20.029-8.934 30.955-8.934 15.096 0 29.44 5.759 40.391 16.216 5.591 5.34 9.995 11.625 13.093 18.683 3.254 7.415 4.903 15.314 4.903 23.479v356.31c0 8.163-1.649 16.062-4.903 23.477-3.099 7.062-7.503 13.348-13.091 18.684-10.952 10.458-25.297 16.216-40.393 16.216zm-247.95-363.45c-31.625 0-57.354 25.728-57.354 57.353v138.92c0 31.625 25.729 57.354 57.354 57.354h57.917l0.122 0.076 159.49 99.965c9.164 5.745 19.685 8.781 30.426 8.781 14.838 0 28.938-5.661 39.701-15.939 5.493-5.245 9.821-11.423 12.866-18.363 3.198-7.287 4.819-15.05 4.819-23.074v-356.31c0-8.025-1.621-15.79-4.819-23.077-3.044-6.937-7.373-13.114-12.868-18.362-10.763-10.279-24.861-15.939-39.699-15.939-10.738 0-21.259 3.037-30.424 8.781l-159.28 99.837h-58.245zm247.95 320.61c-2.87 0-5.708-0.827-8.205-2.393l-161.14-101c-5.664-3.55-12.189-5.426-18.872-5.426h-59.73c-8.554 0-15.514-6.959-15.514-15.514v-138.92c0-8.554 6.959-15.513 15.514-15.513h60.059c6.682 0 13.207-1.876 18.871-5.426l160.82-100.8c2.497-1.565 5.335-2.393 8.205-2.393 8.573 0 15.549 6.97 15.549 15.538v356.31c0 8.568-6.976 15.538-15.549 15.538zm-247.95-277.77c-8.003 0-14.514 6.51-14.514 14.513v138.92c0 8.003 6.511 14.514 14.514 14.514h59.73c6.871 0 13.58 1.929 19.403 5.578l161.14 101c2.338 1.466 4.991 2.24 7.674 2.24 8.022 0 14.549-6.521 14.549-14.537v-356.31c0-8.016-6.526-14.538-14.549-14.538-2.683 0-5.336 0.774-7.674 2.24l-160.82 100.8c-5.824 3.649-12.533 5.578-19.402 5.578h-60.058z'/><path d='m424.27 156.54c-5.266-10.594-18.125-14.911-28.715-9.646-10.594 5.266-14.912 18.123-9.646 28.716 12.426 24.995 18.992 54.604 18.992 85.626 0 31.506-6.754 61.487-19.533 86.705-5.348 10.553-1.129 23.442 9.424 28.79 3.104 1.572 6.408 2.317 9.664 2.317 7.816 0 15.35-4.294 19.125-11.742 15.807-31.191 24.16-67.869 24.16-106.07 2e-3 -37.604-8.115-73.808-23.471-104.7z'/><path d='m404.46 379.54c-3.456 0-6.784-0.798-9.89-2.371-10.782-5.464-15.108-18.681-9.645-29.462 12.744-25.147 19.479-55.052 19.479-86.479 0-30.948-6.549-60.48-18.939-85.404-2.606-5.243-3.016-11.188-1.15-16.738 1.864-5.55 5.778-10.042 11.021-12.648 3.064-1.523 6.341-2.296 9.739-2.296 8.388 0 15.916 4.662 19.646 12.167 15.391 30.959 23.524 67.239 23.522 104.92 0 38.28-8.373 75.037-24.214 106.3-3.755 7.411-11.255 12.016-19.569 12.016zm0.616-234.4c-3.242 0-6.369 0.737-9.294 2.191-5.004 2.487-8.74 6.774-10.52 12.071-1.779 5.297-1.39 10.97 1.098 15.974 12.459 25.062 19.045 54.748 19.045 85.849 0 31.584-6.773 61.645-19.587 86.931-5.215 10.29-1.086 22.904 9.203 28.118 2.965 1.502 6.141 2.264 9.438 2.264 7.936 0 15.094-4.395 18.679-11.468 15.771-31.12 24.106-67.721 24.106-105.84 2e-3 -37.526-8.096-73.652-23.418-104.47-3.559-7.161-10.744-11.611-18.75-11.611z'/><path d='m456.55 88.245c-10.594 5.266-14.912 18.122-9.646 28.716 20.932 42.105 31.994 91.864 31.994 143.9 0 52.847-11.381 103.24-32.912 145.73-5.348 10.552-1.129 23.441 9.424 28.788 3.104 1.573 6.408 2.318 9.666 2.318 7.814 0 15.35-4.294 19.123-11.743 24.559-48.462 37.539-105.55 37.539-165.09 0-58.615-12.611-114.97-36.473-162.97-5.266-10.593-18.121-14.913-28.715-9.645z'/><path d='m465.07 438.19c-3.458 0-6.787-0.798-9.893-2.372-5.223-2.646-9.102-7.168-10.923-12.732s-1.367-11.506 1.279-16.728c21.496-42.42 32.858-92.733 32.858-145.5 0-51.958-11.045-101.64-31.941-143.67-5.381-10.824-0.952-24.006 9.871-29.386 3.065-1.524 6.343-2.297 9.742-2.297 8.386 0 15.912 4.663 19.643 12.167 23.896 48.067 36.525 104.5 36.525 163.19 0 59.619-12.999 116.78-37.593 165.32-3.753 7.414-11.252 12.018-19.568 12.018zm0.994-351.69c-3.243 0-6.371 0.738-9.297 2.193-5.004 2.487-8.74 6.774-10.52 12.071s-1.389 10.97 1.098 15.974c20.966 42.172 32.047 92.008 32.047 144.12 0 52.924-11.399 103.39-32.966 145.95-2.526 4.984-2.96 10.654-1.222 15.965s5.44 9.626 10.425 12.151c2.965 1.503 6.141 2.265 9.44 2.265 7.937 0 15.094-4.395 18.677-11.469 24.523-48.392 37.485-105.4 37.485-164.86 0-58.54-12.594-114.82-36.42-162.74-3.56-7.164-10.744-11.613-18.747-11.613z'/></svg>\\r\\n                            <div id=\\\"sources\\\">\\r\\n                                <audio id=\\\"audio-source\\\" src=\\\"#\\\"></audio>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                        <div id=\\\"word-title\\\"></div>\\r\\n                    </div>\\r\\n                    <div id=\\\"phonetic\\\"></div>\\r\\n                    <div id=\\\"def\\\"></div>\\r\\n                    <div id=\\\"synonyms\\\"></div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </main>\\r\\n        <footer>\\r\\n            <a href=\\\"https://dictionaryapi.dev/\\\" target=\\\"_blank\\\">Made with Free Dictionary API</a>\\r\\n            <div id=\\\"font-menu\\\">\\r\\n                <select name=\\\"font-selection\\\" id=\\\"font-selection\\\">\\r\\n                    <option value=\\\"\\\" class=\\\"init-opt\\\">Select a font</option>\\r\\n                    <option value=\\\"sans\\\">Sans-Serif</option>\\r\\n                    <option value=\\\"serif\\\">Serif</option>\\r\\n                    <option value=\\\"mono\\\">Monospace</option>\\r\\n                </select>\\r\\n            </div>\\r\\n        </footer>\\r\\n    </body>\\r\\n</html>\";\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (code);\n\n//# sourceURL=webpack://my-webpack-project/./src/index.html?");

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = String(url.__esModule ? url.default : url);\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  }\n\n  if (options.maybeNeedQuotes && /[\\t\\n\\f\\r \"'=<>`]/.test(url)) {\n    return \"\\\"\".concat(url, \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/html-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-webpack-project/./src/style.scss?");

/***/ }),

/***/ "./src/assets/dictionary_favicon.ico":
/*!*******************************************!*\
  !*** ./src/assets/dictionary_favicon.ico ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/dictionary_favicon.ico\";\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/dictionary_favicon.ico?");

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
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