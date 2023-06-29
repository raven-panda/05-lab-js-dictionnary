import './style.scss';
// Formulaire
const form = document.querySelector('#app form');
const title = document.querySelector('h1');
const audio = document.querySelector('#audio')
function constructAPIEndpoint(word, language, version = 'v2') {
    return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
}
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let word = document.querySelector('input').value, language = 'en';
    return window.open(constructAPIEndpoint(word, language), '_blank');
});