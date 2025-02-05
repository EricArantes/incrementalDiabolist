var Player = {
    "Items": [],
    "Life": 50,
}
var CraftingSlots = {
    "Slot1": 0,
    "Slot2": 0,
    "Result": 0
}

var Gate = {
    "ActiveKey": ""
}

function updateDemonsPanel(){
    const playerPanel = document.getElementById("player-panel")

    //console.log(Player)

    Player["Items"].forEach(item => {
        const thisItem = document.getElementById(item["summonId"])

        if(item["type"] == "Demon"){

            if(thisItem === null){
                const newDemon = document.createElement("div")
                const icon = document.createElement("img")
                const charges = document.createElement("div")
        
                newDemon.classList.add("demon-in-panel")
                icon.classList.add("demon-in-panel-img")
                charges.classList.add("demon-in-panel-charges")
        
                icon.src = item["img"]
                //console.log(icon.src)

                charges.textContent = item["charges"]
        
                newDemon.appendChild(icon)
                newDemon.appendChild(charges)
        
                newDemon.id = item["summonId"]
                charges.id = "charges-" + item["summonId"]
            
                playerPanel.appendChild(newDemon)

                newDemon.addEventListener("click", () => { activateDemon(item) })
        
                newDemon.addEventListener("mouseover", () => {
                    showTooltip(item)
                })

                newDemon.addEventListener("mouseout", () => {
                    document.querySelector(".tooltip-box").style.opacity = "0"
                })
            }
        }

        if(item["type"] == "Item"){

            if(thisItem == null){
                const newItem = document.createElement("div")
                const icon = document.createElement("img")
                const charges = document.createElement("div")
        
                newItem.classList.add("demon-in-panel", "item-in-panel")
                icon.classList.add("demon-in-panel-img", "item-in-panel-img")
                charges.classList.add("demon-in-panel-charges", "item-in-panel-charges")
        
                icon.src = item["img"]
                //console.log(icon.src)
                charges.textContent = item["charges"]
        
                newItem.appendChild(icon)
                newItem.appendChild(charges)
        
                newItem.id = item["summonId"]
                charges.id = "charges-" + item["summonId"]
            
                playerPanel.appendChild(newItem)

                newItem.addEventListener("mouseover", () => {
                    showTooltip(item)
                })

                newItem.addEventListener("mouseout", () => {
                    document.querySelector(".tooltip-box").style.opacity = "0"
                })

                newItem.addEventListener("click", () => {
                    addToCrafting(item)
                })
        
                if(item["charges"] <= 0){
                    newItem.remove()
                }
        
            }
            else{
                
                const thisItemCharges = document.getElementById("charges-" + item["summonId"])
                thisItemCharges.textContent = item["charges"]
    
                if(item["charges"] <= 0){
                    thisItem.remove()
    
                    Player["Items"].splice(Player["Items"].indexOf(item), 1)
    
                    document.querySelector(".tooltip-box").style.opacity = "0"
                    
                }
                
            }


        }

    })

    const lifeCounter = document.getElementById("life-counter")
    lifeCounter.textContent = Player["Life"]



}

function tickDemon(demon){

    var activeTime = 1000
    var isDone = false
    var tgtDemon = document.getElementById(demon["summonId"])

    tgtDemon.style.scale = "0.95"
    tgtDemon.style.filter = "brightness(0.7)"


    tgtDemon.style.backgroundColor = "grey"


    var tickInterval = setInterval(() => {

        tgtDemon.style.scale = "0.95"
        tgtDemon.style.filter = "brightness(0.7)"
    
    
        tgtDemon.style.backgroundColor = "grey"

        activeTime -= demon["speed"]

        barPercentage = (activeTime / 1000) * 100

        var diff = 100 - barPercentage

        //tgtDemon.style.background = "linear-gradient(to top, yellow " + barPercentage + "%, transparent " + diff + "% )"

        tgtDemon.style.background = `linear-gradient(to top, grey ${barPercentage}%, grey ${barPercentage}%, transparent ${barPercentage}%, transparent ${diff}%)`;


        if(activeTime <= 0){
            isDone = true
        }

        if(isDone){
            //console.log("done")

            killInterval(demon["summonId"])

            demon["isActive"] = false
            
            tgtDemon.style.scale = "1"
            tgtDemon.style.filter = "brightness(1)"
            tgtDemon.style.backgroundColor = "transparent"
            tgtDemon.style.background = "none"
        }

    }, 250)

    localStorage.setItem(demon["summonId"], tickInterval)
}

