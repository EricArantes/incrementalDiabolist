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
                Player.Products.forEach(item => {
                    if(item["name"] == trade["product"]){
                        if(item["count"] >= trade["cost"]){
                            item["count"] -= trade["cost"]
                            drainCharge = true
                            grantExchange = true
                        }
                    }
                })
            }) 
    
        }
    
        if(grantExchange){
            if(demon["product"]["type"] == "count"){
    
                if(document.getElementById(productId + "-item")){
                    Player.Products.forEach(item => {
                        if(item["id"] == productId){
                            item["count"] += demon["power"]
                        }
                    })
                }
                else{
                    Player.Products.push(demon["product"])
                    Player.Products.forEach(item => {
                        if(item["id"] == productId){
                            item["count"] += demon["power"]
                        }
                    })
                }
        
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
