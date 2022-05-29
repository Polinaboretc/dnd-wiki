const BASE_URL = "https://www.dnd5eapi.co/api/monsters/aboleth"; 

function initAboleth() {
    fetch(BASE_URL) 
    .then(response => response.json()) 
    .then(result => displayAboleth(result)); 
} 

function displayAboleth(result) {
    console.log(result.actions[0].options.from);
}

initAboleth();