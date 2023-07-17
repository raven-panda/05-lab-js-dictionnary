import './style.scss';

// INTÉGRATION DE L'API
// Fonction pour récupérer la page cible
function constructAPIEndpoint(word, language, version = 'v2') {
    return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
}

// Fonction pour traiter et afficher les données récupéré.
function getAPIResponse(word, language, version = 'v2') {
    let api = constructAPIEndpoint(word, language, version);
    fetch(api)

        // Extrait et parse les données JSON de la réponse HTTP
        .then(response => {
            return response.json();
        })
        // Traitement des données pour les afficher
        .then(data => {

            // Récupérations des éléments
            const wordElement = document.querySelector('#response #word');
            const phoneticElement = document.querySelector('#response #phonetic');
            const definitionElement = document.querySelector('#response #def');
            const synonymsElement = document.querySelector('#response #synonyms');
            const antonymsElement = document.querySelector('#response #antonyms');

            // Ajout titre comportant le mot
            let wordHTML = `<h2>${data[0].word}</h2>`;
            wordElement.innerHTML = wordHTML;

            // Ajout de la phonétique
            let soundHTML = '';
            for (let phoneticsObject of data[0].phonetics) {
                const phoneticData = phoneticsObject.text;
                if (phoneticData)
                    soundHTML += `<p>${phoneticData}</p>`;
                if (soundHTML != '')
                    break;
            }
            // Ajout de l'audio si il y en a un
            if (data[0].phonetics.find(item => item.audio !== '')) {
                const audioData = data[0].phonetics.find(item => item.audio !== '');
                if (audioData) {
                    soundHTML += `<audio controls src="${audioData.audio}"></audio>`;
                }
            }
            console.log(soundHTML)
            phoneticElement.innerHTML = soundHTML;

            // Ajout des définitions
            let definitionHTML = "";
            for (let meaning of data[0].meanings) {
                definitionHTML += `<h3 class=\"meaning\">${meaning.partOfSpeech}</h3>`;
                definitionHTML += "<div>";
                let defs = meaning.definitions;
                let i = 0;
                for (let def of defs) {
                    if (i <= 2) {
                    definitionHTML += `<p class=\"definitions\">${def.definition}</p>`;
                    }
                    if (i > 2) {
                        break;
                    };
                    i += 1;
                }
                definitionHTML += "</div>";
            }
            if (definitionHTML.length == 0) {
                antonymsHTML = '';
            }
            definitionElement.innerHTML = definitionHTML;

            // Ajout des synonymes si il y en a
            let synonymsHTML = `<h2>Synonyms</h2>`;
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
                synonymsHTML = '';
            }
            synonymsElement.innerHTML = synonymsHTML;

            // Ajout des antonymes si il y en a
            let antonymsHTML = `<h2>Antonyms</h2>`;
            let antonymsList = [];
            console.log(data)
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
            const pageBefore = document.querySelector('#before')
            const pageAfter = document.querySelector('#response');
            pageBefore.hidden = true;
            pageAfter.classList.add('after');
            document.querySelector('#container').classList.add('after');
        })

        // Si aucune definition n'est trouvée : affiche un message d'erreur et fait revenir la page principale
        .catch(e => {
            alert('Cannot find your word, please try again.');
        });
}

function submitForm(e) {
    // Récupérer le mot entré dans l'input par l'utilisateur
    const word = e.querySelector('input').value;
    
    getAPIResponse(word, 'en');
    document.title = `${word} - Dictionary`;
}

// Évennement de l'envoi
const form = document.querySelector('form')
const docBody = document.querySelector('body');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (window.matchMedia("(max-width: 412px)").matches && docBody.classList.contains('initial412')) {
        docBody.classList.replace('initial412', 'active412');
        return;
    }
    if (!this.checkValidity()) {
        alert('veuillez renseigner ce champs.')
        return false;
    }
    submitForm(this);
    docBody.classList.replace('active412', 'initial412');
});

// Bouton pour le mode sombre/clair

document.querySelector('#mode-switch').onclick = function () {
    docBody.classList.toggle('theme-b');
}

// Basculer de police
const fontSelection = document.querySelector('#font-selection');
const initOpt = document.querySelector('.init-opt');
fontSelection.onclick = () => { 
    if (initOpt) initOpt.remove()
}
fontSelection.addEventListener('change', function () {
    if (initOpt) {
        initOpt.remove();
    }
    if (this.value == 'sans') {
        docBody.classList.remove('serif', 'mono');
    };
    if (this.value == 'serif') {
        docBody.classList.remove('mono');
        docBody.classList.add('serif');
    };
    if (this.value == 'mono') {
        docBody.classList.remove('serif');
        docBody.classList.add('mono');
    };
})