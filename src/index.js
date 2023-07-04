import './style.scss';

const title = document.querySelector('h1');
const desc = document.querySelector('#desc');
const app = document.querySelector('#app');

function constructAPIEndpoint(word, language, version = 'v2') {
    return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
}

function getAPIResponse(word, language, version = 'v2') {
    let endpoint = constructAPIEndpoint(word, language, version);

    fetch(endpoint)
        // Message d'erreur si il y en a une
        .then(response => {
            // if (!response.ok) {

            // } 
            return response.json();
            })
        .then(data => {
            // Variables pour récupérer les éléments
            const wordElement = document.querySelector('#response #word h2');
            const audioElement = document.querySelector('#response #audio');
            const definitionElement = document.querySelector('#response #def');
            const synonymsElement = document.querySelector('#response #synonyms');
            const antonymsElement = document.querySelector('#response #antonyms');

            // Mettre à jour les éléments
            wordElement.textContent = data[0].word;

            // Audio
            const audioData = data[0].phonetics.find(item => item.audio !== '');
            if (audioData) {
                audioElement.innerHTML = `<audio controls src=\"${audioData.audio}\"></audio>`;
            }

            // Définitions
            let definitionHTML = "";
            for (let meaning of data[0].meanings) {
                definitionHTML += `<h3 class=\"meaning\">${meaning.partOfSpeech}</h3>`;
                definitionHTML += "<div>";
                let defs = meaning.definitions;
                let i = 0;
                for (let def of defs) {
                    // if (i <= 3) {
                        definitionHTML += `<p class=\"definitions\">${def.definition}</p>`;
                    // }
                    // if (i == 2) {
                    //     let more = defs.length - i;
                    //     definitionHTML += `<p id=\"show-more\">Show ${more} more...</p>`;
                    // };
                    // if (i > 2) {
                    //     definitionHTML += `<p class=\"definitions invisible\">${def.definition}</p>`
                    // };
                }
                definitionHTML += "</div>";
            }
            definitionElement.innerHTML = definitionHTML;
            // const showMoreP = document.querySelector('#show-more');
            // showMoreP.addEventListener('click', function () {
            //     let defPs = document.querySelectorAll('.invisible');
            //     for (let defP of defPs) {
            //         defP.classList.remove('invisible');
            //     }
            //     showMoreP.remove();
            // })

            // Synonymes
            let synonymsHTML = `<h2>Synonymes</h2>`;
            let synonymsList = [];
            for (let meaning of data[0].meanings) {
                if (meaning.synonyms && meaning.synonyms.length > 0) {
                    synonymsList.push(`<p>${meaning.synonyms.join(', ')}</p>`);
                }
            }
            if (synonymsList.length > 0) {
                synonymsHTML += `<div>${synonymsList.join('')}</div>`;
            }
            synonymsElement.innerHTML = synonymsHTML;

            // Antonymes
            let antonymsHTML = `<h2>Antonymes</h2>`;
            let antonymsList = [];
            for (let meaning of data[0].meanings) {
                if (meaning.antonyms && meaning.antonyms.length > 0) {
                    antonymsList.push(`<p>${meaning.antonyms.join(', ')}</p>`);
                }
            }
            if (antonymsList.length > 0) {
                antonymsHTML += `<div>${antonymsList.join('')}</div>`;
            }
            antonymsElement.innerHTML = antonymsHTML;
        })
    .catch(e => {
        title.classList.remove('submitted');
        desc.classList.remove('submitted');
        form.classList.remove('submitted');
        title.classList.remove('invisible');
        desc.classList.remove('invisible');
        app.classList.remove('submitted');
        form.classList.remove('invisible');
        alert('Cannot find your word, please try again.')
    });
}

const switchMode = document.querySelector('#switch');
const container = document.querySelector('#container')
const body = document.querySelector('body');

switchMode.addEventListener('click', function () {
    container.classList.toggle('dark');
    body.classList.toggle('dark');
});

const form = document.querySelector('#app form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer le mot entré dans l'input par l'utilisateur
    const word = document.querySelector('input').value;
    
    // Ajout des classes aux éléments qui doivent disparaître
    title.classList.add('submitted');
    desc.classList.add('submitted');
    form.classList.add('submitted');

    setTimeout(function() {
        title.classList.add('invisible');
        desc.classList.add('invisible');
        app.classList.add('submitted');
        form.classList.add('invisible');
        // Faire la requête à l'API
        getAPIResponse(word, 'en');
        document.title = `${word} - Dictionary`;
    }, 1000)

    // Affichage temporisé du message 'Want to search for another definition ?'
    const timedMsg = document.querySelector('a p');
    setTimeout(function() {
        timedMsg.classList.add('timed');
    }, 10000)
});