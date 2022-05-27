const BASE_URL = "https://www.dnd5eapi.co/api/monsters"; 

function initMonsters() {
    fetch(BASE_URL) 
    .then(response => response.json()) 
    .then(result => displayMonsters(result)); 
} 


function displayMonsters(result) {
    console.log(result.results[2].name);
    
    // const monstersKeysArray = result.results.map((v) => v.index); 
    // console.log('indexes', monstersKeysArray);

    const monstersTemplate = ` 
        <a href="#MONSTERSLINK" target="_blank">#MONSTERSNOME</a><br>` 

    const monstersContainer = document.body; 

    for (const [key, value] of Object.entries(result.results)) {
        console.log('chiave', key, 'valore', value); 

        const newMonstersLink = './monsters/' + result.results[key].url + '/index.html' 
        const newMonstersTemplate = monstersTemplate.replace("#MONSTERSLINK", newMonstersLink) 
                                                    .replace("#MONSTERSNOME", result.results[key].name); 

        monstersContainer.innerHTML += newMonstersTemplate
    }
}

initMonsters(); 