!function(){"use strict";var e={91:function(e){e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),t.hash&&(e+=t.hash),t.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(e)?'"'.concat(e,'"'):e):e}},793:function(e,t,n){e.exports=n.p+"assets/dictionary_favicon.ico"}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.m=e,n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var o=t.getElementsByTagName("script");if(o.length)for(var i=o.length-1;i>-1&&!e;)e=o[i--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e}(),n.b=document.baseURI||self.location.href,function(){var e=n(91),t=n.n(e),o=new URL(n(793),n.b);t()(o);const i=document.querySelector("form"),r=document.querySelector("label"),s=document.querySelector("input");function c(e){const t=s.value;!function(e,t){let n=function(e,t){return`https://api.dictionaryapi.dev/api/${arguments.length>2&&void 0!==arguments[2]?arguments[2]:"v2"}/entries/${t}/${e}`}(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"v2");fetch(n).then((e=>e.json())).then((e=>{document.querySelector("#response #word-title").innerHTML=`<h2>${e[0].word}</h2>`;const t=document.querySelector("#response #word-audio"),n=e[0].phonetics.find((e=>""!==e.audio)),o=document.querySelector("#response #audio-source");o.src="",n?(t.classList.remove("unavailable"),o.src=n.audio):n||t.classList.add("unavailable"),t.addEventListener("click",(function(){o.play().catch((e=>console.log(e)))}));const i=document.querySelector("#response #phonetic");let r="";for(let t of e[0].phonetics){const e=t.text;if(e&&(r+=`<p>${e}</p>`),""!=r)break}""==r&&(r='<p class="no-phonetics">No phonetics available.</p>'),i.innerHTML=r;const s=document.querySelector("#response #def");let c="";for(let t of e[0].meanings){c+=`<h3 class="meaning">${t.partOfSpeech}</h3>`,c+="<ul>";let e=t.definitions,n=0;for(let t of e){if(n<=2&&(c+=`<li class="definitions">${t.definition}</li>`),n>2)break;n+=1}c+="</ul>"}s.innerHTML=c;const a=document.querySelector("#response #synonyms");let l="<h2>Synonyms</h2>",u=[];for(let t of e[0].meanings)t.synonyms&&t.synonyms.length>0&&u.push(`<p>${t.synonyms.join(", ")}</p>`);u.length>0&&(l+=`<div>${u.join("")}</div>`),0==u.length&&(l=""),a.innerHTML=l,document.querySelector("#before").hidden=!0,document.querySelector("#app").classList.replace("before","after")})).catch((e=>{r.hidden=!1,a.classList.replace("initial412","active412"),i.classList.add("invalid"),s.value=""}))}(t,"en"),document.title=`${t} - Dictionary`}const a=document.querySelector("body");i.addEventListener("submit",(function(e){if(e.preventDefault(),window.matchMedia("(max-width: 412px)").matches&&a.classList.contains("initial412"))a.classList.replace("initial412","active412");else{if(!this.checkValidity())return s.placeholder="Please enter a word.",void i.classList.add("invalid");i.classList.remove("invalid"),s.placeholder="Search your word here...",c(),a.classList.replace("active412","initial412"),r.hidden=!0}})),document.querySelector("#mode-switch").onclick=function(){a.classList.toggle("theme-b")};const l=document.querySelector("#font-selection"),u=document.querySelector(".init-opt");l.onclick=()=>{u&&u.remove()},l.addEventListener("change",(function(){u&&u.remove(),"sans"==this.value&&a.classList.remove("serif","mono"),"serif"==this.value&&(a.classList.remove("mono"),a.classList.add("serif")),"mono"==this.value&&(a.classList.remove("serif"),a.classList.add("mono"))}))}()}();