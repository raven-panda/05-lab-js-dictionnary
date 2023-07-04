import './style.scss';

// INTÉGRATION DE L'API
// Fonction pour récupérer la page cible
function constructAPIEndpoint(word, language, version = 'v2') {
    return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
}

// Fonction pour traiter et afficher les données récupéré.
function getAPIResponse(word, language, version = 'v2') {
    let endpoint = constructAPIEndpoint(word, language, version);
    fetch(endpoint)

        // Extrait et parse les données JSON de la réponse HTTP
        .then(response => {
            return response.json();
        })

        // Traitement des données pour les afficher
        .then(data => {

            // Récupérations des éléments
            const wordElement = document.querySelector('#response #word');
            const audioElement = document.querySelector('#response #audio');
            const definitionElement = document.querySelector('#response #def');
            const synonymsElement = document.querySelector('#response #synonyms');
            const antonymsElement = document.querySelector('#response #antonyms');

            // Ajout titre comportant le mot
            let wordHTML = `<h2>${data[0].word}</h2>`;
            wordElement.innerHTML = wordHTML;

            // Ajout de l'audio si il y en a un
            const audioData = data[0].phonetics.find(item => item.audio !== '');
            if (audioData) {
                audioElement.innerHTML = `<h2></h2><audio controls src=\"${audioData.audio}\"></audio>`;
            }

            // Ajout des définitions
            let definitionHTML = "";
            for (let meaning of data[0].meanings) {
                definitionHTML += `<h3 class=\"meaning\">${meaning.partOfSpeech}</h3>`;
                definitionHTML += "<div>";
                let defs = meaning.definitions;
                let i = 0;
                for (let def of defs) {
                    /*if (i <= 3) {*/
                    definitionHTML += `<p class=\"definitions\">${def.definition}</p>`;
                    /*}
                    if (i == 2) {
                         let more = defs.length - i;
                         definitionHTML += `<p id=\"show-more\">Show ${more} more...</p>`;
                    };
                    if (i > 2) {
                         definitionHTML += `<p class=\"definitions invisible\">${def.definition}</p>`
                    };*/
                }
                definitionHTML += "</div>";
            }
            if (definitionHTML.length == 0) {
                antonymsHTML = '';
            }
            definitionElement.innerHTML = definitionHTML;
            /*const showMoreP = document.querySelector('#show-more');
            showMoreP.addEventListener('click', function () {
                let defPs = document.querySelectorAll('.invisible');
                for (let defP of defPs) {
                     defP.classList.remove('invisible');
                }
                showMoreP.remove();
            })*/

            // Ajout des synonymes si il y en a
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
            if (synonymsList.length == 0) {
                antonymsHTML = '';
            }
            synonymsElement.innerHTML = synonymsHTML;

            // Ajout des antonymes si il y en a
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
            if (antonymsList.length == 0) {
                antonymsHTML = '';
            }
            antonymsElement.innerHTML = antonymsHTML;
        })

    // Si aucune definition n'est trouvée : affiche un message d'erreur et fait revenir la page principale.
    .catch(e => {
        alert('Cannot find your word, please try again.');
        window.location.reload();
    });
}

// BOUTON MODE CLAIR OU SOMBRE
const switchMode = document.querySelector('#switch');
const container = document.querySelector('#container')
const body = document.querySelector('body');

switchMode.addEventListener('click', function () {
    container.classList.toggle('theme-b');
    body.classList.toggle('theme-b');
});

// ENVOI DU FORMULAIRE
// Récupération des éléments
const title = document.querySelector('h1');
const desc = document.querySelector('#desc');
const app = document.querySelector('#app');
const responseBlock = document.querySelector('#response');

// Évennement de l'envoi
const form = document.querySelector('#app form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer le mot entré dans l'input par l'utilisateur
    const word = document.querySelector('input').value;
    
    // Ajout des classes aux éléments qui doivent disparaître
    title.classList.add('submitted');
    desc.classList.add('submitted');
    form.classList.add('submitted');

    // Mise invisible du contenu de la première page et requête de l'API retardée pour que ça se fasse après l'animation
    setTimeout(function() {
        title.classList.add('invisible');
        desc.classList.add('invisible');
        app.classList.add('submitted');
        form.classList.add('invisible');
        getAPIResponse(word, 'en');
        responseBlock.classList.add('active')
        document.title = `${word} - Dictionary`;
    }, 600)

    // Affichage temporisé du message 'Want to search for another definition ?'
    const timedMsg = document.querySelector('a p');
    setTimeout(function() {
        timedMsg.classList.add('timed');
    }, 10000)
});