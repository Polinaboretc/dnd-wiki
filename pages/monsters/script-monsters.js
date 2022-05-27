const BASE_URL = "https://www.dnd5eapi.co/api/monsters"; 

function initMonsters() {
    fetch(BASE_URL) 
    .then(response => response.json()) 
    .then(result => console.log(result)) 
} 

initMonsters() 

function displayMonsters(result) {
    
}