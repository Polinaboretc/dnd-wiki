const BASE_URL = "https://www.dnd5eapi.co/api/monsters"; 

function initMonsters() {
    fetch(BASE_URL) 
    .then(response => response.json()) 
    .then(result => displayMonsters(result)); 
} 



function displayMonsters(result) {
    // Ho messo result.results in monsters  per rendere più intuitivo cosa si prende 
    const monsters = result.results  
    // Invece di scrivere tutto direttamente nel body, ho creato un contenitore apposito per i mostri
    // Ciò renderà futura gestione estetica molto più semplice
    const monstersContainer = document.getElementById('monsters-container')
    for (const monster of monsters) {
        const div = document.createElement('div')  // Creo il div che conterrà il singolo mostro
        div.className = 'single-monster-container'
        div.innerHTML = createMonsterTemplate(monster)  // Riempo il div con il template
        const seeMoreButton = div.querySelector('.see-more')
        seeMoreButton.onclick = () => goToMonsterPage(monster.index)  // Aggiungo al bottone la funzione goToMonsterPage()
        monstersContainer.appendChild(div)  // Aggiungo il div del mostro singolo al div che contiene tutti i mostri
    }
}

function goToMonsterPage(index) {
    let urlString = "./monster.html"
    if (index) {
        urlString = urlString + '?name=' + index;  // Passo tramite URL l'index del mostro così che la pagina successiva sappia che mostro abbiamo cliccato
    }
    window.location.href = urlString;
}

initMonsters(); 

function createMonsterTemplate(monster){  
// Ho cambiato un po' il metodo di mostrare i mostri. 
// Immagini e nome non sono più dei link. Per andare alla pagina del singolo mostro 
// bisognerà cliccare un bottone. Ho fatto ciò per rendere più facile la gestione
// in futuro dell'estetica. Manipolare bottoni e loro funzionalità
// è molto più facile rispetto ai link
    const monstersTemplate = ` 
        <img src ="#MONSTERSIMG" alt ="#MONSTERSALT" class="monsters-img">
        #MONSTERSNOME
        <button class="see-more">see more</button>`
    const monsterImg = './pictures/' + monster.index + '.jpg'
    return monstersTemplate.replace('#MONSTERSIMG', monsterImg)
        .replace('#MONSTERSALT', monster.index)
        .replace('#MONSTERSNOME', monster.name)
}