const BASE_URL = "https://www.dnd5eapi.co/api/monsters";
function goHome() {
  window.location.href = '../../index.html';
}

let monstersData = []; // creo array vuoto, che riempirò con risultato fetch, ossia dati per ciascun mostro

function initMonsters() {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((result) => {
      monstersData = result.results;  // riempirò con risultato fetch, ossia dati per ciascun mostro
      console.log(monstersData)
      //createMonsterInfoJson()
      return displayMonsters(result.results); // prendo array di mostri
    });
} 


function displayMonsters(monsters) {
    const monstersContainer = document.getElementById("monsters-container");
    monstersContainer.innerHTML = "";
    for (const monster of monsters) {
        const flipCardDiv = document.createElement("div"); // Creo il div che conterrà il singolo mostro
        flipCardDiv.className = "flip-card";
        flipCardDiv.innerHTML = createMonsterTemplate(monster)        
        const seeMoreButton = flipCardDiv.querySelector(".see-more");
        seeMoreButton.onclick = () => goToMonsterPage(monster.index); // Aggiungo al bottone la funzione goToMonsterPage()
        monstersContainer.appendChild(flipCardDiv); // Aggiungo il div del mostro singolo al div che contiene tutti i mostri
    }
}


/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "290px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

function search() {
  const inputSearch = document.getElementById("input-search");
  const text = inputSearch.value;
  const filteredMonsters = monstersData.filter(monster => monster.name.toLowerCase().includes(text.toLowerCase())); // creo array con mostri cui nome contiene text input
 
  displayMonsters(filteredMonsters);
}

function goToMonsterPage(index) {
  let urlString = "./monster.html";
  if (index) {
    urlString = urlString + "?name=" + index; // Passo tramite URL l'index del mostro così che la pagina successiva sappia che mostro abbiamo cliccato
  }
  window.location.href = urlString;
}

function createMonsterTemplate(monster) {
    const monsterCardTemplate = `
    <div class="flip-card-inner">
            <div class="flip-card-front">
            <div class="img-container">
            <img class="monster-img" src="#MONSTER_URL" onerror="./pictures/default.jpeg" alt="#MONSTER_ALT">
                </div>
                <div class="monster-name-container"><div>#MONSTERSNOME</div></div>
            </div>
            <div class="flip-card-back">
                <button class="see-more">+</button>
            </div>
        </div>`;
        
    let monsterUrl
    if (
        monster.index === "acolyte" ||
        monster.index === "giant-poisonous-snake" ||
        monster.index === "werebear-human" ||
        monster.index === "werebear-hybrid" ||
        monster.index === "wererat-human" ||
        monster.index === "werebear-hybrid" ||
        monster.index === "weretiger-human" ||
        monster.index === "wereboar-hybrid" ||
        monster.index === "wereboar-human" ||
        monster.index === "wererat-hybrid" ||
        monster.index === "weretiger-hybrid" ||
        monster.index === "werewolf-hybrid"
        ) {
            monsterUrl = "./pictures/default.jpeg";
    } else  monsterUrl = "./pictures/" + monster.index + ".jpg";
    return monsterCardTemplate
        .replace("#MONSTER_URL", monsterUrl)
        .replace("#MONSTER_ALT", monster.index)
        .replace("#MONSTERSNOME", monster.name);
}

initMonsters();

function createMonsterInfoJson(){
    let monstersInfoArray = []
    for (const monster of monstersData) {
        fetch(BASE_URL + '/' + monster.index)
            .then(response => response.json())
            .then(result => {
                const obj = {
                    name: result.name,
                    alignment: result.alignment,
                    size: result.size,
                    type: result.type,
                    hit_points: result.hit_points,
                    armor_class: result.armor_class,
                    hit_dice: result.hit_dice,
                    xp: result.xp,
                    challenge_rating: result.challenge_rating,
                    charisma: result.charisma,
                    constitution: result.constitution,
                    dexterity: result.dexterity,
                    intelligence: result.intelligence,
                    strength: result.strength,
                    wisdom: result.wisdom
                }
                monstersInfoArray.push(obj)
            })
            .catch(err => console.log(err))
    }
    const monsterArrayJson = JSON.stringify(monstersInfoArray)
    
    writeFile("monstersInfo.json", monsterArrayJson);
}