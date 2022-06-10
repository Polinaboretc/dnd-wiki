const BASE_URL = "https://www.dnd5eapi.co/api/monsters/"; //Link a cui aggiungeremo l'index del mostro da cercare

const monstersArrayNames = [];
const monstersArrayNamesNoIndex = [];
let loadedPages = [];
let pos = 0;

function fillMonstersArrayNames() {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((result) => {
      for (const monster of result.results) {
        monstersArrayNames.push(monster.index);
        monstersArrayNamesNoIndex.push(monster.name);
        // console.log(monster.name);
      }
      console.log(monstersArrayNamesNoIndex);

      init();
    })
    .catch((error) => console.log(error));
}

fillMonstersArrayNames();

function goHome() {
  window.location.href = "../../index.html";
}

function goMonsters() {
  window.location.href = "./";
}

function fillSmallArray(startingCreatureName, arrayLength) {
  //arrayLenght 7
  const indexInBig = monstersArrayNames.indexOf(startingCreatureName); // prende indice di creatura
  const startingDifference = Math.floor(arrayLength / 2); // di quanto andare a sinistra nell'array grande
  let startingIndex = wrapAround(
    indexInBig - startingDifference,
    monstersArrayNames
  ); // con wraparound, invece che indice negativo, faccio il giro
  for (let i = 0; i < arrayLength; i++) {
    loadedPages.push(monstersArrayNames[startingIndex]);
    startingIndex = wrapAround(++startingIndex, monstersArrayNames);
  }
  for (let i = 0; i < startingDifference; i++) {
    loadedPages.push(loadedPages.shift());
  }
}

function autocomplete(inp, arr) {
  console.log("arr", arr);

  let currentFocus;

  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;
    closeAllLists();

    if (!val) {
      return false;
    }


    currentFocus = -1;
    a = document.createElement("div");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].toUpperCase().includes(val.toUpperCase())) {
        b = document.createElement("div");
        b.style.position = "relative";
        b.innerHTML = arr[i]
          .substring(0, arr[i].toLowerCase().indexOf(val.toLowerCase()));
        b.innerHTML +=
          "<strong>" +
          arr[i].substring(
            arr[i].toLowerCase().indexOf(val.toLowerCase()),
            arr[i].toLowerCase().indexOf(val.toLowerCase()) + val.length
          ) +
          "</strong>";
        b.innerHTML += arr[i].substring(
          arr[i].toLowerCase().indexOf(val.toLowerCase()) + val.length
        );
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.innerHTML += `<button class="go-to-autocompleted-page-button" > </button>`;
        const goToPageButton = b.querySelector('.go-to-autocompleted-page-button')
        goToPageButton.onclick = () => goToMonsterPage(monstersArrayNames[i])
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });

        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;

    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

function saluta(parola){
    console.log(parola, parola);
}

function goToMonsterPage(index) {
  let urlString = "./monster.html";
  if (index) {
    urlString = urlString + "?name=" + index; // Passo tramite URL l'index del mostro così che la pagina successiva sappia che mostro abbiamo cliccato
    console.log(urlString);
  }
  window.location.href = urlString;
}

function displayMonsterInfo(monster) {
  fillSmallArray(monster.index, 7);
  fillPages();
}

function parseUrlParams() {
  //prendo i parametri passati tramite URL dalla pagina precedente come avevamo fatto per l'app Todo del prof
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
}

function fillCreatureStats(monster) {
  const template = `
    <table class="table table-bordered bg-white text-center">
        <thead>
            <tr class="table-secondary">
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
                <td>#DEX</td>
                <td>#STR</td>
                <td>#INT</td>
                <td>#CON</td>
                <td>#WIS</td>
                <td>#CHA</td>
            </tr>
        </tbody>
</table>`;
  return template
    .replace("#DEX", monster.dexterity)
    .replace("#STR", monster.strength)
    .replace("#INT", monster.intelligence)
    .replace("#CON", monster.constitution)
    .replace("#WIS", monster.wisdom)
    .replace("#CHA", monster.charisma);
}

function fillGrid(monster, gridInfos, div) {
  const table = document.createElement("table");
  table.className = "table table-bordered table-hover bg-white";
  table.innerHTML = fillTable(monster, gridInfos);
  div.appendChild(table);
}

