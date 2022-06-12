const BASE_URL = "https://www.dnd5eapi.co/api/monsters";
let monstersJson = JSON.parse(data)
function goHome() {
  window.location.href = '../../index.html';
}

let monstersData = []; // creo array vuoto, che riempirò con risultato fetch, ossia dati per ciascun mostro 

let isSearchButtonOpened = false;

function initMonsters() {
    fetch(BASE_URL)
        .then((response) => response.json())
        .then((result) => {
            monstersData = result.results;  // riempirò con risultato fetch, ossia dati per ciascun mostro
            return displayMonsters(result.results); // prendo array di mostri
        });
} 


function displayMonsters(monsters) {
    const monstersContainer = document.getElementById("monsters-container");
    monstersContainer.innerHTML = "";
    for (let i = 0; i < monsters.length; i++) {
        const monster = monsters[i]
        const flipCardDiv = document.createElement("div"); // Creo il div che conterrà il singolo mostro
        flipCardDiv.className = "flip-card";
        flipCardDiv.innerHTML = createMonsterTemplate(monster,i)        
        const seeMoreButton = flipCardDiv.querySelector(".see-more");
        seeMoreButton.onclick = () => goToMonsterPage(monster.index); // Aggiungo al bottone la funzione goToMonsterPage()
        monstersContainer.appendChild(flipCardDiv); // Aggiungo il div del mostro singolo al div che contiene tutti i mostri
    }
    changeCardFontSize()
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
  }
  window.location.href = urlString;
} 

function searchButtonClicked(){
    if(isSearchButtonOpened) {
      closeNav();
      isSearchButtonOpened = false;
    } else {
      openNav();
      isSearchButtonOpened = true;
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

function createMonsterTemplate(monster, index) {
    const currentMonster = monstersJson[index]
    const monsterInfo = currentMonster.size + ' ' + currentMonster.type + ' ' + currentMonster.alignment
    const monsterCardTemplate = `
    <div class="flip-card-inner zoom">
            <div class="flip-card-front">
            <div class="img-container" style="background-image:url(#MONSTER_URL)">
            
                </div>
                <div class="monster-name-container"><div>#MONSTERSNOME</div></div>
            </div>
            <div class="flip-card-back zoom">
                <div>#MONSTERSNOME</div>
                <div>#MONSTER_INFOS</div>
                <div class="stats-grid-div">#STATS_GRID</div>
                <div>Xp: #XP</div>
                <div>Challenge: #CHALLENGE</div>
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
    } else  monsterUrl = "./pictures/" + monster.index + ".png";
    return monsterCardTemplate
        .replace("#MONSTER_URL", monsterUrl)
        .replace("#MONSTER_ALT", monster.index)
        .replaceAll("#MONSTERSNOME", monster.name)
        .replace('#XP', currentMonster.xp)
        .replace('#MONSTER_INFOS', monsterInfo)
        .replace('#STATS_GRID', fillCreatureStats(currentMonster))
        .replace('#CHALLENGE', currentMonster.challenge_rating);
}

fontsize = function () {
    var fontSize = document.getElementById('monsters-container').querySelectorAll(".stats-grid-div ").width() * 0.10; // 10% of container width
    document.querySelectorAll(".monster-card-stats").css('font-size', fontSize);
};

function changeCardFontSize(){
    const styleTag = document.getElementById('my-style')
    const styleTemplate = `
    .flip-card { font-size: #CARD_BACK_SIZEpx }
    .monster-card-stats { font-size: #STATS_FONT_SIZEpx !important }`

    const div = document.getElementById('monsters-container')
    const cardWidth = div.querySelector('.stats-grid-div').clientWidth
    const gridFontSize = cardWidth * 0.065
    const cardBackFontSize = cardWidth * 0.08
    styleTag.innerHTML = styleTemplate.replace('#CARD_BACK_SIZE', cardBackFontSize).replace('#STATS_FONT_SIZE', gridFontSize)
}
window.addEventListener("resize", changeCardFontSize)

initMonsters();

function createMonsterInfoJson(){ //Servito per generare il testo da inserire in monsterInfo.js
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
}

function fillCreatureStats(monster) {
    const template = `
    <table class="monster-card-stats">
        <thead>
            <tr class="">
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
</table>`
    return template
        .replace('#DEX', monster.dexterity).replace('#STR', monster.strength)
        .replace('#INT', monster.intelligence).replace('#CON', monster.constitution)
        .replace('#WIS', monster.wisdom).replace('#CHA', monster.charisma)
}