function killInterval(demonId){
    interval = localStorage.getItem(demonId)
    clearInterval(interval)
    localStorage.removeItem(demonId)
}


function showTooltip(demon){
    const demonName = document.createElement("p")
    const demonKind = document.createElement("p")
    const demonDesc = document.createElement("p")

    demonName.classList.add("demon-title")
    demonKind.classList.add("demon-kind")
    demonDesc.classList.add("demon-abilities")

    demonName.textContent = demon["name"]
    demonKind.textContent = demon["kind"]

    var description = ""

    if(demon["type"] == "Demon"){
        description += "Grants " + demon["tier"] + " " + demon["product"]["name"]

    }

    demonDesc.textContent = description

    const tooltipBox = document.querySelector(".tooltip-box")

    while(tooltipBox.firstChild){
        tooltipBox.firstChild.remove()
    }

    tooltipBox.appendChild(demonName)
    tooltipBox.appendChild(demonKind)
    tooltipBox.appendChild(demonDesc)

    tooltipBox.style.opacity = "1"

}

function resetSky(){
    for(let i = 0; i < 20; i++){
        createStar()
    }
}

function swapActivePanel(newPanel){

    document.getElementById("main-panel").remove()

    document.getElementById("night-sky").appendChild(newPanel)


}

function withdrawFromCraftingSlot(slotItem, slot){

    var hasItem = false

    Player["Items"].forEach(item => {
        if(item.summonId == slotItem.summonId){
            item.charges += 1
            hasItem = true
        }
    })

    //console.log(hasItem)

    if(Player["Items"].length >= 12 && !hasItem){
        return
    }else{
        if(!hasItem){
            slotItem.charges = 1
            Player["Items"].push(slotItem)
        }

        switch(slot){
            case "Slot1":
                while(document.getElementById("slot-1").firstChild){
                    document.getElementById("slot-1").firstChild.remove()
                }
                var clone = document.getElementById("slot-1").cloneNode(true)
                document.getElementById("slot-1").parentNode.replaceChild(clone, document.getElementById("slot-1"))
                CraftingSlots["Slot1"] = 0
            break;
            case "Slot2":
                while(document.getElementById("slot-2").firstChild){
                    document.getElementById("slot-2").firstChild.remove()
                }
                var clone = document.getElementById("slot-2").cloneNode(true)
                document.getElementById("slot-2").parentNode.replaceChild(clone, document.getElementById("slot-2"))
                CraftingSlots["Slot2"] = 0
            break;
        }
    
        while(document.getElementById("slot-3").firstChild){
            document.getElementById("slot-3").firstChild.remove()
        }
        var clone = document.getElementById("slot-3").cloneNode(true)
        document.getElementById("slot-3").parentNode.replaceChild(clone, document.getElementById("slot-3"))
        CraftingSlots["Result"] = 0
        


        updateDemonsPanel()
    }

    if(findKeysInInv()){
        spawnGate()
    }

    


}

function findKeysInInv(){

    var keyFound = false

    if(Player["Items"].length > 0){
        Player["Items"].forEach(item => {
            if(item["traits"]){
                item["traits"].forEach(trait => {
                    if(trait == "key"){
                        keyFound = item
                    }
                })
            }


        })
    }



    return keyFound
}

function spawnGate(){

    if(document.querySelector("infernal-gate") == null){
        var gate = document.createElement("div")

        gate.classList.add("infernal-gate")
    
        document.body.appendChild(gate)
    }
}

function selectKey(){

    const gate = document.querySelector("infernal-gate")
    


}


