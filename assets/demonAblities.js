function activateDemon(demon){

    const productId = demon["product"]["id"]

    var hascopy = false

    Player.Items.forEach(item => {
        if(item["id"] == productId){
            hascopy = true
        }
    })

    if(document.getElementById(productId) == null){
        Player.Items.push(demon["product"])

    }

    Player.Items.forEach(item => {
        if(item["id"] == productId){
            const sum = item["charges"] + demon["tier"]
            item["charges"] = sum
        }
    })

    document.getElementById(demon["summonId"]).remove()
    Player["Items"].splice(Player["Items"].indexOf(demon), 1)
    document.querySelector(".tooltip-box").style.opacity = "0"


    updateDemonsPanel()


}

function randomizeDemonProduct_LooseTrait(demon){

    const traitList = []

    demon["rand"].forEach(item => {
        traitList.push(item)
    })

    console.log(traitList)

    demon["product"] = instanceOfProduct(randomByTraitLoose(traitList))


}













/* old stuff

function activateDemon(demon){
    var isActive = demon["isActive"]

    if(isActive){
        return
    }else{

        const productId = demon["product"]["id"]
        var drainCharge = false
        var grantExchange = false
    
    
        if(demon["exchange"] != "None"){
            demon["exchange"].forEach(trade => {

                if(trade["product"] != null){
                    if(trade["product"] == "Life"){
                        if(Player["Life"] >= trade["cost"]){
                            Player["Life"] -= trade["cost"]
                            drainCharge = true
                            grantExchange = true
                        }
                    }
                    else{
                        Player.Items.forEach(item => {
                            if(item["name"] == trade["product"]){
                                if(item["charges"] >= trade["cost"]){
                                    item["charges"] -= trade["cost"]
                                    drainCharge = true
                                    grantExchange = true
                                }
                            }
                        })
                    }



                }

                if(trade["trait"] != null){
                    var done = false
                    Player.Items.forEach(item => {
                        if(item["traits"].includes(trade["trait"]) && item["id"] != trade["id"] && !done){

                            if(item["charges"] >= trade["cost"]){
                                item["charges"] -= trade["cost"]
                                drainCharge = true
                                grantExchange = true
                                done = true
                            }
                        }
                    })
                }

            }) 
    
        }
    
        if(grantExchange){
            var hascopy = false
            var invFull = false

            Player.Items.forEach(item => {
                if(item["id"] == productId){
                    hascopy = true
                }
            })

            if(document.getElementById(productId) == null && !hascopy){
                if(Player.Items.length >= 12){
                    invFull = true
                    return
                }else{
                    Player.Items.push(demon["product"])
                }
            }

            Player.Items.forEach(item => {
                if(item["id"] == productId){
                    const sum = item["charges"] + demon["power"]
                    item["charges"] = sum
                }
            })

            console.log(Player)
        
        }

        if(!invFull){
            if(drainCharge){
                if(typeof demon["charges"] == "number"){
                    demon["charges"] -= 1
                }
            }
    
            demon["isActive"] = true
    
            if(demon["rand"] != null){
                randomizeDemonProduct_LooseTrait(demon)
            }
    
            //populateResourceBar()
            updateDemonsPanel()
            tickDemon(demon)
        }

    }



}


*/