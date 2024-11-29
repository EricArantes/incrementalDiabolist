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
                    Player.Products.forEach(item => {
                        if(item["name"] == trade["product"]){
                            if(item["count"] >= trade["cost"]){
                                item["count"] -= trade["cost"]
                                drainCharge = true
                                grantExchange = true
                            }
                        }
                    })
                }

                if(trade["trait"] != null){
                    var done = false
                    Player.Products.forEach(item => {
                        if(item["traits"].includes(trade["trait"]) && item["id"] != trade["id"] && !done){

                            if(item["count"] >= trade["cost"]){
                                item["count"] -= trade["cost"]
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
            if(demon["product"]["type"] == "count"){

                if(document.getElementById(productId + "-item") == null){
                    Player.Products.push(demon["product"])
                }

                Player.Products.forEach(item => {
                    if(item["id"] == productId){
                        const sum = item["count"] + demon["power"]
                        item["count"] = sum
                    }
                })

                console.log(Player)
        
            }
        }
    
        if(drainCharge){
            if(typeof demon["charges"] == "number"){
                demon["charges"] -= 1
            }
        }

        demon["isActive"] = true

        populateResourceBar()
        updateDemonsPanel()
        tickDemon(demon)


    }



}