function addToCrafting(item){

    const slot1 = document.getElementById("slot-1")
    const slot2 = document.getElementById("slot-2")
    const slot3 = document.getElementById("slot-3")

    var divToApp = document.createElement("div")
    var itemImg = document.createElement("img")

    itemImg.src = item["img"]

    itemImg.classList.add("item-in-crafting-icon")
    divToApp.classList.add("item-in-crafting")

    divToApp.appendChild(itemImg)

    if(!slot1.firstChild){
        slot1.appendChild(divToApp)
        CraftingSlots["Slot1"] = item

        item.charges -= 1

        slot1.addEventListener("click", () => { withdrawFromCraftingSlot(CraftingSlots["Slot1"], "Slot1") })

    }else if(!slot2.firstChild){
        slot2.appendChild(divToApp)
        CraftingSlots["Slot2"] = item

        slot2.addEventListener("click", () => { withdrawFromCraftingSlot(CraftingSlots["Slot2"], "Slot2") })


        item.charges -= 1
    }


    if(CraftingSlots["Slot1"] != 0 && CraftingSlots["Slot2"] != 0){
        craftItem()
    }

    updateDemonsPanel()

}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

function consumeCrafting(){

    CraftingSlots["Slot1"] = 0
    CraftingSlots["Slot2"] = 0

    const slot1 = document.getElementById("slot-1")
    const slot2 = document.getElementById("slot-2")

    while(slot1.firstChild){
        slot1.firstChild.remove()
    }

    while(slot2.firstChild){
        slot2.firstChild.remove()
    }



}

function craftItem(){

    var craftingTraits = []
    var tooManyKeys = false

    CraftingSlots["Slot1"]["traits"].forEach(trait => {
        craftingTraits.push(trait)
    })

    CraftingSlots["Slot2"]["traits"].forEach(trait => {
        craftingTraits.push(trait)
    })


    var resultSlot = document.getElementById("slot-3")

    CraftingRecipes.forEach(recipe => {
        if(arraysEqual(craftingTraits, recipe["recipe"])){

            var item = instanceOfProduct(recipe["name"])

            item["traits"].forEach(trait => {
                if(trait == "key"){

                    Player["Items"].forEach(item => {
                        item["traits"].forEach(trait => {
                            if(trait == "key"){
                                console.log("cannot craft more than one key")
                                tooManyKeys = true
                            }
                        })
                    })

                }
            })

            if(!tooManyKeys){
                //console.log(item)
                
                var divToApp = document.createElement("div")
                var itemImg = document.createElement("img")
            
                itemImg.src = item["img"]
            
                itemImg.classList.add("item-in-crafting-icon")
                divToApp.classList.add("item-in-crafting")

                divToApp.appendChild(itemImg)


                resultSlot.appendChild(divToApp)
                CraftingSlots["Result"] = item
            
                resultSlot.addEventListener("click", () => { withdrawFromCraftingSlot(CraftingSlots["Result"], "Result"), consumeCrafting() })
            }else{
                CraftingSlots["Slot1"]["traits"] = []
                
                CraftingSlots["Slot2"]["traits"] = []
            }


        }
    })

}

resetSky()
//populateResourceBar()



/* oldstuff


function populateDemonsPanel(){
    const playerPanel = document.getElementById("player-panel")

    while(playerPanel.firstChild){
        playerPanel.firstChild.remove()
    }


    Player["Items"].forEach(item => {

        const newItem = document.createElement("div")
        const icon = document.createElement("img")
        const charges = document.createElement("div")

        newItem.classList.add("demon-in-panel")
        icon.classList.add("demon-in-panel-img")
        charges.classList.add("demon-in-panel-charges")

        icon.src = item["img"]
        charges.textContent = item["charges"]

        newItem.appendChild(icon)
        newItem.appendChild(charges)

        newItem.id = item["summonId"]
    
        playerPanel.appendChild(newItem)

        if(item["type"] === "Demon"){
            newItem.addEventListener("click", () => { activateDemon(item) })
        }
        newItem.addEventListener("mouseover", () => {
            showTooltip(item)
        })

        newItem.addEventListener("mouseout", () => {
            document.querySelector(".tooltip-box").style.opacity = "0"
        })
    })

    
}

function populateResourceBar(){
    const resourceBar = document.getElementById("player-resources")

    while(resourceBar.firstChild){
        resourceBar.firstChild.remove()
    }

    Player["Item"].forEach(item => {

        const resourceItem = document.createElement("span")

        resourceItem.id = item["id"] + "-item"
        resourceItem.classList.add("resource")

        resourceItem.textContent = item["name"] + ": " + item["count"]

        resourceBar.appendChild(resourceItem)

    })


}


*/