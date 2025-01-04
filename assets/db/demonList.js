const Products = [
    {
        "id": 0,
        "name": "Life",
        "type": "count",
        "count": 0,
        "traits": ["essence", "life"]

    },
    {
        "id": 0,
        "summonId": 0,
        "name": "Red Ichor",
        "kind": "Diabolical Bloodstuff",
        "type": "Item",
        "traits": ["red rune"],
        "charges": 0,
        "img": ""

    },
    {
        "id": 0,
        "summonId": 0,
        "name": "Iron Coin",
        "kind": "Infernal Pentacle",
        "type": "Item",
        "traits": ["green rune"],
        "charges": 0,
        "img": ""

    },
    {
        "id": 0,
        "summonId": 0,
        "name": "Weeping Stone",
        "kind": "Hadean Pavement",
        "type": "Item",
        "traits": ["blue rune"],
        "charges": 0,
        "img": ""

    },
    {
        "id": 0,
        "summonId": 0,
        "name": "Red Key",
        "kind": "Festering Passage",
        "type": "Item",
        "traits": ["key", "red wasteland"],
        "charges": 0,
        "img": ""
    },
    
]

const CraftingRecipes = [

    {
        "id": 0,
        "name": "Red Key",
        "recipe": ["red rune", "red rune"],
    }



]



var productId = 0
Products.forEach(item => {
    item["id"] = productId
    item["summonId"] = item["id"]
    productId += 1
})

const ProductsByName = Products.reduce((acc, product) => {
    acc[product.name] = product;
    return acc;
}, {});

function instanceOfProduct(productName){
    x = structuredClone(ProductsByName[productName]);
    return x;
}

function randomByTraitLoose(traitList){

    //takes a long time to randomize the product, honestly might be good.

    var randList = []

    Products.forEach(item => {
        traitList.forEach(trait => {
            item["traits"].forEach(itemTrait => {
                if(itemTrait == trait && !randList.includes(item)){
                    randList.push(item)
                }
            })
        })
    })

    const now = Date.now()
    const index = now % randList.length

    return randList[index]["name"]

}


const Demons = [
    {
        "summonId": 0,
        "name": "Lesser Imp",
        "type": "Demon",
        "kind": "Malevolent Whisper",
        "tier": 1,
        "product": "Red Ichor",
        "img": ""
    },



]

/*
blaugh = [
    {
        "summonId": 0,
        "name": "Unclean Beelze",
        "type": "Demon",
        "kind": "Malodorous Spirit",
        "tier": 1,
        "product": instanceOfProduct("Flies"),
        "power": 6,
        "exchange": [ {"product": "Cadaver", "cost": 1 } ],
        "charges": 9,
        "speed": 150,
        "isActive": false,
        "img": ""
    },
    {
        "summonId": 0,
        "name": "Ego Fiend",
        "type": "Demon",
        "kind": "Masked Interloper",
        "tier": 1,
        "product": instanceOfProduct("Flies"),
        "power": 2,
        "exchange": [ "emotion" ],
        "charges": 12,
        "speed": 300,
        "isActive": false,
        "img": ""
    },
    {
        "summonId": 0,
        "name": "Ego Fiend",
        "type": "Demon",
        "kind": "Masked Interloper",
        "tier": 1,
        "product": instanceOfProduct(randomByTraitLoose(["ego"])),
        "rand": ["ego"],
        "power": 2,
        "exchange": [ {"trait": "emotion", "cost": 1} ],
        "charges": 12,
        "speed": 300,
        "isActive": false,
        "img": ""
    },
]
*/


Products.forEach(item => {
    item["img"] = "assets/db/items/" + item["name"] + ".png"
})

Demons.forEach(item => {
    item["img"] = "assets/db/demons/" + item["name"] + ".png"
    item["product"] = instanceOfProduct(item["product"])
})