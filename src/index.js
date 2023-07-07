import './style.scss';

// // INTÉGRATION DE L'API
// // Fonction pour récupérer la page cible
// function constructAPIEndpoint(word, language, version = 'v2') {
//     return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
// }

// // Fonction pour traiter et afficher les données récupéré.
// function getAPIResponse(word, language, version = 'v2') {
//     let endpoint = constructAPIEndpoint(word, language, version);
//     fetch(endpoint)

//         // Extrait et parse les données JSON de la réponse HTTP
//         .then(response => {
//             return response.json();
//         })
//         // Traitement des données pour les afficher
//         .then(data => {

//             // Récupérations des éléments
//             const wordElement = document.querySelector('#response #word');
//             const phoneticElement = document.querySelector('#response #phonetic');
//             const definitionElement = document.querySelector('#response #def');
//             const synonymsElement = document.querySelector('#response #synonyms');
//             const antonymsElement = document.querySelector('#response #antonyms');

//             // Ajout titre comportant le mot
//             let wordHTML = `<h2>${data[0].word}</h2>`;
//             wordElement.innerHTML = wordHTML;

//             // Ajout de la phonétique
//             let soundHTML = '';
//             for (let phoneticsObject of data[0].phonetics) {
//                 const phoneticData = phoneticsObject.text;
//                 if (phoneticData)
//                     soundHTML += `<p>${phoneticData}</p>`;
//                 if (soundHTML != '')
//                     break;
//             }
//             // Ajout de l'audio si il y en a un
//             if (data[0].phonetics.find(item => item.audio !== '')) {
//                 const audioData = data[0].phonetics.find(item => item.audio !== '');
//                 if (audioData) {
//                     soundHTML += `<audio controls src="${audioData.audio}"></audio>`;
//                 }
//             }
//             console.log(soundHTML)
//             phoneticElement.innerHTML = soundHTML;

//             // Ajout des définitions
//             let definitionHTML = "";
//             for (let meaning of data[0].meanings) {
//                 definitionHTML += `<h3 class=\"meaning\">${meaning.partOfSpeech}</h3>`;
//                 definitionHTML += "<div>";
//                 let defs = meaning.definitions;
//                 let i = 0;
//                 for (let def of defs) {
//                     if (i <= 2) {
//                     definitionHTML += `<p class=\"definitions\">${def.definition}</p>`;
//                     }
//                     if (i > 2) {
//                         break;
//                     };
//                     i += 1;
//                 }
//                 definitionHTML += "</div>";
//             }
//             if (definitionHTML.length == 0) {
//                 antonymsHTML = '';
//             }
//             definitionElement.innerHTML = definitionHTML;

//             // Ajout des synonymes si il y en a
//             let synonymsHTML = `<h2>Synonyms</h2>`;
//             let synonymsList = [];
//             for (let meaning of data[0].meanings) {
//                 if (meaning.synonyms && meaning.synonyms.length > 0) {
//                     synonymsList.push(`<p>${meaning.synonyms.join(', ')}</p>`);
//                 }
//             }
//             if (synonymsList.length > 0) {
//                 synonymsHTML += `<div>${synonymsList.join('')}</div>`;
//             }
//             if (synonymsList.length == 0) {
//                 synonymsHTML = '';
//             }
//             synonymsElement.innerHTML = synonymsHTML;

//             // Ajout des antonymes si il y en a
//             let antonymsHTML = `<h2>Antonyms</h2>`;
//             let antonymsList = [];
//             console.log(data)
//             for (let meaning of data[0].meanings) {
//                 if (meaning.antonyms && meaning.antonyms.length > 0) {
//                     antonymsList.push(`<p>${meaning.antonyms.join(', ')}</p>`);
//                 }
//             }
//             if (antonymsList.length > 0) {
//                 antonymsHTML += `<div>${antonymsList.join('')}</div>`;
//             }
//             if (antonymsList.length == 0) {
//                 antonymsHTML = '';
//             }
//             antonymsElement.innerHTML = antonymsHTML;
//         })

//     // Si aucune definition n'est trouvée : affiche un message d'erreur et fait revenir la page principale
//     .catch(e => {
//         alert('Cannot find your word, please try again.');
//         window.location.reload();
//     });


// }



const mainForm = document.querySelector('#app form')


function submit(e) {
    // Récupérer le mot entré dans l'input par l'utilisateur
    const word = e.querySelector('input').value;
    alert('ça marche')
    // Ajout des classes aux éléments qui doivent disparaître
    // title.classList.add('submitted');
    // desc.classList.add('submitted');
    // mainForm.classList.add('submitted');

    // Mise invisible du contenu de la première page et requête de l'API retardée pour que ça se fasse après l'animation
    // setTimeout(function() {
    //     title.classList.add('invisible');
    //     desc.classList.add('invisible');
    //     app.classList.add('submitted');
    //     mainForm.classList.add('invisible');
    //     getAPIResponse(word, 'en');
    //     responseBlock.classList.add('active')
    //     shortcutInput.classList.remove('active');
    //     searchButton.classList.remove('invisible');
    //     aMenu.classList.remove('active');
    //     document.title = `${word} - Dictionary`;
    // }, 600)
}

// Évennement de l'envoi
mainForm.addEventListener('submit', function (e) {
    if (!this.checkValidity()) {
        e.preventDefault();
        alert('veuillez renseigner ce champs.')
        return false;
    }
});

// MENU BURGER
const burger = document.querySelector('#menu');
setTimeout(function(){
    burger.classList.remove('preload');
},500);
let closeClicked = false;

// Bouton mode clair/sombre
const burgerOptions = document.querySelectorAll('#menu li');
burgerOptions[1].onclick = function () {
    document.querySelector('body').classList.toggle('theme-b')
}
burgerOptions[3].onclick = function () {
    closeClicked = true;
}
burger.onclick = function () {
    this.classList.add('active');
    if (closeClicked === true) {
        this.classList.remove('active')
        closeClicked = false;
    }
}