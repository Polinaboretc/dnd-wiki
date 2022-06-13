const BASE_URL = 'https://www.dnd5eapi.co'; 
const MONSTERS_URL = "https://www.dnd5eapi.co/api/monsters";

const monstersArrayNamesNoIndex = []; 
const monstersArrayNames = []; 



function init() {
    fetch(BASE_URL + '/api') 
    .then(response => response.json()) //   standard
    .then(result => displayData(result))    //  reuslt è oggetto 
} 

function initMonsters() {
    fetch(MONSTERS_URL)
        .then((response) => response.json())
        .then((result) => {
            monstersData = result.results;  // riempirò con risultato fetch, ossia dati per ciascun mostro 
            for (const monster of result.results) {
              monstersArrayNamesNoIndex.push(monster.name); 
              monstersArrayNames.push(monster.index);

            }
        });
} 

let isSearchButtonOpened = false;

function goMonsters() {
    window.location.href = './pages/monsters/index.html';
} 

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
    document.getElementById("mySidepanel").style.width = "290px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
}

function displayData(result) {  //  funione per mostrare array da object (result) in console
    const keysArray = Object.keys(result);  //  array con chiavi e valori 

    const template = `<a href="#LINK" class="list-group-item category-item"> #NOME </a>` 

    const container = document.getElementById("app"); 

    const listDiv = document.createElement("div")
    listDiv.classList.add("list-group")
    container.appendChild(listDiv)

    for (const key of keysArray) {
        const newLink = './pages/'+ key + '/index.html'    //  si riferisce pagina html locale;
        const newTemplate = template.replace("#LINK", newLink) 
                                    .replace("#NOME", key.toUpperCase()); 

        listDiv.innerHTML += newTemplate  //  prende precedente container, e ci scrive sopra newtemplate
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

  let input = document.getElementById("input-search");
  autocomplete(input, monstersArrayNamesNoIndex);
  console.log("input", input);

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

  function goToMonsterPage(index) {
    let urlString = "./pages/monsters/monster.html";
    if (index) {
      urlString = urlString + "?name=" + index; // Passo tramite URL l'index del mostro così che la pagina successiva sappia che mostro abbiamo cliccato
    }
    window.location.href = urlString;
  } 

initMonsters();

init();