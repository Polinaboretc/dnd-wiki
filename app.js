const BASE_URL = 'https://www.dnd5eapi.co'; 

function init() {
    fetch(BASE_URL + '/api') 
    .then(response => response.json()) //   standard
    .then(result => displayData(result))    //  reuslt è oggetto
    
} 

function goMonsters() {
    window.location.href = './pages/monsters/index.html';
} 

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
    document.getElementById("mySidepanel").style.width = "290px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
}

function displayData(result) {  //  funione per mostrare array da object (result) in console
    // console.log(result); 
    const keysArray = Object.keys(result);  //  array con chiavi e valori 
    console.log('keyvalues', keysArray);

    const template = `<a href="#LINK" class="list-group-item category-item"> #NOME </a>` 

    const container = document.getElementById("app"); 

    const listDiv = document.createElement("div")
    listDiv.classList.add("list-group")
    container.appendChild(listDiv)

    for (const key of keysArray) {
        console.log('chiave:', key, 'valore:', result[key]); // result[key] richimo volore di key, perrche tutte si chiamano key 
        const newLink = './pages/'+ key + '/index.html'    //  si riferisce pagina html locale;
        const newTemplate = template.replace("#LINK", newLink) 
                                    .replace("#NOME", key.toUpperCase()); 

        listDiv.innerHTML += newTemplate  //  prende precedente container, e ci scrive sopra newtemplate
    } 
} 

init();