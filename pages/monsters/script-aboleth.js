const BASE_URL = "https://www.dnd5eapi.co/api/monsters/aboleth"; 

function initAboleth() {
    fetch(BASE_URL) 
    .then(response => response.json()) 
    .then(result => test(result)); 
} 


function displayMonster(result) {
    console.log('name from objet', result); 

    const abolethArray = Object.keys(result);  //  array con chiavi e valori 
    // console.log('keyvalues', abolethArray); 

    const abolethTitle = document.createElement('h1'); 
    const abolethTitleNode = document.createTextNode(result.name) 
    abolethTitle.appendChild(abolethTitleNode); 
    document.body.appendChild(abolethTitle);

    const abolethTemplate = ` 
        <h2>#ABOLETHNAME:</h2> 
        <h3 id="#ID">#DESCRIPTION</h3> 
        ` 
        //  CREARE SOTTOGOGGETI CON ID UNICO
    const abolethContainer = document.body; 

    // for (let i = 0; i < abolethArray.length; i++) {
    //     const element = abolethArray[i];
    //     console.log('chiave:', abolethArray.); 
    //             const newAbolethTemplate = abolethTemplate.replace('#ABOLETHNAME', element.toUpperCase()); 

                                                

    //     abolethContainer.innerHTML += newAbolethTemplate;
    // }

    for (const key of abolethArray) {
        // console.log('chiave:', key, 'valore:', result.speed); 
        
        // console.log('speed', result.speed)
        
        
        const newAbolethTemplate = abolethTemplate.replace('#ABOLETHNAME', key.toUpperCase()) 
        .replace('#DESCRIPTION', result[key]) 
        .replace('#ID', key);
        
        const speedTemplate = document.getElementById('speed'); 
        for (const [key, value] of Object.entries(result.speed)) {
            // console.log(key, value); 
            // const speedString = result.speed[key]
            // const speedKeyNode = document.createTextNode(speedString) 
            // speedTemplate.appendChild(speedKeyNode); 
            // newAbolethTemplate.appendChild(speedTemplate);


        }
        
        
        

        
        
        
        abolethContainer.innerHTML += newAbolethTemplate;
    }
}

initAboleth();

function test(result){
    console.log(result);
    let arrayActions = []
    if(result.actions) arrayActions = result.actions
    for (const action of arrayActions) {
        console.log('nome:', action.name)
        console.log('description:', action.desc);
        if(action.attack_bonus) console.log('att bonus:', action.attack_bonus)
        if (action.usage) { 
            let usageString = 'usage: '; 
            if (action.usage.times) usageString += action.usage.times; 
            usageString += action.usage.type
            if(action.usage.dice) usageString += ' dice:' + action.usage.dice
            if(action.usage.min_value) usageString += ' min value: ' + action.usage.min_value
            console.log(usageString); 
        } 
        if(action.options) { 
            console.log('options', action.options);
            // let optionsString = 'options: '; 
        //     if(action.options.) 
        }
    }
}