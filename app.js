const BASE_URL = 'https://www.dnd5eapi.co'; 

function init() {
    fetch(BASE_URL + '/api') 
    .then(response => response.json()) //   standard
    .then(result => displayData(result))    //  reuslt è oggetto
    
}

function displayData(result) {  //  funione per mostrare array da object (result) in console
    // console.log(result); 
    const keysArray = Object.keys(result);  //  array con chiavi e valori 
    console.log('keyvalues', keysArray);

    const template = ` 
        <a href="#LINK" target="_blank">#NOME</a><br> ` 

    const container = document.body; 

    for (const key of keysArray) {
        console.log('chiave:', key, 'valore:', result[key]); // result[key] richimo volore di key, perrche tutte si chiamano key 
        const newLink = './pages/'+ key + '/index.html'    //  si riferisce pagina html locale;
        const newTemplate = template.replace("#LINK", newLink) 
                                    .replace("#NOME", key.toUpperCase()); 

        container.innerHTML += newTemplate  //  prende precedente container, e ci scrive sopra newtemplate
    } 
} 

init();