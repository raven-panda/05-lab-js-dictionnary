// import './style.scss';
// // Formulaire
const form = document.querySelector('#app form');
const title = document.querySelector('h1');
const paragraph = document.querySelector('#app > p')
// const request = new XMLHttpRequest();

// function constructAPIEndpoint(word, language, version = 'v2') {
//     return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
// };

// form.addEventListener("submit", function(e) {
//     e.preventDefault();
//     let word = document.querySelector('input').value, language = 'en';
//     return window.open('./definition.html', '_blank');
// });

import './style.scss';

function constructAPIEndpoint(word, language, version = 'v2') {
    return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
}

function getAPIResponse(word, language, version = 'v2') {
    let endpoint = constructAPIEndpoint(word, language, version);

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                title.textContent = 'No result !';
            }
            return response.json();
        })
        .then(data => {
            // Récupérer les éléments
            const wordElement = document.querySelector('#response #word h2');
            const audioElement = document.querySelector('#response #audio');
            const definitionElement = document.querySelector('#response #def');
            const synonymsElement = document.querySelector('#response #synonyms');
            const antonymsElement = document.querySelector('#response #antonyms');

            // Mettre à jour les éléments
            wordElement.textContent = data[0].word;

            // Chercher l'audio avec une URL
            const audioData = data[0].phonetics.find(item => item.audio !== '');
            if (audioData) {
                audioElement.innerHTML = `<audio controls src="${audioData.audio}"></audio>`;
            }

            // Afficher les définitions
            let definitionHTML = "";
            for (let meaning of data[0].meanings) {
                definitionHTML += `<h3 class="meaning">${meaning.partOfSpeech}</h3>`;
                definitionHTML += "<ul>";
                for (let def of meaning.definitions) {
                    definitionHTML += `<li>${def.definition}</li>`;
                }
                definitionHTML += "</ul>";
            }
            definitionElement.innerHTML = definitionHTML;

            // Afficher les synonymes
            let synonymsHTML = `<h2>Synonymes</h2>`;
            let synonymsList = [];
            for (let meaning of data[0].meanings) {
                if (meaning.synonyms && meaning.synonyms.length > 0) {
                    synonymsList.push(`<li>${meaning.synonyms.join(', ')}</li>`);
                }
            }
            if (synonymsList.length > 0) {
                synonymsHTML += `<ul>${synonymsList.join('')}</ul>`;
            }
            synonymsElement.innerHTML = synonymsHTML;

            // Afficher les antonymes
            let antonymsHTML = `<h2>Antonymes</h2>`;
            let antonymsList = [];
            for (let meaning of data[0].meanings) {
                if (meaning.antonyms && meaning.antonyms.length > 0) {
                    antonymsList.push(`<li>${meaning.antonyms.join(', ')}</li>`);
                }
            }
            if (antonymsList.length > 0) {
                antonymsHTML += `<ul>${antonymsList.join('')}</ul>`;
            }
            antonymsElement.innerHTML = antonymsHTML;
        })
    .catch(e => {
        console.log('There was a problem with your fetch operation: ' + e.message);
        title.textContent = 'No result !';
        paragraph.textContent = `Cannot find ${word} or there was a problem with the API. Please try again.`;
    });
}

form.addEventListener('submit', function (e) {
    // Empêcher le comportement par défaut de la soumission du formulaire
    e.preventDefault();
    // Récupérer le mot entré par l'utilisateur
    const word = document.querySelector('input').value;

    // Faire la requête API
    getAPIResponse(word, 'en');
    console.log(getAPIResponse.ok);
    if (response.ok) {
        form.hidden = 'true';
    }
});