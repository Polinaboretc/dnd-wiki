const BASE_URL = "https://www.dnd5eapi.co/api/monsters/"; //Link a cui aggiungeremo l'index del mostro da cercare


function goHome() {
  window.location.href = '../../index.html';
} 

function goMonsters() {
  window.location.href = './';
}

function displayMonsterInfo(monster) {
    console.log('monster:', monster);
    document.title = monster.name  //Cambio il titolo della pagina con il nome del mostro 
    const monsterArray = Object.keys(monster); 

    const headerDiv = document.getElementById('header-div'); 
    const headerImg = document.createElement('img'); 
    headerImg.classList.add('img-header'); 
    headerImg.src = './assets/d&d.png'; 
    headerDiv.appendChild(headerImg); 

    const breadCrumbsContainer = document.createElement('div'); 
    breadCrumbsContainer.className = 'breadcrumbs'; 

    const breadCrumbsTemplate = ` 
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <button class="breadcrumb-item breadcrumb-button" onclick="goHome()">Home</button>
          <button class="breadcrumb-item breadcrumb-button" onclick="goMonsters()">Monsters</button>
          <button class="breadcrumb-item active breadcrumb-button" aria-current="page">#MONSTERNAME</button>
          </ol>
      </nav>
      `
    const newBreadCrumbsTemplate = breadCrumbsTemplate.replaceAll('#MONSTERNAME', monster.name); 

    breadCrumbsContainer.innerHTML += newBreadCrumbsTemplate; 
    headerDiv.appendChild(breadCrumbsContainer);
    
    const titleDiv = document.getElementById('creature-title'); 
    titleDiv.innerHTML = monster.name; 
    
    const imgDiv = document.getElementById('creature-img'); 
    const img = document.createElement('img'); 
    img.classList.add('img-creature');
    const imgSrc = './pictures/' + monster.index + '.jpg'; 
    img.src = imgSrc; 
    imgDiv.appendChild(img); 

    const infoDiv = document.getElementById('creature-info'); 
    infoDiv.innerHTML = monster.size + ' ' + monster.type + ', ' +  monster.alignment; 

    const statsDiv = document.getElementById('creature-stats')
    statsDiv.innerHTML = fillCreatureStats(monster)

    const gridDiv = document.getElementById('creature-grid'); 

    fillCreatureText(monster.special_abilities, 'Special-abilities')
    fillCreatureText(monster.actions, 'Actions')
    fillCreatureText(monster.legendary_actions, 'Legendary-actions')
    const infosToPutInGrid = ['armor_class', 'hit_points', 'speed', 'proficiencies', 'damage_immunities', 'senses', 'challenge_rating', 'xp', 'hit_points', 'languages']
    fillGrid(monster, infosToPutInGrid)
}

function parseUrlParams() {   //prendo i parametri passati tramite URL dalla pagina precedente come avevamo fatto per l'app Todo del prof
    const urlSearchParams = new URLSearchParams(window.location.search); 
    const params = Object.fromEntries(urlSearchParams.entries()); 
    return params;
}

function fillCreatureStats(monster){
    const template = `
    <table>
        <thead>
            <tr>
                <th>DEX</th>
                <th>STR</th>
                <th>INT</th>
                <th>CON</th>
                <th>WIS</th>
                <th>CHA</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>#DEX</th>
                <th>#STR</th>
                <th>#INT</th>
                <th>#CON</th>
                <th>#WIS</th>
                <th>#CHA</th>
            </tr>
        </tbody>
</table>`
    return template
    .replace('#DEX', monster.dexterity).replace('#STR', monster.strength)
    .replace('#INT', monster.intelligence).replace('#CON', monster.constitution)
    .replace('#WIS', monster.wisdom).replace('#CHA', monster.charisma)
}
function fillGrid(monster, gridInfos){
    const gridDiv = document.getElementById('creature-grid')
    const table = document.createElement('table')
    table.className = 'table-infos'
    table.innerHTML = fillTable(monster,gridInfos)
    gridDiv.appendChild(table)
}

