const BASE_URL = "https://www.dnd5eapi.co/api/monsters/"; //Link a cui aggiungeremo l'index del mostro da cercare

// function initAboleth() {
//     fetch(BASE_URL) 
//     .then(response => response.json()) 
//     .then(result => displayMonster(result)); 
// } 


// function displayMonster(result) {
//     console.log('name from objet', result); 

//     const abolethArray = Object.keys(result);  //  array con chiavi e valori 
//     // console.log('keyvalues', abolethArray); 

//     const abolethTitle = document.createElement('h1'); 
//     const abolethTitleNode = document.createTextNode(result.name) 
//     abolethTitle.appendChild(abolethTitleNode); 
//     document.body.appendChild(abolethTitle);

//     const abolethTemplate = ` 
//         <h2>#ABOLETHNAME:</h2> 
//         <h3 id="#ID">#DESCRIPTION</h3> 
//         ` 
//         //  CREARE SOTTOGOGGETI CON ID UNICO
//     const abolethContainer = document.body; 

//     // for (let i = 0; i < abolethArray.length; i++) {
//     //     const element = abolethArray[i];
//     //     console.log('chiave:', abolethArray.); 
//     //             const newAbolethTemplate = abolethTemplate.replace('#ABOLETHNAME', element.toUpperCase()); 

                                                

//     //     abolethContainer.innerHTML += newAbolethTemplate;
//     // }

//     for (const key of abolethArray) {
//         // console.log('chiave:', key, 'valore:', result.speed); 
        
//         // console.log('speed', result.speed)
        
        
//         const newAbolethTemplate = abolethTemplate.replace('#ABOLETHNAME', key.toUpperCase()) 
//         .replace('#DESCRIPTION', result[key]) 
//         .replace('#ID', key);
        
//         const speedTemplate = document.getElementById('speed'); 
//         for (const [key, value] of Object.entries(result.speed)) {
//             // console.log(key, value); 
//             // const speedString = result.speed[key]
//             // const speedKeyNode = document.createTextNode(speedString) 
//             // speedTemplate.appendChild(speedKeyNode); 
//             // newAbolethTemplate.appendChild(speedTemplate);


//         }
        
        
        

        
        
        
//         abolethContainer.innerHTML += newAbolethTemplate;
//     }
// }

// initAboleth();

// function test(result){
//     console.log(result);
//     let arrayActions = []
//     if(result.actions) arrayActions = result.actions
//     for (const action of arrayActions) {
//         console.log('nome:', action.name)
//         console.log('description:', action.desc);
//         if(action.attack_bonus) console.log('att bonus:', action.attack_bonus)
//         if (action.usage) { 
//             let usageString = 'usage: '; 
//             if (action.usage.times) usageString += action.usage.times; 
//             usageString += action.usage.type
//             if(action.usage.dice) usageString += ' dice:' + action.usage.dice
//             if(action.usage.min_value) usageString += ' min value: ' + action.usage.min_value
//             console.log(usageString); 
//         } 
//         if(action.options) { 
//             console.log('options', action.options);
//             let optionsString = 'options: '; 
//             console.log(action.options.choose);
//             // console.log('from', action.options.from) 
//             for (const option of action.options.from) {
//                 console.log(option);
//             }
//         }
//     }
// }

function displayMonsterInfo(monster) {
    document.title = monster.name  //Cambio il titolo della pagina con il nome del mostro 
    const monsterArray = Object.keys(monster); 
    console.log(monsterArray); 

    const headerDiv = document.getElementById('header-div'); 
    const headerImg = document.createElement('img'); 
    headerImg.classList.add('img-header'); 
    headerImg.src = './assets/d&d.png'; 
    headerDiv.appendChild(headerImg); 

    function createbreadCrumbsElement(){ 
      const breadCrumbsContainer = document.createElement('div'); 
      breadCrumbsContainer.className = 'breadcrumbs'; 

      const breadCrumbsTemplate = ` 
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="">Home</a></li>
          <li class="breadcrumb-item"><a href="#">monster list</a></li>
          <li class="breadcrumb-item active" aria-current="page">monsters</li>
        </ol>
      </nav>
      `
    }

    
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

    const gridDiv = document.getElementById('creature-grid'); 

    const divSpecialAbilities = document.getElementById('spec-abilities'); 
    const specialAbilitiesTitle = document.createElement('h3'); 
    const specialAbilitiesNode = document.createTextNode(monsterArray[24].toUpperCase()); 
    specialAbilitiesTitle.appendChild(specialAbilitiesNode); 
    divSpecialAbilities.appendChild(specialAbilitiesTitle);
    divSpecialAbilities.appendChild(createAccordionElement(monster.special_abilities,'SpecialAbilities'));

    const divActions = document.getElementById('actions'); 
    const actionsTitle = document.createElement('h3'); 
    const actionsNode = document.createTextNode(monsterArray[25].toUpperCase()); 
    actionsTitle.appendChild(actionsNode); 
    divActions.appendChild(actionsTitle);
    divActions.appendChild(createAccordionElement(monster.actions, 'Actions'));

    const divLegendaryAction = document.getElementById('legendary-actions'); 
    const legendaryActionTitle = document.createElement('h3'); 
    const legendaryActionNode = document.createTextNode(monsterArray[26].toUpperCase()); 
    legendaryActionTitle.appendChild(legendaryActionNode); 
    divLegendaryAction.appendChild(legendaryActionTitle);
    divLegendaryAction.appendChild(createAccordionElement(monster.legendary_actions, 'LegendaryActions'));
    
    let arrayActions = [];
    if (monster.actions) arrayActions = monster.actions  //Se il mostro può fare delle azioni, le mostro
    for (const action of arrayActions) {
        console.log('action name:', action.name);
        console.log('description:', action.desc);
        if (action.attack_bonus) console.log('att bonus:', action.attack_bonus);
        if (action.usage) {
            let usageString = 'usage: ';
            if (action.usage.times) usageString += action.usage.times;
            usageString += action.usage.type;
            if (action.usage.dice) usageString += ' dice:' + action.usage.dice;
            if (action.usage.min_value) usageString += ' min value: ' + action.usage.min_value;
            console.log(usageString);
        }
        
    }
}

function parseUrlParams() {   //prendo i parametri passati tramite URL dalla pagina precedente come avevamo fatto per l'app Todo del prof
    const urlSearchParams = new URLSearchParams(window.location.search); 
    const params = Object.fromEntries(urlSearchParams.entries()); 
    console.log('params', params);

    return params;
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
    console.log(infosArray);
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
        const newTemplate = accordionTemplate.replaceAll('#NUMBER', myId) 
                                             .replace('#NAME', info.name)
                                             .replace('#DESCRIPTION', info.desc);
        divAccordionContainer.innerHTML += newTemplate;
    }
    return divAccordionContainer;
}

init();