function fillTable(monster, gridInfos) {
  // Prendo in ingresso un array di informazioni da mettere nel table
  const tableTemplate = `
        <tr class="info-tr">
            <th class="info-name-tr">#INFONAME</th>
            <td class="info-content-tr">#INFOCONTENT</td>
        </tr>`;
  let fullTable = ""; // Variable che riempirà il table genitore
  for (const info of gridInfos) {
    const infoName = (info.charAt(0).toUpperCase() + info.slice(1)).replace(
      "_",
      " "
    );
    let infoContent;
    if (info === "proficiencies") {
      // Dato che le proficiencies sono oggetti complicati, ho creato una funzione per gestirle
      fullTable += generateProficienciesText(
        monster.proficiencies,
        tableTemplate
      );
      continue;
    } else if (typeof monster[info] === "object") {
      //Per oggetti come la speed, faccio qualche passaggio in più
      if (monster[info].length === 0) infoContent = "none";
      else {
        infoContent = JSON.stringify(monster[info])
          .replaceAll(/"|{|}|\[|\]|ft.|,/g, "")
          .replaceAll("_", " ");
      }
    } else {
      infoContent = monster[info];
    }
    const modifiedTemplate = tableTemplate
      .replace("#INFONAME", infoName)
      .replace("#INFOCONTENT", infoContent);
    fullTable += modifiedTemplate;
  }
  return fullTable;
}

function generateProficienciesText(proficiencies, template) {
  //genera i saving throw e skill
  let returnString = "";
  const savingThrowsArray = [];
  const skillsArray = [];
  for (const proficiency of proficiencies) {
    // Controllo quanti saving throws ho
    if (proficiency.proficiency.index.includes("throw"))
      savingThrowsArray.push([proficiency.proficiency.name, proficiency.value]);
    if (proficiency.proficiency.index.includes("skill"))
      // Controllo quante skills ho
      skillsArray.push([proficiency.proficiency.name, proficiency.value]);
  }
  if (savingThrowsArray.length !== 0) {
    const infoName = "Saving throws";
    let infoContent = "";
    for (const savingThrow of savingThrowsArray) {
      infoContent +=
        savingThrow[0].replace("Saving Throw:", "") + " +" + savingThrow[1];
    }
    returnString += template
      .replace("#INFONAME", infoName)
      .replace("#INFOCONTENT", infoContent);
  }
  if (skillsArray.length !== 0) {
    const infoName = "Skills";
    let infoContent = "";
    for (const skill of skillsArray) {
      infoContent += skill[0].replace("Skill:", "") + " +" + skill[1];
    }
    returnString += template
      .replace("#INFONAME", infoName)
      .replace("#INFOCONTENT", infoContent);
  }
  return returnString;
}

function fillCreatureText(infosArray, infoName, div) {
  // infoName viene usato per: prendere il div dell'abilità, scrivere il titolo e viene passato a createAccordionElement()
  // per creare ID unici per gli accordion
  if (infosArray.length === 0) return; //Faccio subito un check. Se l'array è vuoto, non riempo nemmeno il div e faccio un return vuoto
  // Da valutare se non scrivere niente o magari metter un none, tipo: Actions: none
  // Al momento se non ha actions, non crea nemmeno il titolo di actions.
  const textContainer = document.getElementById(infoName.toLowerCase());
  const title = document.createElement("h3");
  title.innerText = infoName.replace("-", " ");
  title.classList.add("info-name");
  div.appendChild(title);
  return div.appendChild(createAccordionElement(infosArray, infoName));
}

function init() {
  let input = document.getElementById("input-search");
  autocomplete(input, monstersArrayNamesNoIndex);
  console.log("input", input);
  const htmlParams = parseUrlParams(); // prendo mostro da pag precedente
  const monsterUrl = BASE_URL + htmlParams.name;
  fetch(monsterUrl)
    .then((response) => response.json())
    .then((result) => displayMonsterInfo(result))
    .catch((error) => console.log(error));
}

function createAccordionElement(infosArray, infoName) {
  const divAccordionContainer = document.createElement("div");
  divAccordionContainer.className = "accordion";
  const accordionId = "accordion" + infoName;
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
    `;
  for (let i = 0; i < infosArray.length; i++) {
    const info = infosArray[i];
    const myId = infoName + i;
    const newTemplate = accordionTemplate
      .replaceAll("#NUMBER", myId)
      .replace("#NAME", info.name)
      .replace("#DESCRIPTION", info.desc);
    divAccordionContainer.innerHTML += newTemplate;
  }
  return divAccordionContainer;
}

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "290px";
  document.getElementById("open-button").style.zIndex = "0";
  document.getElementById("close-button").style.zIndex = "-1";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
function fillMonsterPage(monster, pageID) {
  const monsterPage = document.getElementById(pageID);
  monsterPage.innerHTML = "";
  const monsterArray = Object.keys(monster);

  const breadCrumbsTemplate = ` 
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
    <button class="breadcrumb-item breadcrumb-button" onclick="goHome()">Home</button>
    <button class="breadcrumb-item breadcrumb-button" onclick="goMonsters()">Monsters</button>
    <button class="breadcrumb-item active breadcrumb-button" aria-current="page">#MONSTERNAME</button>
    </ol>
    </nav>`;
  const breadDiv = document.createElement("div");
  const breadCrumbsContainer = document.createElement("div");
  breadCrumbsContainer.className = "breadcrumbs";
  const newBreadCrumbsTemplate = breadCrumbsTemplate.replaceAll(
    "#MONSTERNAME",
    monster.name
  );
  breadCrumbsContainer.innerHTML += newBreadCrumbsTemplate;
  breadDiv.appendChild(breadCrumbsContainer);

  const titleDiv = document.createElement("div");
  titleDiv.className = "creature-title";
  titleDiv.innerHTML = monster.name;

  const imgDiv = document.createElement("div");
  const img = document.createElement("img");
  img.classList.add("img-creature");
  let imgSrc = "./pictures/" + monster.index + ".jpg";
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
    imgSrc = "./pictures/default.jpeg";
  }
  img.src = imgSrc;
  imgDiv.appendChild(img);

  const infoDiv = document.createElement("div");
  infoDiv.className = "creature-info";
  infoDiv.innerHTML =
    monster.size + " " + monster.type + ", " + monster.alignment;

  const statsDiv = document.createElement("div");
  statsDiv.innerHTML = fillCreatureStats(monster);

  const gridDiv = document.createElement("div");
  const infosToPutInGrid = [
    "armor_class",
    "hit_points",
    "speed",
    "proficiencies",
    "damage_immunities",
    "senses",
    "challenge_rating",
    "xp",
    "hit_points",
    "languages",
  ];
  fillGrid(monster, infosToPutInGrid, gridDiv);

  const creatureText = document.createElement("div");
  const specialAbilitiesDiv = document.createElement("div");
  const specialActionsDiv = document.createElement("div");
  const specialLegendaryActionsDiv = document.createElement("div");
  fillCreatureText(
    monster.special_abilities,
    "Special-abilities",
    specialAbilitiesDiv
  );
  fillCreatureText(monster.actions, "Actions", specialActionsDiv);
  fillCreatureText(
    monster.legendary_actions,
    "Legendary-actions",
    specialLegendaryActionsDiv
  );
  creatureText.append(
    specialAbilitiesDiv,
    specialActionsDiv,
    specialLegendaryActionsDiv
  );

  monsterPage.append(
    breadDiv,
    titleDiv,
    imgDiv,
    infoDiv,
    statsDiv,
    gridDiv,
    creatureText
  );

}

function wrapAround(index, array) {
  return (index + array.length) % array.length;
}

function fillPages() {
  for (let i = 0; i < loadedPages.length; i++) {
    const id = "monster" + (1 + i);
    const page = document.getElementById(id);
    fetch(BASE_URL + loadedPages[i])
      .then((response) => response.json())
      .then((result) => fillMonsterPage(result, id));
  }
}

function previous() {
  pos = wrapAround(--pos, loadedPages);
  cycleSmallArray(pos);
}

function next() {
  pos = wrapAround(++pos, loadedPages);
  cycleSmallArray(pos);
}

function cycleSmallArray(posInSmallArray) {
  const arrayLength = loadedPages.length;
  const indexInBig = monstersArrayNames.indexOf(loadedPages[posInSmallArray]);
  const startingDifference = Math.floor(arrayLength / 2);
  let startingIndex = wrapAround(
    indexInBig - startingDifference,
    monstersArrayNames
  );
  loadedPages = [];
  for (let i = 0; i < arrayLength; i++) {
    loadedPages.push(monstersArrayNames[startingIndex]);
    startingIndex = wrapAround(++startingIndex, monstersArrayNames);
  }
  for (let i = 0; i < startingDifference; i++) {
    loadedPages.push(loadedPages.shift());
  }
  for (let i = 0; i < posInSmallArray; i++) {
    loadedPages.unshift(loadedPages.pop());
  }
  changeEnds(pos);
}

function changeEnds(currentPos) {
  const leftPageIndex = wrapAround(currentPos - 3, loadedPages);
  const rightPageIndex = wrapAround(currentPos + 3, loadedPages);
  const leftPage = "monster" + (leftPageIndex + 1);
  const rightPage = "monster" + (rightPageIndex + 1);

  fetch(BASE_URL + loadedPages[leftPageIndex])
    .then((response) => response.json())
    .then((result) => fillMonsterPage(result, leftPage));

  fetch(BASE_URL + loadedPages[rightPageIndex])
    .then((response) => response.json())
    .then((result) => fillMonsterPage(result, rightPage));

  console.log(loadedPages);
  console.log(pos);
}