function fillTable(monster, gridInfos){  // Prendo in ingresso un array di informazioni da mettere nel table
    const tableTemplate = `
        <tr class="info-tr">
            <th class="info-name-tr">#INFONAME</th>
            <th class="info-content-tr">#INFOCONTENT</th>
        </tr>`
    let fullTable = ''  // Variable che riempirà il table genitore
    for(const info of gridInfos){
        const infoName = (info.charAt(0).toUpperCase() + info.slice(1)).replace('_', ' ');
        let infoContent
        if(info === 'proficiencies'){  // Dato che le proficiencies sono oggetti complicati, ho creato una funzione per gestirle
            fullTable += generateProficienciesText(monster.proficiencies, tableTemplate)
            continue 
        }
        else if(typeof(monster[info]) === 'object'){  //Per oggetti come la speed, faccio qualche passaggio in più
            if(monster[info].length === 0 ) infoContent = 'none';
            else {
                infoContent = JSON.stringify(monster[info]).replaceAll(/"|{|}|\[|\]|ft.|,/g, '').replaceAll('_', ' ')
            }
        }
        else {
            
            infoContent = monster[info]
        }
        const modifiedTemplate = tableTemplate 
            .replace('#INFONAME', infoName)
            .replace('#INFOCONTENT', infoContent)
            fullTable += modifiedTemplate
    }
    return fullTable
}

function generateProficienciesText(proficiencies, template){  //genera i saving throw e skill
    let returnString = ''
    const savingThrowsArray = []
    const skillsArray = []
    for(const proficiency of proficiencies){  // Controllo quanti saving throws ho
        if(proficiency.proficiency.index.includes('throw')) 
            savingThrowsArray.push([proficiency.proficiency.name, proficiency.value])
        if(proficiency.proficiency.index.includes('skill'))  // Controllo quante skills ho
        skillsArray.push([proficiency.proficiency.name, proficiency.value])
    }
    if(savingThrowsArray.length !== 0){
        const infoName = 'Saving throws'
        let infoContent = ''
        for(const savingThrow of savingThrowsArray){
            infoContent += savingThrow[0].replace('Saving Throw:', '') + ' +' + savingThrow[1]
        }
        returnString += template
            .replace('#INFONAME', infoName)
            .replace('#INFOCONTENT', infoContent)
    }
    if(skillsArray.length !== 0){
        const infoName = 'Skills'
        let infoContent = ''
        for(const skill of skillsArray){
            infoContent += skill[0].replace('Skill:', '') + ' +' + skill[1]
        }
        returnString += template
            .replace('#INFONAME', infoName)
            .replace('#INFOCONTENT', infoContent)
    }
    return returnString
}

function fillCreatureText(infosArray,infoName){ 
    // infoName viene usato per: prendere il div dell'abilità, scrivere il titolo e viene passato a createAccordionElement()
    // per creare ID unici per gli accordion
    if(infosArray.length === 0) return //Faccio subito un check. Se l'array è vuoto, non riempo nemmeno il div e faccio un return vuoto
    // Da valutare se non scrivere niente o magari metter un none, tipo: Actions: none
    // Al momento se non ha actions, non crea nemmeno il titolo di actions.
    const textContainer = document.getElementById(infoName.toLowerCase())
    const title = document.createElement('h3')
    const titleNode = document.createTextNode(infoName.replace('-', ' '))
    textContainer.appendChild(title.appendChild(titleNode))
    return textContainer.appendChild(createAccordionElement(infosArray, infoName))
}

function init(){
    const htmlParams = parseUrlParams();
    const monsterUrl = BASE_URL + htmlParams.name; 
    fetch(monsterUrl)
        .then(response => response.json())
        .then(result => displayMonsterInfo(result))
        .catch(error => console.log(error));
}

function createAccordionElement(infosArray, infoName){ 
    const divAccordionContainer = document.createElement('div')
    divAccordionContainer.className = 'accordion';
    const accordionId = 'accordion' + infoName; 
    divAccordionContainer.id = accordionId; 

    const accordionTemplate = ` 
    <div class="accordion-item">
    <h2 class="accordion-header" id="heading#NUMBER">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse#NUMBER" aria-expanded="true" aria-controls="collapse#NUMBER">
        #NAME
      </button>
    </h2>
    <div id="collapse#NUMBER" class="accordion-collapse collapse " aria-labelledby="headingOne"> 
      <div class="accordion-body"> 
       #DESCRIPTION
      </div>
    </div>
  </div>
    `
    for (let i = 0; i < infosArray.length; i++) {
        const info = infosArray[i];
        const myId = infoName + i;
        const newTemplate = accordionTemplate
            .replaceAll('#NUMBER', myId) 
            .replace('#NAME', info.name)
            .replace('#DESCRIPTION', info.desc);
        divAccordionContainer.innerHTML += newTemplate;
    }
    return divAccordionContainer;
}

init();