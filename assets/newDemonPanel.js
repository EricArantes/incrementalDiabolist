
function newDemonPanel(x, y){

    const newPanel = document.createElement("div")
    const icon = document.createElement("img")
    const title = document.createElement("span")
    const kind = document.createElement("p")
    const desc = document.createElement("div")

    const demon = Demons[Math.floor(Math.random() * Demons.length)]

    newPanel.classList.add("demon-panel")
    icon.classList.add("demon-icon")
    title.classList.add("demon-title")
    kind.classList.add("demon-kind")
    desc.classList.add("demon-abilities")

    icon.src = demon["img"]

    title.textContent = demon["name"]

    kind.textContent = demon["kind"]

    demonDescription = ""

    demon["exchange"].forEach(item => {
        demonDescription += item["cost"] + " " + item["product"]
    })

    demonDescription += " => " + demon["power"] + " " + demon["product"]["name"]

    desc.textContent = demonDescription

    newPanel.style.opacity = "0"

    newPanel.appendChild(icon)
    newPanel.appendChild(title)
    newPanel.appendChild(kind)
    newPanel.appendChild(desc)

    document.body.appendChild(newPanel)

    var objLeft = x - Math.floor(newPanel.offsetWidth / 2)
    var objTop = Math.floor(newPanel.offsetHeight / 6)

    if(objLeft < 10){
        objLeft = 10
    }



    if(objLeft + newPanel.offsetWidth > window.innerWidth){
        objLeft = window.innerWidth - newPanel.offsetWidth - 10
    }




    newPanel.style.left = (objLeft) + "px"
    newPanel.style.top = (objTop) + "px"


    setTimeout(() => {

        newPanel.style.opacity = "1"

    },300)

    killAllStars()
    loseLife(1)

    newBeckonButton(objLeft, objTop, newPanel, demon)
    newDismissButton(objLeft, objTop, newPanel)

} 

function newDismissButton(x, y, panel){

    const dismissButton = document.createElement("button")
    dismissButton.classList.add("dismiss-button")

    document.body.appendChild(dismissButton)


    dismissButton.textContent = "Dismiss"
    dismissButton.style.opacity = "0"
    dismissButton.style.transition = "all 1s ease"

    var objLeft = x + (panel.offsetWidth - dismissButton.offsetWidth)
    var objTop = y + panel.offsetHeight

    dismissButton.style.left = objLeft + "px"
    dismissButton.style.top = objTop + "px"

    setTimeout(() => {
        
        dismissButton.style.opacity = "1"

    },300)
    
    setTimeout(() => {
        dismissButton.style.transition = "none"
    }, 1000)

    dismissButton.addEventListener("click", () => { dismissDemon() })

}

function dismissDemon(){

    const newDemon = document.createElement("div")

    newDemon.classList.add("demon")

    document.querySelectorAll(".demon-panel, .beckon-button, .dismiss-button").forEach(item => {
        item.style.opacity = "0"
        
        setTimeout(() => {
            item.remove()

        }, 600)
    })
    resetSky()
}

function newBeckonButton(x, y, panel, demon){

    const beckonButton = document.createElement("button")
    beckonButton.classList.add("beckon-button")

    beckonButton.textContent = "Beckon (" + demon["tier"] + ")"
    beckonButton.style.opacity = "0"
    beckonButton.style.transition = "all 1s ease"

    var objLeft = x
    var objTop = y + panel.offsetHeight



    beckonButton.style.left = objLeft + "px"
    beckonButton.style.top = objTop + "px"

    document.body.appendChild(beckonButton)



    setTimeout(() => {
        
        beckonButton.style.opacity = "1"

    },300)
    
    setTimeout(() => {
        beckonButton.style.transition = "none"
    }, 1000)


    beckonButton.addEventListener("click", () => { beckonDemon(demon) })



}

function beckonDemon(demon){
    
    document.querySelectorAll(".demon-panel, .beckon-button, .dismiss-button").forEach(item => {
        item.style.opacity = "0"
        
        setTimeout(() => {
            item.remove()

        }, 600)
    })

    resetSky()

    var demonToPush = structuredClone(demon)

    demonToPush["summonId"] = Date.now()
    Player["Demons"].push(demonToPush)
    loseLife(demon["tier"])

    populateDemonsPanel()

}



function loseLife(val){

    Player["Products"][0]["count"] -= val
    populateResourceBar()

}


function killAllStars(){

    var starList = document.querySelectorAll(".star")



    starList.forEach(item => {
        var randTimeVal = Math.random() * 800
        var randsec = Math.random()

        item.style.transition = "all " + randsec + "s ease"
        item.style.opacity = "0"
        
        setTimeout(() => {
            item.remove()
        }, 400 + (randTimeVal))
        
    })

}

