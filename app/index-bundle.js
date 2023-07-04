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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\n\nvar title = document.querySelector('h1');\nvar desc = document.querySelector('#desc');\nvar app = document.querySelector('#app');\nfunction constructAPIEndpoint(word, language) {\n  var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'v2';\n  return \"https://api.dictionaryapi.dev/api/\".concat(version, \"/entries/\").concat(language, \"/\").concat(word);\n}\nfunction getAPIResponse(word, language) {\n  var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'v2';\n  var endpoint = constructAPIEndpoint(word, language, version);\n  fetch(endpoint)\n  // Message d'erreur si il y en a une\n  .then(function (response) {\n    // if (!response.ok) {\n\n    // } \n    return response.json();\n  }).then(function (data) {\n    // Variables pour récupérer les éléments\n    var wordElement = document.querySelector('#response #word h2');\n    var audioElement = document.querySelector('#response #audio');\n    var definitionElement = document.querySelector('#response #def');\n    var synonymsElement = document.querySelector('#response #synonyms');\n    var antonymsElement = document.querySelector('#response #antonyms');\n\n    // Mettre à jour les éléments\n    wordElement.textContent = data[0].word;\n\n    // Audio\n    var audioData = data[0].phonetics.find(function (item) {\n      return item.audio !== '';\n    });\n    if (audioData) {\n      audioElement.innerHTML = \"<audio controls src=\\\"\".concat(audioData.audio, \"\\\"></audio>\");\n    }\n\n    // Définitions\n    var definitionHTML = \"\";\n    var _iterator = _createForOfIteratorHelper(data[0].meanings),\n      _step;\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var meaning = _step.value;\n        definitionHTML += \"<h3 class=\\\"meaning\\\">\".concat(meaning.partOfSpeech, \"</h3>\");\n        definitionHTML += \"<div>\";\n        var defs = meaning.definitions;\n        var i = 0;\n        var _iterator4 = _createForOfIteratorHelper(defs),\n          _step4;\n        try {\n          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n            var def = _step4.value;\n            // if (i <= 3) {\n            definitionHTML += \"<p class=\\\"definitions\\\">\".concat(def.definition, \"</p>\");\n            // }\n            // if (i == 2) {\n            //     let more = defs.length - i;\n            //     definitionHTML += `<p id=\\\"show-more\\\">Show ${more} more...</p>`;\n            // };\n            // if (i > 2) {\n            //     definitionHTML += `<p class=\\\"definitions invisible\\\">${def.definition}</p>`\n            // };\n          }\n        } catch (err) {\n          _iterator4.e(err);\n        } finally {\n          _iterator4.f();\n        }\n        definitionHTML += \"</div>\";\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n    definitionElement.innerHTML = definitionHTML;\n    // const showMoreP = document.querySelector('#show-more');\n    // showMoreP.addEventListener('click', function () {\n    //     let defPs = document.querySelectorAll('.invisible');\n    //     for (let defP of defPs) {\n    //         defP.classList.remove('invisible');\n    //     }\n    //     showMoreP.remove();\n    // })\n\n    // Synonymes\n    var synonymsHTML = \"<h2>Synonymes</h2>\";\n    var synonymsList = [];\n    var _iterator2 = _createForOfIteratorHelper(data[0].meanings),\n      _step2;\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var _meaning = _step2.value;\n        if (_meaning.synonyms && _meaning.synonyms.length > 0) {\n          synonymsList.push(\"<p>\".concat(_meaning.synonyms.join(', '), \"</p>\"));\n        }\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n    if (synonymsList.length > 0) {\n      synonymsHTML += \"<div>\".concat(synonymsList.join(''), \"</div>\");\n    }\n    synonymsElement.innerHTML = synonymsHTML;\n\n    // Antonymes\n    var antonymsHTML = \"<h2>Antonymes</h2>\";\n    var antonymsList = [];\n    var _iterator3 = _createForOfIteratorHelper(data[0].meanings),\n      _step3;\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var _meaning2 = _step3.value;\n        if (_meaning2.antonyms && _meaning2.antonyms.length > 0) {\n          antonymsList.push(\"<p>\".concat(_meaning2.antonyms.join(', '), \"</p>\"));\n        }\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n    if (antonymsList.length > 0) {\n      antonymsHTML += \"<div>\".concat(antonymsList.join(''), \"</div>\");\n    }\n    antonymsElement.innerHTML = antonymsHTML;\n  }).catch(function (e) {\n    title.classList.remove('submitted');\n    desc.classList.remove('submitted');\n    form.classList.remove('submitted');\n    title.classList.remove('invisible');\n    desc.classList.remove('invisible');\n    app.classList.remove('submitted');\n    form.classList.remove('invisible');\n    alert('Cannot find your word, please try again.');\n  });\n}\nvar switchMode = document.querySelector('#switch');\nvar container = document.querySelector('#container');\nvar body = document.querySelector('body');\nswitchMode.addEventListener('click', function () {\n  container.classList.toggle('dark');\n  body.classList.toggle('dark');\n});\nvar form = document.querySelector('#app form');\nform.addEventListener('submit', function (e) {\n  e.preventDefault();\n\n  // Récupérer le mot entré dans l'input par l'utilisateur\n  var word = document.querySelector('input').value;\n\n  // Ajout des classes aux éléments qui doivent disparaître\n  title.classList.add('submitted');\n  desc.classList.add('submitted');\n  form.classList.add('submitted');\n  setTimeout(function () {\n    title.classList.add('invisible');\n    desc.classList.add('invisible');\n    app.classList.add('submitted');\n    form.classList.add('invisible');\n    // Faire la requête à l'API\n    getAPIResponse(word, 'en');\n    document.title = \"\".concat(word, \" - Dictionary\");\n  }, 1000);\n\n  // Affichage temporisé du message 'Want to search for another definition ?'\n  var timedMsg = document.querySelector('a p');\n  setTimeout(function () {\n    timedMsg.classList.add('timed');\n  }, 10000);\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

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