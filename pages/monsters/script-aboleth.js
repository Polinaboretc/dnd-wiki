const BASE_URL = "https://www.dnd5eapi.co/api/monsters/aboleth"; 

function initAboleth() {
    fetch(BASE_URL) 
    .then(response => response.json()) 
    .then(result => displayAboleth(result)); 
} 

function displayAboleth(result) {
    console.log('name from objet', result.name); 

    const abolethArray = Object.keys(result);  //  array con chiavi e valori 
    console.log('keyvalues', abolethArray);

    const abolethTemplate = ` 
        <h2>#ABOLETHNAME</h2> 
        ` 
    const abolethContainer = document.body; 

    for (const key of abolethArray) {
        console.log('chiave:', result[1], 'valore:', result[key]);
        const newAbolethTemplate = abolethTemplate.replace('#ABOLETHNAME', key.toUpperCase()); 

        abolethContainer.innerHTML += newAbolethTemplate;
  }
}

initAboleth();