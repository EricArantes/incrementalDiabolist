var Player = {
    "Demons": [],
    "Products": [{"name": "Life", "type": "count", "count": 50, "id": 0}]
}

function populateResourceBar(){
    const resourceBar = document.getElementById("player-resources")

    while(resourceBar.firstChild){
        resourceBar.firstChild.remove()
    }

    Player["Products"].forEach(item => {

        const resourceItem = document.createElement("span")

        resourceItem.id = item["id"] + "-item"
        resourceItem.classList.add("resource")

        resourceItem.textContent = item["name"] + ": " + item["count"]

        resourceBar.appendChild(resourceItem)

    })


}

function updateDemonsPanel(){
    const playerPanel = document.getElementById("player-panel")

    Player.Demons.forEach(item => {

        const thisDemon = document.getElementById(item["summonId"])

        if(thisDemon === null){
            const newDemon = document.createElement("div")
            const icon = document.createElement("img")
            const charges = document.createElement("div")
    
            newDemon.classList.add("demon-in-panel")
            icon.classList.add("demon-in-panel-img")
            charges.classList.add("demon-in-panel-charges")
    
            icon.src = item["img"]
            charges.textContent = item["charges"]
    
            newDemon.appendChild(icon)
            newDemon.appendChild(charges)
    
            newDemon.id = item["summonId"]
            charges.id = "charges-" + item["summonId"]
        
            playerPanel.appendChild(newDemon)
    
            if(item["isActive"]){
    
                newDemon.style.scale = "0.95"
                newDemon.style.filter = "brightness(0.7)"
    
            }
        
            if(item["type"] === "Active"){
                newDemon.addEventListener("click", () => { activateDemon(item) })
            }
    
            newDemon.addEventListener("mouseover", () => {
                showTooltip(item)
            })
    
            newDemon.addEventListener("mouseout", () => {
                document.querySelector(".tooltip-box").style.opacity = "0"
            })
    
            if(item["charges"] <= 0){
                newDemon.remove()
            }
        }
        else{
            
            const thisDemoncharges = document.getElementById("charges-" + item["summonId"])
            thisDemoncharges.textContent = item["charges"]

            if(item["charges"] <= 0){
                thisDemon.remove()

                Player.Demons.splice(Player.Demons.indexOf(item), 1)

                document.querySelector(".tooltip-box").style.opacity = "0"
                
            }
            
        }
    })
}

function populateDemonsPanel(){
    const playerPanel = document.getElementById("player-panel")

    while(playerPanel.firstChild){
        playerPanel.firstChild.remove()
    }


    Player.Demons.forEach(item => {

        const newDemon = document.createElement("div")
        const icon = document.createElement("img")
        const charges = document.createElement("div")

        newDemon.classList.add("demon-in-panel")
        icon.classList.add("demon-in-panel-img")
        charges.classList.add("demon-in-panel-charges")

        icon.src = item["img"]
        charges.textContent = item["charges"]

        newDemon.appendChild(icon)
        newDemon.appendChild(charges)

        newDemon.id = item["summonId"]
    
        playerPanel.appendChild(newDemon)

        if(item["isActive"]){

            newDemon.style.scale = "0.95"
            newDemon.style.filter = "brightness(0.7)"

        }
    
        if(item["type"] === "Active"){
            newDemon.addEventListener("click", () => { activateDemon(item) })
        }

        newDemon.addEventListener("mouseover", () => {
            showTooltip(item)
        })

        newDemon.addEventListener("mouseout", () => {
            document.querySelector(".tooltip-box").style.opacity = "0"
        })

        if(item["charges"] <= 0){
            newDemon
        }

    })

    
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
            console.log("done")

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

    demon["exchange"].forEach(item => {
        description += item["cost"] + " " + item["product"]
    })

    description += " => " + demon["power"] + " " + demon["product"]["name"]

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

resetSky()
populateResourceBar()