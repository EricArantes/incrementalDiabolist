const Products = [
    {
        "id": 0,
        "name": "Life",
        "type": "count",
        "count": 0,
        "traits:": ["essence", "life"]
    },
    {
        "id": 0,
        "name": "Cadaver",
        "type": "count",
        "count": 0,
        "traits:": ["grim", "rot", "notorious"]
    },
    {
        "id": 0,
        "name": "Flies",
        "type": "count",
        "count": 0,
        "traits:": [ "rot", "insect"]
    }
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
]

Demons.forEach(item => {
    item["img"] = "assets/db/img/" + item["name"] + ".png"
})