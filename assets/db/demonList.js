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
        "name": "Cadaver",
        "type": "count",
        "count": 0,
        "traits": ["grim", "rot", "notorious"]
    },
    {
        "id": 0,
        "name": "Flies",
        "type": "count",
        "count": 0,
        "traits": [ "rot", "insect"]
    },
    {
        "id": 0,
        "name": "Greed",
        "type": "count",
        "count": 0,
        "traits": ["emotion", "ego"]
    },
    {
        "id": 0,
        "name": "Ignorance",
        "type": "count",
        "count": 0,
        "traits": ["emotion", "ego"]
    },
    {
        "id": 0,
        "name": "Confidence",
        "type": "count",
        "count": 0,
        "traits": ["emotion", "ego"]
    },
    {
        "id": 0,
        "name": "Narcissism",
        "type": "count",
        "count": 0,
        "traits": ["emotion", "ego", "pride"]
    },
    
]

var productId = 0
Products.forEach(item => {
    item["id"] = productId
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
        "type": "Active",
        "kind": "Malevolent Whisper",
        "tier": 1,
        "product": instanceOfProduct("Cadaver"),
        "power": 1,
        "exchange": [ {"product": "Life", "cost": 1 } ],
        "charges": 3,
        "speed": 50,
        "isActive": false,
        "img": ""
    },
    {
        "summonId": 0,
        "name": "Ego Fiend",
        "type": "Active",
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


blaugh = [
    {
        "summonId": 0,
        "name": "Unclean Beelze",
        "type": "Active",
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
        "type": "Active",
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
]

Demons.forEach(item => {
    item["img"] = "assets/db/img/" + item["name"] + ".png"
})