import './style.scss';

// Formulaire
function constructAPIEndpoint (word, language, version = 'v2') {
        return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
    }

    const form = document.querySelector('#app form');

    form.addEventListener("submit", function(e) {
    e.preventDefault();

    let word = document.querySelector('input').value,
        language = 'en';

    return window.location.assign(constructAPIEndpoint(word, language));
    });
