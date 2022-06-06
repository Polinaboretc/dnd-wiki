const BASE_URL = "https://www.dnd5eapi.co/api/monsters";

function goHome() {
  window.location.href = '../../index.html';
}

let monstersData = [];

function initMonsters() {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((result) => {
      monstersData = result.results;
      return displayMonsters(result.results);
    });
}

function displayMonsters(monsters) { 

  // Invece di scrivere tutto direttamente nel body, ho creato un contenitore apposito per i mostri
  // Ciò renderà futura gestione estetica molto più semplice
  const monstersContainer = document.getElementById("monsters-container");
  // puliamo il contenitore
  monstersContainer.innerHTML = "";
  for (const monster of monsters) {
    const div = document.createElement("div"); // Creo il div che conterrà il singolo mostro
    div.className = "accordion-item single-monster-container";
    div.innerHTML = createMonsterTemplate(monster); // Riempo il div con il template
    const seeMoreButton = div.querySelector(".see-more");
    seeMoreButton.onclick = () => goToMonsterPage(monster.index); // Aggiungo al bottone la funzione goToMonsterPage()
    monstersContainer.appendChild(div); // Aggiungo il div del mostro singolo al div che contiene tutti i mostri
  }
}

function search() {
  const inputSearch = document.getElementById("input-search");
  const text = inputSearch.value;
  const filteredMonsters = monstersData.filter(monster => monster.name.toLowerCase().includes(text.toLowerCase()));
 
  displayMonsters(filteredMonsters);
}

function goToMonsterPage(index) {
  let urlString = "./monster.html";
  if (index) {
    urlString = urlString + "?name=" + index; // Passo tramite URL l'index del mostro così che la pagina successiva sappia che mostro abbiamo cliccato
  }
  window.location.href = urlString;
}

initMonsters();

function createMonsterTemplate(monster) {
  // Ho cambiato un po' il metodo di mostrare i mostri.
  // Immagini e nome non sono più dei link. Per andare alla pagina del singolo mostro
  // bisognerà cliccare un bottone. Ho fatto ciò per rendere più facile la gestione
  // in futuro dell'estetica. Manipolare bottoni e loro funzionalità
  // è molto più facile rispetto ai link
  const monstersTemplate = `
    <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="##COLLAPSE_ID"  aria-controls="#COLLAPSE_ID">
            <div class="accordion-monster-header">
                <div>
                    <img src ="#MONSTERSIMG" alt ="#MONSTERSALT" class="monsters-img">
                    #MONSTERSNOME
                </div>
                <a class="see-more btn btn-danger">+</a>
            </div>
        </button>
        
        
    </h2>
    <div id="#COLLAPSE_ID" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
        </div>
    </div>
       `;
  let monsterImg = "./pictures/" + monster.index + ".jpg";
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
    monsterImg = "./pictures/default.jpeg";
  }
  return monstersTemplate
    .replace("#MONSTERSIMG", monsterImg)
    .replace("#MONSTERSALT", monster.index)
    .replace("#COLLAPSE_ID", "collpase" + monster.index)
    .replace("#COLLAPSE_ID", "collpase" + monster.index)
    .replace("#COLLAPSE_ID", "collpase" + monster.index)
    .replace("#MONSTERSNOME", monster.name);
}
