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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\n// import './style.scss';\n// // Formulaire\nvar form = document.querySelector('#app form');\nvar title = document.querySelector('h1');\nvar paragraph = document.querySelector('#app > p');\n// const request = new XMLHttpRequest();\n\n// function constructAPIEndpoint(word, language, version = 'v2') {\n//     return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;\n// };\n\n// form.addEventListener(\"submit\", function(e) {\n//     e.preventDefault();\n//     let word = document.querySelector('input').value, language = 'en';\n//     return window.open('./definition.html', '_blank');\n// });\n\n\nfunction constructAPIEndpoint(word, language) {\n  var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'v2';\n  return \"https://api.dictionaryapi.dev/api/\".concat(version, \"/entries/\").concat(language, \"/\").concat(word);\n}\nfunction getAPIResponse(word, language) {\n  var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'v2';\n  var endpoint = constructAPIEndpoint(word, language, version);\n  fetch(endpoint).then(function (response) {\n    if (!response.ok) {\n      title.textContent = 'No result !';\n    }\n    return response.json();\n  }).then(function (data) {\n    // Récupérer les éléments\n    var wordElement = document.querySelector('#response #word h2');\n    var audioElement = document.querySelector('#response #audio');\n    var definitionElement = document.querySelector('#response #def');\n    var synonymsElement = document.querySelector('#response #synonyms');\n    var antonymsElement = document.querySelector('#response #antonyms');\n\n    // Mettre à jour les éléments\n    wordElement.textContent = data[0].word;\n\n    // Chercher l'audio avec une URL\n    var audioData = data[0].phonetics.find(function (item) {\n      return item.audio !== '';\n    });\n    if (audioData) {\n      audioElement.innerHTML = \"<audio controls src=\\\"\".concat(audioData.audio, \"\\\"></audio>\");\n    }\n\n    // Afficher les définitions\n    var definitionHTML = \"\";\n    var _iterator = _createForOfIteratorHelper(data[0].meanings),\n      _step;\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var meaning = _step.value;\n        definitionHTML += \"<h3 class=\\\"meaning\\\">\".concat(meaning.partOfSpeech, \"</h3>\");\n        definitionHTML += \"<ul>\";\n        var _iterator4 = _createForOfIteratorHelper(meaning.definitions),\n          _step4;\n        try {\n          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n            var def = _step4.value;\n            definitionHTML += \"<li>\".concat(def.definition, \"</li>\");\n          }\n        } catch (err) {\n          _iterator4.e(err);\n        } finally {\n          _iterator4.f();\n        }\n        definitionHTML += \"</ul>\";\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n    definitionElement.innerHTML = definitionHTML;\n\n    // Afficher les synonymes\n    var synonymsHTML = \"<h2>Synonymes</h2>\";\n    var synonymsList = [];\n    var _iterator2 = _createForOfIteratorHelper(data[0].meanings),\n      _step2;\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var _meaning = _step2.value;\n        if (_meaning.synonyms && _meaning.synonyms.length > 0) {\n          synonymsList.push(\"<li>\".concat(_meaning.synonyms.join(', '), \"</li>\"));\n        }\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n    if (synonymsList.length > 0) {\n      synonymsHTML += \"<ul>\".concat(synonymsList.join(''), \"</ul>\");\n    }\n    synonymsElement.innerHTML = synonymsHTML;\n\n    // Afficher les antonymes\n    var antonymsHTML = \"<h2>Antonymes</h2>\";\n    var antonymsList = [];\n    var _iterator3 = _createForOfIteratorHelper(data[0].meanings),\n      _step3;\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var _meaning2 = _step3.value;\n        if (_meaning2.antonyms && _meaning2.antonyms.length > 0) {\n          antonymsList.push(\"<li>\".concat(_meaning2.antonyms.join(', '), \"</li>\"));\n        }\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n    if (antonymsList.length > 0) {\n      antonymsHTML += \"<ul>\".concat(antonymsList.join(''), \"</ul>\");\n    }\n    antonymsElement.innerHTML = antonymsHTML;\n  }).catch(function (e) {\n    console.log('There was a problem with your fetch operation: ' + e.message);\n    title.textContent = 'No result !';\n    paragraph.textContent = \"Cannot find \".concat(word, \" or there was a problem with the API. Please try again.\");\n  });\n}\nform.addEventListener('submit', function (e) {\n  // Empêcher le comportement par défaut de la soumission du formulaire\n  e.preventDefault();\n  // Récupérer le mot entré par l'utilisateur\n  var word = document.querySelector('input').value;\n\n  // Faire la requête API\n  getAPIResponse(word, 'en');\n  console.log(getAPIResponse.ok);\n  if (response.ok) {\n    form.hidden = 'true';\n  }\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

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